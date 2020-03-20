/**
 * @description 加载文件
 * @param {Object} file
 * @param {String} domain 域名
 * @return {String} 一段脚本
 */
async function load(file, domain) {
	var vue = "";
	var f = ('/static' + file).fullname();
	if (f.hasFile()) {
		vue = f.loadText();
	} else {
		var http = new $.Http();
		var f = "";
		if (file.indexOf('./') === 0) {
			f = file.replace('./', domain + '/')
			$.log.debug(f);
		} else {
			f = domain + file
		}
		var res = await http.get(f);
		if (res.body) {
			vue = res.body;
		}
	}
	if (!vue) {
		return null;
	}
	var tpl = vue.between("<template>", "</template>").trim();
	var script = vue.between("<script>", "</script>").trim();
	var p = "template: `" + tpl + "`,";
	if (script.indexOf('template') !== -1) {
		script = script.replace(/template:.*,\r\n/gi, p + '\r\n');
	} else if (!script) {
		script = "export default {\r\n" + p.trim(',') + "\r\n}";
	} else {
		script = script.replace(/export default[ ]?{/gi, "export default {\r\n" + p);
	}
	return script;
}

/**
 * @description 修改文件
 * @param {String} file 文件路径
 * @param {String} txt 内容
 * @param {String} domain 域名
 * @return {String} 修改失败返回错误信息，成功返回空
 */
async function change_file(file, txt, domain) {
	var arr = txt.split('\r\n');

	var obj = {};
	var len = arr.length;
	for (var i = 0; i < len; i++) {
		var o = arr[i];
		if (o.indexOf('import') === 0 && o.indexOf('from') !== -1) {
			var key = (o + '').between('import', 'from').trim();
			var value = (o + '').right('from ').left(';', true).trim("'");
			var content = await load(value, domain);
			obj[key] = {
				line: o,
				file: value,
				content: content
			};
		}
	}
	var f = file.replace('.js', '.min.js');
	var text = txt + '';
	for (var k in obj) {
		var o = obj[k];
		if (o) {
			if (o.content) {
				var t = o.content.replace('export default ', '\r\nvar ' + k + " = ");
				text = text.replace(o.line, t.trim('\r\n') + ';\r\n');
			}
		}
	}
	var m = {};
	var ar = text.split('\r\n');
	const l = ar.length;
	for (var i = 0; i < l; i++) {
		var o = ar[i];
		if (o.indexOf('import') === 0 && o.indexOf('from') !== -1) {
			var key = (o + '').between('import', 'from').trim();
			m[key] = o;
		}
	}

	var importM = "";
	for (var k in m) {
		var line = m[k];
		if (line) {
			text = text.replaceAll(line, '');
			if (line.indexOf('.vue') === -1) {
				importM += line + '\r\n';
			}
		}
	}
	var text = importM + '\r\n' + text;
	text = text.replaceAll('\r\n\r\n\r\n', '\r\n\r\n');
	f.saveText(text);
}


/**
 * @description 接口主函数
 * @param {Object} ctx HTTP上下文
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
async function main(ctx, db) {
	// 获取请求参数
	var req = ctx.request;
	var q = req.query;
	var file = q['file'];
	if (file) {
		var f = file.fullname();
		if (f.hasFile()) {
			var txt = f.loadText();
			if (txt) {
				var url = q['url'];
				if (url) {
					if (url.indexOf('http') !== 0) {
						url = req.origin + url;
					}
				} else {
					url = req.origin;
				}
				var msg = await change_file(f, txt, url);
				if (msg) {
					return $.ret.bl(false, msg);
				} else {
					return $.ret.bl(true);
				}
			} else {
				return $.ret.bl(false, '执行失败，原因是文件内容为空');
			}
		} else {
			return $.ret.bl(false, '执行失败，原因是文件不存在');
		}
	} else {
		return $.ret.error(30000, '文件路径（file）参数不能为空');
	}
};

exports.main = main;
