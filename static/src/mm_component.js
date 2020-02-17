// 栏目
import mm_action from '/src/components/bar/mm_action.vue';
import mm_buy from '/src/components/bar/mm_buy.vue';
import mm_chat from '/src/components/bar/mm_chat.vue';
import mm_count from '/src/components/bar/mm_count.vue';
import mm_filter from '/src/components/bar/mm_filter.vue';
import mm_search from '/src/components/bar/mm_search.vue';
import mm_sort from '/src/components/bar/mm_sort.vue';
import mm_title from '/src/components/bar/mm_title.vue';
import mm_tag from '/src/components/bar/mm_tag.vue';

// 列表项
import mm_article from '/src/components/item/mm_article.vue';
import mm_base from '/src/components/item/mm_base.vue';
import mm_contact from '/src/components/item/mm_contact.vue';
import mm_goods from '/src/components/item/mm_goods.vue';
import mm_img from '/src/components/item/mm_img.vue';
import mm_media from '/src/components/item/mm_media.vue';
import mm_message from '/src/components/item/mm_message.vue';
import mm_music from '/src/components/item/mm_music.vue';
import mm_news from '/src/components/item/mm_news.vue';
import mm_question from '/src/components/item/mm_question.vue';
import mm_user from '/src/components/item/mm_user.vue';
import mm_video from '/src/components/item/mm_video.vue';

// 轮播
import mm_slide_card from '/src/components/slide/mm_slide_card.vue';
import mm_slide_img from '/src/components/slide/mm_slide_img.vue';
import mm_slide_page from '/src/components/slide/mm_slide_page.vue';
import mm_slide_text from '/src/components/slide/mm_slide_text.vue';

/* === 创建全局组件 === */
export default {
	install(Vue, options) {
		
		// 栏目组件
		Vue.component('mm_action', mm_action);
		Vue.component('mm_buy', mm_buy);
		Vue.component('mm_chat', mm_chat);
		Vue.component('mm_count', mm_count);
		Vue.component('mm_filter', mm_filter);
		Vue.component('mm_search', mm_search);
		Vue.component('mm_sort', mm_sort);
		Vue.component('mm_title', mm_title);
		Vue.component('mm_tag', mm_tag);

		// 项目
		Vue.component('mm_article', mm_article);
		Vue.component('mm_base', mm_base);
		Vue.component('mm_contact', mm_contact);
		Vue.component('mm_goods', mm_goods);
		Vue.component('mm_img', mm_img);
		Vue.component('mm_media', mm_media);
		Vue.component('mm_message', mm_message);

		Vue.component('mm_music', mm_music);
		Vue.component('mm_news', mm_news);
		Vue.component('mm_question', mm_question);
		Vue.component('mm_user', mm_user);
		Vue.component('mm_video', mm_video);

		// 轮播
		Vue.component('mm_slide_card', mm_slide_card);
		Vue.component('mm_slide_img', mm_slide_img);
		Vue.component('mm_slide_page', mm_slide_page);
		Vue.component('mm_slide_text', mm_slide_text);
	}
}
