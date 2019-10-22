// 内容容器
import mm_btn from '/src/components/content/mm_btn.vue';
import mm_icon from '/src/components/content/mm_icon.vue';
import mm_loading from '/src/components/content/mm_loading.vue';
import mm_pre from '/src/components/content/mm_pre.vue';

// 布局容器
import mm_body from '/src/components/layout/mm_body.vue';
import mm_col from '/src/components/layout/mm_col.vue';
import mm_foot from '/src/components/layout/mm_foot.vue';
import mm_grid from '/src/components/layout/mm_grid.vue';
import mm_group from '/src/components/layout/mm_group.vue';
import mm_head from '/src/components/layout/mm_head.vue';
import mm_item from '/src/components/layout/mm_item.vue';
import mm_list from '/src/components/layout/mm_list.vue';
import mm_modal from '/src/components/layout/mm_modal.vue';
import mm_movable from '/src/components/layout/mm_movable.vue';
import mm_page from '/src/components/layout/mm_page.vue';
import mm_div from '/src/components/layout/mm_div.vue';
import mm_side from '/src/components/layout/mm_side.vue';
import mm_table from '/src/components/layout/mm_table.vue';
import mm_warp from '/src/components/layout/mm_warp.vue';

// 表单组件
import mm_checkbox from '/src/components/form/mm_checkbox.vue';
import mm_code from '/src/components/form/mm_code.vue';
import mm_input from '/src/components/form/mm_input.vue';
import mm_number from '/src/components/form/mm_number.vue';
import mm_pager from '/src/components/form/mm_pager.vue';
import mm_radio from '/src/components/form/mm_radio.vue';
import mm_reverse from '/src/components/form/mm_reverse.vue';
import mm_select from '/src/components/form/mm_select.vue';
import mm_switch from '/src/components/form/mm_switch.vue';

// 拓展组件
import mm_nav from '/src/components/expand/mm_nav.vue';

export default {
	/**
	 * @description 安装
	 * @param {Object} Vue 框架
	 * @param {Object} options 配置参数
	 */
	install(Vue, options) {
		/* === 创建全局组件 === */
		// 内容容器
		Vue.component('mm_icon', mm_icon);
		Vue.component('mm_btn', mm_btn);
		Vue.component('mm_loading', mm_loading);

		// 布局容器
		Vue.component('mm_body', mm_body);
		Vue.component('mm_col', mm_col);
		Vue.component('mm_foot', mm_foot);
		Vue.component('mm_grid', mm_grid);
		Vue.component('mm_group', mm_group);
		Vue.component('mm_head', mm_head);
		Vue.component('mm_item', mm_item);
		Vue.component('mm_list', mm_list);
		Vue.component('mm_modal', mm_modal);
		Vue.component('mm_movable', mm_movable);
		Vue.component('mm_page', mm_page);
		Vue.component('mm_div', mm_div);
		Vue.component('mm_side', mm_side);
		Vue.component('mm_table', mm_table);
		Vue.component('mm_warp', mm_warp);

		// 表单组件
		Vue.component('mm_checkbox', mm_checkbox);
		Vue.component('mm_code', mm_code);
		Vue.component('mm_input', mm_input);
		Vue.component('mm_number', mm_number);
		Vue.component('mm_pager', mm_pager);
		Vue.component('mm_radio', mm_radio);
		Vue.component('mm_reverse', mm_reverse);
		Vue.component('mm_select', mm_select);
		Vue.component('mm_switch', mm_switch);

		// 拓展组件
		Vue.component('mm_nav', mm_nav);
	}
};

import jquery from 'jquery'

function __dealCssEvent(eventNameArr, callback) {
	var events = eventNameArr,
		i, dom = this; // jshint ignore:line

	function fireCallBack(e) {
		/*jshint validthis:true */
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
	for (var key in ds) { // jshint ignore:line
		var item = (dataset[key] = ds[key]);
		if (item === 'false') dataset[key] = false;
		else if (item === 'true') dataset[key] = true;
		else if (parseFloat(item) === item * 1) dataset[key] = item * 1;
	}
	// mixin dataset and __eleData
	return jquery.extend({}, dataset, this[0].__eleData);
};

jquery.fn.animationEnd = function(callback) {
	__dealCssEvent.call(this, ['webkitAnimationEnd', 'animationend'], callback);
	return this;
};
jquery.fn.transitionEnd = function(callback) {
	__dealCssEvent.call(this, ['webkitTransitionEnd', 'transitionend'], callback);
	return this;
};
jquery.fn.transition = function(duration) {
	if (typeof duration !== 'string') {
		duration = duration + 'ms';
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
	"use strict";
	var _modalTemplateTempDiv = document.createElement('div');

	$.modalStack = [];

	$.modalStackClearQueue = function() {
		if ($.modalStack.length) {
			($.modalStack.shift())();
		}
	};
	$.modal = function(params) {
		params = params || {};
		var modalHTML = '';
		var buttonsHTML = '';
		if (params.buttons && params.buttons.length > 0) {
			for (var i = 0; i < params.buttons.length; i++) {
				buttonsHTML += '<span class="modal-button' + (params.buttons[i].bold ? ' modal-button-bold' : '') + '">' + params
					.buttons[
						i].text + '</span>';
			}
		}
		var extraClass = params.extraClass || '';
		var titleHTML = params.title ? '<div class="modal-title">' + params.title + '</div>' : '';
		var textHTML = params.text ? '<div class="modal-text">' + params.text + '</div>' : '';
		var afterTextHTML = params.afterText ? params.afterText : '';
		var noButtons = !params.buttons || params.buttons.length === 0 ? 'modal-no-buttons' : '';
		var verticalButtons = params.verticalButtons ? 'modal-buttons-vertical' : '';
		modalHTML = '<div class="modal ' + extraClass + ' ' + noButtons + '"><div class="modal-inner">' + (titleHTML +
				textHTML + afterTextHTML) + '</div><div class="modal-buttons ' + verticalButtons + '">' + buttonsHTML +
			'</div></div>';

		_modalTemplateTempDiv.innerHTML = modalHTML;

		var modal = $(_modalTemplateTempDiv).children();

		$(defaults.modalContainer).append(modal[0]);

		// Add events on buttons
		modal.find('.modal-button').each(function(index, el) {
			$(el).on('click', function(e) {
				if (params.buttons[index].close !== false) $.closeModal(modal);
				if (params.buttons[index].onClick) params.buttons[index].onClick(modal, e);
				if (params.onClick) params.onClick(modal, index);
			});
		});
		$.openModal(modal);
		return modal[0];
	};
	$.alert = function(text, title, callbackOk) {
		if (typeof title === 'function') {
			callbackOk = arguments[1];
			title = undefined;
		}
		return $.modal({
			text: text || '',
			title: typeof title === 'undefined' ? defaults.modalTitle : title,
			buttons: [{
				text: defaults.modalButtonOk,
				bold: true,
				onClick: callbackOk
			}]
		});
	};
	$.confirm = function(text, title, callbackOk, callbackCancel) {
		if (typeof title === 'function') {
			callbackCancel = arguments[2];
			callbackOk = arguments[1];
			title = undefined;
		}
		return $.modal({
			text: text || '',
			title: typeof title === 'undefined' ? defaults.modalTitle : title,
			buttons: [{
					text: defaults.modalButtonCancel,
					onClick: callbackCancel
				},
				{
					text: defaults.modalButtonOk,
					bold: true,
					onClick: callbackOk
				}
			]
		});
	};
	$.prompt = function(text, title, callbackOk, callbackCancel) {
		if (typeof title === 'function') {
			callbackCancel = arguments[2];
			callbackOk = arguments[1];
			title = undefined;
		}
		return $.modal({
			text: text || '',
			title: typeof title === 'undefined' ? defaults.modalTitle : title,
			afterText: '<input type="text" class="modal-text-input">',
			buttons: [{
					text: defaults.modalButtonCancel
				},
				{
					text: defaults.modalButtonOk,
					bold: true
				}
			],
			onClick: function(modal, index) {
				if (index === 0 && callbackCancel) callbackCancel($(modal).find('.modal-text-input').val());
				if (index === 1 && callbackOk) callbackOk($(modal).find('.modal-text-input').val());
			}
		});
	};
	$.modalLogin = function(text, title, callbackOk, callbackCancel) {
		if (typeof title === 'function') {
			callbackCancel = arguments[2];
			callbackOk = arguments[1];
			title = undefined;
		}
		return $.modal({
			text: text || '',
			title: typeof title === 'undefined' ? defaults.modalTitle : title,
			afterText: '<input type="text" name="modal-username" placeholder="' + defaults.modalUsernamePlaceholder +
				'" class="modal-text-input modal-text-input-double"><input type="password" name="modal-password" placeholder="' +
				defaults.modalPasswordPlaceholder + '" class="modal-text-input modal-text-input-double">',
			buttons: [{
					text: defaults.modalButtonCancel
				},
				{
					text: defaults.modalButtonOk,
					bold: true
				}
			],
			onClick: function(modal, index) {
				var username = $(modal).find('.modal-text-input[name="modal-username"]').val();
				var password = $(modal).find('.modal-text-input[name="modal-password"]').val();
				if (index === 0 && callbackCancel) callbackCancel(username, password);
				if (index === 1 && callbackOk) callbackOk(username, password);
			}
		});
	};
	$.modalPassword = function(text, title, callbackOk, callbackCancel) {
		if (typeof title === 'function') {
			callbackCancel = arguments[2];
			callbackOk = arguments[1];
			title = undefined;
		}
		return $.modal({
			text: text || '',
			title: typeof title === 'undefined' ? defaults.modalTitle : title,
			afterText: '<input type="password" name="modal-password" placeholder="' + defaults.modalPasswordPlaceholder +
				'" class="modal-text-input">',
			buttons: [{
					text: defaults.modalButtonCancel
				},
				{
					text: defaults.modalButtonOk,
					bold: true
				}
			],
			onClick: function(modal, index) {
				var password = $(modal).find('.modal-text-input[name="modal-password"]').val();
				if (index === 0 && callbackCancel) callbackCancel(password);
				if (index === 1 && callbackOk) callbackOk(password);
			}
		});
	};
	$.showPreloader = function(title) {
		$.hidePreloader();
		$.showPreloader.preloaderModal = $.modal({
			title: title || defaults.modalPreloaderTitle,
			text: '<div class="preloader"></div>'
		});

		return $.showPreloader.preloaderModal;
	};
	$.hidePreloader = function() {
		$.showPreloader.preloaderModal && $.closeModal($.showPreloader.preloaderModal);
	};
	$.showIndicator = function() {
		if ($('.preloader-indicator-modal')[0]) return;
		$(defaults.modalContainer).append(
			'<div class="preloader-indicator-overlay"></div><div class="preloader-indicator-modal"><span class="preloader preloader-white"></span></div>'
		);
	};
	$.hideIndicator = function() {
		$('.preloader-indicator-overlay, .preloader-indicator-modal').remove();
	};

	/* 添加自定义DIY提示器 */
	$.showIndicatorDiy = function(htmlcontent) {
		if ($('.preloader-indicator-modal')[0]) return;
		$(defaults.modalContainer).append(
			'<div class="preloader-indicator-overlay"></div><div class="preloader-indicator-modal">' + htmlcontent + '</div>'
		);
	};
	$.hideIndicatorDiy = function() {
		$('.preloader-indicator-overlay, .preloader-indicator-modal').remove();
	};

	// Action Sheet
	$.actions = function(params) {
		var modal, groupSelector, buttonSelector;
		params = params || [];

		if (params.length > 0 && !$.isArray(params[0])) {
			params = [params];
		}
		var modalHTML;
		var buttonsHTML = '';
		for (var i = 0; i < params.length; i++) {
			for (var j = 0; j < params[i].length; j++) {
				if (j === 0) buttonsHTML += '<div class="actions-modal-group">';
				var button = params[i][j];
				var buttonClass = button.label ? 'actions-modal-label' : 'actions-modal-button';
				if (button.bold) buttonClass += ' actions-modal-button-bold';
				if (button.color) buttonClass += ' font_' + button.color;
				if (button.bg) buttonClass += ' bg_' + button.bg;
				if (button.disabled) buttonClass += ' disabled';
				buttonsHTML += '<span class="' + buttonClass + '">' + button.text + '</span>';
				if (j === params[i].length - 1) buttonsHTML += '</div>';
			}
		}
		modalHTML = '<div class="actions-modal">' + buttonsHTML + '</div>';
		_modalTemplateTempDiv.innerHTML = modalHTML;
		modal = $(_modalTemplateTempDiv).children();
		$(defaults.modalContainer).append(modal[0]);
		groupSelector = '.actions-modal-group';
		buttonSelector = '.actions-modal-button';

		var groups = modal.find(groupSelector);
		groups.each(function(index, el) {
			var groupIndex = index;
			$(el).children().each(function(index, el) {
				var buttonIndex = index;
				var buttonParams = params[groupIndex][buttonIndex];
				var clickTarget;
				if ($(el).is(buttonSelector)) clickTarget = $(el);
				// if (toPopover && $(el).find(buttonSelector).length > 0) clickTarget = $(el).find(buttonSelector);

				if (clickTarget) {
					clickTarget.on('click', function(e) {
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
		if (typeof removeOnClose === 'undefined') removeOnClose = true;
		if (typeof modal === 'string' && modal.indexOf('<') >= 0) {
			var _modal = document.createElement('div');
			_modal.innerHTML = modal.trim();
			if (_modal.childNodes.length > 0) {
				modal = _modal.childNodes[0];
				if (removeOnClose) modal.classList.add('remove-on-close');
				$(defaults.modalContainer).append(modal);
			} else return false; //nothing found
		}
		modal = $(modal);
		if (modal.length === 0) return false;
		modal.show();
		modal.find(".content").scroller("refresh");
		if (modal.find('.' + defaults.viewClass).length > 0) {
			$.sizeNavbars(modal.find('.' + defaults.viewClass)[0]);
		}
		$.openModal(modal);

		return modal[0];
	};
	$.pickerModal = function(pickerModal, removeOnClose) {
		if (typeof removeOnClose === 'undefined') removeOnClose = true;
		if (typeof pickerModal === 'string' && pickerModal.indexOf('<') >= 0) {
			pickerModal = $(pickerModal);
			if (pickerModal.length > 0) {
				if (removeOnClose) pickerModal.addClass('remove-on-close');
				$(defaults.modalContainer).append(pickerModal[0]);
			} else return false; //nothing found
		}
		pickerModal = $(pickerModal);
		if (pickerModal.length === 0) return false;
		pickerModal.show();
		$.openModal(pickerModal);
		return pickerModal[0];
	};
	$.loginScreen = function(modal) {
		if (!modal) modal = '.login-screen';
		modal = $(modal);
		if (modal.length === 0) return false;
		modal.show();
		if (modal.find('.' + defaults.viewClass).length > 0) {
			$.sizeNavbars(modal.find('.' + defaults.viewClass)[0]);
		}
		$.openModal(modal);
		return modal[0];
	};
	//显示一个消息，会在2秒钟后自动消失
	$.toast = function(msg, duration, extraclass) {
		var $toast = $('<div class="modal toast ' + (extraclass || '') + '">' + msg + '</div>').appendTo(document.body);
		$.openModal($toast, function() {
			setTimeout(function() {
				$.closeModal($toast);
			}, duration || 2000);
		});
	};
	$.openModal = function(modal, cb) {
		modal = $(modal);
		var isModal = modal.hasClass('modal'),
			isNotToast = !modal.hasClass('toast');
		if ($('.modal.modal-in:not(.modal-out)').length && defaults.modalStack && isModal && isNotToast) {
			$.modalStack.push(function() {
				$.openModal(modal, cb);
			});
			return;
		}
		var isPopup = modal.hasClass('popup');
		var isLoginScreen = modal.hasClass('login-screen');
		var isPickerModal = modal.hasClass('picker-modal');
		var isToast = modal.hasClass('toast');
		if (isModal) {
			modal.show();
		}
		var overlay;
		if (!isLoginScreen && !isPickerModal && !isToast) {
			if ($('.modal-overlay').length === 0 && !isPopup) {
				$(defaults.modalContainer).append('<div class="modal-overlay"></div>');
			}
			if ($('.popup-overlay').length === 0 && isPopup) {
				$(defaults.modalContainer).append('<div class="popup-overlay"></div>');
			}
			overlay = isPopup ? $('.popup-overlay') : $('.modal-overlay');
		}

		//Make sure that styles are applied, trigger relayout;
		var clientLeft = modal[0].clientLeft;

		// Trugger open event
		modal.trigger('open');

		// Picker modal body class
		if (isPickerModal) {
			$(defaults.modalContainer).addClass('with-picker-modal');
		}

		// Classes for transition in
		if (!isLoginScreen && !isPickerModal && !isToast) overlay.addClass('modal-overlay-visible');
		modal.removeClass('modal-out').addClass('modal-in').transitionEnd(function(e) {
			if (modal.hasClass('modal-out')) modal.trigger('closed');
			else modal.trigger('opened');
		});
		// excute callback
		if (typeof cb === 'function') {
			cb.call(this);
		}
		return true;
	};
	$.closeModal = function(modal) {
		modal = $(modal || '.modal-in');
		if (typeof modal !== 'undefined' && modal.length === 0) {
			return;
		}
		var isModal = modal.hasClass('modal'),
			isPopup = modal.hasClass('popup'),
			isToast = modal.hasClass('toast'),
			isLoginScreen = modal.hasClass('login-screen'),
			isPickerModal = modal.hasClass('picker-modal'),
			removeOnClose = modal.hasClass('remove-on-close'),
			overlay = isPopup ? $('.popup-overlay') : $('.modal-overlay');
		if (isPopup) {
			if (modal.length === $('.popup.modal-in').length) {
				overlay.removeClass('modal-overlay-visible');
			}
		} else if (!(isPickerModal || isToast)) {
			overlay.removeClass('modal-overlay-visible');
		}

		modal.trigger('close');

		// Picker modal body class
		if (isPickerModal) {
			$(defaults.modalContainer).removeClass('with-picker-modal');
			$(defaults.modalContainer).addClass('picker-modal-closing');
		}

		modal.removeClass('modal-in').addClass('modal-out').transitionEnd(function(e) {
			if (modal.hasClass('modal-out')) modal.trigger('closed');
			else modal.trigger('opened');

			if (isPickerModal) {
				$(defaults.modalContainer).removeClass('picker-modal-closing');
			}
			if (isPopup || isLoginScreen || isPickerModal) {
				modal.removeClass('modal-out').hide();
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
		/*jshint validthis:true */
		var clicked = $(this);
		var url = clicked.attr('href');


		//Collect Clicked data- attributes
		var clickedData = clicked.dataset();

		// Popup
		var popup;
		if (clicked.hasClass('open-popup')) {
			if (clickedData.popup) {
				popup = clickedData.popup;
			} else popup = '.popup';
			$.popup(popup);
		}
		if (clicked.hasClass('close-popup')) {
			if (clickedData.popup) {
				popup = clickedData.popup;
			} else popup = '.popup.modal-in';
			$.closeModal(popup);
		}

		// Close Modal
		if (clicked.hasClass('modal-overlay')) {
			if ($('.modal.modal-in').length > 0 && defaults.modalCloseByOutside)
				$.closeModal('.modal.modal-in');
			if ($('.actions-modal.modal-in').length > 0 && defaults.actionsCloseByOutside)
				$.closeModal('.actions-modal.modal-in');

		}
		if (clicked.hasClass('popup-overlay')) {
			if ($('.popup.modal-in').length > 0 && defaults.popupCloseByOutside)
				$.closeModal('.popup.modal-in');
		}
	}
	$(document).on('click', ' .modal-overlay, .popup-overlay, .close-popup, .open-popup, .close-picker', handleClicks);
	var defaults = $.modal.prototype.defaults = {
		modalStack: true,
		modalButtonOk: '确定',
		modalButtonCancel: '取消',
		modalPreloaderTitle: '加载中',
		modalContainer: document.body
	};
})(jquery);
