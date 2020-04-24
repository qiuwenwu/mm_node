const Item = require('mm_machine').Item;
const Param = require('../param/drive.js');

/**
 * 指令驱动类
 * @extends {Item}
 * @class
 */
class Drive extends Item {
	/**
	 * 构造函数
	 * @param {String} dir 当前目录
	 * @constructor
	 */
	constructor(dir) {
		super(dir, __dirname);
		this.default_file = "./cmd.json";

		// 开关 true为开启, false为关闭
		this.onOff = true;

		/* 通用项 */
		// 配置参数
		this.config = {
			// 标识名
			"name": "demo",
			// 分组名
			"title": "指令标题",
			// 描述, 用于描述该接口有什么用的
			"description": "暂无描述",
			// 文件名
			"func_file": "./index.js",
			// 时态, 分before之前、main主要、after之后三个时态,
			"tense": "main",
			// 加载顺序，数字越大越后面加载
			"sort": 1000,
			// 分组
			"group": "default",
			// 类型: query便民查询，action执行，game游戏，orther其他，为空表示未分类
			"type": "",
			// 匹配关键词
			"match": [],
			// 不含关键词
			"not_match": [],
			// 去除关键词
			"remove": [],
			// 摘取
			"extract": [],
			// 第一阶段
			"stage1": {
				// 方式
				"mode": "fill",
				// 验证参数集
				"param": [
					// 	{
					// 	// 参数名
					// 	"name": "name",
					// 	// 参数介绍名
					// 	"title": "名称",
					// 	// 参数格式
					// 	"format": "",
					// 	// 缺少参数提示语，传键值对，例如：{ number: "快递单号多少？" }
					// 	"not_tip": "",
					// 	// 错误提示
					// 	"error_tip": "",
					//  // 监听语法
					//  "listen": "",
					//  // 校验函数明
					//	"func_name": ""
					// },
				]
			},
			// 第二阶段
			"stage2": {
				// 方式
				"mode": "update",
				// 验证参数集
				"param": []
			},
			// 第三阶段
			"stage3": {
				// 方式
				"mode": "fill",
				// 验证参数集
				"param": []
			}
		}
	}
};


/**
 * 创建一个参数模型
 */
Drive.prototype.model = function() {
	return {
		// 参数名
		"name": "name",
		// 参数介绍名
		"title": "名称",
		// 排序
		"sort": 10,
		// 监听语法
		"listen": "",
		// 参数格式
		"format": "",
		// 缺少参数提示语
		"not_tip": "",
		// 更新提示
		"update_tip": "",
		// 错误提示
		"error_tip": ""
	};
};


/**
 * 校验是否匹配指令
 * @param {Object} content 请求的正文
 * @param {Object} db 数据管理器
 * @return {Boolean} 匹配返回true，不匹配返回false
 */
Drive.prototype.match = function(content, db) {
	var bl = false;
	var arr = this.config.match;
	for (var i = 0; i < arr.length; i++) {
		var format = arr[i];
		if (content.matchs(format)) {
			bl = true;
			break;
		}
	}
	return bl;
};


/**
 * 校验是否不含关键词
 * @param {Object} content 请求的正文
 * @param {Object} db 数据管理器
 * @return {Boolean} 不含返回true，含有返回false
 */
Drive.prototype.not_match = function(content, db) {
	var bl = true;
	var arr = this.config.not_match;
	for (var i = 0; i < arr.length; i++) {
		var format = arr[i];
		if (content.matchs(format)) {
			bl = false;
			break;
		}
	}
	return bl;
};


/**
 * 抽取正文
 * @param {String} content 正文
 * @param {Object} db 数据管理器
 * @return {Object} 返回过滤后的参数
 */
Drive.prototype.extract = async function(content, db) {
	var list = this.config.extract;
	var ret = content;
	var len = list.length;
	for (var i = 0; i < len; i++) {
		var format = list[i];
		var str = content.matchs(format);
		if (str) {
			ret += "\r\n" + str;
		}
	}
	return ret;
};


/**
 * 移除关键词
 * @param {String} content 正文
 * @param {Object} db 数据管理器
 * @return {Object} 返回过滤后的参数
 */
Drive.prototype.remove = async function(content, db) {
	var list = this.config.remove;
	var len = list.length;
	for (var i = 0; i < len; i++) {
		var str = list[i];
		var value = content.matchs(str);
		if (value) {
			content = content.replace(value, '');
		}
	}
	return content;
};

/**
 * 修改提示
 * @param {Object} msg 消息上下文
 * @param {Object} db 数据管理器
 * @return {Object} 返回过滤后的参数
 */
Drive.prototype.view_tip = async function(msg, db, tip) {
	var form = this.view(msg, db);
	tip = tip.replace("{form}", form);
	return tip;
};

/**
 * 1. 检验阶段, 判断条件是否满足
 * @param {Object} msg 消息上下文
 * @param {Object} db 数据管理器
 * @return {String} 验证失败返回错误提示
 */
Drive.prototype.check = async function(msg, db) {
	// 校验是否匹配指令
	var bl = await this.match(msg.content, db);
	if (bl) {
		bl = await this.not_match(msg.content, db);
	}
	return bl;
};


/**
 * 2. 过滤阶段, 抽出主要的内容
 * @param {Object} msg 消息上下文
 * @param {Object} db 数据管理器
 * @return {Object} 返回过滤后的参数
 */
Drive.prototype.filter = async function(msg, db) {
	var content = await this.extract(msg.content);
	return await this.remove(content);
};

/**
 * 3.1 信息补全阶段 用于通知用户补全执行的必要条件
 * @param {Object} msg 消息上下文
 * @param {Object} db 数据管理器
 * @param {Object} stage 阶段参数
 * @return {Object} 返回参数表单
 */
Drive.prototype.fill = async function(msg, db, stage) {
	if (!stage) {
		return "";
	}
	var list = stage.param;
	if(!list || list.length === 0){
		return "";
	}
	var form = {};
	var keyword = "";
	// 是否有进行填充
	var has_fill = false;

	var ct = "";
	// 判断参数
	if (db.msg.form) {
		form = db.msg.form.toJson();
	} else {
		// 补全内容
		ct = db.msg.content;
		var len = list.length;
		for (var i = 0; i < len; i++) {
			var o = list[i];
			var k = o.name;
			if (!form[k]) {
				var value = ct.matchs(o.format);
				if (value) {
					form[k] = value;
					keyword = k;
					ct = ct.replace(value, '');
					has_fill = true;
				} else {
					form[k] = "";
				}
			}
		}
	}
	ct = msg.content;
	var tip = "";
	for (var k in form) {
		if (!form[k]) {
			keyword = k;
			var o = list.getObj({
				name: k
			});
			var value = ct.matchs(o.format);
			if (value) {
				form[k] = value;
				ct = ct.replace(value, '');
				has_fill = true;
			} else {
				msg.form = form;
				if (ct && o.error_tip && has_fill == false) {
					tip = await this.view_tip(msg, db, o.error_tip);
				} else if (o.not_tip) {
					tip = await this.view_tip(msg, db, o.not_tip);
				}
				break;
			}
		}
	}

	db.msg.keyword = keyword;
	db.msg.form = JSON.stringify(form);
	msg.form = form;
	return tip;
};

/**
 * 3.2 更新信息 用于用户更改完善
 * @param {Object} msg 消息上下文
 * @param {Object} db 数据管理器
 * @param {Object} stage 阶段参数
 * @return {Object} 返回参数表单
 */
Drive.prototype.update = async function(msg, db, stage) {
	if (!stage || !db.msg.form) {
		return "";
	}
	var list = stage.param;

	var tip = "";
	var ct = msg.content;
	var keyword = db.msg.keyword + "";
	var form = db.msg.form.toJson();
	var len = list.length;
	for (var i = 0; i < len; i++) {
		var o = list[i];
		var k = o.name;
		if (form[k]) {
			var value = ct.matchs(o.listen);
			if (value) {
				if (o.update_tip) {
					tip = o.update_tip;
				} else {
					tip = "那" + value.replace(value.matchs("{不对}"), '是?');
				}
				keyword = k;
				break;
			} else if (keyword == k && o.format) {
				value = ct.matchs(o.format);
				if (value) {
					form[k] = value;
					ct = ct.replace(value, '');
					break;
				}
			}
		}
	}
	db.msg.keyword = keyword;
	db.msg.form = JSON.stringify(form);
	msg.form = form;
	return tip;
};

/**
 * 4. 执行阶段
 * @param {Object} msg 消息上下文
 * @param {Object} db 数据管理器
 * @return {Object} 返回执行结果
 */
Drive.prototype.main = async function(msg, db) {
	return "你好";
};

/**
 * 5. 结束阶段 用来判断是否结束会话
 * @param {Object} msg 消息上下文
 * @param {Object} db 数据管理器
 * @param {Object} ret 执行结果
 * @return {Boolean} 返回会话结果
 */
Drive.prototype.end = async function(msg, db, ret) {
	if (ret) {
		var txt = "";
		if (typeof(ret) == "object") {
			txt = JSON.stringify(ret);
		} else {
			txt = ret;
		}
		if (txt.indexOf('?') === -1) {
			db.msg.end = 1;
		}
	}
	return ret;
};

/**
 * 执行但不记录指令
 * @param {Object} msg 消息上下文
 * @param {Object} db 数据管理器
 * @return {Object} 返回执行结果
 */
Drive.prototype.run_cmd = async function(msg, db) {
	var ret;
	// 第一步, 验证阶段
	var bl = await this.check(msg, db);
	if (bl) {
		ret = await this.run(msg, db);
	}
	return ret;
};


/**
 * 执行
 * @param {Object} msg 消息上下文
 * @param {Object} db 数据管理器
 * @return {Object} 返回执行结果
 */
Drive.prototype.run_first = async function(msg, db) {
	var ret;
	// 第一步, 验证阶段
	var bl = await this.check(msg, db);
	if (bl) {
		ret = await this.run(msg, db);
		if(ret){
			// 如果匹配指令则将该消息定义为使用该指令
			db.msg.cmd = this.config.name;
		}
	}
	return ret;
};

/**
 * 执行前 用于有历史信息时,直接获取,不重复询问
 * @param {Object} msg 消息上下文
 * @param {Object} db 数据管理器
 * @return {Object} 执行结果, 如果有结果则直接跳过其他步骤,并返回
 */
Drive.prototype.run_before = async function(msg, db) {
	return null;
};

/**
 * 执行后, 用于特殊情况下的不结束会话
 * @param {Object} msg 消息上下文
 * @param {Object} db 数据管理器
 * @param {Object} ret 执行结果
 * @return {Object} 
 */
Drive.prototype.run_after = async function(msg, db, ret) {
	return ret;
};

/**
 * 执行
 * @param {Object} param 状态参数
 * @param {Object} db 数据管理器
 * @return {Object} 返回执行结果
 */
Drive.prototype.run = async function(msg, db) {

	// 第二步, 过滤阶段
	msg.content = await this.filter(msg, db);

	// 执行前
	var ret = await this.run_before(msg, db);
	if (!ret) {
		// 第三步, 信息补全或更新阶段
		var stage = this.config["stage" + db.msg.stage];
		if (stage) {
			var mode = stage.mode ? stage.mode : "fill";
			if (this[mode]) {
				ret = await this[mode](msg, db, stage);
			}
		}

		if (!ret) {
			// 第五步, 执行阶段
			ret = await this.main(msg, db);

			// 第六步, 结束会话阶段
			ret = this.end(msg, db, ret);
		}
	}
	// 执行后
	ret = await this.run_after(msg, db, ret);
	return ret;
};

/**
 * 查看参数
 * @param {Object} param 状态参数
 * @param {Object} db 数据管理器
 * @return {Object} 返回结构化参数
 */
Drive.prototype.view = function(msg, db) {
	var ret = "";
	var json = msg.form;
	if (json) {
		var stage = this.config.stage1;
		if (stage) {
			var list = stage.param;
			if (list) {
				var len = list.length;
				for (var i = 0; i < len; i++) {
					var o = list[i];
					var value = json[o.name];
					if (value) {
						ret += o.title + ": " + value + "\r\n";
					}
				}
			}
		}
	}
	return ret.trim();
};

module.exports = Drive;
