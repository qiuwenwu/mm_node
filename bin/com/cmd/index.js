const Index = require('mm_machine').Index;
const Drive = require('./drive');

/**
 * Cmd导航类
 * @extends {Index}
 * @class
 */
class Cmd extends Index {
	/**
	 * 构造函数
	 * @param {Object} scope 作用域
	 * @param {String} title 标题
	 * @constructor
	 */
	constructor(scope, title) {
		super(scope, __dirname);
		this.Drive = Drive;
		this.type = "cmd";
		this.title = title;
		this.list_before = [];
		this.list_main = [];
		this.list_after = [];
	}
}

/**
 * 执行导航
 * @param {Object} msg 消息
 * @param {Object} db 数据管理器
 * @param {String} table 表名
 * @return {Object|String}
 */
Cmd.prototype.run = async function(msg, db, table) {
	var ret;
	// 判断是否含有消息和消息正文
	if (msg && msg.content) {
		db.msg = {
			content: "",
			content_last: msg.content,
			form: "",
			stage: 1
		};

		// 判断是否启用数据库存储消息，如果表名为空则不存储消息
		if (table) {
			db.table = table;
			db.key = "message_id";
			var query = {
				from_user: msg.from_user,
				to_user: msg.to_user,
				group: msg.group,
				type: msg.type,
				end: 0
			};
			// 获取当前未结束的会话记录
			var msg_log = await db.getObj(query);
			// 如果不存在未结束会话，则创建新会话记录
			if (!msg_log) {
				var bl = await db.add(msg);
				if (bl) {
					msg_log = await db.getObj(query);
					if (msg_log) {
						msg_log.create_time = new Date().toStr('yyyy-MM-dd hh:mm:ss');
					}
				} else {
					console.log('添加微信消息到wechat_message表失败！');
					return null;
				}
			} else if (msg_log.content_last !== msg.content) {
				// 判断是否重复会话内容，如果未重复则添加新内容
				msg_log.content += '\r\n' + msg.content;
			}
			msg_log.content_last = msg.content;
			db.msg = msg_log;

			var lt = this.list_before;
			for (var i = 0, o; o = lt[i++];) {
				if (o.onOff) {
					ret = await o.run_cmd(msg, db);
					if (ret) {
						break;
					}
				}
			}
			if (!ret) {
				// 判断会话记录是否锁定了指令, 如果存在则继续执行该指令程序
				if (msg_log.cmd) {
					// 检索指令驱动是否存在
					var drive = this.list.getObj({
						config: {
							name: msg_log.cmd
						}
					});

					if (drive) {
						// 如果存在则执行指令
						ret = await drive.run(msg, db);
					} else {
						// 如果不存在则结束会话, 并创建新会话
						db.msg.end = 1;
						var bl = await db.add(msg);
						if (bl) {
							msg_log = await db.getObj(query);
							if (msg_log) {
								msg_log.create_time = new Date().toStr('yyyy-MM-dd hh:mm:ss');
							}
							db.msg = msg_log;
						}
					}
				}

				if (db.msg.keyword) {
					// 添加消息
					msg.content = db.msg.keyword + "\r\n" + msg.content;
				}
			}
		}
		if (!ret) {
			var lt = this.list_main;
			for (var i = 0, o; o = lt[i++];) {
				if (o.onOff) {
					ret = await o.run_first(msg, db);
					if (ret) {
						break;
					}
				}
			}
		}
		if (!ret) {
			var lt = this.list_after;
			for (var i = 0, o; o = lt[i++];) {
				if (o.onOff) {
					ret = await o.run_first(msg, db);
					if (ret) {
						break;
					}
				}
			}
		}
	}
	return ret;
};

/**
 * 执行排序
 */
Cmd.prototype.sort = async function() {
	this.list.sort(function(o1, o2) {
		var p1 = o1.sort;
		var p2 = o2.sort;
		return p2 - p1;
	});
	this.sort_tense();
};

/**
 * 排序时态
 */
Cmd.prototype.sort_tense = async function() {
	this.list_before.clear();
	this.list_after.clear();
	this.list_main.clear();

	var lt = this.list;
	for (var i = 0; i < lt.length; i++) {
		var o = lt[i];
		switch (o.config.tense) {
			case "before":
				this.list_before.push(o);
				break;
			case "after":
				this.list_after.push(o);
				break;
			default:
				this.list_main.push(o);
				break;
		}
	}
};

/* 导出指令 */
exports.Cmd = Cmd;

/**
 * Cmd事件池
 */
if (!$.pool.cmd) {
	$.pool.cmd = {};
}

/**
 * Cmd管理器，用于创建缓存
 * @param {String} scope 作用域
 * @param {string} title 标题
 * @return {Object} 返回一个缓存类
 */
function cmd_admin(scope, title) {
	if (!scope) {
		scope = $.val.scope + '';
	}
	var obj = $.pool.cmd[scope];
	if (!obj) {
		$.pool.cmd[scope] = new Cmd(scope, title);
		obj = $.pool.cmd[scope];
	}
	return obj;
}

/**
 * @module 导出Cmd管理器
 */
exports.cmd_admin = cmd_admin;
