/**
 * 随机数
 * @param {number} n 取N倍内随机数, 例如 n=10,则取1-10, n=100则取1-100, 为空则取随机小数
 * @return {number} 返回数值
 */
module.exports = function random(n) {
	if (n) {
		return Math.floor((Math.random() * n) + 1);
	} else {
		return Math.random();
	}
};
