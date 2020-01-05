// 创建一个API事件
var event_api = $.event_admin('api');
event_api.update();

/**
 * @description 处理接口请求
 * @param {Object} ctx 请求上下文
 * @param {Function} next 跳过当前, 然后继续执行函数
 */
module.exports = async function(ctx, next) {
	var db = {
		next: next,
		ret: null
	};
	var ret = await event_api.run(ctx.path, ctx, db);
	if (ret) {
		ctx.response.body = ret;
	}
};