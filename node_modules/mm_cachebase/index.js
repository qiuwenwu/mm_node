/**
 * @fileOverview 本地缓存类
 * @author <a href="http://qww.elins.cn">邱文武</a>
 * @version 1.0
 */
require('mm_expand');

/**
 * 创建基本缓存CacheBase帮助类函数
 */
class CacheBase {
	/**
	 * 构造函数
	 */
	constructor() {
		// 缓存的字典
		this.list = [];
		// 到期通知函数
		this.func;
		/*
		格式:
		{
		    {
		        // ID，为时间戳
		        id:
		        // 键名
		        name:
		        // 保存值
		        value: "hello world",
		        // 最大时效
		        maxAge: -1,
		        // 到期时间
		        expires: ""
		    }
		}
		*/
	}
}

/**
 * @description 获取缓存对象
 * @param {String} key 键
 * @return {String} 对象
 */
CacheBase.prototype.getObj = function(key) {
	var obj = this.list.getObj({
		name: key
	});
	if (obj && obj.expires) {
		var cha = Date.parse(obj.expires) - Date.parse(new Date());
		if (cha < 1) {
			this.delObj(key);
			obj = undefined;
		}
	}
	return obj;
};
/**
 * @description 删除缓存对象
 * @param {String} key 键
 * @return {Number} 成功返回1，否则返回0
 */
CacheBase.prototype.delObj = function(key) {
	this.list.del({
		name: key
	}, true);
	return 1;
};

/**
 * @description 设置缓存对象
 * @param {Object} obj 值
 * @return {Number} 成功返回1，否则返回0
 */
CacheBase.prototype.addObj = function(obj) {
	obj.id = obj.name.md5();
	var maxAge = obj.maxAge;
	if (maxAge > 0) {
		// 如果maxAge大于0则设置缓存时长
		obj.expires = new Date().addSeconds(maxAge).toUTCString();
	} else {
		obj.maxAge = -1;
		obj.expires = null;
	}
	this.list.push(obj);
	return 1;
};

/**
 * @description 查询或是设置缓存过期时间
 * @param {String} key 键
 * @param {Number} maxAge 秒, 为空则查询有效时长
 * @return {Promise|Number|Boolean} 查询时长或设置结果, 时长为-1表示永不过期
 */
CacheBase.prototype.ttl = async function(key, maxAge) {
	var _this = this;
	return new Promise((resolve, reject) => {
		var obj = _this.getObj(key);
		if (obj) {
			if (maxAge === undefined) {
				// 如果maxAge没有设置则查询时长
				if (obj.expires) {
					// 如果有效期
					var cha = Date.parse(obj.expires) - Date.parse(new Date());
					maxAge = parseInt(cha / 1000);
				} else {
					maxAge = obj.maxAge;
				}
				resolve(maxAge);
				return;
			} else if (maxAge > 0) {
				// 如果maxAge大于0则设置缓存时长
				obj.maxAge = maxAge;
				obj.expires = new Date().addSeconds(maxAge).toUTCString();
			} else if (maxAge < 0) {
				// 如果maxAge小于0则设置缓存时长为永久
				obj.maxAge = -1;
				obj.expires = null;
			} else {
				// 如果maxAge等于0则设置删除缓存
				_this.delObj(key);
			}
			resolve(1);
		} else {
			resolve(0);
		}
	});
};
/**
 * @description 增加整数值(负数为减)
 * @param {String} key 键
 * @param {Number} num 数值
 * @return {Promise|Number} 计算后的结果
 */
CacheBase.prototype.addInt = async function(key, num) {
	var _this = this;
	return new Promise((resolve, reject) => {
		var obj = _this.getObj(key);
		if (obj) {
			obj.value += num;
			resolve(obj.value);
		} else {
			resolve(0);
		}
	});
};
/**
 * @description 增加浮点数值(负数为减)
 * @param {String} key 键
 * @param {Number} num 数值
 * @return {Promise|Number} 计算后的结果
 */
CacheBase.prototype.addFloat = async function(key, num) {
	var _this = this;
	return new Promise((resolve, reject) => {
		var obj = _this.getObj(key);
		if (obj) {
			obj.value += num;
			resolve(obj.value);
		} else {
			resolve(0);
		}
	});
};
/**
 * @description 增加字符串值到指定缓存
 * @param {String} key 键
 * @param {String} str 添加的字符串
 * @return {Promise|String} 添加后的字符串
 */
CacheBase.prototype.addStr = async function(key, str) {
	var _this = this;
	return new Promise((resolve, reject) => {
		var obj = _this.getObj(key);
		if (obj) {
			obj.value += str;
			resolve(obj.value);
		} else {
			resolve(0);
		}
	});
};
/**
 * @description 删除缓存
 * @param {String} key 键
 * @return {Promise|Boolean} 成功返回true,失败返回false
 */
CacheBase.prototype.del = async function(key) {
	var _this = this;
	return new Promise((resolve, reject) => {
		var ret = _this.delObj(key);
		resolve(ret);
	});
};
/**
 * @description 修改缓存
 * @param {String} key 键
 * @param {Object} value 值
 * @param {Number} maxAge 秒
 * @return {Object} 值
 */
CacheBase.prototype.setVal = function(key, value, maxAge) {
	var _this = this;
	var obj = _this.getObj(key);
	if (obj) {
		obj.value = value;
		if (maxAge !== undefined) {
			_this.ttl(key, maxAge);
		}
	} else {
		if (maxAge === undefined) {
			maxAge = -1;
		}
		obj = {
			name: key,
			value: value,
			maxAge: maxAge
		};
		_this.addObj(obj);
	}
	return obj.value;
};
/**
 * @description 修改缓存
 * @param {String} key 键
 * @param {Object} value 值
 * @param {Number} maxAge 秒
 * @return {Promise|Object} 值
 */
CacheBase.prototype.set = async function(key, value, maxAge) {
	var _this = this;
	return new Promise((resolve, reject) => {
		var ret = _this.setVal(key, value, maxAge);
		resolve(ret);
	});
};
/**
 * @description 增加缓存 增加缓存和修改缓存不一样, 如果键存在则不会增加
 * @param {String} key 键
 * @param {Object} value 值
 * @param {Number} maxAge 秒
 * @return {Promise<Object>} 添加成功返回值, 如果已存在则返回null
 */
CacheBase.prototype.add = async function(key, value, maxAge) {
	var _this = this;
	return new Promise((resolve, reject) => {
		var obj = _this.getObj(key);
		if (!obj) {
			var ret = _this.setVal(key, value, maxAge);
			resolve(ret);
		} else {
			resolve(0);
		}
	});
};
/**
 * @description 查询缓存
 * @param {String} key 键
 * @return {Promise|Object} 查询值
 */
CacheBase.prototype.get = async function(key) {
	var _this = this;
	return new Promise((resolve, reject) => {
		var obj = _this.getObj(key);
		if (obj) {
			resolve(obj.value);
		} else {
			resolve(undefined);
		}
	});
};
/**
 * @description 判断键是否存在
 * @param {String} key 键
 * @return {Promise|Boolean} 有返回true, 没有返回false
 */
CacheBase.prototype.has = async function(key) {
	var _this = this;
	return new Promise((resolve, reject) => {
		var obj = _this.getObj(key);
		resolve(obj ? 1 : 0);
	});
};
/**
 * @description 查询缓存的字符串中的一段字符串
 * @param {String} key 键
 * @param {Number} start 开始位置
 * @param {Number} end 结束位置
 * @return {Promise|String} 查询值
 */
CacheBase.prototype.getrange = async function(key, start, end) {
	var _this = this;
	return new Promise((resolve, reject) => {
		var obj = _this.getObj(key);
		if (obj) {
			resolve(obj.value.substring(start, end));
		} else {
			resolve('');
		}
	});
};
/**
 * @description 在值的指定位置开始增加一段字符串
 * @param {String} key 键
 * @param {Number} index 开始位置
 * @param {String} value 变更的值
 * @return {Promise|Number} 字符串长度
 */
CacheBase.prototype.setrange = async function(key, index, value) {
	var _this = this;
	return new Promise((resolve, reject) => {
		var obj = _this.getObj(key);
		if (obj) {
			var val = obj.value;
			var start = val.substring(0, index);
			var end = val.substring(index, val.length);
			obj.value = start + value + end;
			resolve(obj.value);
		} else {
			resolve('');
		}
	});
};
/**
 * @description 清空缓存
 * @param {String} key 键, 为空则清空所有
 * @return {Promise|Array} 执行结果
 */
CacheBase.prototype.clear = async function(key) {
	var _this = this;
	return new Promise((resolve, reject) => {
		if (key) {
			for (var i = this.list.length - 1; i >= 0; i--) {
				if (this.list[i].name.has(key)) {
					_this.delObj(this.list[i].name);
				}
			}
		} else {
			for (var i = this.list.length - 1; i >= 0; i--) {
				_this.delObj(this.list[i].name);
			}
		}
		resolve(1);
	});
};
/**
 * @description 排序
 * @param {String} key 键
 * @param {String} way = [asc|desc]排序方式, 可以为空
 * @param {String} obj_key 排序成员的键
 * @return {Promise|Array} 排序后的数组
 */
CacheBase.prototype.sort = async function(key, way, obj_key) {
	var _this = this;
	return new Promise((resolve, reject) => {
		var obj = _this.getObj(key);
		if (obj) {
			if (obj.value.constructor == Array) {
				obj.value.sortBy(way, obj_key);
				resolve(1);
			} else {
				resolve(-1);
			}
		} else {
			resolve(0);
		}
	});
};
/**
 * @description 获取所有键名
 * @param {String} key 键 支持*号, 前面加*表示后面名称一致, 前后加*表示包含名称, 后面加*表示前面名称一致
 * @return {Promise|Array} 键数组
 */
CacheBase.prototype.keys = async function(key) {
	var _this = this;
	return new Promise((resolve, reject) => {
		if (key) {
			var list = _this.list.search(key, 'name');
			resolve(list.toArr('name'));
		} else {
			resolve(_this.list.toArr('name'));
		}
	});
};
/**
 * @description 修改数组缓存
 * @param {String} key 键
 * @param {Object} value 值
 * @param {Number} maxAge 秒
 * @return {Promise|Array} 执行结果
 */
CacheBase.prototype.list_set = async function(key, value, maxAge) {
	var _this = this;
	return new Promise((resolve, reject) => {
		var ret = _this.setVal(key, value, maxAge);
		resolve(ret);
	});
};
/**
 * @description 数组缓存追加对象
 * @param {String} key 键
 * @param {Object} value 值
 * @return {Promise|String} 追加后的数组
 */
CacheBase.prototype.list_add = async function(key, value) {
	var _this = this;
	return new Promise((resolve, reject) => {
		var obj = _this.getObj(key);
		if (obj) {
			var arr = obj.value;
			if (arr.constructor == Array) {
				arr.push(value);
				obj.value = arr;
				resolve(1);
			} else {
				_this.error = "当前缓存值非数组";
				resolve(-1);
			}
		} else {
			resolve(0);
		}
	});
};
/**
 * @description 判断成员是否存在
 * @param {String} key 键
 * @param {Object} value 值
 * @return {Promise|Boolean} 存在返回true, 否则返回false
 */
CacheBase.prototype.list_has = async function(key, value) {
	var _this = this;
	return new Promise((resolve, reject) => {
		var obj = _this.getObj(key);
		if (obj) {
			if (obj.value.constructor == Array) {
				resolve(obj.value.has(value));
			} else {
				_this.error = "当前缓存值非数组";
				resolve(-1);
			}
		} else {
			resolve(0);
		}
	});
};
/**
 * @description 查询数组缓存
 * @param {String} key 键
 * @param {Number} start 起始位置
 * @param {Number} end 结束位置
 * @return {Promise|Array} 查询到的数组
 */
CacheBase.prototype.list_get = async function(key, start, end) {
	var _this = this;
	return new Promise((resolve, reject) => {
		var obj = _this.getObj(key);
		if (obj) {
			if (obj.value.constructor == Array) {
				var lt = obj.value;
				if (!end) {
					end = lt.length;
				}
				if (!start) {
					start = 0;
				}
				var list = [];
				for (var i = start; i < end; i++) {
					list.push(lt[i]);
				}
				resolve(list);
			} else {
				_this.error = "当前缓存值非数组";
				resolve([]);
			}
		} else {
			resolve([]);
		}
	});
};
/**
 * @description 清空数组缓存
 * @param {String} key 键
 * @param {Array} value 新成员, 没有则删除数组
 * @return {Promise|Boolean} 成功返回true，是否返回false
 */
CacheBase.prototype.list_clear = async function(key, value) {
	var _this = this;
	return new Promise((resolve, reject) => {
		if (value) {
			var obj = _this.getObj(key);
			if (obj) {
				obj.value = value;
				resolve(1);
			} else {
				resolve(0);
			}
		} else {
			var ret = _this.del(key);
			resolve(ret);
		}
	});
};
/**
 * @description 到期通知
 * @param {Object} obj 对象
 */
CacheBase.prototype.notity = function(obj) {
	if (this.func) {
		this.func(obj);
	}
};

// 导出CacheBase函数
module.exports = CacheBase;
