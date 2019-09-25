// 内容容器
import mm_btn from '../components/content/mm_btn'
import mm_icon from '../components/content/mm_icon'
import mm_loading from '../components/content/mm_loading'
import mm_pre from '../components/content/mm_pre'
import mm_view from '../components/content/mm_view'

// 布局容器
import mm_body from '../components/layout/mm_body'
import mm_box from '../components/layout/mm_box'
import mm_col from '../components/layout/mm_col'
import mm_foot from '../components/layout/mm_foot'
import mm_footer from '../components/layout/mm_footer'
import mm_grid from '../components/layout/mm_grid'
import mm_group from '../components/layout/mm_group'
import mm_head from '../components/layout/mm_head'
import mm_header from '../components/layout/mm_header'
import mm_item from '../components/layout/mm_item'
import mm_list from '../components/layout/mm_list'
import mm_main from '../components/layout/mm_main'
import mm_modal from '../components/layout/mm_modal'
import mm_movable from '../components/layout/mm_movable'
import mm_page from '../components/layout/mm_page'
import mm_side from '../components/layout/mm_side'
import mm_warp from '../components/layout/mm_warp'
import mm_div from '../components/layout/mm_div'

export default {
	/**
	 * @description 安装
	 * @param {Object} Vue 框架
	 * @param {Object} options 配置参数
	 */
	install(Vue, options) {
		/* === 创建全局组件 === */
		// 内容
		Vue.component('mm_icon', mm_icon);
		Vue.component('mm_btn', mm_btn);
		Vue.component('mm_loading', mm_loading);

		// 容器
		Vue.component('mm_body', mm_body);
		Vue.component('mm_bodyer', mm_bodyer);
		Vue.component('mm_box', mm_box);
		Vue.component('mm_col', mm_col);
		Vue.component('mm_foot', mm_foot);
		Vue.component('mm_footer', mm_footer);
		Vue.component('mm_grid', mm_grid);
		Vue.component('mm_group', mm_group);
		Vue.component('mm_head', mm_head);
		Vue.component('mm_header', mm_header);
		Vue.component('mm_item', mm_item);
		Vue.component('mm_list', mm_list);
		Vue.component('mm_main', mm_main);
		Vue.component('mm_mask', mm_mask);
		Vue.component('mm_modal', mm_modal);
		Vue.component('mm_movable', mm_movable);
		Vue.component('mm_page', mm_page);
		Vue.component('mm_side', mm_side);
		Vue.component('mm_warp', mm_warp);
		Vue.component('mm_div', mm_div);
	}
};
