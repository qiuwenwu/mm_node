require('mm_expand');

if (!$.tpl_val) {
	$.tpl_val = {};
}

/**
 * @class 模板类
 */
class Tpl {
	/**
	 * @description 创建模板帮助类函数 (构造函数)
	 * @param {String} scope 作用域
	 * @param {String} dir 文件存储路径
	 * @constructor
	 */
	constructor(scope, dir) {
		// 当前目录
		this.dir = $.runPath + '';
		// 作用域
		this.scope = "sys";
		if (scope) {
			this.scope = scope;
		}

		// 设置全局函数
		if (!$.tpl_val[this.scope]) {
			$.tpl_val[this.scope] = {};
		}
		/**
		 * @type {Object} 全局视图背包
		 */
		this.globalBag = $.tpl_val[this.scope];

		/**
		 * @type {Object} 视图背包
		 */
		this.viewBag = {};

		/**
		 * @description 渲染模板文件
		 * @param {String} file 模板文件路径
		 * @param {Object} model 数据模型
		 * @return {String} view 渲染后的视图
		 */
		Tpl.prototype.view = function(file, model) {
			var f = file.fullname(this.dir);
			var template = f.loadText();
			if (template) {
				return template.tpl({
					view: this.view,
					viewBag: this.viewBag,
					model: model,
					globalBag: this.globalBag
				});
			}
			return '';
		};

		/**
		 * @description 渲染模板
		 * @param {String} template 模板
		 * @param {Object} model 数据模型
		 * @return {String} view 渲染后的视图
		 */
		Tpl.prototype.render = function(template, model) {
			return template.tpl({
				view: this.view,
				viewBag: this.viewBag,
				model: model,
				globalBag: this.globalBag
			});
		};

		/**
		 * @description 设置视图背包成员
		 * @param {Object} obj 设置的对象
		 */
		Tpl.prototype.set = function(obj) {
			$.push(this.viewBag, obj, true);
		};

		/**
		 * @description 删除视图背包成员
		 * @param {Array|String} arrOrStr 删除的键或键数组
		 */
		Tpl.prototype.del = function(arrOrStr) {
			if (typeof(arrOrStr) == 'string') {
				delete this.viewBag[arrOrStr];
			} else {
				arr.map(function(k) {
					delete this.viewBag[k];
				});
			}
		};

		/**
		 * @description 获取视图背包成员
		 * @param {String} key 获取的对象键名
		 * @return {Object} 值
		 */
		Tpl.prototype.get = function(key) {
			return this.viewBag[key];
		};
	}
}

exports.Tpl = Tpl;
