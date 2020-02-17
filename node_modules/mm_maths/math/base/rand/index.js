/**
 * 随机数
 * @param {number} min 最小值
 * @param {number} max 最大值
 * @return {number} 返回数值
 */
module.exports = function rand(min, max) {
	var num = 0;
	switch (arguments.length) {
		case 1:
			num = parseInt(Math.random() * min + 1, 10);
			break;
		case 2:
			num = parseInt(Math.random() * (max - min + 1) + min, 10);
			break;
		default:
			num = 0;
			break;
	}
	return num;
};
