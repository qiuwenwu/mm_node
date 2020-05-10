/**
 * 能量分析类
 */
class Energy {
	/**
	 * 配置参数
	 * @param {Object} arg
	 */
	constructor(arg) {

		this.config = {

		};

		this.dict = {
			"1": ["1", "3", "4", "9", "7"],
			"3": ["1", "3", "4", "9", "2"],
			"4": ["1", "3", "4", "9", "6"],
			"9": ["1", "3", "4", "9", "8"],
			"2": ["2", "7", "8", "6", "3"],
			"7": ["2", "7", "8", "6", "1"],
			"8": ["2", "7", "8", "6", "9"],
			"6": ["2", "7", "8", "6", "4"]
		}
	}
}

/**
 * 创建
 * @param {Object} num 数值
 * @return {Object} 返回新值
 */
Energy.prototype.create = function(num = 19) {
	var arr_num = [];
	var arr = ["1", "3", "4", "9", "2", "7", "8", "6"];

	var y = 0;
	var n = 0;
	if (num < arr.length) {
		y = arr.length % num;
	} else {
		y = num % arr.length;
	}
	n = arr[y];
	arr_num.push(n);

	arr = this.dict[n];
	if (num < arr.length) {
		y = arr.length % num;
	} else {
		y = num % arr.length;
	}
	n = arr[y];
	arr_num.push(n);
	
	for (var i = 0; i < 6; i++) {
		num = Math.floor((Math.random() * 100) + 1);
		if (num < arr.length) {
			y = arr.length % num;
		} else {
			y = num % arr.length;
		}
		n = arr[y];
		arr = this.dict[n];
		arr_num.push(n);
	}
	return arr_num.join('');
};

/**
 * 执行运算
 * @param {Object} redirect_url 重定向地址
 */
Energy.prototype.run = function(redirect_url) {
	var str = redirect_url.md5().replace(/[a-z]/gi, '');
	if (str.length > 11) {
		str = str.substring(0, 10);
	}
	return this.create(Number(str));
	// var num = this.create(Number(str));
	// return parseInt(num, 16);
};

module.exports = Energy;
