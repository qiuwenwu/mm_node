// 引入MM组件
import mm_icon from '@/src/components/content/mm_icon.vue';

// 布局组件
import dev_head from './components/layout/dev_head.vue';
import dev_body from './components/layout/dev_body.vue';
import dev_foot from './components/layout/dev_foot.vue';
import dev_main from './components/layout/dev_main.vue';
import dev_side from './components/layout/dev_side.vue';

// 列表组件
import dev_diy from './components/list/dev_diy.vue';
import dev_nav from './components/list/dev_nav.vue';

// 拓展组件
import dev_dropdown from './components/expand/dev_dropdown.vue';

export default {
	/**
	 * @description 安装
	 * @param {Object} Vue 框架
	 * @param {Object} options 配置参数
	 */
	install(Vue, options) {
		Vue.component('mm_icon', mm_icon);

		Vue.component('dev_head', dev_head);
		Vue.component('dev_body', dev_body);
		Vue.component('dev_foot', dev_foot);

		Vue.component('dev_main', dev_main);
		Vue.component('dev_side', dev_side);

		Vue.component('dev_diy', dev_diy);
		Vue.component('dev_nav', dev_nav);
		
		Vue.component('dev_dropdown', dev_dropdown);
	}
}
