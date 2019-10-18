define(["Vue"], function(Vue) {
	"use strict";

	var getHost = function() {
		var tag = $.html.tag('script', 'src', '*require.js');

		if (tag) {
			var server = tag.dataset.server;
			if (server) {
				return server;
			}
		}
		return "/";
	}

	var mm = {
		/**
		 * @description 安装
		 * @param {Object} Vue 框架
		 * @param {Object} options 配置参数
		 */
		install: function install(Vue, options) {
			var host;

			if (options) {
				if (options.host) {
					host = options.host;
				} else {
					host = getHost();
				}
			} else {
				host = getHost();
			}

			/**
			 * @description 路由跳转
			 */
			Vue.prototype.$back = function() {
				this.$router.back();
			};

			/**
			 * @description 取host地址
			 * @param {String} pathAndQuery 路径和参数 例如：'/app/test?name=123'
			 */
			Vue.prototype.$host = function(pathAndQuery) {
				return host + pathAndQuery;
			};

			/**
			 * @description 跳转连接
			 * @param {String} url 路径
			 */
			Vue.prototype.$url = function(url) {
				return window.location.protocol + "//" + window.location.host + url;
			};

			/**
			 * @description 复制
			 */
			Vue.prototype.$copy = function() {
				$.toast("复制成功");
			};

			/**
			 * @description 提示框
			 * @param {String} text 提示内容
			 * @param {String} icon 图标代码
			 */
			Vue.prototype.$alert = function(text, icon) {
				$.toast(text, icon);
			};

			/**
			 * @description 引入get请求函数
			 * @param {String} url 请求地址
			 * @param {Function} fun 回调函数
			 */
			Vue.prototype.$get = function(url, fun) {
				var token = $.db.get("token");
				$.http.get(url.replace("~/", host), function(json, status) {
					if (json.msg && json.msg === "没有登录") {
						$.db.set("token", "");
					}
					fun(json, status);
				}, {
					"x-auth-token": token
				});
			};

			/**
			 * @description 引入post请求
			 * @param {String} url 请求地址
			 * @param {Object} param 请求参数
			 * @param {Function} fun 回调函数
			 */
			Vue.prototype.$post = function(url, param, fun) {
				var token = $.db.get("token");
				$.http.postForm(url.replace("~/", host), param, fun, {
					"x-auth-token": token
				});
			};

			/**
			 * @description 跳转到指定页面
			 * @param {String} url 跳转网址
			 * @param {Boolean} bl 是否返回到标签页
			 */
			Vue.prototype.$nav = function(url, bl) {
				if (url.indexOf("http") == 0) {
					location.href = url;
				} else {
					this.$router.push(url);
				}
			};

			/**
			 * @description 引入上传请求
			 * @param {String} url 上传地址
			 * @param {Object} form 表单数据
			 * @param {Object} fileObj 上传文件对象
			 * @param {Function} func 回调函数
			 */
			Vue.prototype.$upload = function(url, form, fileObj, func) {
				var token = $.db.get("token");
				var headers = {
					"x-auth-token": token
				};
				$.file.upload(url.replace("~/", host), form, fileObj, func, headers);
			};

			/**
			 * @description 被转换的数值
			 * @param {Object} num 引入浮点数
			 * @return {String} 浮点数数值
			 */
			Vue.prototype.$float = function(num) {
				var str = num.toFloor(8).toStr(8);
				for (var i = 0; i < 9; i++) {
					if (!str.endWith("0") && !str.endWith(".")) {
						break;
					}
					str = str.substring(0, str.length - 1);
				}
				return str;
			};

			/**
			 * @description 转双精度
			 * @param {Number} num 被转换的数值
			 * @return {String} 返回双精度字符串
			 */
			Vue.prototype.$double = function(num) {
				return num.toFloor(2).toStr(2);
			};

			/**
			 * @description 搁一法
			 * @param {Number} num 被转换的数值
			 * @param {Number} len 保留小数位
			 * @return {Number} 浮点数数值
			 */
			Vue.prototype.$floor = function(num, len) {
				return num.toFloor(len);
			};

			/**
			 * @description 科学计数转浮点数
			 * @param {String} num 被转换的数值
			 * @return {Number} 数值
			 */
			Vue.prototype.$num = function(num) {
				return new Number(num);
			};

			/**
			 * @description 引入截取字符串函数
			 * @param {String} str 被截取的字符串
			 * @param {String} start 起始字符串
			 * @param {String} end 结束字符串
			 * @return {String} 截取后的字符串
			 */
			Vue.prototype.$substr = function(str, start, end) {
				return str.substring(start, end);
			};

			/**
			 * @description 转字符串并截取长度
			 * @param {Object} value 被转换的数值
			 * @param {Number} num 保留长度
			 * @return {String} 截取后字符串
			 */
			Vue.prototype.$toStr = function(value, num) {
				return value.toStr(num);
			};

			/* === 注册过滤器, 备注：过滤器在$-app中无法使用 === */
			/**
			 * @description 转双精度小数字符串
			 * @param {Object} value 被转换的数值
			 * @return {String} 返回双精度数字符串
			 */
			Vue.filter("double", function(value) {
				return parseFloat(value).toFloor(2).toStr(2);
			});

			/**
			 * @description 转浮点数字符串
			 * @param {Object} value 被转换的数值
			 * @return {String} 返回浮点数字符串
			 */
			Vue.filter("float", function(value) {
				return parseFloat(value).toFloor(8).toStr(8);
			});
		}
	};

	/**
	 * @description 全局混入
	 */
	Vue.mixin({
		methods: {
			/**
			 * @description 读取语言库
			 * @param {String} name 名称
			 * @return {String} 返回语言值
			 */
			$lang: function $lang(name) {
				var lang = this.$store.state.web.lang;
				var title = "";
				for(var i = 0; i < lang.length; i++){
					if(name = o.name)
					{
						title = o.title;
						break;
					};
				}
				return title;
			},

			/**
			 * @description 数字货币转法币
			 * @param {Object} coin 货币数值
			 * @return {Number} 法币数值
			 */
			$money: function $money(coin) {
				return parseFloat(coin * this.$store.state.web.rate).toFloor(2);
			},

			/**
			 * @description 法币转数字货币
			 * @param {Object} money 法币数值
			 * @return {Number} 货币数值
			 */
			$coin: function $coin(money) {
				return parseFloat(money / this.$store.state.web.rate).toFloor(8);
			}
		}
	});
	return mm;
});
