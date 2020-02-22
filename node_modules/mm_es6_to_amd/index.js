/**
 * @fileOverview es6转amd帮助类函数
 * @author <a href="http://qww.elins.cn">邱文武</a>
 * @version 1.2
 */

require('mm_expand');
const Module = require('./module');
const babel = require('babel-core').transform;

/**
 * @description 将ES6代码转成ES5
 * @param {String} code 被转换的代码
 */
function parser_es5(code) {
	return babel(code, {
		"presets": [
			"es2015"
		],
		ast: false
	}).code.replace('"use strict";', '').trim();
}

/**
 * @description ES6标准的代码转为AMD标准的代码
 * @param {String} source 脚本源
 * @return {String} 返回转换后的代码格式
 */
function es6toamd(source) {
	if (source.indexOf('import') === -1 && source.indexOf('export') === -1) {
		return source
	}
	const module = new Module(source);
	module.convert();

	var script = module.source;
	if (script) {
		script = parser_es5(script);
	}
	return script;
}

/**
 * @description 替换请求源的方式
 * @param {String} 脚本代码
 * @return {String} 返回替换后的脚本
 */
function set_vue_code(script) {
	if (script) {
		var src = script.between('[', ']');
		var imports = src;
		var arr = imports.split(',');
		var len = arr.length;
		for (var i = 0; i < len; i++) {
			var s = arr[i];
			if (s.endsWith('.vue"')) {
				imports = imports.replace(s, '"vue!' + s.trim().trim('"') + '"');
			} else if (s.endsWith('.css"')) {
				imports = imports.replace(s, '"css!' + s.trim().trim('"') + '"');
			} else if (s.endsWith('.html"')) {
				imports = imports.replace(s, '"text!' + s.trim().trim('"') + '"');
			}
		}
		return script.replace(src, imports);
	}
	return null;
}

function es6_to_amd(text) {
	var code;
	if (text) {
		var script;
		var has = text.has('*</script>*');
		if (has) {
			var str = text.between('<script', '</script>').right('>');
			if (!str.trim()) {
				var l = text.between('<script', '>');
				var d = `export default {
					template: __template__
				};`;
				script = es6toamd(d);
				code = text.replace(l + '</script>', l + set_vue_code(script) + '</script>');
			} else {
				script = es6toamd(str);
				code = text.replace(str, set_vue_code(script));
			}

		} else {
			script = es6toamd(text);
			code = set_vue_code(script);
		}
	}

	return code;
};

if (global.$) {
	$.es6_to_amd = es6_to_amd;
}

/**
 * @description ES6标准的代码转为AMD标准的代码, 可转vue
 * @param {String} text
 * @return {String} 返回转换后的代码格式
 */
module.exports = es6_to_amd;
