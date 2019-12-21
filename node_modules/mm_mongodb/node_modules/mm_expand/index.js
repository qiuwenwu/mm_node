/**
 * @fileOverview JavaScript拓展函数
 * @author <a href="http://qww.elins.cn">邱文武</a>
 * @version 1.2
 */
const {
	j2xParser,
	parse
} = require('fast-xml-parser');
const {
	writeFileSync,
	existsSync,
	readFileSync,
	copyFileSync,
	statSync,
	readdirSync,
	unlink,
	rmdir
} = require('fs');
const {
	join,
	dirname,
	basename,
	extname
} = require('path');
const {
	inspect
} = require('util');
const pinyin = require('pinyinlite');
const {
	createHash,
	createCipheriv,
	createDecipheriv
} = require('crypto');

/**
 * @type {String}
 */
const slash = join('/');
const runPath = process.cwd() + slash;

/* == 基础函数 == */
/**
 * @description 获取函数详情
 * @method info
 * @param {Object} obj 函数或对象
 * @return {String} 返回函数详情
 */
function info(obj) {
	return inspect(obj, {
		showHidden: false,
		depth: null
	});
}

/**
 * @description 延迟执行（休眠）
 * @param {Number} milliSeconds 毫秒
 * @param {Object} obj 判断对象或函数
 * @param {String} key 判断的对象属性, 为存在的情况下提成退出循环
 * @example var obj = {ok: false}; sleep(2000, obj, 'ok');
 * @example sleep(2000);
 */
function sleep(milliSeconds, obj, key) {
	var endTime = new Date().getTime() + milliSeconds;
	if (obj) {
		if (key) {
			while (new Date().getTime() < endTime) {
				if (obj[key]) {
					continue;
				}
			}
		} else {
			var func = obj;
			while (new Date().getTime() < endTime) {
				if (!func()) {
					continue;
				}
			}
		}
	} else {
		while (new Date().getTime() < endTime) {}
	}
}

/**
 * @description 判断对象是否相似
 * @param {Object} obj 被判断对象
 * @param {Object} query 用作判断的对象
 * @param {Boolean} all 是否完全相同
 * @return {Boolean} 相似返回true，否则返回false
 */
function as(obj, query, all) {
	var bl = true;
	var type = typeof(obj);
	if (type !== typeof(query)) {
		// 如果类型不一致 则两个无相似
		bl = false;
	} else if (type === 'string' || type === 'bool' || type === 'number') {
		bl = obj === query;
	} else if (obj.constructor == Array) {
		// 如果都是数组
		var len = obj.length;
		if (all && len !== query.length) {
			// 要求完全一致 而长度不一致 说明不相似
			bl = false;
		} else {
			// 否则判断数组里的每个成员是否相似
			for (var i = 0; i < len; i++) {
				if (!as(obj[i], query[i])) {
					bl = false;
					break;
				}
			}
		}
	} else {
		// 如果类型为对象
		if (all && Object.getOwnPropertyNames(obj).length !== Object.getOwnPropertyNames(query).length) {
			// 如果要求完全一致, 而属性长度不一致，则不相似
			bl = false;
		} else {
			// 否则都为对象则判断其值是否一致
			for (var k in query) {
				if (!as(obj[k], query[k], all)) {
					bl = false;
					break;
				}
			}
		}
	}
	return bl;
}

/**
 * @description 测试函数执行速度
 * @param {Function()} func 测试的函数
 * @param {Number} times = [value] 测试次数
 */
function speed(func, times) {
	if (!times) {
		times = 1000000;
	}
	var t1 = (new Date()).valueOf();
	for (var i = 0; i < times; i++) {
		func();
	}
	var t2 = (new Date()).valueOf();
	var s = t2 - t1;
	console.log('耗时' + s + '毫秒, 平均' + (s / times) + 'ms/次');
}

/**
 * @description 排序
 * @param {String} key 属性键
 * @return {Function(Object, Object)} 排序函数
 */
function newSort(key) {
	var field = key;
	return {
		/**
		 * @description 数字升序
		 * @param {Object} obj1 比较的对象1
		 * @param {Object} obj2 比较的对象2
		 * @return {Number} 顺序值
		 */
		asc: function asc(obj1, obj2) {
			var val1 = obj1[field];
			var val2 = obj2[field];
			if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
				val1 = Number(val1);
				val2 = Number(val2);
			}
			if (val1 < val2) {
				return -1;
			} else if (val1 > val2) {
				return 1;
			} else {
				return 0;
			}
		},
		/**
		 * @description 中文升序
		 * @param {Object} obj1 比较的对象1
		 * @param {Object} obj2 比较的对象2
		 * @return {Number} 顺序值
		 */
		asc_cn: function asc_cn(obj1, obj2) {
			return obj1[field].pinyin().localeCompare(obj2[field].pinyin(), 'zh-CN');
		},
		/**
		 * @description 数字倒序
		 * @param {Object} obj1 比较的对象1
		 * @param {Object} obj2 比较的对象2
		 * @return {Number} 顺序值
		 */
		desc: function desc(obj1, obj2) {
			var val1 = obj1[field];
			var val2 = obj2[field];
			if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
				val1 = Number(val1);
				val2 = Number(val2);
			}
			if (val1 > val2) {
				return -1;
			} else if (val1 < val2) {
				return 1;
			} else {
				return 0;
			}
		},
		/**
		 * @description 中文倒叙
		 * @param {Object} obj1 比较的对象1
		 * @param {Object} obj2 比较的对象2
		 * @return {Number} 顺序值
		 */
		desc_cn: function desc_cn(obj1, obj2) {
			return obj2[field].pinyin().localeCompare(obj1[field].pinyin(), 'zh-CN');
		}
	};
}

/**
 * @description 添加对象属性
 * @param {Object} objA 被添加的对象
 * @param {Object} objB 用作添加的对象
 * @param {Boolean} bl 是否补充没有的对象
 * @return {Object} 新对象
 */

function push(objA, objB, bl) {
	if (!objA || !objB) {
		return;
	}
	if (bl) {
		for (var k in objB) {
			var value = objB[k];
			if (objA[k] === undefined || objA[k] === null || value === null) {
				objA[k] = value;
			} else {
				var type = typeof(objA[k]);
				var p = typeof(value);
				if (type !== p) {
					if (type === "number") {
						var n = Number(value);
						if (n === NaN) {
							n = 0;
						}
						objA[k] = n;
					} else if (type === "boolean") {
						if (value === '0' || value === 'false' || value === 'False') {
							objA[k] = false;
						} else {
							objA[k] = Boolean(value);
						}
					} else if (type === "string") {
						objA[k] = value.toString();
					} else {
						objA[k] = value;
					}
				} else if (type === "object") {
					if (objA[k].constructor == Array && value.constructor == Array) {
						objA[k].clear();
						objA[k].addList(value);
					} else {
						push(objA[k], value, bl);
					}
				} else {
					objA[k] = value;
				}
			}
		}
	} else {
		for (var k in objA) {
			var value = objB[k];
			if (value !== undefined && objA[k] !== null && value !== null) {
				var type = typeof(objA[k]);
				var p = typeof(value);
				if (type !== p) {
					if (type === "number") {
						var n = Number(value);
						if (n === NaN) {
							n = 0;
						}
						objA[k] = n;
					} else if (type === "boolean") {
						if (value === '0' || value === 'false' || value === 'False') {
							objA[k] = false;
						} else {
							objA[k] = Boolean(value);
						}
					} else if (type === "string") {
						objA[k] = value.toString();
					} else {
						objA[k] = value;
					}
				} else if (type === "object") {
					if (objA[k].constructor == Array && value.constructor == Array) {
						objA[k].clear();
						objA[k].addList(value);
					} else {
						push(objA[k], value, bl);
					}
				} else {
					objA[k] = value;
				}
			}
		}
	}
	return objA;
}

/**
 * @description 清空对象值
 * @param {Object} obj 对象
 * @return {Object} 返回对象自身
 */
function clear(obj) {
	if (obj) {
		for (var k in obj) {
			var val = obj[k];
			if (val) {
				var name = typeof val === 'undefined' ? 'undefined' : typeof(val);
				switch (name) {
					case "string":
						obj[k] = "";
						break;
					case "number":
						obj[k] = 0;
						break;
					case "array":
						obj[k].clear();
						break;
					case "object":
						clear(obj[k]);
						break;
					case "function":
						break;
					case "symbol":
						obj[k] = "";
						break;
				}
			}
		}
	}
	return obj;
}

/**
 * @description 转为json字符串
 * @param {Object} obj 被转换的对象
 * @param {Boolean} format 是否格式化
 * @return {String} json格式字符串
 */
function toJson(obj, format) {
	if (format) {
		return JSON.stringify(obj, null, 4);
	} else {
		return JSON.stringify(obj);
	}
}

/**
 * @description 转为xml字符串
 * @param {Object} obj 被转换的对象
 * @param {Boolean} format 是否格式化
 * @param {Boolean} mode 表示方式, true为属性格式
 * @return {String} xml格式字符串
 */
function toXml(obj, format, mode) {
	var param = {
		format: format
	};
	if (mode) {
		param = {
			format: format,
			attrNodeName: "_attrs",
			textNodeName: "#text",
			cdataTagName: "_cdata"
		}
	};
	return xml = new j2xParser(param).parse(obj);
};

/**
 * @description 转url字符串
 * @param {Object} obj 被转换的对象
 * @param {String} url 请求地址
 * @return {String} url参数格式字符串
 */
function toUrl(obj, url) {
	var queryStr = "";
	for (var key in obj) {
		var value = obj[key];
		if (typeof(value) === 'number') {
			if (value > 0) {
				queryStr += "&" + key + "=" + obj[key];
			}
		} else if (value) {
			queryStr += "&" + key + "=" + encodeURI(obj[key]);
		}
	}
	if (url) {
		if (url.endWith('?') || url.endWith('&')) {
			return url + queryStr.replace('&', '');
		} else if (url.indexOf('?') === -1) {
			return url + queryStr.replace('&', '?');
		} else {
			return url + queryStr;
		}
	} else {
		return queryStr.replace('&', '');
	}
};

/**
 * @description 保存为json格式文件
 * @param {Object} obj 被保存的对象
 * @param {String} file 保存文件名
 * @return {Boolean} 保存结果
 */
function saveJson(obj, file) {
	return file.saveText(toJson(obj));
};

/**
 * @description 保存为xml格式文件
 * @param {Object} obj 被保存的对象
 * @param {String} file 保存文件名
 * @param {Boolean} format 是否格式化
 * @param {Boolean} mode 表示方式, true为属性格式
 * @return {Boolean} 保存结果
 */
function saveXml(obj, file, format, mode) {
	return file.saveText(toXml(obj, format, mode));
};
/**
 * @description 拷贝对象
 * @param {Object} obj 被拷贝的对象
 * @param {Boolean} has 是否非空拷贝，如果含有数据才拷贝，不含数据不拷贝
 * @return {Object} 新对象
 */
function copy(obj, has) {
	var newObj = {};
	if (has) {
		for (var attr in obj) {
			var o = obj[attr];
			if (o) {
				newObj[attr] = o;
			}
		}
	} else {
		for (var attr in obj) {
			newObj[attr] = obj[attr];
		}
	}
	return newObj;
};

/**
 * @description 查看所有属性
 * @param {Object} obj 查看的对象
 * @param {String} file 保存位置
 */
function keys(obj, file) {
	var text = "";
	for (var k in obj) {
		text += k + '\r\n'
	}
	if (file) {
		file.saveText(text);
	} else {
		console.log(text);
	}
}

/**
 * @namespace
 * @property {Object} pool 数据连接池, 用于存储有关数据库的操作类
 * @property {Object} task 任务池, 用于存储定时任务操作类
 * @property {Object} api API接口，用于存储有关接口的操作类
 * @property {Object} val 全局变量，用于存储全局的配置 
 * @property {Object} dict 字典，用于查询变量替换名
 * @property {Object} lang 语言包, 用于全局的语言替换
 * @property {String} slash 当前系统使用的路径斜杠
 * @property {String} runPath 运行根目录
 * @property {String} sleep 延迟(休眠)
 * @property {Function()} speed 测试执行速度函数
 * @property {Function(Object, Object, Boolean):Boolean} as 判断对象是否相似
 * @property {Function(Object, Object):Boolean} push 为对象添加属性
 * @property {Function(Object):Object} clear 清空数组对象
 * @property {Function(Object):String} toJson 对象转json字符串
 * @property {Function(Object):String} toXml 对象转xml字符串
 * @property {Function(Object):String} toUrl 对象转url字符串
 * @property {Function(Object):Boolean} saveJson 对象保存为json文件
 * @property {Function(Object):Boolean} saveXml 对象保存为xml文件
 * @property {Function(Object):Object} copy 复制一个新对象
 * @property {Function(Object):String} keys 查询获取对象属性键
 * @property {Function(Object):String} info 查询对象明细
 */
if (typeof($) === "undefined") {
	global.$ = {
		// 数据连接池, 用于存储有关数据库的操作类
		pool: {},
		// 任务池, 用于存储定时任务操作类
		task: {},
		// API接口，用于存储有关接口的操作类
		api: {},
		// 全局变量，用于存储全局的配置
		val: {
			// 默认作用域, sys表示系统
			scope: "sys"
		},
		/**
		 * @description 字典，用于查询变量替换名
		 * @property {String} session_id session的ID
		 * @property {String} user_id 用户的ID，用于数据库时查询用户唯一标识
		 */
		dict: {
			session_id: "mm:uuid",
			user_id: "user_id",
			token: "x-auth-token"
		},
		/**
		 * @description 语言包, 用于全局的语言替换
		 * @property {String} now = [chinese|english] 当前语言
		 * @property {Object} chinese 中文语言包
		 * @property {Object} english 英文语言包
		 */
		lang: {
			now: "chinese",
			chinese: {},
			english: {}
		},
		// 当前系统路径使用的斜杠
		slash: slash,
		// 运行根目录
		runPath: runPath,
		// 延迟
		sleep: sleep,
		// 测试执行速度函数
		speed: speed,
		// 判断对象是否相似
		as: as,
		// 添加对象
		push: push,
		// 清空数组对象
		clear: clear,
		// 对象转json字符串
		toJson: toJson,
		// 对象转xml字符串
		toXml: toXml,
		// 对象转url字符串
		toUrl: toUrl,
		// 对象保存为json文件
		saveJson: saveJson,
		// 对象保存为xml文件
		saveXml: saveXml,
		// 复制一个新对象
		copy: copy,
		// 查询获取对象属性键
		keys: keys,
		// 查询对象明细
		info: info
	};
}

/* == 数字原型函数 == */
(function() {
	/**
	 * @description 去尾法
	 * @param {Number} len 保留长度
	 * @return {Number} 数值
	 */
	Number.prototype.toFloor = function(len) {
		var n = Math.pow(10, len);
		return Math.floor(this * n) / n;
	};
	/**
	 * @description 进一法
	 * @param {Number} len 保留长度
	 * @return {Number} 数值
	 */
	Number.prototype.toCeil = function(len) {
		var n = Math.pow(10, len);
		return Math.ceil(this * n) / n;
	};
	/**
	 * @description 四舍五入法
	 * @param {Number} len 保留长度
	 * @return {Number} 数值
	 */
	Number.prototype.toRound = function(len) {
		var n = Math.pow(10, len);
		return Math.round(this * n) / n;
	};
	/**
	 * @description 数值转字符串, 保留尾数长度
	 * @param {Number} len 保留长度
	 * @param {String} mode 保留方式
	 * @return {String} 截取后字符串
	 */
	Number.prototype.get = function(len, mode) {
		var n;
		switch (mode) {
			case 1:
			case "toRound":
				n = this.toRound(len)
				break;
			case 2:
			case "toCeil":
				n = this.toCeil(len)
				break;
			case 3:
			case "toFloor":
				n = this.toFloor(len)
				break;
			default:
				n = this.toString();
				break;
		}
		return n;
	}
	/**
	 * @description 数值转字符串, 保留尾数长度
	 * @param {Number} len 保留长度
	 * @param {String} mode 保留方式
	 * @return {String} 截取后字符串
	 */
	Number.prototype.toStr = function(len, mode) {
		var n = this.get(len, mode);
		var s = n.toString();
		var rs = s.indexOf('.');
		if (len > 0 && rs < 0) {
			rs = s.length;
			s += '.';
		}
		while (s.length <= rs + len) {
			s += '0';
		}
		return s;
	}
	/**
	 * @description 转为时间类型
	 * @return {Date} 时间对象
	 */
	Number.prototype.toTime = function() {
		return new Date(this * 1000);
	};
})();

/* == 时间原型函数 == */
(function() {
	/**
	 * @description 时间格式化
	 * @param {String} format 指定格式
	 * @return {String} 时间格式字符串
	 */
	Date.prototype.toStr = function(format) {
		var o = {
			"M+": this.getMonth() + 1,
			"d+": this.getDate(),
			"h+": this.getHours(),
			"m+": this.getMinutes(),
			"s+": this.getSeconds(),
			"q+": Math.floor((this.getMonth() + 3) / 3),
			"S": this.getMilliseconds()
		};
		if (/(y+)/.test(format)) {
			var x = RegExp.$1;
			format = format.replace(x, (this.getFullYear() + "").substr(4 - x.length));
		}
		for (var k in o) {
			if (new RegExp("(" + k + ")").test(format)) {
				var x = RegExp.$1;
				format = format.replace(x, x.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
			}
		}
		return format;
	};
	/**
	 * @description 获取当前时间戳
	 * @return {Number} 返回时间戳
	 */
	Date.prototype.stamp = function() {
		var timestamp = Date.parse(this);
		return timestamp / 1000;
	};
	/**
	 * @description 计算时间差(时间间隔)
	 * @param {String} endTime 结束时间
	 * @param {String} time_unit = [day|hours|minutes] 时间单位
	 * @return {Number} 间隔时长
	 */
	Date.prototype.interval = function(endTime, time_unit) {
		var startTime = this; // startTime: 开始时间
		var stime = Date.parse(startTime);
		var etime = Date.parse(new Date(endTime));
		var usedTime = etime - stime; // 两个时间戳相差的毫秒数
		if (time_unit === "day") {
			return Math.floor(usedTime / (1000 * 60 * 60 * 24));
		} else if (time_unit === "hours") {
			return Math.floor(usedTime / (1000 * 60 * 60));
		} else if (time_unit === "minutes") {
			return Math.floor(usedTime / (1000 * 60));
		} else {
			return Math.floor(usedTime / 1000);
		}
	};
	/**
	 * @description 时间添加天数
	 * @param {Number} days 天数
	 * @return {Date} 时间对象
	 */
	Date.prototype.addDays = function(days) {
		this.setDate(this.getDate() + days);
		return this;
	};
	/**
	 * @description 时间添加秒数
	 * @param {Date} seconds 时间对象
	 */
	Date.prototype.addSeconds = function(seconds) {
		this.setSeconds(this.getSeconds() + seconds);
		return this;
	};
})();

/* == 字符串拓展函数 == */
(function() {
	/**
	 * @description MD5加密
	 * @return {String} 加密后的字符串
	 */
	String.prototype.md5 = function() {
		var md5 = createHash("md5");
		md5.update(this + '');
		return md5.digest('hex');
	};

	/**
	 * aes加密
	 * @param data 待加密内容
	 * @param key 必须为32位私钥
	 * @returns {String}
	 */
	String.prototype.aes_encode = function(key, iv) {
		iv = iv || "";
		var clearEncoding = 'utf8';
		var cipherEncoding = 'base64';
		var cipherChunks = [];
		var cipher = createCipheriv('aes-256-ecb', key, iv);
		cipher.setAutoPadding(true);
		cipherChunks.push(cipher.update(this + '', clearEncoding, cipherEncoding));
		cipherChunks.push(cipher.final(cipherEncoding));
		return cipherChunks.join('');
	};

	/**
	 * @description aes解密
	 * @param key 必须为32位私钥
	 * @returns {String}
	 */
	String.prototype.aes_decode = function(key, iv) {
		iv = iv || "";
		var clearEncoding = 'utf8';
		var cipherEncoding = 'base64';
		var cipherChunks = [];
		var decipher = createDecipheriv('aes-256-ecb', key, iv);
		decipher.setAutoPadding(true);
		cipherChunks.push(decipher.update(this + '', cipherEncoding, clearEncoding));
		cipherChunks.push(decipher.final(clearEncoding));
		return cipherChunks.join('');
	};

	/**
	 * @description 获取字符串的拼音
	 * @return {String} 拼音
	 */
	String.prototype.pinyin = function() {
		return pinyin(this).join('');
	};
	/**
	 * @description 获取字符串的拼音
	 * @return {String} 拼音
	 */
	String.prototype.pinyinS = function() {
		var arr = pinyin(this);
		var str = "";
		var len = arr.length;
		for (var i = 0; i < len; i++) {
			var ar = arr[i];
			if (ar.length > 0) {
				var o = ar[0];
				str += o.charAt(0).toLocaleUpperCase() + o.substring(1);
			} else {
				str += ' ';
			}
		}
		return str;
	};
	/**
	 * @description 将json字符串转为对象
	 * @return {Object} 对象
	 */
	String.prototype.toJson = function() {
		try {
			return JSON.parse(this);
		} catch (e) {
			console.log('json反序列化错误');
			return null;
		}
	};
	/**
	 * @description 将xml字符串转为对象
	 * @return {Object} 对象
	 */
	String.prototype.toXml = function() {
		return parse(this);
	};
	/**
	 * @description 将url字符串转为对象
	 * @return {Object} 对象
	 */
	String.prototype.toUrl = function() {
		var arr = this.split('&');
		var obj = {};
		arr.func(function(o) {
			var ar = o.split('=');
			if (ar.length > 1) {
				obj[ar[0]] = decodeURI(ar[1]);
			} else {
				obj[ar[0]] = null;
			}
		});
		return obj;
	};
	/**
	 * @description 删除首字符
	 * @param {String} str  要删除的字符, 默认删除空字符
	 * @return {String} 删除后字符串
	 */
	String.prototype.startTrim = function(str) {
		if (!str) {
			str = "\\s";
		} else {
			str = str.replace("$", "\\$").replace("^", "\\^").replace("(", "\\(").replace(")", "\\)");
		}
		var rx = new RegExp("(^" + str + "*)", "g");
		return this.replace(rx, "");
	};
	/**
	 * @description 删除尾字符
	 * @param {String} str 要删除的字符, 默认删除空字符
	 * @return {String} 删除后字符串
	 */
	String.prototype.endTrim = function(str) {
		if (!str) {
			str = "\\s";
		} else {
			str = str.replace("$", "\\$").replace("^", "\\^").replace("(", "\\(").replace(")", "\\)");
		}
		var rx = new RegExp("(" + str + "*$)", "g");
		return this.replace(rx, "");
	};
	/**
	 * @description 删除首尾字符
	 * @param {String} str 要删除的字符, 默认删除空字符
	 * @return {String} 删除后字符串
	 */
	String.prototype.trim = function(str) {
		if (!str) {
			str = "\\s";
		} else {
			str = str.replace("$", "\\$").replace("^", "\\^").replace("(", "\\(").replace(")", "\\)");
		}
		var rx = new RegExp("(^" + str + "*)|(" + str + "*$)", "g");
		return this.replace(rx, "");
	};
	/**
	 * @description 取文本左边
	 * @param {String} str 索引的字符
	 * @param {Boolean} bl 当索引字符不存在时是否保留左边
	 * @return {String} 截取后的字符串
	 */
	String.prototype.left = function(str, bl) {
		var i = this.indexOf(str);
		if (i == -1) {
			if (bl) {
				return this + '';
			} else {
				return "";
			}
		} else {
			return this.substring(0, i);
		}
	};
	/**
	 * @description 取文本右边
	 * @param {String} str 索引的字符
	 * @param {Boolean} bl 当索引字符不存在时是否保留右边
	 * @return {String} 截取后的字符串
	 */
	String.prototype.right = function(str, bl) {
		var i = this.indexOf(str);
		if (i == -1) {
			if (bl) {
				return this + '';
			} else {
				return "";
			}
		} else {
			return this.substring(i + str.length);
		}
	};
	/**
	 * @description 取文本之间
	 * @param {String} str_l 索引的左边字符
	 * @param {String} str_r 索引的右边字符
	 * @param {Boolean} bl 当索引字符不存在时是否保留右边
	 * @return {String} 截取后的字符串
	 */
	String.prototype.between = function(str_l, str_r, bl) {
		var str = this.right(str_l, bl);
		return str.left(str_r, bl);
	};
	/**
	 * @description 替换所有字符串
	 * @param {String} oldStr 被替换的字符串
	 * @param {String} newStr 替换后的字符串
	 * @return {String} 替换后的字符串
	 */
	String.prototype.replaceAll = function(oldStr, newStr) {
		var txt = this + '';
		if (!newStr) {
			newStr = '';
		}
		while (txt.indexOf(oldStr) !== -1) {
			txt = txt.replace(oldStr, newStr);
		}
		return txt;
	};
	/**
	 * @description 验证开头字符串
	 * @param {String} startStr 开头字符串
	 * @return {Boolean} 验证成功返回true，失败返回false
	 */
	String.prototype.startWith = function(startStr) {
		var d = this.length - startStr.length;
		if (d >= 0 && this.indexOf(startStr) === 0) {
			return true;
		}
		return false;
	};
	/**
	 * @description 验证结束字符串
	 * @param {String} endStr 结尾字符串
	 * @return {Boolean} 验证成功返回true，失败返回false
	 */
	String.prototype.endWith = function(endStr) {
		var d = this.length - endStr.length;
		if (d >= 0 && this.lastIndexOf(endStr) == d) {
			return true;
		}
		return false;
	};
	/**
	 * @description 是否含字符串
	 * @param {String} str = [word|word*|*word|*word*]字符串, 支持*号匹配, 前*表示匹配后面字符串, 后*表示匹配前面字符串, 前后*表示匹配包含字符串
	 * @return {Boolean} 包含返回true, 不包含返回false
	 */
	String.prototype.has = function(str) {
		var o = this + '';
		if (o === str) {
			return true;
		} else if (str.startWith("*")) {
			var k = str.replaceAll('*', '');
			if (str.endWith("*")) {
				return o.indexOf(k) !== -1;
			} else {
				return o.endWith(k);
			}
		} else if (str.endWith("*")) {
			var k = str.replaceAll('*', '');
			return o.startWith(k);
		} else {
			return false;
		}
	};
	/**
	 * @description 转为时间对象
	 * @return {Date} 时间对象
	 */
	String.prototype.toTime = function() {
		var str = this.replace('T', ' ').replace('Z', '').replaceAll('.', '/').replaceAll('-', '/');
		return new Date(str);
	};
	/**
	 * @description 转为时间格式字符串
	 * @param {String} format 转换的格式
	 * @return {String} 时间格式字符串
	 */
	String.prototype.toTimeFormat = function(format) {
		var str = this.replace('T', ' ').replace('Z', '').replaceAll('.', '/').replaceAll('-', '/');
		return new Date(str).toStr(format);
	};
	/**
	 * @description 转为数组
	 * @param {String|Regex} separator 分隔符或正则
	 * @param {Number} maxLen 最大长度
	 * @return {Array} 数组
	 */
	String.prototype.toArr = function(separator, maxLen) {
		return this.split(separator, maxLen);
	};
	/**
	 * @description 转为数字
	 * @param {Number} len 保留长度 ()
	 * @param {String} mode 保留方式 ()
	 * @return {Number} 浮点数
	 */
	String.prototype.toNum = function(len, mode) {
		return new Number(num).get(len, mode);
	};
	/**
	 * @description 转为对象
	 * @return {Object} 对象
	 */
	String.prototype.toObj = function() {
		return eval(this + '');
	};
	/**
	 * @description 转正则表达式
	 * @param {String} mode = [g|i|gi] 转换方式, g为全部, i为不区分大小写
	 * @return {Regex} 返回正则对象
	 */
	String.prototype.toRx = function(mode) {
		if (!mode) {
			mode = 'gi';
		}
		return eval("/" + this + "/" + mode);
	};
	/**
	 * @description 正则判断
	 * @param {String} str 用作判断的正则
	 * @param {String} mode = [g|i|gi] 转换方式, g为全部, i为不区分大小写
	 * @return {Boolean} 符合正则返回true, 否则返回false
	 */
	String.prototype.regex = function(str, mode) {
		var rx = str.toRx(mode);
		return rx.test(this + '');
	};
	/**
	 * @description 验证字符串格式
	 * @param {String} format 所属格式
	 * @return {Boolean} 验证通过返回true, 失败返回false
	 */
	String.prototype.checkFormat = function(format) {
		var bl = false;
		var value = this + '';
		var f = format.toLowerCase();
		switch (f) {
			case "phone":
				bl = /^0?(13|14|15|16|17|18|19)[0-9]{9}$/.test(value)
				break;
			case "email":
				bl = /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}$/gi.test(value);
				break;
			case "username":
				bl = /^[a-z0-9A-Z_]+$/.test(value)
				break;
			case "password":
				bl = /^[a-z0-9A-Z]+$/.test(value)
				break;
			case "url":
				bl = /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/gi.test(value)
				break;
			case "date":
				bl = /^\d{4}(\-|\/|\.)(0[1-9]|1[012]|[1-9])(\-|\/|\.)([12][0-9]|0[1-9]|3[01]|[1-9])$/.test(value)
				break;
			case "time":
				bl = /^([01][0-9]|2[0-3]):([0-4][0-9]|5[0-9])(:([0-4][0-9]|5[0-9]))?$/.test(value)
				break;
			case "datetime":
				bl =
					/^\d{4}(\-|\/|\.)(0[1-9]|1[012]|[1-9])(\-|\/|\.)([12][0-9]|0[1-9]|3[01]|[1-9]) ([01][0-9]|2[0-3]):([0-4][0-9]|5[0-9])(:([0-4][0-9]|5[0-9]))?$/
					.test(value)
				break;
			case "dateiso":
				bl =
					/^\d{4}-(0[1-9]|1[012]|[1-9])-([12][0-9]|0[1-9]|3[01]|[1-9])( ([01][0-9]|2[0-3]):([0-4][0-9]|5[0-9])(:([0-4][0-9]|5[0-9]))?)?$/
					.test(value)
				break;
			case "number":
				bl = /^[1-9]+[0-9]*(\.[0-9]+|[0-9]*)|0\.[0-9]+|0$/.test(value)
				break;
			case "en":
				bl = /^[a-zA-Z]+$/.test(value)
				break;
			case "num":
			case "digits":
				bl = /^[0-9]+$/.test(value)
				break;
			case "ch":
			case "chs":
			case "chinese":
				bl = /^[\u4e00-\u9fa5]+$/.test(value)
				break;
			default:
				console.log('输入的类型错误')
				break;
		}
		return bl;
	};
	/**
	 * @description 编译模板
	 * @param {Object} obj 对象
	 * @return {String} 编译后的字符串
	 */
	String.prototype.tpl = function(obj) {
		var text = this + '';

		function render() {
			if (obj) {
				for (var k in obj) {
					this[k] = obj[k];
				}
			}
			return eval("`" + text + "`");
		}
		return render();
	};
	/**
	 * @description 补全路径
	 * @param {String} dir
	 * @return {String} 全路径
	 */
	String.prototype.fullname = function(dir) {
		var file = this + '';
		var f = file.replace(slash, '/');
		if (f.startWith('./')) {
			if (dir) {
				file = f.replace('./', dir.fullname());
			} else {
				file = f.replace('./', runPath);
			}
		} else if (f.startWith('../')) {
			if (dir) {
				file = dir.fullname() + f;
			} else {
				file = runPath + f;
			}
		} else if (f.startWith('/') && !f.startWith(runPath)) {
			file = runPath + f.substring(0);
		}
		file = join(file, '');
		if (file.indexOf('.') === -1 && !file.endsWith(slash)) {
			file += slash;
		}
		return file;
	};
	/**
	 * @description 取路径
	 * @return {String} 字符串
	 */
	String.prototype.dirname = function() {
		return dirname(this + '');
	};
	/**
	 * @description 取基础名
	 * @return {String} 字符串
	 */
	String.prototype.basename = function() {
		return basename(this + '');
	};
	/**
	 * @description 取拓展名
	 * @return {String} 字符串
	 */
	String.prototype.extname = function() {
		return extname(this + '');
	};
	/**
	 * @description 保存文件
	 * @param {String} text 被保存的文本
	 * @return {Boolean} 保存成功返回true, 失败返回false
	 */
	String.prototype.saveText = function(text) {
		return writeFileSync(this.fullname(), text);
	};
	/**
	 * @description 加载文件
	 * @param {String} dir 所在目录
	 * @param {String} encode 编码方式
	 * @return {String} 加载的文本
	 */
	String.prototype.loadText = function(dir, encode) {
		var file = this.fullname(dir);
		if (existsSync(file)) {
			if (!encode) {
				encode = "utf-8";
			}
			return readFileSync(file, encode);
		} else {
			return undefined;
		}
	};
	/**
	 * @description 加载xml
	 * @param {String} dir 当前路径
	 * @return {String} 加载的文本
	 */
	String.prototype.loadXml = function(dir) {
		var f = this.fullname();
		if (existsSync(f)) {
			var text = readFileSync(f, "utf-8");
			if (text) {
				return text.toXml();
			}
		}
		return undefined;
	};
	/**
	 * @description 加载json
	 * @param {String} dir 当前路径
	 * @return {Object} 加载后转换的对象
	 */
	String.prototype.loadJson = function(dir) {
		var f = this.fullname(dir);
		if (existsSync(f)) {
			var text = readFileSync(f, "utf-8");
			if (text) {
				return text.toJson();
			}
		}
		return undefined;
	};

	/**
	 * @description 判断文件是否存在
	 * @param {String} dir 当前路径
	 * @return {Boolean} 存在返回true, 不存在返回false
	 */
	String.prototype.hasFile = function(dir) {
		return existsSync(this.fullname(dir));
	};

	/**
	 * @description 删除文件
	 * @param {String} dir 当前路径
	 */
	String.prototype.delFile = function(dir) {
		unlink(this.fullname(dir), function(e) {});
	};

	/**
	 * @description 判断目录是否存在
	 * @param {String} dir 当前路径
	 * @return {Boolean} 存在返回true, 不存在返回false
	 */
	String.prototype.hasDir = function(dir) {
		return existsSync(this.fullname(dir));
	};

	/**
	 * @description 删除目录
	 * @param {String} dir 当前路径
	 */
	String.prototype.delDir = function(dir) {
		rmdir(this.fullname(dir), function(e) {});
	};

	/**
	 * @description 复制文件
	 * @param {String} file 保存路径
	 * @return {Boolean} 复制成功返回true, 失败返回false
	 */
	String.prototype.copyFile = function(file) {
		return copyFileSync(this.fullname(), file.fullname());
	};
})();

/* == 数组原型函数 == */
(function() {
	/**
	 * @description 拷贝对象
	 * @param {Boolean} has 是否非空拷贝，如果含有数据才拷贝，不含数据不拷贝
	 * @return {Array} 新数组
	 */
	Array.prototype.copy = function(has) {
		var arr_new = [];
		var arr = this;
		var len = arr.length;
		if (has) {
			for (var i = 0; i < len; i++) {
				var o = arr[i];
				if (o) {
					arr_new[i] = o;
				}
			}
		} else {
			for (var i = 0; i < len; i++) {
				arr_new[i] = arr[i];
			}
		}
		return arr_new;
	};
	/**
	 * @description 遍历对象执行函数
	 * @param {Function(Object):Boolean} func 函数名
	 */
	Array.prototype.func = function(func) {
		var len = this.length;
		for (var i = 0; i < len; i++) {
			if (func(this[i])) {
				break;
			}
		}
	};
	/**
	 * @description 数组转字符串
	 * @param {String} splitStr 分隔符
	 * @param {String} key 对象属性名
	 * @return {String} 字符串 
	 */
	Array.prototype.toStr = function(splitStr, key) {
		var arr = this;
		var str = "";
		var len = arr.length;
		if (key) {
			for (var i = 0; i < len; i++) {
				var o = arr[i];
				if (o[key]) {
					str += splitStr + o[key];
				}
			}
		} else {
			for (var i = 0; i < len; i++) {
				var o = arr[i];
				str += splitStr + o;
			}
		}
		return str.replace(splitStr, "");
	};
	/**
	 * @description 清空数组
	 * @return {Array} 清空的数组
	 */
	Array.prototype.clear = function() {
		this.splice(0, this.length);
		return this;
	};
	/**
	 * @description 修改数组成员
	 * @param {Object} query 搜索条件
	 * @param {Object} obj 修改项
	 * @return {Array} 删除后的数组
	 */
	Array.prototype.set = function(query, obj) {
		var len = this.length;
		for (var i = 0; i < len; i++) {
			var o = this[i];
			for (var k in query) {
				if (as(o, query)) {
					this[i] = obj;
				};
			}
		}
		return this;
	};
	/**
	 * @description 对象列表排序
	 * @param {String} method = [asc|desc] 排序方式, asc升序, desc降序
	 * @param {String} key 用来判断排序的对象属性
	 * @return {Array} 列表自身
	 */
	Array.prototype.sortBy = function(method, key) {
		if (key && this.length > 0) {
			var isStr = typeof(this[0][key]) === "string";
			var cs = newSort(key);
			if (method && method.toLowerCase() === "desc") {
				if (isStr) {
					this.sort(cs.desc_cn);
				} else {
					this.sort(cs.desc);
				}
			} else {
				if (isStr) {
					this.sort(cs.asc_cn);
				} else {
					this.sort(cs.asc);
				}
			}
		} else {
			var isStr = typeof(this[0]) === "string";
			if (method && method.toLowerCase() === "desc") {
				if (isStr) {
					this.sort(function(a, b) {
						return b.pinyin().localeCompare(a.pinyin(), 'zh-CN');
					});
				} else {
					this.sort(function(a, b) {
						return b - a;
					});
				}
			} else {
				if (isStr) {
					this.sort(function(a, b) {
						return a.pinyin().localeCompare(b.pinyin(), 'zh-CN');
					});
				} else {
					this.sort(function(a, b) {
						return a - b;
					});
				}
			}
			return this;
		}
	};
	/**
	 * @description 数组列表取数组
	 * @param {String} key 取的属性
	 * @return {Array} 截取的数组
	 */
	Array.prototype.toArr = function(key) {
		var arr = [];
		var lt = this;
		var len = lt.length;
		for (var i = 0; i < len; i++) {
			var o = lt[i];
			arr.push(o[key]);
		}
		return arr;
	};

	/**
	 * @description 从数组获取对象
	 * @param {Object} query 查询条件
	 * @param {Boolean} end 是否结束
	 * @return {Object} 对象
	 */
	Array.prototype.get = function(query, end) {
		if (query) {
			var len = this.length;
			if (end) {
				var obj;
				for (var i = 0; i < len; i++) {
					var o = this[i];
					if (as(o, query)) {
						obj = o;
						break;
					}
				}
				return obj;
			} else {
				var list = [];
				for (var i = 0; i < len; i++) {
					var o = this[i];
					if (as(o, query)) {
						list.push(o);
					}
				}
				return list;
			}
		} else {
			var list = [];
			list.addList(this);
			return list;
		}
	};
	/**
	 * 
	 * query:  (object)
	 *  (object)
	 */

	/**
	 * @description 从数组获取对象
	 * @param {Object} query 查询条件
	 * @return {Object} 对象
	 */
	Array.prototype.getObj = function(query) {
		var obj;
		if (query) {
			var len = this.length;
			for (var i = 0; i < len; i++) {
				var o = this[i];
				if (as(o, query)) {
					obj = o;
					break;
				}
			}
		}
		return obj;
	};
	/**
	 * @description 获取数组对象的属性值
	 * @param {String} key 属性名
	 * @param {Object} query 查询条件
	 * @return {Object} 属性值
	 */
	Array.prototype.getVal = function(key, query) {
		var obj = this.getObj(query);
		if (obj) {
			return obj[key];
		} else {
			return null;
		}
	};
	/**
	 * @description 获取符合条件的数组对象
	 * @param {Object} query 查询条件
	 * @return {Array} 对象数组
	 */
	Array.prototype.getList = function(query) {
		var arr = [];
		if (query) {
			var len = this.length;
			for (var i = 0; i < len; i++) {
				var o = this[i];
				if (as(o, query)) {
					arr.push(o);
				}
			}
		} else {
			arr = this.copy()
		}
		return arr;
	};
	/**
	 * @description 获取数组所有对象的属性值
	 * @param {String} key 属性名
	 * @param {Object} query 查询条件
	 * @return {Array} 属性值数组
	 */
	Array.prototype.getArr = function(key, query) {
		var arr = [];
		var len = this.length;
		if (query) {
			for (var i = 0; i < len; i++) {
				var o = this[i];
				if (as(o, query)) {
					arr.push(o[key]);
				}
			}
		} else {
			for (var i = 0; i < len; i++) {
				var o = this[i];
				arr.push(o[key]);
			}
		}
		return arr;
	};
	/**
	 * @description 给数组对象添加属性值
	 * @param {String} key 属性名
	 * @param {Object} value 属性值
	 * @param {Object} query 查询条件
	 * @param {Boolean} end 是否中断循环,中断只添加给第一个符合条件的对象
	 * @return {Array} 对象数组
	 */
	Array.prototype.addVal = function(key, value, query, end) {
		var len = this.length;
		if (query) {
			for (var i = 0; i < len; i++) {
				var o = this[i];
				if (as(o, query)) {
					if (!o[key]) {
						o[key] = value;
						if (end) {
							break;
						}
					}
				}
			}
		} else {
			for (var i = 0; i < len; i++) {
				var o = this[i];
				if (!o[key]) {
					o[key] = value;
					if (end) {
						break;
					}
				}
			}
		}
		return this;
	};
	/**
	 * @description 给数组添加对象
	 * @param {Object} obj 对象
	 * @param {Object} query 查询条件
	 * @return {Array} 对象数组
	 */
	Array.prototype.addObj = function(obj, query) {
		var has = false;
		var len = this.length;
		if (query) {
			for (var i = 0; i < len; i++) {
				if (as(this[i], query)) {
					has = true;
					break;
				}
			}
		} else {
			for (var i = 0; i < len; i++) {
				if (as(this[i], obj)) {
					has = true;
					break;
				}
			}
		}
		if (!has) {
			this.push(obj);
		}
		return this;
	};
	
	/**
	 * @description 给数组添加多个对象
	 * @param {Array} list 数组
	 * @param {Object} query 查询条件
	 * @return {Array} 对象数组
	 */
	Array.prototype.addList = function(list, query) {
		var len = list.length;
		for (var i = 0; i < len; i++) {
			this.addObj(list[i], query);
		}
		return this;
	};
	/**
	 * @description 给数组添加一个对象或列表
	 * @param {Object|Array} objOrList 对象或数组
	 * @param {Object} query 查询条件
	 * @return {Array} 对象数组
	 */
	Array.prototype.add = function(objOrList, query) {
		if(Array.isArray(objOrList))
		{
			this.addList(objOrList, query);
		}
		else {
			this.addObj(objOrList, query);
		}
		return this;
	};
	/**
	 * @description 删除数组中对象的属性
	 * @param {String} key 对象属性键
	 * @param {Object} query 查询条件
	 * @param {Boolean} end 是否中断循环,中断只删除第一个符合条件的对象
	 * @return {Array} 对象数组
	 */
	Array.prototype.delVal = function(key, query, end) {
		var len = this.length;
		if (query) {
			if (end) {
				for (var i = 0; i < len; i++) {
					var o = this[i];
					if (as(o, query)) {
						delete o[key];
						break;
					}
				}
			} else {
				for (var i = 0; i < len; i++) {
					var o = this[i];
					if (as(o, query)) {
						delete o[key];
					}
				}
			}
		} else {
			if (end) {
				delete this[0][key];
			} else {
				for (var i = 0; i < len; i++) {
					var o = this[i];
					delete o[key];
				}
			}
		}
		return this;
	};
	
	/**
	 * @description 删除数组中的对象
	 * @param {Object} query 查询条件
	 * @param {Boolean} end 是否中断循环,中断只删除第一个符合条件的对象
	 * @return {Array} 对象数组
	 */
	Array.prototype.del = function(query, end) {
		var bl = false;
		var len = this.length;
		if (end) {
			if (query) {
				for (var i = 0; i < len; i++) {
					if (as(this[i], query)) {
						this.splice(i, 1);
						break;
					}
				}
			} else {
				for (var i = 0; i < len; i++) {
					this.splice(i, 1);
					break;
				}
			}
		} else {
			if (query) {
				for (var i = this.length - 1; i >= 0; i--) {
					if (as(this[i], query)) {
						this.splice(i, 1);
					}
				}
			} else {
				for (var i = this.length - 1; i >= 0; i--) {
					this.splice(i, 1);
				}
			}
		}
		return this;
	};
	/**
	 * @description 删除多个不同的数组成员
	 * @param {Array} list 查询条件列表
	 * @param {Boolean} end 是否中断循环,中断只删除第一个符合条件的对象
	 * @return {Array} 对象数组
	 */
	Array.prototype.delList = function(list, end) {
		var len = list.length;
		for (var i = 0; i < len; i++) {
			this.del(list[i], end);
		}
		return this;
	};
	/**
	 * @description 设置数组中对象的属性值
	 * @param {String} key 属性键
	 * @param {Object} value 属性值
	 * @param {Object} query 查询条件
	 * @param {Boolean} end 是否中断循环,中断只修改第一个符合条件的对象
	 * @return {Array} 对象数组
	 */
	Array.prototype.setVal = function(key, value, query, end) {
		var len = this.length;
		if (query) {
			for (var i = 0; i < len; i++) {
				if (as(this[i], query)) {
					this[i][key] = value;
					if (end) {
						break;
					}
				}
			}
		} else {
			for (var i = 0; i < len; i++) {
				this[i][key] = value;
				if (end) {
					break;
				}
			}
		}
		return this;
	};
	/**
	 * @description 设置数组中对象的属性值
	 * @param {Object} obj 对象
	 * @param {Object} query 查询条件
	 * @param {Boolean} end 是否中断循环,中断只修改第一个符合条件的对象
	 * @return {Array} 对象数组
	 */
	Array.prototype.setObj = function(obj, query, end) {
		if (query) {
			var len = this.length;
			for (var i = 0; i < len; i++) {
				var o = this[i];
				if (as(o, query)) {
					this[i] = obj;
					if (end) {
						break;
					}
				}
			}
		}
		return this;
	};
	/**
	 * @description 设置数组中对象的属性值
	 * @param {Array} list 对象列表
	 * @param {Object} query 查询条件
	 * @param {Boolean} end 是否中断循环,中断只修改第一个符合条件的对象
	 * @return {Array} 对象数组
	 */
	Array.prototype.setList = function(list, query, end) {
		var len = this.length;
		for (var i = 0; i < len; i++) {
			this.setObj(this[i], query, end);
		}
	};
	/**
	 * @description 搜索符合条件的成员
	 * @param {String} str 搜索关键词
	 * @param {String} key 主键, 用于列表数组时
	 * @return {Array} 返回符合条件的结果
	 */
	Array.prototype.search = function(str, key) {
		var arr = [];
		var func;
		var k = str.replaceAll('*', '');
		if (str.startWith("*")) {
			if (str.endWith("*")) {
				if (key) {
					func = function(o) {
						if (o[key].indexOf(k) !== -1) {
							arr.push(o);
						}
					}
				} else {
					func = function(o) {
						if (o.indexOf(k) !== -1) {
							arr.push(o);
						}
					}
				}
			} else {
				if (key) {
					func = function(o) {
						if (o[key].endWith(k)) {
							arr.push(o);
						}
					}
				} else {
					func = function(o) {
						if (o.endWith(k)) {
							arr.push(o);
						}
					}
				}
			}
		} else if (str.endWith("*")) {
			if (key) {
				func = function(o) {
					if (o[key].startWith(k)) {
						arr.push(o);
					}
				}
			} else {
				func = function(o) {
					if (o.startWith(k)) {
						arr.push(o);
					}
				}
			}

		} else {
			if (key) {
				func = function(o) {
					if (o[key] === k) {
						arr.push(o);
					}
				}
			} else {
				func = function(o) {
					if (o === k) {
						arr.push(o);
					}
				}
			}
		}
		this.map(func);
		return arr;
	};
	/**
	 * @description 判断是否包含成员
	 * @param {Object} query 查询条件
	 * @return {Boolean} 有则返回true，没有则返回false
	 */
	Array.prototype.has = function(query) {
		var has = false;
		var len = this.length;
		for (var i = 0; i < len; i++) {
			if (as(this[i], query)) {
				has = true;
				break;
			}
		};
		return has;
	};

	/**
	 * @description 取含匹配项
	 * @param {String} str 被匹配的字符串
	 * @param {String} key 用于对象列表时查询
	 * @return {Object} 返回匹配的第一项
	 */
	Array.prototype.getMatch = function(str, key) {
		var obj;
		var len = this.length;
		if (key) {
			for (var i = 0; i < len; i++) {
				if (str.has(this[i][key])) {
					obj = this[i];
					break;
				}
			}
		} else {
			for (var i = 0; i < len; i++) {
				if (str.has(this[i])) {
					obj = this[i];
					break;
				}
			}
		}
		return obj;
	};

	/**
	 * @description 数组转对象
	 * @param {String} key 主键, 用作对象索引
	 * @return {Object} 对象
	 */
	Array.prototype.toObj = function(key) {
		var obj = {};
		this.map(function(o) {
			var name = o[key];
			if (name) {
				obj[name] = o;
			}
		});
		return obj;
	};
})();

/**
 * 其他拓展
 */
(function() {
	/**
	 * @description 判断是否文件
	 * @param {String} fileOrDir 文件或目录
	 * @return {Boolean} 是文件返回true，否则返回false
	 */
	function isFile(fileOrDir) {
		return statSync(fileOrDir).isDirectory() !== true;
	}
	/**
	 * @description 搜索目录下所有目录
	 * @param {Array} list 结果路径数组
	 * @param {String} dir 目录地址
	 * @param {String} keyword 搜索关键词
	 */
	function eachDir(list, dir, keyword) {
		var items = readdirSync(dir);
		var len = items.length;
		if (keyword) {
			for (var i = 0; i < len; i++) {
				var name = items[i];
				var f = join(dir, name);
				// 识别是否为目录
				if (!isFile(f)) {
					// 判断是否包含关键词
					if (name.has(keyword)) {
						list.push(join(f, '/'));
					}
					eachDir(list, f, keyword);
				}
			}
		} else {
			for (var i = 0; i < len; i++) {
				var f = join(dir, items[i]);
				// 识别是否为目录
				if (!isFile(f)) {
					list.push(join(f, '/'));
					eachDir(list, f, keyword);
				}
			}
		}
	}
	/**
	 * @description 获取当前目录下所有目录
	 * @param {Array} list 结果路径数组
	 * @param {String} dir 目录地址
	 * @param {String} keyword 搜索关键词
	 */
	function getDir(list, dir, keyword) {
		var items = readdirSync(dir);
		var len = items.length;
		if (keyword) {
			for (var i = 0; i < len; i++) {
				var name = items[i];
				var f = join(dir, name);
				// 识别是否为目录
				if (!isFile(f)) {
					// 判断关键词是否相等
					if (name.has(keyword)) {
						list.push(join(f, '/'));
					}
				}
			}
		} else {
			for (var i = 0; i < len; i++) {
				var f = join(dir, items[i]);
				// 识别是否为目录
				if (!isFile(f)) {
					list.push(join(f, '/'));
				}
			}
		}
	}
	/**
	 * @description 添加文件路径
	 * @param {Array} list 结果路径数组
	 * @param {String} dir 目录地址
	 * @param {String} keyword 搜索关键词
	 */
	function getFile(list, dir, keyword) {
		var items = readdirSync(dir);
		var len = items.length;
		if (keyword) {
			for (var i = 0; i < len; i++) {
				var name = items[i];
				// 识别是否非目录
				var f = join(dir, name);
				if (isFile(f)) {
					// 判断关键词是否相等
					if (name.has(keyword)) {
						list.push(f);
					}
				}
			}
		} else {
			for (var i = 0; i < len; i++) {
				var f = join(dir, items[i]);
				// 识别是否非目录
				if (isFile(f)) {
					list.push(f);
				}
			}
		}
	}
	/**
	 * 目录类函数
	 */
	function Dir() {
		/**
		 * @description 搜索目录下所有目录
		 * @param {String} dir 目录地址
		 * @param {String} keyword 搜索关键词
		 * @return {Array} 目录路径数组
		 */
		Dir.prototype.getAll = function(dir, keyword) {
			var list = [];
			eachDir(list, dir.fullname(), keyword);
			return list;
		};
		/**
		 * @description 搜索当前目录下所有目录
		 * @param {String} dir 目录地址
		 * @param {String} keyword 搜索关键词
		 * @return {Array} 目录路径数组
		 */
		Dir.prototype.get = function(dir, keyword) {
			var list = [];
			getDir(list, dir.fullname(), keyword);
			return list;
		};
	}
	/**
	 * 文件类函数
	 */
	function File() {
		/**
		 * @description 搜索目录下所有文件
		 * @param {String} dir 目录地址
		 * @param {String} keyword 搜索关键词
		 * @param {String} keyword_dir 目录搜素关键词
		 * @return {Array} 文件路径数组
		 */
		File.prototype.getAll = function(dir, keyword, keyword_dir) {
			// 文件数组
			var list = [];

			// 目录数组
			var dirs = [];
			// 获取相关目录
			eachDir(dirs, dir.fullname(), keyword_dir);
			var len = dirs.length;
			for (var i = 0; i < len; i++) {
				getFile(list, dirs[i], keyword);
			}
			return list;
		};
		/**
		 * @description 获取当前目录下所有文件
		 * @param {String} dir 目录地址
		 * @param {String} keyword 搜索关键词
		 * @return {Array} 文件路径数组
		 */
		File.prototype.get = function(dir, keyword) {
			var list = [];
			getFile(list, dir, keyword);
			return list;
		};
		/**
		 * @description 加载文件
		 * @param {String} file 编码方式
		 * @param {String} encode 文件路径
		 * @return {String} 加载的文本
		 */
		File.prototype.load = function(file, encode) {
			if (isFile(file)) {
				if (!encode) {
					encode = "utf-8"
				}
				return readFileSync(file, type);
			}
		};
		/**
		 * @description 加载文件
		 * @param {String} file 文件路径
		 * @param {String} data 编码方式
		 * @param {Boolean} options 写出成功返回true, 失败返回false
		 * @return {Boolean} 保存成功返回true，否则返回false
		 */
		File.prototype.save = function(file, data, options) {
			if (data) {
				if (!encode) {
					encode = "utf-8"
				}
				return writeFileSync(file, encode);
			} else {
				return false;
			}
		}
	}
	$.file = new File();
	$.dir = new Dir();
})();

/**
 * 定时任务管理器
 */
(function() {
	function Timer() {
		/**
		 * @description 回调对象集合
		 * @example 
		 * [{
			 // 名称
			 name: "",
			 // 执行函数
			 async run(){}
			}]
		 */
		var list = [];

		// 定时器核心
		this.core;

		/**
		 * @description 执行
		 */
		Timer.prototype.run = async function() {
			var len = list.length;
			for (var i = 0; i < len; i++) {
				var run = list[i].run;
				if (run) {
					run();
				}
			}
		};

		/**
		 * @description 启动
		 */
		Timer.prototype.start = function() {
			var _this = this;
			if (!this.core) {
				this.core = setInterval(this.run, 1000);
			}
		};

		/**
		 * @description 结束
		 */
		Timer.prototype.end = function() {
			clearInterval(this.core);
			this.core = undefined;
		};

		/**
		 * @description 添加定时执行任务
		 */
		Timer.prototype.add = function(obj) {
			if (typeof(obj) === "object") {
				if (obj.name && obj.run && typeof(obj.run) === 'function') {
					list.push(obj);
				}
			}
		};
		/**
		 * @description 删除定时执行任务
		 */
		Timer.prototype.del = function(name) {
			if (typeof(obj) === "object") {
				list.del({
					name: name
				}, true);
			}
		};
	};
	$.timer = new Timer();
})();


(function() {
	/**
	 * @description 添加对象属性
	 * @param {Object} obj 对象
	 * @param {Object} query 查询条件
	 * @param {Object} value 添加值
	 * @return {Object} 返回添加的局部对象
	 */
	function add(obj, query, value) {
		if (query) {
			var oj = get(obj, query);
			if (oj) {
				$.push(oj, value, true);
			}
			return oj;
		} else {
			$.push(obj, value, true);
			return obj;
		}
	};
	$.add = add;

	/**
	 * @description 删除对象属性
	 * @param {Object} obj 对象
	 * @param {Object} query 查询条件
	 * @param {Object} item 查询条件
	 * @return {Object} 返回删除结果
	 */
	function del(obj, query, item) {
		var o = {};
		if (query) {
			o = get(obj, query);
		} else {
			o = obj;
		}
		if (!item) {
			item = Object.assign(o);
		}
		if (Array.isArray(o)) {
			o.clear();
		} else if (Array.isArray(item)) {
			var len = item.length;
			for (var i = 0; i < len; i++) {
				var val = item[i];
				if (typeof(val) === "object") {
					del(o, null, val);
				} else {
					delete o[val];
				}
			}
		} else if (typeof(item) === "object") {
			for (var k in item) {
				if (Array.isArray(o[k])) {
					delete o[k];
				} else if (typeof(o[k]) === "object") {
					var type = typeof(item[k]);
					if (type === "object") {
						del(o[k], null, item[k]);
					} else if (type === "string" || type === "number") {
						delete o[k][item[k]];
					} else {
						delete o[k];
					}
				} else {
					delete o[k];
				}
			}
		} else {
			delete o[item];
		}
		for (var k in o) {
			if (Object.keys(o[k]).length === 0) {
				delete o[k]
			}
		}
		return o;
	};
	$.del = del;

	/**
	 * @description 修改对象属性
	 * @param {Object} obj 对象
	 * @param {Object} query 查询条件
	 * @param {Object} value 返回修改的局部对象
	 */
	function set(obj, query, value) {
		if (query) {
			var oj = get(obj, query);
			if (oj) {
				$.push(oj, value);
			}
			return oj;
		} else {
			$.push(obj, value);
			return obj;
		}
	};
	$.set = set;

	function arrToObj(arr) {
		var obj = {};
		var ret = obj;
		var len = arr.length;
		for (var i = 0; i < len; i++) {
			var k = arr[i];
			if (typeof(k) == "object") {
				if (Array.isArray(k)) {
					$.push(obj, arrToObj(k), true);
				} else {
					$.push(obj, k, true);
				}
			} else if (!obj[k]) {
				if (len - i > 1) {
					obj[k] = {};
				} else {
					obj[k] = true;
				}
				obj = obj[k];
			}
		}
		return ret;
	}

	/**
	 * @description 查询对象属性
	 * @param {Object} obj 对象
	 * @param {Object} query
	 * @return {Object} 返回查询结果
	 */
	function get(obj, query) {
		var ret;
		if (typeof(obj) === 'object' && !Array.isArray(obj)) {
			// 只有非数组的对象才进行操作
			if (Array.isArray(query)) {
				var ret = obj;
				var len = query.length;
				// 如果是数字则循环数组
				for (var i = 0; i < len; i++) {
					var o = query[i];
					if (Array.isArray(o)) {
						ret = get(ret, o);
					} else if (typeof(o) === 'object') {
						var oj = {};
						for (var k in o) {
							if (o[k]) {
								oj[k] = get(ret[k], o[k]);
							} else {
								oj[k] = ret[k];
							}
						}
						ret = oj;
					} else {
						ret = ret[o];
						if (typeof(ret) !== 'object') {
							break;
						}
					}
				}

			} else if (typeof(query) === 'object') {
				var ret = {};
				// 如果是对象则遍历对象
				for (var k in query) {
					ret[k] = get(obj[k], query[k]);
				}
				ret = ret;
			} else if (query) {
				if (typeof(query) == "string" || typeof(query) == "number") {
					ret = {};
					ret[query] = obj[query];
				} else {
					ret = obj;
				}
			} else {
				// 如果query为空则返回整个对象
				ret = null;
			}
		} else {
			// 否则直接返回值
			ret = obj;
		}
		return ret;
	};
	$.get = get;
})();
