// 内容容器
import mm_btn from '/src/components/content/mm_btn.vue'
import mm_icon from '/src/components/content/mm_icon.vue'
import mm_loading from '/src/components/content/mm_loading.vue'
import mm_pre from '/src/components/content/mm_pre.vue'

// 布局容器
import mm_body from '/src/components/layout/mm_body.vue'
import mm_col from '/src/components/layout/mm_col.vue'
import mm_foot from '/src/components/layout/mm_foot.vue'
import mm_grid from '/src/components/layout/mm_grid.vue'
import mm_group from '/src/components/layout/mm_group.vue'
import mm_head from '/src/components/layout/mm_head.vue'
import mm_item from '/src/components/layout/mm_item.vue'
import mm_list from '/src/components/layout/mm_list.vue'
import mm_modal from '/src/components/layout/mm_modal.vue'
import mm_movable from '/src/components/layout/mm_movable.vue'
import mm_page from '/src/components/layout/mm_page.vue'
import mm_div from '/src/components/layout/mm_div.vue'
import mm_table from '/src/components/layout/mm_table.vue'
import mm_warp from '/src/components/layout/mm_warp.vue'

// 表单组件
import mm_checkbox from '/src/components/form/mm_checkbox.vue'
import mm_code from '/src/components/form/mm_code.vue'
import mm_input from '/src/components/form/mm_input.vue'
import mm_number from '/src/components/form/mm_number.vue'
import mm_pager from '/src/components/form/mm_pager.vue'
import mm_radio from '/src/components/form/mm_radio.vue'
import mm_reverse from '/src/components/form/mm_reverse.vue'
import mm_select from '/src/components/form/mm_select.vue'
import mm_slider from '/src/components/form/mm_slider.vue'
import mm_switch from '/src/components/form/mm_switch.vue'

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
		Vue.component('mm_slider', mm_slider);
		Vue.component('mm_switch', mm_switch);
	}
};
