require('mm_expand');

/**
 * @class Cookie类
 */
class Cookie {
	/**
	 * 构造函数
	 */
	constructor() {
		// cookie列表
		this.list = [];
	}
}

/**
 * @description 获取cookie
 * @param {String} name 名称
 * @param {String} path 所属路径
 * @param {String} domain 所属域
 * @return {Object} cookie
 */
Cookie.prototype.get = function(name, path, domain) {
	var obj;
	if (domain) {
		obj = this.list.getObj({
			name: name,
			path: path,
			domain: domain
		});
	} else if (path) {
		obj = this.list.getObj({
			name: name,
			path: path
		});
	} else {
		obj = this.list.getObj({
			name: name
		});
	}
	return obj;
};

/**
 * @description 设置cookie
 * @param {String} name 名称
 * @param {Object} value 值
 * @param {String} path 作用路径
 * @param {String} domain 作用域
 */
Cookie.prototype.set = function(name, value, path, domain) {
	this.list.setObj({
		name: name,
		value: value,
		path: path,
		domain: domain
	});
};

/**
 * @description 删除Cookie
 * @param {String} name 名称
 * @param {String} path 所属路径
 * @param {String} domain 所属域
 */
Cookie.prototype.del = function(name, path, domain) {
	if (domain) {
		this.list.del({
			name: name,
			path: path,
			domain: domain
		});
	} else if (path) {
		this.list.del({
			name: name,
			path: path
		});
	} else {
		this.list.del({
			name: name
		});
	}
};

/**
 * @description 设置或读取cookie字符串
 * @param {String} str cookie字符串
 * @return {String} 没有传参时返回存储的cookie字符串
 */
Cookie.prototype.str = function(str) {
	if (str) {
		var cookie = {};
		var arr = str.split("; ");
		var name;
		if (arr.length > 1) {
			var kv = arr[0];
			var arr_kv = kv.split("=");
			name = arr_kv[0];
			cookie.value = encodeURIComponent(arr_kv[1]);
			arr.splice(0, 1);
		}
		cookie.name = name;
		arr.map(function(o) {
			var ar = o.split("=");
			cookie[ar[0]] = ar[1];
		});
		var path = cookie.path;
		var domain = cookie.domain;
		var obj = this.get(name, path, domain);
		if (obj) {
			$.push(obj, cookie, true);
		} else {
			this.list.push(cookie);
		}
	} else {
		var lt = this.list;
		var str = "";
		var now = new Date();
		var tromorrow = new Date().addDays(1);
		var ar = [];
		var len = lt.length;
		for (var i = 0; i < len; i++) {
			var o = lt[i];
			var time = tromorrow;
			if (o.Expires) {
				time = o.Expires.toTime();
			}
			if (time > now) {
				str += o.name + "=" + o.value + ";";
				ar.push(o);
			}
		}
		this.list = ar;
		return str;
	}
};

module.exports = Cookie;
