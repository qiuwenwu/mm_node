'use strict'

const parseXml = require('xml2js-parser').parseStringSync;

function toVal(obj, str) {
	var ret;
	if (typeof(obj) === "object") {
		if (obj.constructor === Array) {
			if (obj.length === 1) {
				ret = toVal(obj[0], str);
			} else {
				ret = [];
				for (var i = 0; i < obj.length; i++) {
					var o = obj[i];
					ret.push(toVal(o, str));
				}
			}
		} else {
			ret = {};
			for (var k in obj) {
				var value = obj[k];
				var sub = `<${k}>${value}</${k}>`;
				if (str.indexOf(sub) !== -1) {
					str = str.replace(sub, '');
					if (/^([0-9]+|[1-9]+.[0-9]+)$/.test(value)) {
						ret[k] = Number(value);
					} else if (value == 'true' || value == 'false') {
						ret[k] = Boolean(value);
					} else if(/^\d{4}-(0[1-9]|1[012]|[1-9])-([12][0-9]|0[1-9]|3[01]|[1-9])( ([01][0-9]|2[0-3]):([0-4][0-9]|5[0-9])(:([0-4][0-9]|5[0-9]))?)?$/.test(value)){
						ret[k] = new Date(value);
					} else {
						ret[k] = toVal(value, str);
					}
				} else {
					ret[k] = toVal(value, str);
				}
			}
		}
	} else {
		ret = obj;
	}
	return ret;
}

/**
 * @description xml格式字符串转为对象
 */
String.prototype.toXml = function() {
	var str = this + '';
	var obj = parseXml(str);
	return toVal(obj, str);
};

/**
 * @description 序列化单行
 * @param {String} tag 标签
 * @param {Object} value 值
 * @return {String} xml格式字符串
 */
function xmlLine(tag, value) {
	var s = "";
	if (value) {
		var t = typeof(value);
		switch (t) {
			case "string":
				s = `\r\n<${tag}><![CDATA[${value}]]></${tag}>`;
				break;
			case "number":
			case "boolean":
				s = `\r\n<${tag}>${value}</${tag}>`;
				break;
			case "function":
				break;
			default:
				var type = value.constructor;
				if (type === Array) {
					for (var i = 0; i < value.length; i++) {
						var o = value[i];
						if (typeof(o) === "object") {
							var str = toXml(o);
							s += "\r\n" + `<${tag}>${str}</${tag}>`;
						} else {
							s += "\r\n" + xmlLine(tag, o);
						}
					}
				} else if (type === Date) {
					s = `\r\n<${tag}>${value.toStr('yyyy-MM-dd hh:mm:ss')}</${tag}>`;
				} else {
					var str = toXml(value);
					s = `\r\n<${tag}>${str}</${tag}>`;
				}
				break;
		}
	}
	return s;
}

function toXml(obj) {
	var ret = "";
	if (obj) {
		for (var k in obj) {
			var value = obj[k];
			if (value) {
				ret += xmlLine(k, value);
			}
		}
		ret += "\r\n";
	}
	return ret;
}

/**
 * @description 
 */
if (global.$) {
	$.toXml = toXml;
}

module.exports = toXml;
