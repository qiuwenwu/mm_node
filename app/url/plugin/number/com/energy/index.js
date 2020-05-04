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
Energy.prototype.create = function(num) {
	
};

/**
 * 执行运算
 * @param {Object} num 数字
 */
Energy.prototype.run = function(num){
	var len = num.length;
	var ln = len - 1;
	var ret = {
		score: 0,
		name: [],
		num: [],
		last: {
			score: 0
		}
	};
	if (len % 2 === 0) {
		for (var i = 0; i < ln; i += 2) {
			var n = num.substring(i, i + 2);
			ret.num.push(n);
			var obj = this.meaning(n);
			ret = this.count(ret, obj);
		}
	} else {
		for (var i = 1; i < ln; i += 2) {
			var n = num.substring(i, i + 2);
			ret.num.push(n);
			var obj = this.meaning(n);
			ret = this.count(ret, obj);
		}
	}
	delete ret.last;
	ret.number = num;
	return ret;
}

module.exports = Energy;