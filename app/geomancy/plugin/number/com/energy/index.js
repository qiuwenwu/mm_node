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
			/* 好的 */
			tian_yi: {
				name: "天医",
				score: 8,
				method: "+",
				meaning: "财运不错，疾病痊愈，贵人相助",
				value: ["13", "49", "27", "86", "31", "94", "72", "68"]
			},

			yan_nian: {
				name: "延年",
				score: 6,
				method: "+",
				meaning: "财运很好，延年益内寿，身体健康",
				value: ["19", "34", "26", "78", "91", "43", "62", "87"]
			},

			sheng_qi: {
				name: "生气",
				score: 4,
				method: "+",
				meaning: "财运大好，身体健康，活力充沛",
				value: ["14", "39", "28", "76", "41", "93", "82", "67"]
			},

			fu_wei: {
				name: "伏位",
				score: 2,
				method: "+",
				meaning: "财运小吉，运气中等，健康如常",
				value: ["11", "33", "44", "99", "22", "77", "88", "66"]
			},

			xian_lu: {
				name: "显露",
				score: 2,
				method: "*",
				meaning: "主动的，凸显的，加强的",
				value: ["51", "52", "53", "54", "56", "57", "58", "59", "15", "11", "25", "35", "45", "65", "75",
					"85", "95", "55"
				]
			},
			// jia_qiang: {
			// 	name: "加强",
			// 	score: 2,
			// 	method: "*",
			// 	meaning: "主动的，凸显的，加强的",
			// 	value: ["55"]
			// },
			// jian_ruo: {
			// 	name: "减弱",
			// 	score: 0.5,
			// 	method: "*",
			// 	meaning: "被动的，不可见的，隐性的，减弱的",
			// 	value: ["00"]
			// },
			qian_cang: {
				name: "潜藏",
				score: 0.5,
				method: "*",
				meaning: "被动的，不可见的，隐性的，减弱的",
				value: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "20", "30", "40", "50", "60",
					"70", "80", "90", "00"
				]
			},

			/* 坏的 */
			huo_hai: {
				name: "祸害",
				score: -2,
				method: "+",
				meaning: "财难积聚，官灾是非，争执被骗",
				value: ["17", "32", "46", "98", "71", "23", "64", "89"]
			},
			
			liu_sha: {
				name: "六煞",
				score: -4,
				method: "+",
				meaning: "财运不好，灾祸连连，身体多病",
				value: ["16", "38", "47", "92", "61", "83", "74", "29"]
			},

			wu_gui: {
				name: "五鬼",
				score: -6,
				method: "+",
				meaning: "破财连连，身体甚差，容易招鬼",
				value: ["18", "36", "42", "97", "81", "63", "24", "79"]
			},

			jue_ming: {
				name: "绝命",
				score: -8,
				method: "+",
				meaning: "财运极差，多病损容寿，凶则死亡",
				value: ["12", "37", "48", "96", "21", "73", "84", "69"]
			}
		}
	}
}

/**
 * 寓意
 * @param {Object} num 数值
 * @return {Object} 返回匹配结果
 */
Energy.prototype.meaning = function(num) {
	var dt = this.dict;
	var obj = {};
	for (var k in dt) {
		var o = dt[k];
		if (o.value.includes(num)) {
			obj = o;
			break;
		}
	}
	return obj;
};


/**
 * 寓意
 * @param {Object} model 
 */
Energy.prototype.getObj = function(model) {
	var dt = this.dict;
	var obj = {};
	for (var k in dt) {
		var o = dt[k];
		if (o.as(model)) {
			obj = o;
			break;
		}
	}
	return obj;
};

/**
 * @description 统计结果
 * @param {Object} ret 结果
 * @param {Object} o 对象
 */
Energy.prototype.count = function(ret, o) {
	var {
		score,
		name,
		last,
		num
	} = ret;
	if (o.method == "*") {
		if(last.method !== "*"){
			score += last.score * o.score;
		}
	} else {
		score += o.score;
	}
	name.push(o.name);
	return {
		score,
		name,
		num,
		last: o
	};
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