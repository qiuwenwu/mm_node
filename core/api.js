/// api执行函数
/// ctx: 请求上下文 (object)
/// next: 跳过当前, 然后继续执行函数 (function)
exports.run = async function(ctx, next) {
	await next();
};
