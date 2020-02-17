/**
 * 维度取值X,Y,Z
 * @param {Array} arr
 * @param {Number} x 一维
 * @param {Number} y 二维
 * @param {Number} z 三维
 * @return {Number|Array} 返回数组或数值
 */
module.exports = function pos(arr, x, y, z) {
	var ar = arr;
	if (ar.length >= x) {
		ar = ar[x - 1];
		if (y && ar.length >= y) {
			ar = ar[y - 1];
			if (z && ar.length >= z) {
				ar = ar[z - 1];
			}
		}
	}
	return ar;
};
