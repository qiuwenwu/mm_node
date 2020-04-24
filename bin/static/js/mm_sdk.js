/**
 * @fileOverview JavaScript拓展函数
 * @author <a href="http://qww.elins.cn">邱文武</a>
 * @version 1.2
 */

/* == 基础函数 == */
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
		var lh = obj.length;
		if (all && lh !== query.length) {
			// 要求完全一致 而长度不一致 说明不相似
			bl = false;
		} else {
			// 否则判断数组里的每个成员是否相似
			for (var i = 0; i < lh; i++) {
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
			queryStr += "&" + key + "=" + encodeURI(value);
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
	console.log(text);
}

/**
 * @description 删除对象空属性
 * @param {Object} obj 对象
 * @param {Object} includeZero 是否包括0
 * @return {Object} 返回新对象 
 */
function delete_prop(obj, includeZero) {
	var o = Object.assign({}, obj);
	if (includeZero) {
		for (var k in o) {
			var v = o[k];
			if (!v) {
				delete o[k];
			}
		}
	} else {
		for (var k in o) {
			var v = o[k];
			if (v === '' || v === null || v === undefined) {
				delete o[k];
			}
		}
	}
	return o;
}

/**
 * @namespace
 * @property {Object} pool 数据连接池, 用于存储有关数据库的操作类
 * @property {Object} task 任务池, 用于存储定时任务操作类
 * @property {Object} api API接口，用于存储有关接口的操作类
 * @property {Object} val 全局变量，用于存储全局的配置 
 * @property {Object} dict 字典，用于查询变量替换名
 * @property {Object} lang 语言包, 用于全局的语言替换
 * @property {String} sleep 延迟(休眠)
 * @property {Function()} speed 测试执行速度函数
 * @property {Function(Object, Object, Boolean):Boolean} as 判断对象是否相似
 * @property {Function(Object, Object):Boolean} push 为对象添加属性
 * @property {Function(Object):String} toJson 对象转json字符串
 * @property {Function(Object):String} toUrl 对象转url字符串
 * @property {Function(Object):Object} copy 复制一个新对象
 * @property {Function(Object):String} keys 查询获取对象属性键
 */
var funcs = {
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
	// 延迟
	sleep: sleep,
	// 测试执行速度函数
	speed: speed,
	// 判断对象是否相似
	as: as,
	// 添加对象
	push: push,
	// 清空对象值
	clear: clear,
	// 对象转json字符串
	toJson: toJson,
	// 对象转url字符串
	toUrl: toUrl,
	// 复制一个新对象
	copy: copy,
	// 查询获取对象属性键
	keys: keys,
	// 删除对象属性
	delete: delete_prop
};
if (typeof($) === "undefined") {
	window.$ = funcs
} else {
	push($, funcs, true);
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
		for (var i = 0; i < arr.length; i++) {
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
		if (has) {
			for (var i = 0; i < arr.length; i++) {
				var o = arr[i];
				if (o) {
					arr_new[i] = o;
				}
			}
		} else {
			for (var i = 0; i < arr.length; i++) {
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
		for (var i = 0; i < this.length; i++) {
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
		if (key) {
			for (var i = 0; i < arr.length; i++) {
				var o = arr[i];
				if (o[key]) {
					str += splitStr + o[key];
				}
			}
		} else {
			for (var i = 0; i < arr.length; i++) {
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
		for (var i = 0; i < this.length; i++) {
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
			if (end) {
				var obj;
				for (var i = 0; i < this.length; i++) {
					var o = this[i];
					if (as(o, query)) {
						obj = o;
						break;
					}
				}
				return obj;
			} else {
				var list = [];
				for (var i = 0; i < this.length; i++) {
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
	 * @description 从数组获取对象
	 * @param {Object} query 查询条件
	 * @return {Object} 对象
	 */
	Array.prototype.getObj = function(query) {
		var obj;
		if (query) {
			for (var i = 0; i < this.length; i++) {
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
			console.log('ruchag', obj[key]);
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
			for (var i = 0; i < this.length; i++) {
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
		if (query) {
			for (var i = 0; i < this.length; i++) {
				var o = this[i];
				if (as(o, query)) {
					arr.push(o[key]);
				}
			}
		} else {
			for (var i = 0; i < this.length; i++) {
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
		if (query) {
			for (var i = 0; i < this.length; i++) {
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
			for (var i = 0; i < this.length; i++) {
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
		if (query) {
			for (var i = 0; i < this.length; i++) {
				if (as(this[i], query)) {
					has = true;
					break;
				}
			}
		} else {
			for (var i = 0; i < this.length; i++) {
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
		if (Array.isArray(objOrList)) {
			this.addList(objOrList, query);
		} else {
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
		if (query) {
			if (end) {
				for (var i = 0; i < this.length; i++) {
					var o = this[i];
					if (as(o, query)) {
						delete o[key];
						break;
					}
				}
			} else {
				for (var i = 0; i < this.length; i++) {
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
				for (var i = 0; i < this.length; i++) {
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
		if (end) {
			if (query) {
				for (var i = 0; i < this.length; i++) {
					if (as(this[i], query)) {
						this.splice(i, 1);
						break;
					}
				}
			} else {
				for (var i = 0; i < this.length; i++) {
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
		if (query) {
			for (var i = 0; i < this.length; i++) {
				if (as(this[i], query)) {
					this[i][key] = value;
					if (end) {
						break;
					}
				}
			}
		} else {
			for (var i = 0; i < this.length; i++) {
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
			for (var i = 0; i < this.length; i++) {
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
		for (var i = 0; i < this.length; i++) {
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
		for (var i = 0; i < this.length; i++) {
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
		if (key) {
			for (var i = 0; i < this.length; i++) {
				if (str.has(this[i][key])) {
					obj = this[i];
					break;
				}
			}
		} else {
			for (var i = 0; i < this.length; i++) {
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
		Timer.prototype.run = function() {
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


/* MD5加密类 */
(function() {
	/* md5加密（开始） */
	var hexcase = 0;
	/* hex output format. 0 - lowercase; 1 - uppercase  */
	var b64pad = "";
	/* base-64 pad character. "=" for strict RFC compliance */
	var chrsz = 8;
	/* bits per input character. 8 - ASCII; 16 - Unicode  */

	/*
	 * Perform a simple self-test to see if the VM is working
	 */
	function md5_vm_test() {
		return hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72";
	}
	/*
	 * Calculate the MD5 of an array of little-endian words, and a bit length
	 */
	function core_md5(x, len) {
		/* append padding */
		x[len >> 5] |= 0x80 << len % 32;
		x[(len + 64 >>> 9 << 4) + 14] = len;
		var a = 1732584193;
		var b = -271733879;
		var c = -1732584194;
		var d = 271733878;
		for (var i = 0; i < x.length; i += 16) {
			var olda = a;
			var oldb = b;
			var oldc = c;
			var oldd = d;
			a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
			d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
			c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
			b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
			a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
			d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
			c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
			b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
			a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
			d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
			c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
			b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
			a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
			d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
			c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
			b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
			a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
			d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
			c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
			b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
			a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
			d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
			c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
			b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
			a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
			d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
			c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
			b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
			a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
			d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
			c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
			b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
			a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
			d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
			c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
			b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
			a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
			d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
			c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
			b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
			a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
			d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
			c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
			b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
			a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
			d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
			c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
			b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
			a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
			d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
			c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
			b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
			a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
			d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
			c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
			b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
			a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
			d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
			c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
			b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
			a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
			d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
			c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
			b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
			a = safe_add(a, olda);
			b = safe_add(b, oldb);
			c = safe_add(c, oldc);
			d = safe_add(d, oldd);
		}
		return Array(a, b, c, d);
	}
	/*
	 * These functions implement the four basic operations the algorithm uses.
	 */
	function md5_cmn(q, a, b, x, s, t) {
		return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
	}

	function md5_ff(a, b, c, d, x, s, t) {
		return md5_cmn(b & c | ~b & d, a, b, x, s, t);
	}

	function md5_gg(a, b, c, d, x, s, t) {
		return md5_cmn(b & d | c & ~d, a, b, x, s, t);
	}

	function md5_hh(a, b, c, d, x, s, t) {
		return md5_cmn(b ^ c ^ d, a, b, x, s, t);
	}

	function md5_ii(a, b, c, d, x, s, t) {
		return md5_cmn(c ^ (b | ~d), a, b, x, s, t);
	}
	/*
	 * Calculate the HMAC-MD5, of a key and some data
	 */
	function core_hmac_md5(key, data) {
		var bkey = str2binl(key);
		if (bkey.length > 16) bkey = core_md5(bkey, key.length * chrsz);
		var ipad = Array(16),
			opad = Array(16);
		for (var i = 0; i < 16; i++) {
			ipad[i] = bkey[i] ^ 0x36363636;
			opad[i] = bkey[i] ^ 0x5C5C5C5C;
		}
		var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
		return core_md5(opad.concat(hash), 512 + 128);
	}
	/*
	 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
	 * to work around bugs in some JS interpreters.
	 */
	function safe_add(x, y) {
		var lsw = (x & 0xFFFF) + (y & 0xFFFF);
		var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
		return msw << 16 | lsw & 0xFFFF;
	}
	/*
	 * Bitwise rotate a 32-bit number to the left.
	 */
	function bit_rol(num, cnt) {
		return num << cnt | num >>> 32 - cnt;
	}
	/*
	 * Convert a string to an array of little-endian words
	 * If chrsz is ASCII, characters >255 have their hi-byte silently ignored.
	 */
	function str2binl(str) {
		var bin = Array();
		var mask = (1 << chrsz) - 1;
		for (var i = 0; i < str.length * chrsz; i += chrsz) {
			bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << i % 32;
		}
		return bin;
	}
	/*
	 * Convert an array of little-endian words to a string
	 */
	function binl2str(bin) {
		var str = "";
		var mask = (1 << chrsz) - 1;
		for (var i = 0; i < bin.length * 32; i += chrsz) {
			str += String.fromCharCode(bin[i >> 5] >>> i % 32 & mask);
		}
		return str;
	}
	/*
	 * Convert an array of little-endian words to a hex string.
	 */
	function binl2hex(binarray) {
		var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
		var str = "";
		for (var i = 0; i < binarray.length * 4; i++) {
			str += hex_tab.charAt(binarray[i >> 2] >> i % 4 * 8 + 4 & 0xF) + hex_tab.charAt(binarray[i >> 2] >> i % 4 * 8 & 0xF);
		}
		return str;
	}
	/*
	 * Convert an array of little-endian words to a base-64 string
	 */
	function binl2b64(binarray) {
		var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
		var str = "";
		for (var i = 0; i < binarray.length * 4; i += 3) {
			var triplet = (binarray[i >> 2] >> 8 * (i % 4) & 0xFF) << 16 | (binarray[i + 1 >> 2] >> 8 * ((i + 1) % 4) & 0xFF) <<
				8 | binarray[i + 2 >> 2] >> 8 * ((i + 2) % 4) & 0xFF;
			for (var j = 0; j < 4; j++) {
				if (i * 8 + j * 6 > binarray.length * 32) str += b64pad;
				else str += tab.charAt(triplet >> 6 * (3 - j) & 0x3F);
			}
		}
		return str;
	}

	$.hex_md5 = function hex_md5(s) {
		return binl2hex(core_md5(str2binl(s), s.length * chrsz));
	};
	$.b64_md5 = function b64_md5(s) {
		return binl2b64(core_md5(str2binl(s), s.length * chrsz));
	};
	$.str_md5 = function str_md5(s) {
		return binl2str(core_md5(str2binl(s), s.length * chrsz));
	};
	$.hex_hmac_md5 = function hex_hmac_md5(key, data) {
		return binl2hex(core_hmac_md5(key, data));
	};
	$.b64_hmac_md5 = function b64_hmac_md5(key, data) {
		return binl2b64(core_hmac_md5(key, data));
	};
	$.str_hmac_md5 = function str_hmac_md5(key, data) {
		return binl2str(core_hmac_md5(key, data));
	};

	$.md5 = $.hex_md5;
})();

(function() {
	/* == 网络请求 == */
	$.http = {
		/**
		 * @description GET请求——json
		 * @param {String} url 请求地址
		 * @param {Function} fun 回调函数
		 * @param {Object} headers 协议头
		 * @return {Object} 同步请求返回请求结果，否则返回undefined
		 */
		get: function get(url, fun, headers) {
			var json;
			var hp = {
				type: 'GET',
				url: url,
				async: fun !== null,
				xhrFields: {
					withCredentials: true
				},
				crossDomain: true,
				success: function success(data, status) {
					if (fun) {
						fun(data, status);
					} else {
						json = {
							data: data,
							status: status
						};
					}
				},
				error: function error(data, status) {
					if (fun) {
						fun(data, status);
					} else {
						json = {
							data: data,
							status: status
						};
					}
				},
				complete: function complete(XHR, TS) {
					XHR = null;
				}
			};
			if (headers) {
				hp.headers = headers;
			}
			$.ajax(hp);
			return json;
		},
		/**
		 * @description POST请求
		 * @param {String} url 请求地址
		 * @param {Object} param 请求参数
		 * @param {Function} fun 回调函数
		 * @param {Object} headers 协议头
		 * @param {String} type 协议头
		 * @return {Object} 同步请求返回请求结果，否则返回undefined
		 */
		post: function post(url, param, fun, headers, type) {
			var contentType;
			var pm;
			if (type === 'xml') {
				contentType = "text/xml; charset=utf-8";
				pm = param;
			} else if (type === 'form') {
				contentType = "application/x-www-form-urlencoded; charset=utf-8";
				pm = param;
			} else {
				contentType = "application/json; charset=utf-8";
				pm = JSON.stringify(param);
			}
			var json;
			var hp = {
				type: 'POST',
				url: url,
				async: fun !== null,
				xhrFields: {
					withCredentials: true
				},
				crossDomain: true,
				data: pm,
				dataType: "json",
				contentType: contentType,
				success: function success(data, status) {
					if (fun) {
						fun(data, status);
					} else {
						json = {
							data: data,
							status: status
						};
					}
				},
				error: function error(data, status) {
					if (fun) {
						fun(data, status);
					} else {
						json = {
							data: data,
							status: status
						};
					}
				},
				complete: function complete(XHR, TS) {
					XHR = null;
				}
			};
			if (headers) {
				hp.headers = headers;
			}
			$.ajax(hp);
			return json;
		}
	};

	/* 缓存 */
	$.cookies = {
		/**
		 * @description 设置域
		 * @param {String} url 地址
		 */
		domain: function domain(url) {
			if (url) {
				_domain = url;
			}
			return ";path=/";
		},
		/**
		 * @description 设置缓存
		 * @param {String} name 缓存对象
		 * @param {Object} value 缓存值
		 * @param {Number} minutes 缓存时长，单位: 分钟
		 * @param {String} domain 作用域
		 */
		set: function set(name, value, minutes, domain) {
			if (!domain) {
				domain = $.cookies.domain();
			}
			var time = new Date();
			if (minutes) {
				time.setTime(time.getTime() + minutes * 60000);
				document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + time.toGMTString();
			} else {
				time.setTime(time.getTime() + 7 * 24 * 3600 * 60000);
				document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + time.toGMTString();
			}
		},

		/**
		 * @description 获取cookie
		 * @param {String} name 名称
		 */
		get: function get(name) {
			var value = null;
			var str = document.cookie;
			var arr = str.split("; ");
			for (var i = 0; i < arr.length; i++) {
				var ar = arr[i].split("=");
				if (ar[0] == name) {
					value = decodeURIComponent(ar[1]);
					break;
				}
			}
			return value;
		},

		/**
		 * @description 删除cookie
		 * @param {String} name 名称
		 */
		del: function del(name) {
			this.set(name, "", -1);
		}
	};

	/**
	 * @description 设置或查询cookie缓存
	 * @param {String} key 缓存对象名
	 * @param {Object} value 缓存值
	 * @param {Number} minutes 缓存时长，单位: 分钟
	 */
	$.cookie = function(key, value, minutes) {
		if (value != undefined) {
			if (!minutes) {
				if (value == null) {
					minutes = 0;
				} else {
					minutes = 120;
				}
			}
			$.cookies.set(key, value, minutes);
		} else {
			return $.cookies.get(key);
		}
	};

	/* === 多媒体 === */
	$.file = {
		/**
		 * @description 上传文件
		 * @param {String} url 提交网址
		 * @param {Object} obj 对象
		 * @param {Function} func 函数
		 * @param {Object} headers 协议头
		 */
		upload: function upload(url, obj, func, headers) {
			var formData = new FormData();
			for (var k in obj) {
				formData.append(k, obj[k]);
			}
			var hp = {
				type: 'POST',
				url: url,
				data: formData,
				processData: false,
				contentType: false,
				async: func !== null,
				xhrFields: {
					withCredentials: true
				},
				success: function success(json, status) {
					if (func) {
						if (json) {
							json["obj"] = obj;
						}
						func(json, status);
					}
				},
				complete: function complete(XHR, TS) {
					XHR = null;
				}
			};

			if (headers) {
				hp.headers = headers;
			}
			$.ajax(hp);
		}
	};
})();

/* 通讯 */
(function() {
	$.html = {
		tag: function(tag, prop, value) {
			var obj;
			var list = document.getElementsByTagName(tag);
			var len = list.length;
			for (var i = 0; i < len; i++) {
				var o = list[i];
				if (o && o.getAttribute(prop) && o.getAttribute(prop).has(value)) {
					obj = o;
					break;
				}
			}
			return obj;
		}
	};

	/**
	 * 本地临时缓存,关闭浏览器后小时
	 */
	$.cache = {
		/**
		 * 设置值
		 * @param {String} key 键
		 * @param {Object} value 值
		 */
		set: function(key, value) {
			window.sessionStorage.setItem(key, value);
		},
		/**
		 * 获取值
		 * @param {String} key 键
		 * @return {Object} 值
		 */
		get: function(key) {
			return window.sessionStorage.getItem(key);
		},
		/**
		 * 删除值
		 * @param {Object} key 键
		 */
		del: function(key) {
			window.sessionStorage.removeItem(key);
		},
		/**
		 * 清除所有缓存
		 */
		clear: function() {
			window.sessionStorage.clear();
		}
	};

	/**
	 * 本地数据库存储
	 */
	$.db = {
		/**
		 * 设置值
		 * @param {String} key 键
		 * @param {Object} value 值
		 * @param {Number} longTime 保存时长（单位:分钟）
		 */
		set: function(key, value, longTime) {
			window.localStorage.setItem(key, value);
		},
		/**
		 * 获取值
		 * @param {String} key 键
		 * @return {Object} 值
		 */
		get: function(key) {
			return window.localStorage.getItem(key);
		},
		/**
		 * 删除值
		 * @param {Object} key 键
		 */
		del: function(key) {
			window.localStorage.removeItem(key);
		}
	};

	/**
	 * web socket通讯组
	 */
	$.ws = {};

	/* 封装 WebSocket 实例化的方法  */
	var CreateWebSocket = (function(url) {
		return function(url) {
			var ws;
			try {
				if (window.WebSocket) {
					ws = new WebSocket(url)
				} else if (window.MozWebSocket) {
					ws = new MozWebSocket(url)
				};
			} catch (e) {
				//TODO handle the exception
			}
			return ws;
		}
	})();

	/**
	 * 等待连接成功, 然后发送消息
	 */
	function connect(_this) {
		if (_this.try_connect) {
			return;
		}
		_this.try_connect = true;
		var ws = CreateWebSocket(_this.url);
		ws.onmessage = function(event) {
			_this.message(event);
		};
		ws.onclose = function() {
			reconnect(_this);
		};
		ws.onerror = function(event) {
			_this.noticy("error", event);
		};
		ws.onopen = function() {
			_this.try_connect = false;
			var arr = _this.arr_message;
			var len = arr.length;
			for (var i = 0; i < len; i++) {
				if (ws.readyState === 1) {
					_this.ws.send(arr[i]);
				}
			}
			// 发送成功, 清空消息组
			_this.arr_message.clear();
			// 重置重新连接次数
			_this.try_times = 0;
		}
		_this.ws = ws;
	};

	/**
	 * 重新连接
	 * @param {Object} _this ws对象
	 */
	function reconnect(_this) {
		_this.try_times++;
		if (_this.try_times <= _this.try_max_times) {
			_this.try_connect = false;
			// 没连接上会一直重连，设置延迟避免请求过多
			setTimeout(function() {
				connect(_this)
			}, _this.seconds);
			_this.noticy('reconnect', _this.try_times);
		} else {
			_this.noticy('error', '服务器连接失败!');
		}
	};

	/**
	 * 构造通讯函数
	 * @param {String} url
	 * @param {Function} noticy 通知函数
	 * @param {Function} receive 响应回调函数
	 * @param {Function} noticy 信息捕捉函数
	 * @param {String} name 名称
	 * @param {Number} seconds 重新连接次数
	 * @return {Object} 返回发信服务
	 */
	function WS(url, receive, noticy, name, seconds) {
		if (noticy) {
			this.noticy = noticy;
		} else {
			/**
			 * 通知函数
			 * @param {String} type 通知类型
			 */
			this.noticy = function(type, content) {
				console.log(type, content);
			};
		}

		if (!window.WebSocket) {
			console.error('错误: 浏览器不支持websocket');
			this.noticy('error', '浏览器不支持websocket');
			return;
		}

		var u;
		if (url.indexOf('//') !== -1) {
			u = url.replace("https", "ws").replace("http", "ws");
		} else {
			u = "ws://" + url;
		}
		// 连接地址
		this.url = u;

		if (name) {
			this.name = name
		} else {
			this.name = u;
		}

		this.receive = receive;

		// 消息数组, 在等待连接的过程中, 如果有多条消息, 则保存至此, 等待连接成功后发送
		this.arr_message = [];

		if (seconds) {
			this.seconds = seconds;
		} else {
			this.seconds = 6000;
		}

		/**
		 * 尝试重连次数
		 */
		this.try_times = 0;

		/**
		 * 最大尝试次数, 如果每次重试间隔1分钟, 那么10分钟后就不再重连
		 */
		this.try_max_times = 10;

		/**
		 * 是否正在尝试连接
		 */
		this.try_connect = false;

		// 连接 socket服务
		connect(this);
	}


	/**
	 * 打开服务
	 */
	WS.prototype.open = function() {
		connect(this);
	};

	/**
	 * 关闭服务
	 */
	WS.prototype.close = function() {
		this.ws.onclose = function(event) {};
		this.ws.close()
	};


	/**
	 * 释放
	 */
	WS.prototype.clear = function() {
		this.close();
		delete $.ws[key];
	};

	/**
	 * 收到消息
	 */
	WS.prototype.message = function(event) {
		var data = event.data;
		if (data && this.receive) {
			this.receive(data);
		}
	};


	/**
	 * 发送数据
	 * @param {String} bodyStr 消息主体字符串
	 */
	WS.prototype.send = function(bodyStr) {
		var ws = this.ws;
		switch (ws.readyState) {
			case 0:
				// CONNECTING 正在连接
				// 先将消息加入队列等待连接成功再发送
				this.arr_message.push(bodyStr);
				break;
			case 1:
				// OPEN 连接成功，可以通信了
				ws.send(bodyStr);
				break;
			case 2:
				// CLOSING 连接正在关闭
				// 先将消息加入队列, 等待关闭 > 重新连接 > 连接成功 再发送消息
				this.arr_message.push(bodyStr);
				break;
			default:
				if (this.try_times > 9) {
					this.try_times = 0;
					this.try_connect = false;
				}
				// CLOSED 连接已经关闭，或者打开连接失败
				// 先将消息加入队列, 重新连接 > 连接成功 再发送消息
				this.arr_message.push(bodyStr);
				connect(this);
				break;
		}
	};

	/**
	 * 主动关闭连接
	 */
	WS.prototype.close = function() {
		this.ws.close();
	};

	/**
	 * 创建web socket通讯服务
	 * @param {String} url URL地址
	 * @param {Function} receive 响应回调函数
	 * @param {Function} noticy 信息捕捉函数
	 * @param {String} name 名称
	 * @param {String} seconds 秒
	 * @return {Object} 返回发信服务
	 */
	$.socket = function(url, receive, noticy, name, seconds) {
		// 使用键方式去查询多个通讯
		// 需要多通讯的原因是: 像交易所可能需要即时通讯的同时还需要试试变化交易信息
		if (!name) {
			name = url;
		}
		if (!$.ws[name]) {
			$.ws[name] = new WS(url, receive, noticy, name, seconds);
		} else {
			$.ws[name].try_times = 0;
		}
		return $.ws[name];
	};

	/**
	 * 路由
	 */
	$.route = {
		/**
		 * 重定向地址
		 */
		redirect_url: "/",
		/**
		 * 路由历史记录
		 */
		history: {
			list: [],
			push: function(url) {
				if (this.list.length > 0) {
					var end_url = this.list[this.list.length - 1];
					if (end_url !== url) {
						this.list.push(url);
					}
				} else {
					this.list.push(url);
				}
			}
		},

		/**
		 * 添加路由
		 * @param {String} url
		 * @param {String} title
		 */
		push: function(url, title) {
			history.pushState({
				status: 0
			}, title, url);
		}
	};

	/**
	 * 浏览器
	 */
	$.os = function() {
		var u = navigator.userAgent;
		return {
			version: navigator.appVersion,
			isApp: u.indexOf("Html5Plus") !== -1,
			device: {
				// 是否为移动终端
				mobile: /AppleWebKit.*Mobile.*/.test(u),
				// ios终端
				ios: /\(i[^;]+;( U;)? CPU.+Mac OS X/.test(u),
				// android终端或Linux浏览器
				android: u.indexOf('Android') !== -1 || u.indexOf('Linux') !== -1,
				// 是否为iPhone或者QQHD浏览器
				iPhone: u.indexOf('iPhone') !== -1,
				// 是否iPad
				iPad: u.indexOf('iPad') !== -1,
				// 是否电脑
				pc: u.indexOf('Window') !== -1,
			},
			app: {
				// 微信
				wechat: /MicroMessenger/i.test(u),
				// 微博
				weibo: /WeiBo/i.test(u),
				// QQ
				qq: /QQ/i.test(u)
			},
			browser: {
				// 浏览器版本信息
				// IE内核
				trident: u.indexOf('Trident') > -1,
				// opera内核
				presto: u.indexOf('Presto') > -1,
				// 苹果、谷歌内核
				webKit: u.indexOf('AppleWebKit') > -1,
				// 火狐内核
				gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
				// 苹果默认浏览器
				safari: u.indexOf('Safari') === -1
			}
		}
	}();
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
			for (var i = 0; i < item.length; i++) {
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
				// 如果是数字则循环数组
				for (var i = 0; i < query.length; i++) {
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

/**
 * 跨站校验
 */
function ifame_check(){
	var domain = document.domain;
	var _self = Object.assign({}, window.self.location);
	try {
		var host = window.top.location.host;
	}
	catch(e)
	{
		console.log('跨域嵌套ifame');
		window.location.href = "/404.html";
	}
}

ifame_check();