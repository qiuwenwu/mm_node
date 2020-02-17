const four_run = require('../../convert/four_run');

/**
 * 去括号(未完成)
 * @param {string} 公式
 * @return {string} 返回计算结果
 */
module.exports = function brackets(express) {
	express = express.replace(/ /g, '');
	var exp = express;
	if (exp.indexOf('(') !== -1) {
		exp = exp.between('(', ')');
		if (exp.indexOf('(') !== -1) {
			exp = exp.right('(');
		}
		var ret = four_run(exp);
		var key = "(" + exp + ")";

		if (express.indexOf("-" + key) !== -1) {
			ret = ret.replace(/\-/g, "~").replace(/\+/g, "-").replace(/\~/g, "+");
			express = express.replace(key, ret);
		} else if (express.indexOf("/" + key) !== -1) {
			if(ret.indexOf('+') === -1 && ret.indexOf('-') === -1){
				ret = ret.replace(/\*/g, "`").replace(/\//g, "*").replace(/\`/g, "/");
				express = express.replace(key, ret);
			}
			else {
				// 与相除相乘
			}
		} else if (express.indexOf("*" + key) !== -1) {
			if(ret.indexOf('+') === -1 && ret.indexOf('-') === -1){
				express = express.replace(key, ret);
			}
			else {
				// 与外界相乘
			}
		} else {
			express = express.replace(key, ret);
		}
	}
	if (express.indexOf('(') !== -1) {
		express = brackets(express);
	}

	return four_run(express);
};
