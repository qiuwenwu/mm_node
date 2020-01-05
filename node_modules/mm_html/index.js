require('mm_expand');
/**
 * @fileOverview html帮助类
 * @description 用于服务端解析html
 * @author <a href="http://qww.elins.cn">邱文武</a>
 * @version 1.2
 */
const JSDOM = require('jsdom').JSDOM;
const JQuery = require('jquery');

/**
 * @param {String} html 网页内容
 */
function Dom(html) {
	var dom = new JSDOM(html);
	var doc = dom.window.document;
	return JQuery(doc.defaultView);
}
module.exports = Dom;

// // /**
// //  * 使用jsdom将html跟jquery组装成dom
// //  * @param  {String}   html     需要处理的html
// //  * @param  {Function} callback 组装成功后将html页面的$对象返回
// //  * @return {[type]}            [description]
// //  */
// function makeDom(html, callback) {
//   jsdom.env({
//     html: html,
//     src: [jquery],
//     done: function (errors, window) {
//       var $ = window.$;
//       callback(errors, $);
// 	  // 释放window相关资源，否则将会占用很高的内存
//       window.close();
//     }
//   });
// }

