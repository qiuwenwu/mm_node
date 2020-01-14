"use strict";

function _defineProperty(obj, key, value) {
	if (key in obj) {
		Object.defineProperty(obj, key, {
			value: value,
			enumerable: true,
			configurable: true,
			writable: true
		});
	} else {
		obj[key] = value;
	}

	return obj;
}

define(['jquery'], function(jquery) {
	"use strict";
	/* 动效API */

	var _props;

	function __dealCssEvent(eventNameArr, callback) {
		var events = eventNameArr,
			i,
			dom = this;

		function fireCallBack(e) {
			if (e.target !== this) return;
			callback.call(this, e);

			for (i = 0; i < events.length; i++) {
				dom.off(events[i], fireCallBack);
			}
		}

		if (callback) {
			for (i = 0; i < events.length; i++) {
				dom.on(events[i], fireCallBack);
			}
		}
	}

	jquery.fn.dataset = function() {
		var dataset = {},
			ds = this[0].dataset;

		for (var key in ds) {
			var item = dataset[key] = ds[key];
			if (item === "false") dataset[key] = false;
			else if (item === "true") dataset[key] = true;
			else if (parseFloat(item) === item * 1) dataset[key] = item * 1;
		}

		return jquery.extend({}, dataset, this[0].__eleData);
	};

	jquery.fn.animationEnd = function(callback) {
		__dealCssEvent.call(this, ["webkitAnimationEnd", "animationend"], callback);

		return this;
	};

	jquery.fn.transitionEnd = function(callback) {
		__dealCssEvent.call(this, ["webkitTransitionEnd", "transitionend"], callback);

		return this;
	};

	jquery.fn.transition = function(duration) {
		if (typeof duration !== "string") {
			duration = duration + "ms";
		}

		for (var i = 0; i < this.length; i++) {
			var elStyle = this[i].style;
			elStyle.webkitTransitionDuration = elStyle.MozTransitionDuration = elStyle.transitionDuration = duration;
		}

		return this;
	};

	jquery.fn.transform = function(transform) {
		for (var i = 0; i < this.length; i++) {
			var elStyle = this[i].style;
			elStyle.webkitTransform = elStyle.MozTransform = elStyle.transform = transform;
		}

		return this;
	};

	(function($) {
		var _modalTemplateTempDiv = document.createElement("div");

		$.modalStack = [];

		$.modalStackClearQueue = function() {
			if ($.modalStack.length) {
				$.modalStack.shift()();
			}
		};

		$.modal = function(params) {
			params = params || {};
			var modalHTML = "";
			var buttonsHTML = "";

			if (params.buttons && params.buttons.length > 0) {
				for (var i = 0; i < params.buttons.length; i++) {
					buttonsHTML += "<span class=\"modal-button" + (params.buttons[i].bold ? " modal-button-bold" : "") + "\">" +
						params.buttons[i].text + "</span>";
				}
			}

			var extraClass = params.extraClass || "";
			var titleHTML = params.title ? "<div class=\"modal-title\">" + params.title + "</div>" : "";
			var textHTML = params.text ? "<div class=\"modal-text\">" + params.text + "</div>" : "";
			var afterTextHTML = params.afterText ? params.afterText : "";
			var noButtons = !params.buttons || params.buttons.length === 0 ? "modal-no-buttons" : "";
			var verticalButtons = params.verticalButtons ? "modal-buttons-vertical" : "";
			modalHTML = "<div class=\"modal " + extraClass + " " + noButtons + "\"><div class=\"modal-inner\">" + (titleHTML +
					textHTML + afterTextHTML) + "</div><div class=\"modal-buttons " + verticalButtons + "\">" + buttonsHTML +
				"</div></div>";
			_modalTemplateTempDiv.innerHTML = modalHTML;
			var modal = $(_modalTemplateTempDiv).children();
			$(defaults.modalContainer).append(modal[0]);
			modal.find(".modal-button").each(function(index, el) {
				$(el).on("click", function(e) {
					if (params.buttons[index].close !== false) $.closeModal(modal);
					if (params.buttons[index].onClick) params.buttons[index].onClick(modal, e);
					if (params.onClick) params.onClick(modal, index);
				});
			});
			$.openModal(modal);
			return modal[0];
		};

		$.alert = function(text, title, callbackOk) {
			if (typeof title === "function") {
				callbackOk = arguments[1];
				title = undefined;
			}

			return $.modal({
				text: text || "",
				title: typeof title === "undefined" ? defaults.modalTitle : title,
				buttons: [{
					text: defaults.modalButtonOk,
					bold: true,
					onClick: callbackOk
				}]
			});
		};

		$.confirm = function(text, title, callbackOk, callbackCancel) {
			if (typeof title === "function") {
				callbackCancel = arguments[2];
				callbackOk = arguments[1];
				title = undefined;
			}

			return $.modal({
				text: text || "",
				title: typeof title === "undefined" ? defaults.modalTitle : title,
				buttons: [{
					text: defaults.modalButtonCancel,
					onClick: callbackCancel
				}, {
					text: defaults.modalButtonOk,
					bold: true,
					onClick: callbackOk
				}]
			});
		};

		$.prompt = function(text, title, callbackOk, callbackCancel) {
			if (typeof title === "function") {
				callbackCancel = arguments[2];
				callbackOk = arguments[1];
				title = undefined;
			}

			return $.modal({
				text: text || "",
				title: typeof title === "undefined" ? defaults.modalTitle : title,
				afterText: "<input type=\"text\" class=\"modal-text-input\">",
				buttons: [{
					text: defaults.modalButtonCancel
				}, {
					text: defaults.modalButtonOk,
					bold: true
				}],
				onClick: function onClick(modal, index) {
					if (index === 0 && callbackCancel) callbackCancel($(modal).find(".modal-text-input").val());
					if (index === 1 && callbackOk) callbackOk($(modal).find(".modal-text-input").val());
				}
			});
		};

		$.modalLogin = function(text, title, callbackOk, callbackCancel) {
			if (typeof title === "function") {
				callbackCancel = arguments[2];
				callbackOk = arguments[1];
				title = undefined;
			}

			return $.modal({
				text: text || "",
				title: typeof title === "undefined" ? defaults.modalTitle : title,
				afterText: "<input type=\"text\" name=\"modal-username\" placeholder=\"" + defaults.modalUsernamePlaceholder +
					"\" class=\"modal-text-input modal-text-input-double\"><input type=\"password\" name=\"modal-password\" placeholder=\"" +
					defaults.modalPasswordPlaceholder + "\" class=\"modal-text-input modal-text-input-double\">",
				buttons: [{
					text: defaults.modalButtonCancel
				}, {
					text: defaults.modalButtonOk,
					bold: true
				}],
				onClick: function onClick(modal, index) {
					var username = $(modal).find(".modal-text-input[name=\"modal-username\"]").val();
					var password = $(modal).find(".modal-text-input[name=\"modal-password\"]").val();
					if (index === 0 && callbackCancel) callbackCancel(username, password);
					if (index === 1 && callbackOk) callbackOk(username, password);
				}
			});
		};

		$.modalPassword = function(text, title, callbackOk, callbackCancel) {
			if (typeof title === "function") {
				callbackCancel = arguments[2];
				callbackOk = arguments[1];
				title = undefined;
			}

			return $.modal({
				text: text || "",
				title: typeof title === "undefined" ? defaults.modalTitle : title,
				afterText: "<input type=\"password\" name=\"modal-password\" placeholder=\"" + defaults.modalPasswordPlaceholder +
					"\" class=\"modal-text-input\">",
				buttons: [{
					text: defaults.modalButtonCancel
				}, {
					text: defaults.modalButtonOk,
					bold: true
				}],
				onClick: function onClick(modal, index) {
					var password = $(modal).find(".modal-text-input[name=\"modal-password\"]").val();
					if (index === 0 && callbackCancel) callbackCancel(password);
					if (index === 1 && callbackOk) callbackOk(password);
				}
			});
		};

		$.showPreloader = function(title) {
			$.hidePreloader();
			$.showPreloader.preloaderModal = $.modal({
				title: title || defaults.modalPreloaderTitle,
				text: "<div class=\"preloader\"></div>"
			});
			return $.showPreloader.preloaderModal;
		};

		$.hidePreloader = function() {
			$.showPreloader.preloaderModal && $.closeModal($.showPreloader.preloaderModal);
		};

		$.showIndicator = function() {
			if ($(".preloader-indicator-modal")[0]) return;
			$(defaults.modalContainer).append(
				"<div class=\"preloader-indicator-overlay\"></div><div class=\"preloader-indicator-modal\"><span class=\"preloader preloader-white\"></span></div>"
			);
		};

		$.hideIndicator = function() {
			$(".preloader-indicator-overlay, .preloader-indicator-modal").remove();
		};

		$.showIndicatorDiy = function(htmlcontent) {
			if ($(".preloader-indicator-modal")[0]) return;
			$(defaults.modalContainer).append(
				"<div class=\"preloader-indicator-overlay\"></div><div class=\"preloader-indicator-modal\">" + htmlcontent +
				"</div>");
		};

		$.hideIndicatorDiy = function() {
			$(".preloader-indicator-overlay, .preloader-indicator-modal").remove();
		};

		$.actions = function(params) {
			var modal, groupSelector, buttonSelector;
			params = params || [];

			if (params.length > 0 && !$.isArray(params[0])) {
				params = [params];
			}

			var modalHTML;
			var buttonsHTML = "";

			for (var i = 0; i < params.length; i++) {
				for (var j = 0; j < params[i].length; j++) {
					if (j === 0) buttonsHTML += "<div class=\"actions-modal-group\">";
					var button = params[i][j];
					var buttonClass = button.label ? "actions-modal-label" : "actions-modal-button";
					if (button.bold) buttonClass += " actions-modal-button-bold";
					if (button.color) buttonClass += " font-" + button.color;
					if (button.bg) buttonClass += " bg_" + button.bg;
					if (button.disabled) buttonClass += " disabled";
					buttonsHTML += "<span class=\"" + buttonClass + "\">" + button.text + "</span>";
					if (j === params[i].length - 1) buttonsHTML += "</div>";
				}
			}

			modalHTML = "<div class=\"actions-modal\">" + buttonsHTML + "</div>";
			_modalTemplateTempDiv.innerHTML = modalHTML;
			modal = $(_modalTemplateTempDiv).children();
			$(defaults.modalContainer).append(modal[0]);
			groupSelector = ".actions-modal-group";
			buttonSelector = ".actions-modal-button";
			var groups = modal.find(groupSelector);
			groups.each(function(index, el) {
				var groupIndex = index;
				$(el).children().each(function(index, el) {
					var buttonIndex = index;
					var buttonParams = params[groupIndex][buttonIndex];
					var clickTarget;
					if ($(el).is(buttonSelector)) clickTarget = $(el);

					if (clickTarget) {
						clickTarget.on("click", function(e) {
							if (buttonParams.close !== false) $.closeModal(modal);
							if (buttonParams.onClick) buttonParams.onClick(modal, e);
						});
					}
				});
			});
			$.openModal(modal);
			return modal[0];
		};

		$.popup = function(modal, removeOnClose) {
			if (typeof removeOnClose === "undefined") removeOnClose = true;

			if (typeof modal === "string" && modal.indexOf("<") >= 0) {
				var _modal = document.createElement("div");

				_modal.innerHTML = modal.trim();

				if (_modal.childNodes.length > 0) {
					modal = _modal.childNodes[0];
					if (removeOnClose) modal.classList.add("remove-on-close");
					$(defaults.modalContainer).append(modal);
				} else return false;
			}

			modal = $(modal);
			if (modal.length === 0) return false;
			modal.show();
			modal.find(".content").scroller("refresh");

			if (modal.find("." + defaults.viewClass).length > 0) {
				$.sizeNavbars(modal.find("." + defaults.viewClass)[0]);
			}

			$.openModal(modal);
			return modal[0];
		};

		$.pickerModal = function(pickerModal, removeOnClose) {
			if (typeof removeOnClose === "undefined") removeOnClose = true;

			if (typeof pickerModal === "string" && pickerModal.indexOf("<") >= 0) {
				pickerModal = $(pickerModal);

				if (pickerModal.length > 0) {
					if (removeOnClose) pickerModal.addClass("remove-on-close");
					$(defaults.modalContainer).append(pickerModal[0]);
				} else return false;
			}

			pickerModal = $(pickerModal);
			if (pickerModal.length === 0) return false;
			pickerModal.show();
			$.openModal(pickerModal);
			return pickerModal[0];
		};

		$.loginScreen = function(modal) {
			if (!modal) modal = ".login-screen";
			modal = $(modal);
			if (modal.length === 0) return false;
			modal.show();

			if (modal.find("." + defaults.viewClass).length > 0) {
				$.sizeNavbars(modal.find("." + defaults.viewClass)[0]);
			}

			$.openModal(modal);
			return modal[0];
		};

		$.toast = function(msg, duration, extraclass) {
			var $toast = $("<div class=\"modal toast " + (extraclass || "") + "\">" + msg + "</div>").appendTo(document.body);
			$.openModal($toast, function() {
				setTimeout(function() {
					$.closeModal($toast);
				}, duration || 2000);
			});
		};

		$.openModal = function(modal, cb) {
			modal = $(modal);
			var isModal = modal.hasClass("modal"),
				isNotToast = !modal.hasClass("toast");

			if ($(".modal.modal-in:not(.modal-out)").length && defaults.modalStack && isModal && isNotToast) {
				$.modalStack.push(function() {
					$.openModal(modal, cb);
				});
				return;
			}

			var isPopup = modal.hasClass("popup");
			var isLoginScreen = modal.hasClass("login-screen");
			var isPickerModal = modal.hasClass("picker-modal");
			var isToast = modal.hasClass("toast");

			if (isModal) {
				modal.show();
			}

			var overlay;

			if (!isLoginScreen && !isPickerModal && !isToast) {
				if ($(".modal-overlay").length === 0 && !isPopup) {
					$(defaults.modalContainer).append("<div class=\"modal-overlay\"></div>");
				}

				if ($(".popup-overlay").length === 0 && isPopup) {
					$(defaults.modalContainer).append("<div class=\"popup-overlay\"></div>");
				}

				overlay = isPopup ? $(".popup-overlay") : $(".modal-overlay");
			}

			var clientLeft = modal[0].clientLeft;
			modal.trigger("open");

			if (isPickerModal) {
				$(defaults.modalContainer).addClass("with-picker-modal");
			}

			if (!isLoginScreen && !isPickerModal && !isToast) overlay.addClass("modal-overlay-visible");
			modal.removeClass("modal-out").addClass("modal-in").transitionEnd(function(e) {
				if (modal.hasClass("modal-out")) modal.trigger("closed");
				else modal.trigger("opened");
			});

			if (typeof cb === "function") {
				cb.call(this);
			}

			return true;
		};

		$.closeModal = function(modal) {
			modal = $(modal || ".modal-in");

			if (typeof modal !== "undefined" && modal.length === 0) {
				return;
			}

			var isModal = modal.hasClass("modal"),
				isPopup = modal.hasClass("popup"),
				isToast = modal.hasClass("toast"),
				isLoginScreen = modal.hasClass("login-screen"),
				isPickerModal = modal.hasClass("picker-modal"),
				removeOnClose = modal.hasClass("remove-on-close"),
				overlay = isPopup ? $(".popup-overlay") : $(".modal-overlay");

			if (isPopup) {
				if (modal.length === $(".popup.modal-in").length) {
					overlay.removeClass("modal-overlay-visible");
				}
			} else if (!(isPickerModal || isToast)) {
				overlay.removeClass("modal-overlay-visible");
			}

			modal.trigger("close");

			if (isPickerModal) {
				$(defaults.modalContainer).removeClass("with-picker-modal");
				$(defaults.modalContainer).addClass("picker-modal-closing");
			}

			modal.removeClass("modal-in").addClass("modal-out").transitionEnd(function(e) {
				if (modal.hasClass("modal-out")) modal.trigger("closed");
				else modal.trigger("opened");

				if (isPickerModal) {
					$(defaults.modalContainer).removeClass("picker-modal-closing");
				}

				if (isPopup || isLoginScreen || isPickerModal) {
					modal.removeClass("modal-out").hide();

					if (removeOnClose && modal.length > 0) {
						modal.remove();
					}
				} else {
					modal.remove();
				}
			});

			if (isModal && defaults.modalStack) {
				$.modalStackClearQueue();
			}

			return true;
		};

		function handleClicks(e) {
			var clicked = $(this);
			var url = clicked.attr("href");
			var clickedData = clicked.dataset();
			var popup;

			if (clicked.hasClass("open-popup")) {
				if (clickedData.popup) {
					popup = clickedData.popup;
				} else popup = ".popup";

				$.popup(popup);
			}

			if (clicked.hasClass("close-popup")) {
				if (clickedData.popup) {
					popup = clickedData.popup;
				} else popup = ".popup.modal-in";

				$.closeModal(popup);
			}

			if (clicked.hasClass("modal-overlay")) {
				if ($(".modal.modal-in").length > 0 && defaults.modalCloseByOutside) $.closeModal(".modal.modal-in");
				if ($(".actions-modal.modal-in").length > 0 && defaults.actionsCloseByOutside) $.closeModal(
					".actions-modal.modal-in");
			}

			if (clicked.hasClass("popup-overlay")) {
				if ($(".popup.modal-in").length > 0 && defaults.popupCloseByOutside) $.closeModal(".popup.modal-in");
			}
		}

		$(document).on("click", " .modal-overlay, .popup-overlay, .close-popup, .open-popup, .close-picker", handleClicks);
		var defaults = $.modal.prototype.defaults = {
			modalStack: true,
			modalButtonOk: "确定",
			modalButtonCancel: "取消",
			modalPreloaderTitle: "加载中",
			modalContainer: document.body
		};
	})(jquery);
	/* 组件 */


	var form_mixin = {
		model: {
			prop: 'value',
			event: 'input'
		},
		props: (_props = {
			// 宽度
			width: {
				type: String,
				default: ''
			},
			height: {
				type: String,
				default: ''
			},
			// 类型
			type: {
				type: String,
				default: 'text'
			},
			// 选项
			options: {
				type: Array,
				default: function _default() {
					return [];
				}
			},
			// 赋值
			value: {
				type: [String, Number, Boolean]
			},
			// 回调函数
			func: {
				type: Function,
				default: function _default(fun, param1, param2) {
					return null;
				}
			},
			// 显示方式
			display: {
				type: String,
				default: "1"
			},
			// 显示隐藏
			show: {
				type: Boolean,
				default: false
			},
			// 标题
			title: {
				type: String,
				default: ""
			},
			// 图标
			icon: {
				type: String,
				default: ''
			},
			// 单位
			unit: {
				type: String,
				default: ''
			},
			// 描述
			desc: {
				type: String,
				default: ""
			},
			// 错误提示
			tip: {
				type: String,
				default: ""
			},
			// 最小值
			min: {
				type: Number,
				default: 0
			},
			// 最大值
			max: {
				type: Number,
				default: 0
			},
			// 最小长度
			min_length: {
				type: Number,
				default: 0
			},
			// 最大长度
			max_length: {
				type: Number,
				default: 65535
			},
			// 主键
			field: {
				type: String,
				default: "value"
			}
		}, _defineProperty(_props, "type", {
			type: String,
			default: "text"
		}), _defineProperty(_props, "num", {
			type: Number,
			default: 1
		}), _defineProperty(_props, "text", {
			type: String,
			default: ""
		}), _defineProperty(_props, "disabled", {
			type: Boolean,
			default: false
		}), _defineProperty(_props, "url", {
			type: String,
			default: ""
		}), _defineProperty(_props, "user_group", {
			type: Array,
			default: function _default() {
				return [];
			}
		}), _defineProperty(_props, "user_admin", {
			type: Array,
			default: function _default() {
				return [];
			}
		}), _defineProperty(_props, "vip", {
			type: Number,
			default: 0
		}), _defineProperty(_props, "gm", {
			type: Number,
			default: 0
		}), _defineProperty(_props, "oauth", {
			type: Boolean,
			default: false
		}), _props),
		data: function data() {
			return {
				// 显示方式
				dy: this.display,
				// 显示隐藏
				sw: this.show,
				// 加载中
				load: this.loading,
				// 列表
				oj: this.obj,
				// 数量
				nm: this.num,
				// 文本
				txt: this.text,
				// 值
				val: this.value,
				// 禁用
				dd: this.disabled
			};
		},
		methods: {
			/// 可更改其他属性，默认绑定回调函数
			/// fun: 函数名
			/// param1: 参数1
			/// param2: 参数2
			/// param3: 参数3
			run: function run(fun, param1, param2, param3) {
				if (this.func) {
					return this.func(param1, param2, param3);
				}

				return null;
			},
			// 删除
			/// query: 查询条件
			del: function del() {
				var query = {};
				query[this.field] = this.id;
				this.run('del', query);
			},
			// 修改
			/// query: 查询条件
			/// obj: 修改的对象
			set: function set(obj) {
				var query = {};
				query[this.field] = this.id;
				this.run('set', query, obj);
			}
		}
	};
	var mm_btn = {
		template: "<!-- \u6309\u94AE --><button :class=\"'mm_btn' + te\" v-if=\"!url\" @click=\"click_down()\"><slot></slot></button><button type=\"button\" :class=\"'mm_btn' + te\" @click=\"openBrowser()\" v-else-if=\"url.indexOf('http:') === 0 || url.indexOf('https:') === 0\"><slot></slot></button><router-link :class=\"'mm_btn' + te\" :to=\"url\" v-else><slot></slot></router-link>",
		props: {
			url: {
				type: String,
				default: ""
			},
			type: {
				type: String,
				default: ""
			},
			func: {
				type: Function,
				default: function _default() {}
			}
		},
		data: function data() {
			return {
				te: ""
			};
		},
		methods: {
			openBrowser: function openBrowser() {
				if (window) {
					window.open(this.url);
				}
			},
			click_down: function click_down() {
				if (this.func) {
					this.func();
				}
			}
		},
		created: function created() {
			var t = this.type;

			if (t) {
				if (t.indexOf("btn-") == -1) {
					this.te = " btn-" + t;
				}
			}
		}
	};
	var mm_icon = {
		template: "<!-- \u56FE\u6807 --><div class=\"mm_icon\" v-if=\"src.indexOf('<') !== -1\" v-html=\"src\"></div><div class=\"mm_icon\" v-else-if=\"src\"><img :src=\"src\" mode=\"mode\" /></div><div class=\"mm_icon\" v-else></div>",
		props: {
			src: {
				type: String,
				default: ""
			},
			height: {
				type: String,
				default: ""
			},
			auto: {
				type: String,
				default: ""
			}
		},
		data: function data() {
			var mode = "";

			if (this.auto) {
				mode = "widthFix";
			}

			return {
				mode: mode
			};
		}
	};
	var mm_loading = {
		template: "<div class=\"mm_loading\"><div class=\"load\"><slot><img src=\"/img/loading.svg\" :style=\"'width:' + wh + ';height:' + ht\" v-if=\"display == '1'\" /><div class=\"progress\" :style=\"'width:' + wh + ';height:' + ht\" v-else></div></slot></div><div class=\"state\">{{ title }}<span class=\"value\" v-show=\"value\"> {{ value }}</span></div></div>",
		props: {
			value: {
				type: Number,
				default: 0
			},
			title: {
				type: String,
				default: "加载中"
			},
			width: {
				type: String,
				default: ""
			},
			height: {
				type: String,
				default: ""
			},
			display: {
				type: String,
				default: "1"
			}
		},
		data: function data() {
			var wh = "";
			var ht = "";

			if (this.width) {
				wh = this.width;
			} else {
				if (this.display === "1") {
					wh = "1.5rem";
				} else if (this.display === "2") {
					wh = "100%";
				}
			}

			if (this.height) {
				wh = this.height;
			} else {
				if (this.display === "1") {
					ht = "1.5rem";
				} else if (this.display === "2") {
					ht = "4px";
				}
			}

			return {
				ht: ht,
				wh: wh
			};
		}
	};
	var mm_body = {
		template: "<!-- \u5757\u4E3B\u4F53 --><div class=\"mm_body\"><slot></slot></div>"
	};
	var mm_col = {
		template: "<!-- \u683C\u5B50 --><div :class=\"'mm_col' + this.wh\"><slot></slot></div>",
		props: {
			width: {
				type: String,
				default: ""
			}
		},
		data: function data() {
			return {
				wh: this.width
			};
		},
		created: function created() {
			var wh = this.wh;
			if (wh) {
				if (wh.indexOf("_") == -1) {
					this.wh = "_" + wh;
				}
			}
		}
	};
	var mm_foot = {
		template: "<!-- \u5757\u5C3E --><div class=\"mm_foot\"><slot></slot></div>"
	};
	var mm_grid = {
		template: "<!-- \u6805\u683C --><div :class=\"'mm_grid' + cl\"><slot></slot></div>",
		props: {
			col: {
				type: String,
				default: ""
			}
		},
		computed: {
			cl: function cl() {
				var cl = this.col;

				if (cl && cl.indexOf("_") == -1) {
					cl = "_" + cl;
				}

				return cl;
			}
		}
	};
	var mm_group = {
		template: "<!-- \u7EC4\u5408\u6846 --><div class=\"mm_group\"><slot></slot></div>"
	};
	var mm_head = {
		template: "<!-- \u5757\u5934 --><div class=\"mm_head\"><slot></slot></div>"
	};
	var mm_item = {
		template: "<!-- \u9879\u76EE\u5757 --><div class=\"mm_item\" v-if=\"!url\"><slot></slot></div><div class=\"mm_item\" @click=\"openBrowser()\" v-else-if=\"url.indexOf('http:') === 0 || url.indexOf('https:') === 0\"><slot></slot></div><router-link class=\"mm_item\" :to=\"url\" v-else><slot></slot></router-link>",
		props: {
			url: {
				type: String,
				default: ""
			}
		},
		data: function data() {
			return {
				type: ""
			};
		},
		methods: {
			openBrowser: function openBrowser() {
				if (window) {
					window.open(this.url);
				}
			}
		}
	};
	var mm_list = {
		template: "<!-- \u5217\u8868 --><div :class=\"'mm_list' + cl\"><slot></slot></div>",
		props: {
			col: {
				type: String,
				default: ""
			}
		},
		computed: {
			cl: function cl() {
				var cl = this.col;

				if (cl && cl.indexOf("_") == -1) {
					cl = "_" + cl;
				}

				return cl;
			}
		}
	};
	var mm_main = {
		template: "<div class=\"mm_main\"><slot></slot></div>"
	};
	var mm_modal = {
		template: "<!-- \u6A21\u6001\u7A97 --><div class=\"mm_modal\" v-bind:class=\"{ 'show' : show }\"><div v-bind:class=\"'from_' + display\"><slot></slot></div><!-- \u906E\u7F69 --><div class=\"mask\" v-if=\"mask && mask != 'false'\" @click=\"close()\"></div></div>",
		props: {
			display: {
				type: String,
				default: "default"
			},
			show: {
				type: Boolean,
				default: false
			},
			mask: {
				type: String,
				default: ""
			}
		},
		model: {
			prop: "show",
			event: "input"
		},
		methods: {
			close: function close() {
				this.$emit("input", false);
			}
		}
	};
	var mm_movable = {
		template: "<!-- \u62D6\u52A8\u5BB9\u5668 --><div class=\"mm_movable\"><slot></slot></div>"
	};
	var mm_page = {
		template: "<!-- \u9875\u9762 --><div class=\"mm_page\"><slot></slot></div>",
		props: {
			fun: {
				type: Function,
				default: function _default() {}
			}
		}
	};
	var mm_view = {
		template: "<!-- \u5757 --><div class=\"mm_view\" v-if=\"!url\"><slot></slot></div><div class=\"mm_view\" @click=\"openBrowser()\" v-else-if=\"url.indexOf('http:') === 0 || url.indexOf('https:') === 0\"><slot></slot></div><router-link class=\"mm_view\" :to=\"url\" v-else><slot></slot></router-link>",
		props: {
			url: {
				type: String,
				default: ""
			}
		},
		data: function data() {
			return {
				type: ""
			};
		},
		methods: {
			openBrowser: function openBrowser() {
				if (window) {
					window.open(this.url);
				}
			}
		}
	};

	function bindResize(tag, target, func) {
		var width_init = $(target).width();
		var el = $(tag);
		var x = 0;
		var y = 0;
		el.mousedown(function(e) {
			x = e.clientX - el.offset().left;
			el.setCapture ? (el.setCapture(), el.onmousemove = function(ev) {
				mouseMove(ev || event);
			}, el.onmouseup = mouseUp) : $(document).bind("mousemove", mouseMove).bind("mouseup", mouseUp);
			e.preventDefault();
		});

		function mouseMove(e) {
			var width = e.clientX - x;

			if (width >= width_init) {
				$(target).width(width + "px");

				if (func) {
					func(width);
				}
			}
		}

		function mouseUp() {
			el.releaseCapture ? (el.releaseCapture(), el.onmousemove = el.onmouseup = null) : $(document).unbind("mousemove",
				mouseMove).unbind("mouseup", mouseUp);
		}
	}

	var mm_side = {
		template: "<div class=\"mm_side\" :id=\"side_id\"><slot></slot><div class=\"line\"></div></div>",
		props: {
			id: {
				type: String,
				default: ""
			},
			func: {
				type: Function,
				default: function _default(width) {}
			}
		},
		data: function data() {
			var id = this.id;

			if (!id) {
				id = "mm_side" + parseInt(Math.random() * 1000 + 1, 10);
			}

			return {
				side_id: id
			};
		},
		mounted: function mounted() {
			var target = "#" + this.id;
			bindResize(target + " .line", target, this.func);
		}
	};
	var mm_table = {
		template: "<table :class=\"'mm_table' + te\"><slot></slot></table>",
		props: {
			type: {
				type: String,
				default: ""
			}
		},
		computed: {
			te: function te() {
				var t = this.type;

				if (t) {
					if (t.indexOf("table-") == -1) {
						t = " table-" + t;
					}
				}

				return t;
			}
		}
	};
	var mm_warp = {
		template: "<!-- \u9875\u5916\u5957 --><div class=\"mm_warp\"><slot></slot></div>"
	};
	var mm_checkbox = {
		template: "<!-- \u590D\u9009\u6846 --><div class=\"mm_checkbox\"><div class=\"title\" v-if=\"title\" v-html=\"title\"></div><div class=\"value\" v-bind:class=\"{'disabled': disabled }\"><label v-for=\"(o, idx) in options\" :key=\"idx\" :class=\"{ 'active': has(o[field]), 'disabled': o.disabled }\" @click=\"selected(o[field])\"><span class=\"figure\"></span><span class=\"name\">{{ o.name }}</span></label></div><div class=\"tip\" v-if=\"tip\">{{ tip }}</div></div>",
		mixins: [form_mixin],
		methods: {
			selected: function selected(val) {
				var arr = this.value.split(",");
				var idx = arr.indexOf(val);

				if (idx !== -1) {
					arr.splice(idx, 1);
				} else {
					arr.push(val);
				}

				var val = arr.join(",");

				if (val.indexOf(",") === 0) {
					val = val.substring(1);
				}

				this.$emit("input", val);
			},
			has: function has(val) {
				var arr = this.value.split(",");
				return arr.indexOf(val) !== -1;
			}
		}
	};
	var mm_code = {
		template: "<!-- \u9A8C\u8BC1\u7801 --><div class=\"mm_code\"><mm_icon :icon=\"icon\"></mm_icon><div class=\"title\" v-if=\"title\">{{ title }}</div><slot><mm_group><input type=\"text\" :value=\"value\" :placeholder=\"desc\" @input=\"$emit('input', $event.target.value)\"></input><button :class=\"'btn-' + type\" v-html=\"btn\"></button></mm_group></slot><div class=\"tip\" v-if=\"tip\" v-html=\"tip\"></div></div>",
		mixins: [form_mixin],
		props: {
			btn: {
				type: String,
				default: "发送验证码"
			}
		},
		computed: {
			ds: function ds() {
				if (this.btn.indexOf("s") == -1) {
					return false;
				} else {
					return true;
				}
			}
		}
	};
	var mm_input = {
		template: "<!-- \u8F93\u5165\u6846 --><div class=\"mm_input\"><div class=\"title\" v-if=\"title\" v-html=\"title\"></div><div class=\"value\" v-bind:class=\"{'disabled': disabled }\"><input :type=\"type\" :value=\"value\" :min=\"min\" :max=\"max\" :minlength=\"min_length\" :maxlength=\"max_length\" :placeholder=\"desc\" @input=\"set\" :disabled=\"disabled\" @blur=\"$emit('blur')\" /><slot><span class=\"unit\" v-if=\"unit\">{{ unit }}</span></slot></div><div class=\"tip\" v-if=\"tip\">{{ tip }}</div></div>",
		mixins: [form_mixin],
		methods: {
			set: function set(e) {
				if (this.type === "number") {
					var value = e.target.value ? e.target.value : "0";

					if (value.length > this.max_length && this.max_length !== 0) {
						value = value.substring(0, this.max_length);
					}

					var num = Number(value);

					if (num > this.max && this.max !== 0) {
						num = this.max;
					} else if (num < this.min) {
						num = this.min;
					}

					e.target.value = num.toString();
					this.$emit("input", num);
				} else {
					this.$emit("input", e.target.value);
				}
			}
		}
	};
	var mm_number = {
		template: "<!-- \u6570\u5B57\u6846 --><div class=\"mm_number\"><div class=\"title\" v-if=\"title\" v-html=\"title\"></div><div class=\"value\" v-bind:class=\"{'disabled': disabled }\"><mm_btn :type=\"type\" @click.native=\"del\"><span class=\"btn-del\"></span></mm_btn><input type=\"number\" :value=\"value\" :min=\"min\" :max=\"max\" @input=\"set\" @blur=\"setInt\" :disabled=\"disabled\"/><mm_btn :type=\"type\" @click.native=\"add\"><span class=\"btn-add\"></span></mm_btn></div><div class=\"tip\" v-if=\"tip\">{{ tip }}</div></div>",
		mixins: [form_mixin],
		methods: {
			setInt: function setInt(e) {
				var value = e.target.value ? e.target.value : "0";
				var num = Number(value);
				num = parseInt(num / this.num) * this.num;
				this.call(num);
			},
			add: function add() {
				this.call(this.value + this.num);
			},
			del: function del() {
				this.call(this.value - this.num);
			},
			set: function set(e) {
				var value = e.target.value ? e.target.value : "0";
				var num = Number(value);
				e.target.value = this.call(num);
			},
			call: function call(num) {
				if (num > this.max && this.max !== 0) {
					num = this.max;
				} else if (num < this.min) {
					num = this.min;
				}

				this.$emit("input", num);
				return num;
			}
		}
	};
	var mm_pager = {
		template: "<!-- \u5206\u9875\u5668 --><div class=\"mm_pager\"><a href=\"javascript:void(0);\" v-if=\"display === '2'\" class=\"first\" @click=\"first\" v-bind:class=\"{ 'disabled': page === 1 }\"><span v-html=\"icons[0]\"></span></a><a href=\"javascript:void(0);\" class=\"previous\" @click=\"previous\" v-bind:class=\"{ 'disabled' : page <= 1 }\"><span v-html=\"icons[1]\"></span></a><a href=\"javascript:void(0);\" v-for=\"(p, i) in pages\" :key=\"i\" v-bind:class=\"{'active': page == p }\" @click=\"set(p)\">{{ p }}</a><a href=\"javascript:void(0);\" class=\"next\" v-bind:class=\"{ 'disabled': page >= count }\" @click=\"next\"><span v-html=\"icons[2]\"></span></a><a href=\"javascript:void(0);\" v-if=\"display === '2'\" class=\"last\" v-bind:class=\"{ 'disabled': page == count }\" @click=\"last\"><span v-html=\"icons[3]\"></span></a></div>",
		model: {
			prop: "page",
			event: "input"
		},
		props: {
			display: {
				type: String,
				default: "1"
			},
			count: {
				type: Number,
				default: 1
			},
			num: {
				type: Number,
				default: 5
			},
			page: {
				type: Number,
				default: 1
			},
			func: {
				type: Function,
				default: function _default(page) {}
			},
			icons: {
				type: Array,
				default: function _default() {
					return ["<<", "<", ">", ">>"];
				}
			}
		},
		data: function data() {
			return {
				pe: this.page
			};
		},
		computed: {
			ct: function ct() {
				return Math.ceil(this.count);
			},
			pages: function pages() {
				var pe = this.page;
				var arr = [pe];
				var len = this.num;
				var end = this.ct;

				for (var i = 0; i < len; i++) {
					var right = pe + i + 1;

					if (right <= end) {
						arr.push(right);
					}

					var left = pe - i - 1;

					if (left > 0) {
						arr.push(left);
					}
				}

				return arr.splice(0, len).sort(function(a, b) {
					return a - b;
				});
			}
		},
		methods: {
			goTo: function goTo(page) {
				if (this.func) {
					this.func(page);
				}

				this.$emit("input", page);
			},
			first: function first() {
				this.pe = 1;
				this.goTo(this.pe);
			},
			previous: function previous() {
				this.pe = this.page - 1;

				if (this.pe < 1) {
					this.pe = 1;
				}

				;
				this.goTo(this.pe);
			},
			set: function set(p) {
				this.pe = p;
				this.goTo(this.pe);
			},
			next: function next() {
				this.pe = this.page + 1;

				if (this.pe > this.ct) {
					this.pe = this.ct;
				}

				;
				this.goTo(this.pe);
			},
			last: function last() {
				this.pe = this.ct;
				this.goTo(this.pe);
			}
		}
	};
	var mm_radio = {
		template: "<!-- \u5355\u9009\u6846 --><div class=\"mm_radio\"><div class=\"title\" v-if=\"title\" v-html=\"title\"></div><div class=\"value\" v-bind:class=\"{'disabled': disabled }\"><label v-for=\"(o, idx) in options\" :key=\"idx\" :class=\"{ 'active': value === o[field] }\" @click=\"$emit('input', $event.target.value)\"><input type=\"radio\" :name=\"name\" :value=\"o[field]\" /><span class=\"figure\"></span><span class=\"name\">{{ o.name }}</span></label></div><div class=\"tip\" v-if=\"tip\">{{ tip }}</div></div>",
		mixins: [form_mixin],
		data: function data() {
			var name = this.name;

			if (!name) {
				name = $.md5(Math.random().toString()).substring(0, 8);
			}

			return {
				name: name
			};
		}
	};
	var mm_reverse = {
		template: "<div class=\"mm_reverse\"><div class=\"title\" v-if=\"title\" v-html=\"title\" @click=\"set\"></div><div class=\"value\" v-bind:class=\"{'disabled': disabled }\"><slot><div class=\"figure\" v-bind:class=\"{ 'reverse_arrow' : display !== '1' }\" @click=\"set\"><span class=\"up\" v-bind:class=\"{'active': seleted === 0 }\"></span><span class=\"down\" v-bind:class=\"{'active': seleted === 1 }\"></span></div></slot></div><div class=\"tip\" v-if=\"tip\">{{ tip }}</div></div>",
		mixins: [form_mixin],
		methods: {
			set: function set() {
				var n = this.seleted;
				n += 1;
				var lt = this.options;
				var v = "";

				if (n < lt.length) {
					v = lt[n];
				} else if (n > lt.length) {
					n = 0;
					v = lt[0];
				}

				var val = this.value;
				var has = false;

				for (var i = 0; i < lt.length; i++) {
					var o = lt[i];

					if (val.indexOf(o) !== -1) {
						val = val.replace(o, v);
						has = true;
						val = val.replace(",,", ",");
						break;
					}
				}

				if (!has) {
					val += "," + v;
				}

				if (val.indexOf(",") === 0) {
					val = val.substring(1);
				}

				this.$emit("input", val);

				if (this.func) {
					this.func(val);
				}
			}
		},
		computed: {
			seleted: function seleted() {
				var lt = this.options;
				var val = this.value;
				var seleted = 2;

				for (var i = 0; i < lt.length; i++) {
					var o = lt[i];

					if (val.indexOf(o) !== -1) {
						seleted = i;
						break;
					}
				}

				return seleted;
			}
		}
	};
	var mm_select = {
		template: "<!-- \u9009\u62E9\u6846 --><div class=\"mm_select\"><div class=\"title\" v-if=\"title\" v-html=\"title\"></div><div class=\"value\" v-bind:class=\"{'disabled': disabled }\"><select v-if=\"type === 'text'\" :value=\"value\" @change=\"set\" :disabled=\"disabled\"><option v-for=\"(o, idx) in options\" :key=\"idx\" :value=\"o[field]\">{{ o.name }}</option></select><a href=\"javascript:void(0)\" class=\"click\" v-else-if=\"type === 'click'\" v-bind:class=\"{ 'current': sw }\"><div :class=\"{'selected': !$slots.default}\" @click=\"sw = !sw\"><slot>{{ val_name }}</slot></div><div class=\"mm_box\"><ul><li v-for=\"(o, idx) in options\" :key=\"idx\" @click=\"click_fun(o[field]);sw = false\" :class=\"{ 'active': value === o[field] }\">{{ o.name }}</li></ul></div></a><a href=\"javascript:void(0)\" v-bind:class=\"type\" v-else><div class=\"selected\"><slot>{{ val_name }}</slot></div><div class=\"mm_box\"><ul><li v-for=\"(o, idx) in options\" :key=\"idx\" @click=\"click_fun(o[field])\" :class=\"{ 'active': value === o[field] }\">{{ o.name }}</li></ul></div></a></div><div class=\"tip\" v-if=\"tip\">{{ tip }}</div></div>",
		mixins: [form_mixin],
		methods: {
			set: function set(e) {
				var val = e.target.value;
				this.$emit("input", val);

				if (this.value !== val) {
					this.$emit("change");
				}
			},
			click_fun: function click_fun(value) {
				this.$emit("input", value);
				this.func(value);
			}
		},
		computed: {
			val_name: function val_name() {
				var k = this.field;
				var v = this.value;
				var lt = this.options;
				var name = "";

				for (var i = 0; i < lt.length; i++) {
					var o = lt[i];

					if (o[k] === v) {
						name = o.name;
						break;
					}
				}

				return name;
			}
		}
	};
	var mm_switch = {
		template: "<!-- \u5F00\u5173 --><div class=\"mm_switch\"><div class=\"title\" v-if=\"title\" v-html=\"title\"></div><div class=\"value\" v-bind:class=\"{'disabled': disabled }\"><label :class=\"{ 'active': value === 1 }\" @click=\"set\"><div class=\"onoff\"><span class=\"on\" v-if=\"display === '1'\"></span><span class=\"off\" v-if=\"display === '1'\"></span></div></label></div><div class=\"tip\" v-if=\"tip\">{{ tip }}</div></div>",
		mixins: [form_mixin],
		methods: {
			set: function set() {
				var val = 0;

				if (this.value === 0) {
					val = 1;
				}

				this.$emit("input", val);
			}
		}
	};
	var mm_nav = {
		template: "<ul class=\"mm_nav\"><li v-for=\"(o, index) in list\" :key=\"index\"><a :href=\"o.url\" v-if=\"o.url.indexOf('http:') === 0 || o.url.indexOf('https:') === 0\">{{ o.title }}<span class=\"message\" v-show=\"o.message > 0\">{{ o.message }}</span></a><router-link :to=\"o.url\" v-else>{{ o.title }}<span class=\"message\" v-show=\"o.message > 0\">{{ o.message }}</span></router-link></li></ul>",
		props: {
			list: {
				type: Array,
				default: function _default() {
					return [];
				}
			},
			vm: {
				type: Object,
				default: function _default() {
					return {
						icon: "icon",
						title: "title",
						desc: "desc",
						url: "url",
						name: "name",
						tip: "tip"
					};
				}
			}
		}
	};
	return {
		install: function install(Vue, options) {
			Vue.component("mm_icon", mm_icon);
			Vue.component("mm_btn", mm_btn);
			Vue.component("mm_loading", mm_loading);
			Vue.component("mm_body", mm_body);
			Vue.component("mm_col", mm_col);
			Vue.component("mm_foot", mm_foot);
			Vue.component("mm_grid", mm_grid);
			Vue.component("mm_group", mm_group);
			Vue.component("mm_head", mm_head);
			Vue.component("mm_item", mm_item);
			Vue.component("mm_list", mm_list);
			Vue.component("mm_main", mm_main);
			Vue.component("mm_modal", mm_modal);
			Vue.component("mm_movable", mm_movable);
			Vue.component("mm_page", mm_page);
			Vue.component("mm_view", mm_view);
			Vue.component("mm_side", mm_side);
			Vue.component("mm_table", mm_table);
			Vue.component("mm_warp", mm_warp);
			Vue.component("mm_checkbox", mm_checkbox);
			Vue.component("mm_code", mm_code);
			Vue.component("mm_input", mm_input);
			Vue.component("mm_number", mm_number);
			Vue.component("mm_pager", mm_pager);
			Vue.component("mm_radio", mm_radio);
			Vue.component("mm_reverse", mm_reverse);
			Vue.component("mm_select", mm_select);
			Vue.component("mm_switch", mm_switch);
			Vue.component("mm_nav", mm_nav);
		}
	};
});
