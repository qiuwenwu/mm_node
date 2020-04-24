/**
 * 执行前
 * @param {Object} ctx http请求上下文
 * @param {Object} path 文件路径
 */
async function before(ctx, path) {};

/**
 * 执行
 * @param {Object} ctx http请求上下文
 * @param {Object} path 文件路径
 * @return {Boolean} 成功发送返回true，失败返回false
 */
async function main(ctx, path) {
	return this.send(ctx, path, this.config);
};

/**
 * 执行后
 * @param {Object} ctx http请求上下文
 * @param {Object} path 文件路径
 */
async function after(ctx, path) {};


exports.before = before;
exports.main = main;
exports.after = after;
