/* 动效API */
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

(function(jquery) {
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
			extraClass: "modal-alert",
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
			extraClass: "modal-confirm",
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
			extraClass: "modal-prompt",
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
			extraClass: "modal-login",
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
			extraClass: "modal-password",
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

	$(document).ready(function() {
		if (!defaults.modalContainer) {
			defaults.modalContainer = document.body;
		}
	});
})($);
