/**
 * @fileOverview 快递查询的指令
 * @version 1.0
 */

var http = new $.Http();

async function get_music(music_name) {
	var pm = {
		w: music_name
	};
	http.get('https://u.y.qq.com/');
	var res = await http.get('https://c.y.qq.com/soso/fcgi-bin/client_search_cp?p=1&n=2&' + $.toUrl(pm) +
		'&format=json');
	if (res.body) {
		var list = res.body.toJson().data.song.list;
		if (list.length > 0) {
			var {
				albummid,
				songmid,
				singer,
				songname
			} = list[0];
			var data = {
				"req_0": {
					"module": "vkey.GetVkeyServer",
					"method": "CgiGetVkey",
					"param": {
						"guid": "358840384",
						"songmid": [songmid],
						"songtype": [0],
						"uin": "1443481947",
						"loginflag": 1,
						"platform": "20"
					}
				},
				"comm": {
					"uin": "18585073516",
					"format": "json",
					"ct": 24,
					"cv": 0
				}
			};
			var data_str = encodeURIComponent(JSON.stringify(data));
			res = await http.get("https://u.y.qq.com/cgi-bin/musicu.fcg?format=json&data=" + data_str);
			if (res.body) {
				var music = res.body.toJson().req_0.data;
				var mc = music.midurlinfo[0];
				return {
					MsgType: 'music2',
					Title: songname,
					Description: singer[0].name,
					MusicUrl: music.sip[0] + mc.purl,
					HQMusicUrl: music.sip[1] + (mc.wifiurl ? mc.wifiurl : mc.purl),
					ThumbMediaId: ""
				};
			}
		}
	}
	return null;
}

module.exports = {
	/**
	 * @description 指令行为主函数
	 * @param {Object} msg 消息
	 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
	 * @return {Object} 执行结果
	 */
	async main(msg, db) {
		var ret = "";
		var music_name = msg.content;
		if (music_name) {
			var ret = await get_music(music_name);
			if (!ret) {
				ret = "没有找到音乐，可能不是歌名或者检索失败，请换首歌试试！";
			}
			 db.msg.end = 1;
		} else {
			ret = '想听什么音乐?';
		}
		return ret;
	}
};
