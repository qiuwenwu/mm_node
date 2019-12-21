/**
 * 定义标准格式
 * 数据的格式最主要的是消息ID和类型, 通过类型进行数据库分表
 * 通过ID可以知道消息哪些已经获取, 哪些未获取, 同时获取分表中相应的数据
 */
var format_msg = {
	// 消息类型 text文本, 视频video, music音乐, voice语音, 图片image, 文章article
	// 链接link, 新闻news, 订单order, 股票stock
	"msg_type": "text",
	// 消息ID
	"msg_id": "",
	// 创建时间
	"create_time": "",
	// 发信人
	"from_user": "小白",
	// 收信人
	"to_user": "小明",
	// 群
	"group": "初中同学群",
	// 消息内容
	"content": "你好",
	// 视频
	"video": {
		// 标题
		"title": "",
		// 描述
		"description": "",
		// 来源
		"source": "",
		// 图标
		"icon": "",
		// 数据 (链接或字节流)
		"data": ""
	},
	// 文章
	"article": {
		// 标题
		"title": "",
		// 描述
		"description": "",
		// 来源
		"source": "",
		// 封面图
		"icon": "",
		// 数据 (链接或字节流)
		"data": ""
	},
	// 图片
	"image": {
		// 文件名
		"name": "",
		// 缩略图
		"icon": "",
		// 数据 (链接或字节流)
		"data": ""
	},
	// 音乐
	"music": {
		// 歌名
		"name": "",
		// 背景图
		"background": "",
		// 封面图
		"icon": "",
		// 歌手
		"singer": "",
		// 数据 (链接或字节流)
		"data": ""
	}
};