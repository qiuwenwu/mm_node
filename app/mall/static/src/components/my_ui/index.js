import my_icon from './components/my_ui/base/my_icon.vue';
import my_header from './components/my_ui/frame/my_header.vue';
import my_title from './components/my_ui/frame/my_title.vue';
import my_news from './components/my_ui/layout/my_news.vue';
import my_news_item from './components/my_ui/layout/my_news_item.vue';
import my_footer from './components/my_ui/frame/my_footer.vue';
import my_footer_item from './components/my_ui/frame/my_footer_item.vue';
import my_list from './components/my_ui/layout/my_list.vue';
import my_nav from './components/my_ui/layout/my_nav.vue';
import my_nav_item from './components/my_ui/layout/my_nav_item.vue';
import my_button from './components/my_ui/base/my_button.vue';
import my_toast from './components/my_ui/proup/my_toast.vue';
import my_loading from './components/my_ui/proup/my_loading.vue';
import my_input from './components/my_ui/form/my_input.vue';
import my_select from './components/my_ui/form/my_select.vue';
import my_select_item from './components/my_ui/form/my_select_item.vue';
import my_textarea from './components/my_ui/base/my_textarea.vue';
import my_checkbox from './components/my_ui/form/my_checkbox.vue';
import my_switch from './components/my_ui/form/my_switch.vue';
import my_slide from './components/my_ui/form/my_slide.vue';
import my_code from './components/my_ui/form/my_code.vue';
import my_search from './components/my_ui/form/my_search.vue';
import my_tab_list from './components/my_ui/layout/my_tab_list.vue';
import my_grade from './components/my_ui/form/my_grade.vue';
import my_grade_item from './components/my_ui/form/my_grade_item.vue';
import my_stepper from './components/my_ui/form/my_stepper.vue';
import my_upload from './components/my_ui/form/my_upload.vue';
import my_detail from './components/my_ui/layout/my_detail.vue';
import my_text from './components/my_ui/base/my_text.vue';
import my_page from './components/my_ui/frame/my_page.vue';
import my_head from './components/my_ui/frame/my_head.vue';
import my_body from './components/my_ui/frame/my_body.vue';
import my_foot from './components/my_ui/frame/my_foot.vue';
import my_modal from './components/my_ui/frame/my_modal.vue';
import my_mask from './components/my_ui/frame/my_mask.vue';
import my_block from './components/my_ui/frame/my_block.vue';
import my_warp from './components/my_ui/layout/my_warp.vue';
import my_grid from './components/my_ui/layout/my_grid.vue';
import my_table from './components/my_ui/layout/my_table.vue';
import my_datetime from './components/my_ui/picker/my_datetime.vue';
import my_address from './components/my_ui/picker/my_address.vue';
import my_swiper_card from './components/my_ui/expand/my_swiper_card.vue';
import my_swiper_img from './components/my_ui/expand/my_swiper_img.vue';
import my_pager from './components/my_ui/expand/my_pager.vue';
import my_transfer from './components/my_ui/expand/my_transfer.vue';
import my_transfer_item from './components/my_ui/expand/my_transfer_item.vue';
import circleProgress from './components/my_ui/expand/circleProgress.vue';

import "./components/my_ui/my_ui.css";

export default {
	install(Vue, option) {
		Vue.component('my_icon', my_icon)
		Vue.component('my_header', my_header)
		Vue.component('my_title', my_title)
		Vue.component('my_news', my_news)
		Vue.component('my_news_item', my_news_item)
		Vue.component('my_footer', my_footer)
		Vue.component('my_footer_item', my_footer_item)
		Vue.component('my_list', my_list)
		Vue.component('my_nav', my_nav)
		Vue.component('my_nav_item', my_nav_item)
		Vue.component('my_button', my_button)
		Vue.component('my_toast', my_toast)
		Vue.component('my_loading', my_loading)
		Vue.component('my_input', my_input)
		Vue.component('my_select', my_select)
		Vue.component('my_select_item', my_select_item)
		Vue.component('my_textarea', my_textarea)
		Vue.component('my_checkbox', my_checkbox)
		Vue.component('my_switch', my_switch)
		Vue.component('my_slide', my_slide)
		Vue.component('my_code', my_code)
		Vue.component('my_search', my_search)
		Vue.component('my_tab_list', my_tab_list)
		Vue.component('my_grade', my_grade)
		Vue.component('my_grade_item', my_grade_item)
		Vue.component('my_stepper', my_stepper)
		Vue.component('my_upload', my_upload)
		Vue.component('my_detail', my_detail)
		Vue.component('my_page', my_page)
		Vue.component('my_head', my_head)
		Vue.component('my_body', my_body)
		Vue.component('my_foot', my_foot)
		Vue.component('my_modal', my_modal)
		Vue.component('my_mask', my_mask)
		Vue.component('my_block', my_block)
		Vue.component('my_warp', my_warp)
		Vue.component('my_grid', my_grid)
		Vue.component('my_table', my_table)
		Vue.component('my_text', my_text)
		Vue.component('my_datetime', my_datetime)
		Vue.component('my_address', my_address)
		Vue.component('my_swiper_card', my_swiper_card)
		Vue.component('my_swiper_img', my_swiper_img)
		Vue.component('my_pager', my_pager)
		Vue.component('my_transfer', my_transfer)
		Vue.component('my_transfer_item', my_transfer_item)
		Vue.component('circleProgress', circleProgress)
	}
}
