/**
 * Vue loader for RequireJS
 *
 * module config: {
 *    pug: String           requirejs module id for `pug` template parser (usually 'browser-pug')
 *    css: String|Function  css transformation strategy
 *    templateVar: String   template name for closure
 * }
 *
 * @version 1.1.5
 * @author vikseriq
 * @license MIT
 */
define(['module'], function(module) {
	'use strict';

	var fetchContent = null,
		moduleVersion = '1.1.5',
		masterConfig = {
			isBuild: false,
			currentImport: ''
		},
		buildMap = {};

	if (typeof window !== 'undefined' && window.document) {
		// browser-side
		if (typeof XMLHttpRequest === 'undefined')
			throw new Error('XMLHttpRequest not available');

		fetchContent = function(url, callback) {
			var xhr = new XMLHttpRequest();
			xhr.open('GET', url, true);
			xhr.onreadystatechange = function() {
				if (xhr.readyState === 4 && this.status < 400)
					callback(xhr.responseText, url);
			};
			xhr.send();
		};
	} else {
		// probably server-side
		var fs = require.nodeRequire('fs');
		if (!fs || !fs.readFileSync)
			throw new Error(module.id + ': Unsupported platform');

		fetchContent = function(url, callback) {
			try {
				var file = fs.readFileSync(url, 'utf8');
				// remove BOM 𑠍
				if (file[0] === '\uFEFF') {
					file = file.substring(1);
				}
				callback(file);
			} catch (e) {
				throw new Error(module.id + ': Can not load file ' + url);
			}
		};
	}

	var extractor = {
		/**
		 * Extract content surrounded by tag
		 */
		_wrapped_content: function(text, tagname, options) {
			options = options || {
				whitespaces: false
			};
			var start = text.indexOf('<' + tagname);
			if (start < 0)
				return '';
			start = text.indexOf('>', start) + 1;
			var end = text.indexOf('</' + tagname + '>', start);
			if (options.lastIndex)
				end = text.lastIndexOf('</' + tagname + '>');

			text = text.substring(start, end);

			if (!options.whitespaces)
				text = text.replace(/\n/g, ' ').replace(/\s{2,}/g, ' ');

			if (options.escape)
				text = text.replace(/(['\\])/g, '\\$1');

			return text;
		},

		/**
		 * Cleanup HTML
		 */
		cleanup: function(text) {
			return text.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*|<!--[\s\S]*?-->$/, '');
		},

		/**
		 * Vue template extractor
		 */
		template: function(text) {
			var start = text.indexOf('<template');
			if (start < 0)
				return '';
			var content;
			// `pug` support requires template mark + loader in config
			// check for `pug` template engine mark
			if (/^<template\s+lang="(pug|jade)"/.test(text.substring(start))) {
				if (module.config().pug) {
					var pug = require(module.config().pug);
					content = this._wrapped_content(text, 'template', {
						lastIndex: true,
						escape: false,
						whitespaces: true
					});
					content = pug.render(content);
				} else {
					console.warn(module.id + ': missing `pug` in module config');
				}
			} else {
				// generic html
				content = this._wrapped_content(text, 'template', {
						lastIndex: true,
						escape: true
					})
					.trim();
			}

			return content;
		},

		/**
		 * Component source code extractor
		 */
		style: function(text) {
			return this._wrapped_content(text, 'style');
		},

		/**
		 * Styles extractor
		 */
		script: function(text) {
			var script = this._wrapped_content(text, 'script', {
				whitespaces: true
			}).trim();
			if (!script) {
				script =
					"define([], function () { return { template: __template__, data: function data() { return {}; } }; });"
			}
			return script
		}
	};

	/**
	 * ����CSS��ʽ
	 * @param {String} style ��ʽ����
	 * @param {String} id ��ʽ��ID
	 */
	var processStyles = function(style, id) {
		if (!style || !style.trim().length)
			return;
		if (masterConfig.isBuild || typeof document === 'undefined')
			return;
		var cssStrategy = module.config().css || 'inject';

		if (cssStrategy === 'inject') {
			// inject to DOM as script
			var e = document.createElement('style');
			if (id) {
				e.setAttribute('id', id);
			}

			e.type = 'text/css';
			e.appendChild(document.createTextNode(style));
			var head = document.getElementsByTagName("head")[0];
			head.appendChild(e);
		} else if (cssStrategy === 'skip') {
			// do nothing
		} else if (typeof cssStrategy === 'function') {
			// call external handler
			cssStrategy(style, {
				name: masterConfig.currentImport
			});
		}
	};

	/**
	 * Rearrange .vue file to executable content
	 * @param text raw file content
	 * @returns {string} executable js
	 */
	var parse = function(text, url) {
		var tpl = module.config().templateVar;

		// ������ʽ����
		if (text.indexOf(tpl) === -1 && text.indexOf('<template>') !== -1) {
			var txt = 'props: {';
			var idx = text.indexOf(txt);
			if (idx !== -1) {
				text = text.replace(txt, '	template: ' + tpl + ',\r\n' + txt);
			} else {
				txt = 'data: function';
				idx = text.indexOf(txt);
				if (idx !== -1) {
					text = text.replace(txt, '	template: ' + tpl + ',\r\n' + txt);
				} else {
					txt = 'mixins: [';
					idx = text.indexOf(txt);
					if (idx !== -1) {
						text = text.replace(txt, '	template: ' + tpl + ',\r\n' + txt);
					}
				}
			}
		}

		text = extractor.cleanup(text);
		var style = extractor.style(text);
		if (style) {
			var id = "";
			var arr = text.match(/<style scoped="(.*)">/gi);
			if (arr && arr.length > 0) {
				var str = arr[0];
				var i = str.indexOf('"');
				if (i !== -1) {
					id = str.substring(i).replace(/["< >]/g, "");
				}
				var data_style = "";
			}
			if (!id) {
				var i = url.indexOf('//');
				if (i == -1) {
					i = 0;
				}
				var u = url.replace('.vue', '').substring(i);
				var arr = u.split('/');
				if (arr.length > 1) {
					id = arr[arr.length - 2] + '_' + arr[arr.length - 1];
				} else if (arr.length > 0) {
					id = arr[arr.length - 1];
				} else {
					id = u;
				}
			}
			var tag_id = document.getElementById(id);
			if (!tag_id) {
				processStyles(style, id);
			}
		}

		return '(function(' + (tpl || 'template') + '){' +
			extractor.script(text) +
			'})(\'' +
			extractor.template(text) +
			'\');'
	};

	return {
		version: moduleVersion,

		load: function(name, require, load, config) {
			masterConfig.isBuild = !!config.isBuild;
			masterConfig.currentImport = name;

			var fullName = name + (/\.(vue|html)$/.test(name) ? '' : '.vue');
			var path = require.toUrl(fullName);

			fetchContent(path, function(text, url) {
				var data = parse(text, url);
				buildMap[name] = data;
				try {
					load.fromText(data);
				} catch (err) {
					if (typeof console !== 'undefined') {
						console.log(data);
						console.warn(module.id + ': can not load module; check for typos in component', path);
						console.error(err);
					}
				}
			});
		},

		write: function(plugin, module, write) {
			if (buildMap.hasOwnProperty(module)) {
				write.asModule(plugin + '!' + module, buildMap[module]);
			}
		}
	}
});
