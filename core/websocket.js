const Socket = require('../com/socket').Socket;
$.socket = new Socket();
$.socket.update();

/**
 * @description 处理socket请求
 * @param {Object} ctx 请求上下文
 * @param {Function} next 跳过当前, 然后继续执行函数
 */
module.exports = async function(ctx, next) {
	$.socket.run(ctx, next);
};
