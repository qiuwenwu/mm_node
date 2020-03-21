/**
 * @fileOverview 快递查询的指令
 * @version 1.0
 */

var http = new $.Http();

module.exports = {
	/**
	 * @description 指令行为主函数
	 * @param {Object} msg 消息
	 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
	 * @return {Object} 执行结果
	 */
	async main(msg, db) {
		var ret = "";
		console.log(this.view(msg));
		// console.log(db.msg);
		number = db.msg.keyword.matchs("/[0-9a-zA-Z]+/g");
		if (number.length > 8) {
			var res = await http.get("https://www.kuaidi100.com/autonumber/autoComNum?resultv2=1&text=" + number, null, {
				Referer: 'https://www.kuaidi100.com/?from=openv'
			});
			// ret = "没有查询到该快递\r\n,请查验快递单号是否正确或联系寄件人";
			if (res.body) {
				var json = res.body.toJson();
				var arr = json.auto;
				if (arr && arr.length > 0) {
					var url = "https://www.kuaidi100.com/query?type=" + arr[0].comCode + "&postid=" + number +
						"&temp=0.6926586706586979&phone=";
					res = await http.get(url);
					if (res.body) {
						var arr = res.body.toJson().data;
						arr.map(function(o) {
							var line = o.time + "\r\n" + o.context.replace('【{', "【").replace('}】', "】") + "\r\n";
							ret = line + "\r\n" + ret;
						});
						ret = "快递单号: \r\n" + number + "\r\n\r\n查询结果:\r\n" + ret.trim();
					}
				} else {
					ret = "查询失败"
				}
			}
		}
		return ret;
	}
};
