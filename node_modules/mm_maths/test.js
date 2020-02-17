var Maths = require('./index');

var maths = new Maths(__dirname);

// 第一步，载入公式及相关函数
maths.update(__dirname, "base");

// 第二步，设置常量
var consts = {
	a: 10,
	b: 3
};
maths.set_const(consts);

// // 第三步，转换公式
var expression = "y = abc * ab * 3c * 2";
var express = maths.convertTo(expression);
console.log('打印公式: ', express);

// // 第四步，转换成JS代码
// var code = maths.toJS(express);
// console.log('打印代码: ', code);

// 第五步，转换成函数
// var func = maths.toFunc(code);
// console.log('打印函数: ', func);

// // 第六步，执行函数
// if (func) {
// 	var result = func(variables);
// 	console.log('打印计算结果: ', result);
// }
