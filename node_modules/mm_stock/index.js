const Maths = require("mm_maths");

/**
 * 股票分析类
 * @class
 */
class Stock {
	/**
	 * 构造函数
	 * @param {Object} config, 配置参数
	 */
	constructor(config) {
		var maths = new Maths();
		maths.update(null, "stock");

		this.maths = maths;

		this.list = [{
				name: "均线下拐",
				express: `
					var MA5 = MA(CLOSE, 5);
					return REF(MA5, 2) < REF(MA5, 1) && REF(MA5, 0) < REF(MA5, 1);
				`,
				weight: -2,
				policy: "卖",
				description: "5日均线上穿10日均线后，首次出现向下走势",
				presage: "今日看跌，近日看跌，后市看淡",
				filter: "倾盆大雨"
			},
			{
				name: "均线上拐",
				express: `
					var MA5 = MA(CLOSE, 5);
					var MA10 = MA(CLOSE, 10);
					return REF(MA5, 2) > REF(MA5, 1) && REF(MA5, 0) > REF(MA5, 1) * 1.01 && REF(MA5, 1) < REF(MA10, 1);
				`,
				weight: 2,
				policy: "买",
				description: "5日均线下破10日均线后，首次出现向上走势",
				presage: "今日看涨，近日看好，后市看好",
				filter: "烈日当空"
			},
			{
				name: "均线金叉(预)",
				express: `
					var MA2 = MA(CLOSE, 2);
					var MA10 = MA(CLOSE, 10);
					var MA60 = MA(CLOSE, 60);
					var A1 = REF(MA10, 0) > REF(MA10, 1);
					var G1 = REF(CHG, 0) > 0.02;
					var R1 = RIGHT(MA2, 4);
					var R2 = RIGHT(MA10, 4);
					return CROSS(R1, R2) > 0 && A1 && G1 && REF(MA60, 2) > REF(MA2, 2);
				`,
				weight: 3,
				policy: "买",
				description: "预测今日均价，然后短期均线上穿长期均线",
				presage: "今日大涨，近日看涨，后市看好",
				filter: "均线上拐"
			},
			{
				name: "均线死叉(预)",
				express: `
					var MA2 = MA(CLOSE, 2);
					var MA10 = MA(CLOSE, 10);
					var A1 = REF(MA2, 0) < REF(MA2, 1);
					var G1 = REF(CHG, 0) < 0.02;
					var R1 = RIGHT(MA2, 4);
					var R2 = RIGHT(MA10, 4);
					return CROSS(R1, R2) < 0 && A1 && G1;
				`,
				weight: -3,
				policy: "卖",
				description: "预测今日均价，然后长期均线下短破期均线",
				presage: "今日大跌，近日看跌，后市看淡",
				filter: "均线下拐"
			},
			{
				name: "均线金叉",
				express: `
					var MA5 = MA(CLOSE, 5);
					var MA10 = MA(CLOSE, 10);
					var R1 = RIGHT(MA5, 4);
					var R2 = RIGHT(MA10, 4);
					var A1 = REF(MA10, 0) > REF(MA10, 1);
					return CROSS(R1, R2) > 0 && A1;
				`,
				weight: 3,
				filter: "均线金叉(预)",
				policy: "买",
				description: "短期均线上穿长期均线",
				presage: "今日大涨，近日看涨，后市看好"
			},
			{
				name: "均线死叉",
				express: `
					var MA5 = MA(CLOSE, 5);
					var MA10 = MA(CLOSE, 10);
					
					var R1 = RIGHT(MA5, 4);
					var R2 = RIGHT(MA10, 4);
					var A1 = REF(MA5, 0) < REF(MA5, 1);
					return CROSS(R1, R2) < 0 && A1;
				`,
				weight: -3,
				filter: "均线死叉(预)",
				policy: "卖",
				description: "长期均线下短破期均线",
				presage: "今日大跌，近日看跌，后市看淡"
			},
			{
				name: "放量上涨",
				express: `
					var Vr = ARR(VOL, 1);
					var Vu = UP(Vr, 0.2);
					var G1 = REF(CHG, 1) > 2;
					return Vu && G1;
				`,
				weight: 1,
				policy: "留",
				description: "连续多日交易量放大，并昨日上涨",
				presage: "今日看好，近日横盘，后市横盘"
			},
			{
				name: "放量下跌",
				express: `
					var Vr = ARR(VOL, 1);
					var Vu = UP(Vr, 0.2);
					var G1 = REF(CHG, 1) < -2;
					return Vu && G1
				`,
				weight: -2,
				policy: "卖",
				description: "连续多日交易量放大，并昨日下跌",
				presage: "今日看跌，近日看淡，后市看淡"
			},
			{
				name: "缩量上涨",
				express: `
					var Vr = ARR(VOL, 1);
					var Vd = DOWN(Vr, 0.2);
					var G1 = REF(CHG, 1) > 2;
					return Vd && G1
				`,
				weight: 2,
				policy: "买",
				description: "连续多日交易量缩小，并昨日上涨",
				presage: "今日看涨，近日看好，后市看好"
			},
			{
				name: "缩量下跌",
				express: `
					var Vr = ARR(VOL, 1);
					var Vd = DOWN(Vr, 0.2);
					var G1 = REF(CHG, 1) < -2;
					return Vd && G1;
				`,
				weight: -1,
				policy: "留",
				description: "连续多日交易量缩小，并昨日下跌",
				presage: "今日看淡，近日看淡，后市横盘"
			},
			{
				name: "跳空高开",
				express: `
					var O1 = REF(OPEN, 0);
					var H1 = REF(HIGH, 1);
					return O1 > H1;
				`,
				weight: 1,
				policy: "留",
				description: "今日开盘价大于昨日最高价",
				presage: "今日看涨，近日看好，后市看好"
			},
			{
				name: "跳空低开",
				express: `
					var O1 = REF(OPEN, 0);
					var L1 = REF(LOW, 1);
					return O1 < L1;
				`,
				weight: -1,
				policy: "留",
				description: "今日开盘价小于昨日最低价",
				presage: "今日看跌，近日看淡，后市看淡"
			},
			{
				name: "均线多头",
				express: `
					var MA5 = MA(CLOSE, 5);
					var MA10 = MA(CLOSE, 10);
					var MA30 = MA(CLOSE, 30);
					var MA60 = MA(CLOSE, 60);
					var RET = REF(MA5, 0) > REF(MA10, 0) && REF(MA10, 0) > REF(MA30, 0) && REF(MA30, 0) > REF(MA60, 0);
					return RET && REF(MA30, 0) > REF(MA30, 1) && REF(MA10, 0) > REF(MA10, 1);
				`,
				weight: 1,
				policy: "留",
				description: "5日、10日、30日、60日均线依次从上到下排列",
				presage: "今日看好，近日看好，后市横盘"
			},
			{
				name: "均线空头",
				express: `
					var MA5 = MA(CLOSE, 5);
					var MA10 = MA(CLOSE, 10);
					var MA30 = MA(CLOSE, 30);
					var MA60 = MA(CLOSE, 60);
					var RET = REF(MA5, 0) < REF(MA10, 0) && REF(MA10, 0) < REF(MA30, 0) && REF(MA30, 0) < REF(MA60, 0);
					return RET && REF(MA30, 0) < REF(MA30, 1) && REF(MA10, 0) < REF(MA10, 1);
				`,
				weight: -1,
				filter: "倾盆大雨",
				policy: "卖",
				description: "60日、30日、10日、5日均线依次从上到下排列",
				presage: "今日看淡，近日看淡，后市横盘"
			},
			{
				name: "早晨之星(预)",
				express: `
					var Yi = AYIN(OPEN, CLOSE, CHG, 2, 0.04);
					var Sr = ASTAR(OPEN, CLOSE, HIGH, LOW, 1);
					var Ya = AYANG(OPEN, CLOSE, CHG, 0, 0.02);
					return Yi && Sr && Ya
				`,
				weight: 4,
				filter: "旭日东升 烈日当空",
				policy: "买",
				description: "大跌过后，次日出现十字星，今日又呈现大涨形势",
				presage: "今日大涨，近日看涨，后市看好"
			},
			{
				name: "黄昏之星(预)",
				express: `
					var Ya = AYANG(OPEN, CLOSE, CHG, 2, 0.04);
					var Sr = ASTAR(OPEN, CLOSE, HIGH, LOW, 1);
					var Yi = AYIN(OPEN, CLOSE, CHG, 0, 0.02);
					return Ya && Sr && Yi
				`,
				weight: -4,
				policy: "卖",
				description: "大涨过后，次日出现十字星，今日又呈现大跌形势",
				presage: "今日大跌，近日看跌，后市看淡"
			},
			{
				name: "早晨之星",
				express: `
					var Yi = AYIN(OPEN, CLOSE, CHG, 3, 0.04);
					var Sr = ASTAR(OPEN, CLOSE, HIGH, LOW, 2);
					var Ya = AYANG(OPEN, CLOSE, CHG, 1, 0.04);
					return Yi && Sr && Ya
				`,
				weight: 4,
				filter: "早晨之星(预) 旭日东升",
				policy: "买",
				description: "大跌过后，次日出现十字星，昨日又大涨",
				presage: "今日看涨，近日看涨，后市看好"
			},
			{
				name: "黄昏之星",
				express: `
					var Ya = AYANG(OPEN, CLOSE, CHG, 3, 0.04);
					var Sr = ASTAR(OPEN, CLOSE, HIGH, LOW, 2);
					var Yi = AYIN(OPEN, CLOSE, CHG, 1, 0.04);
					return Ya && Sr && Yi
				`,
				weight: -4,
				filter: "黄昏之星(预)",
				policy: "卖",
				description: "大涨过后，次日出现十字星，昨日又大跌",
				presage: "今日看跌，近日看跌，后市看淡"
			},
			{
				name: "蜻蜓点水(预)",
				express: `
					var O0 = REF(OPEN, 0);
					var C0 = REF(CLOSE, 0);
					var MC = AVERAGE(CLOSE);
					var RET = O0 > MC * 0.98 && O0 < MC * 1.02;
					return RET && REF(CHG, 0) > 2;
				`,
				weight: 2,
				policy: "买",
				description: "昨日大盘接近年均价, 然后突然大涨",
				presage: "今日看涨，近日看涨，后市看好"
			},
			{
				name: "蜻蜓点水",
				express: `
					var O1 = REF(OPEN, 1);
					var C1 = REF(CLOSE, 1);
					var MC = AVERAGE(CLOSE);
					var RET = O1 > MC * 0.98 && O1 < MC * 1.02;
					return RET && REF(CHG, 1) > 2;
				`,
				weight: 2,
				policy: "买",
				description: "昨日大盘接近年均价, 然后突然大涨",
				presage: "今日看涨，近日看涨，后市看好"
			},
			{
				name: "黄金三角(预)",
				express: `
					var H1 = REF(CLOSE, 1);
					var H2 = REF(CLOSE, 3);
					var A1 = RIGHT(LOW, 4);
					var A2 = LEFT(A1, 3);
					var Ld = DOWN(A2);
					var G0 = REF(CHG, 0) > 2;
					var G1 = REF(CHG, 1) > 2;
					return Ld && G0 && G1 && REF(CHG, 3) < 0 && REF(CHG, 2) < 0
				`,
				weight: 3,
				policy: "买",
				description: "连跌数日，今日突现大涨形势",
				presage: "今日大涨，近日看涨，后市看好"
			},
			{
				name: "黄金三角",
				express: `
					var C1 = REF(CLOSE, 1);
					var O2 = REF(OPEN, 3);
					var A1 = RIGHT(LOW, 5);
					var A2 = LEFT(A1, 3);
					var Ld = DOWN(A2);
					return Ld && C1 > O2 && REF(CHG, 3) < 0 && REF(CHG, 2) < 0
				`,
				weight: 3,
				policy: "买",
				description: "连跌数日，昨日突然大涨",
				presage: "今日大涨，近日看涨，后市看好"
			},
			{
				name: "旱地拔葱",
				express: `
					var H1 = REF(HIGH, 1);
					var H2 = REF(HIGH, 2);
					var A1 = RIGHT(HIGH, 4);
					var A2 = LEFT(A1, 3);
					var Ha = AP(A2, 0.02);
					var Hn = H2 * 1.03;
					
					var MA10 = MA(CLOSE, 10);
					var MA30 = MA(CLOSE, 30);
					return Ha && H1 > Hn && REF(MA10, 1) < REF(MA30, 1)
				`,
				weight: 2,
				filter: "烈日当空",
				policy: "买",
				description: "没什么涨跌日数，昨日突然大涨",
				presage: "今日看涨，近日看好，后市看好"
			},
			{
				name: "阳奉阴违",
				express: `
					var H1 = REF(HIGH, 1);
					var H2 = REF(HIGH, 2);
					var G1 = REF(CHG, 1) < 0;
					var Ha = AYANG(OPEN, CLOSE, CHG, 2, 0.04);
					return Ha && G1 && H1 > H2 && REF(LOW, 1) > REF(LOW, 2)
				`,
				weight: -1,
				policy: "卖",
				description: "大涨之后，次日出现了盖住大涨最高价阴线",
				presage: "今日看跌，近日横盘，后市看好"
			},
			{
				name: "乌云盖顶",
				express: `
					var H1 = REF(HIGH, 1);
					var H2 = REF(HIGH, 2);
					
					var Hi = AYIN(OPEN, CLOSE, CHG, 1, 0.04);
					var Ha = AYANG(OPEN, CLOSE, CHG, 2, 0.04);
					return Ha && Hi && H1 > H2
				`,
				weight: -3,
				filter: "阳奉阴违",
				policy: "卖",
				description: "大涨之后，次日出现盖住大涨最高价的大阴线",
				presage: "今日看跌，近日看淡，后市横盘"
			},
			{
				name: "曙光初现",
				express: `
					var Hi = AYIN(OPEN, CLOSE, CHG, 2, 0.03);
					var Ha = AYANG(OPEN, CLOSE, CHG, 1, 0.03);
					var L2 = REF(LOW, 2);
					var L1 = REF(LOW, 1);
					return Hi && Ha && L2 > L1;
				`,
				weight: 1,
				policy: "留",
				description: "大阴线之后，次日出现最低价低于大阴线的大阳线",
				presage: "今日看涨，近日看好，后市看好"
			},
			{
				name: "三只乌鸦(预)",
				express: `
					var I1 = AYIN(OPEN, CLOSE, CHG, 1, 0.02);
					var I2 = AYIN(OPEN, CLOSE, CHG, 2, 0.02);
					var L1 = REF(LOW, 1);
					var L2 = REF(LOW, 2);
					return I1 && I2 && L1 < L2 && REF(CHG, 0) < -1;
				`,
				weight: -1,
				policy: "卖",
				filter: "倾盆大雨",
				description: "连续三日大阴线，且最低价一个比一个低",
				presage: "今日大跌，近日看跌，后市横盘"
			},
			{
				name: "三只乌鸦",
				express: `
					var I1 = AYIN(OPEN, CLOSE, CHG, 1, 0.02);
					var I2 = AYIN(OPEN, CLOSE, CHG, 2, 0.02);
					var I3 = AYIN(OPEN, CLOSE, CHG, 3, 0.02);
					var L1 = REF(LOW, 1);
					var L2 = REF(LOW, 2);
					var L3 = REF(LOW, 3);
					return I1 && I2 && I3 && L3 && L2 < L3 && L1 < L2;
				`,
				weight: -1,
				policy: "卖",
				filter: "三只乌鸦(预) 倾盆大雨",
				description: "连续三日大阴线，且最低价一个比一个低",
				presage: "今日看跌，近日看淡，后市横盘"
			},
			{
				name: "旭日东升",
				express: `
					var Hi = AYIN(OPEN, CLOSE, CHG, 2, 0.02);
					var O1 = REF(OPEN, 1);
					var O2 = REF(OPEN, 2);
					var C1 = REF(CLOSE, 1);
					var C2 = REF(CLOSE, 2);
					return Hi && O1 > C2 && C1 > O2;
				`,
				weight: 2,
				policy: "买",
				description: "大阴线过后，次日出现开盘价大于昨日收盘价，且收盘价大于昨日开盘价的大阳线",
				presage: "今日看涨，近日看涨，后市看好"
			},
			{
				name: "恋人并肩",
				express: `
					var Y1 = AYANG(OPEN, CLOSE, CHG, 2, 0.02);
					var Y2 = AYANG(OPEN, CLOSE, CHG, 1, 0.02);
					var C1 = RIGHT(CLOSE, 3);
					var C2 = LEFT(C1, 2);
					var Ca = AP(C2, 0.02);
					
					var O1 = RIGHT(OPEN, 3);
					var O2 = LEFT(O1, 2);
					var Oa = AP(O2, 0.02);
					
					return Y1 && Y2 && Ca && Oa;
				`,
				weight: 1,
				policy: "买",
				description: "连续两日开盘价和收盘价差不多的阳线",
				presage: "今日看跌，近日看涨，后市看好"
			},
			{
				name: "倾盆大雨",
				express: `
					var Y1 = AYIN(OPEN, CLOSE, CHG, 1, 0.02);
					var L1 = REF(LOW, 1);
					var L2 = REF(LOW, 2);
					var C1 = REF(CLOSE, 1);
					var O2 = REF(OPEN, 2);
					var bl = Y1 && L1 < L2 && C1 < O2;
					return bl;
				`,
				weight: -2,
				policy: "卖",
				description: "开盘价小于昨日收盘价，且收盘价小于昨日开盘价的大阴线",
				presage: "今日看跌，近日看淡，后市看跌"
			},
			{
				name: "烈日当空",
				express: `
					var Y1 = AYANG(OPEN, CLOSE, CHG, 1, 0.04);
					var Y2 = AYANG(OPEN, CLOSE, CHG, 2, 0.015);
					var O1 = REF(OPEN, 1);
					var O2 = REF(OPEN, 2);
					var O3 = REF(OPEN, 3);
					var C1 = REF(CLOSE, 1);
					var C2 = REF(CLOSE, 2);
					var C3 = REF(CLOSE, 3);
					return Y1 && Y2 && C1 > C2 && O1 > O2 && C1 > O3 && C1 > C3;
				`,
				weight: -1,
				policy: "卖",
				description: "股票连涨后, 出现特大阳线",
				presage: "今日看淡，近日看淡，后市看跌"
			},
			{
				name: "蛟龙出海",
				express: `
					var RMA5 = REF(MA(CLOSE, 5), 1);
					var RMA10 = REF(MA(CLOSE, 10), 1);
					var RMA30 = REF(MA(CLOSE, 30), 1);
					var O1 = REF(OPEN, 1);
					var C1 = REF(CLOSE, 1);
					var R1 = O1 < RMA5 && O1 < RMA10 && O1 < RMA30;
					var R2 = C1 > RMA5 && C1 > RMA10 && C1 > RMA30;
					return R1 && R2 && REF(CHG, 1) > 2
				`,
				weight: 4,
				policy: "买",
				filter: "均线多头 均线金叉",
				description: "股票横盘过后首次出现均线多头",
				presage: "今日大涨，近日大涨，后市看涨"
			}
		]
	}
}

// 今日
// 近日 指自今日起5日内
// 后市 指5日后

// 看涨 表示有 7成把握看涨
// 看跌 表示有 7成把握看跌
// 看好 表示从跌之后变为涨，开始横盘或走向牛市
// 看淡 表示从涨之后变为跌，开始横盘或走向熊市
// 看跌 表示大涨变大跌
// 看涨 表示大跌变大涨
// 横盘 表示价格在没范围内一直不见大涨大跌。

/**
 * 设置常量
 * @param {Array} arr 股票数据数组
 * @param {Object} vm 视图模型用户取数据
 */
Stock.prototype.set_const = function(arr, vm) {
	// 最高价
	var H = [];
	// 最低价
	var L = [];
	// 开盘价
	var O = [];
	// 收盘价
	var C = [];
	// 成交量
	var V = [];
	// 涨跌幅
	var CHG = [];
	// 日期
	var DATE = [];
	// 时间
	var TIME = [];
	// 日期和时间
	var DATETIME = [];

	arr.map(function(o) {
		H.push(Number(o[vm.H]));
		L.push(Number(o[vm.L]));
		O.push(Number(o[vm.O]));
		C.push(Number(o[vm.C]));
		V.push(Number(o[vm.V]));
		CHG.push(Number(o[vm.CHG]));
		var dt = o[vm.DATETIME];
		var dateTime;
		if (typeof(dt) == 'number') {
			dateTime = new Date(dt * 1000);
		} else if (/[0-9]+/.test(dt)) {
			dateTime = new Date(Number(dt) * 1000);
		} else {
			dateTime = dt.toTime();
		}
		DATETIME.push(dateTime.toStr('yyyy-MM-dd hh:mm:ss'));
		DATE.push(dateTime.toStr('yyyy-MM-dd'));
		TIME.push(dateTime.toStr('hh:mm:ss'));
	});

	this.maths.const = {
		H: H,
		HIGH: H,
		L: L,
		LOW: L,
		O: O,
		OPEN: O,
		C: C,
		CLOSE: C,
		V: V,
		VOL: V,
		CHG: CHG,
		DATETIME: DATETIME
	};
};

/**
 * 过滤结果
 * @param {Object} ret 结果对象
 * @return {Object} 返回最终结果
 */
Stock.prototype.filter = function(ret) {
	var tip = " " + ret.tip + " ";
	var weight = ret.weight;
	var lt = this.list;
	var len = lt.length;
	for (var i = 0; i < len; i++) {
		var o = lt[i];
		if (o.filter) {
			var arr = o.filter.split(' ');
			var count = arr.length;
			if(tip.indexOf(" " + o.name + " ") !== -1)
			{
				for(var n = 0; n < count; n++){
					var name = arr[n];
					var key = " " + name + " ";
					if (tip.indexOf(key) !== -1) {
						tip = tip.replace(key, " ");
						weight -= lt.getVal('weight', {
							name: name
						});
					}
				}
			}
		}
	}

	return {
		weight: weight,
		tip: tip.trim()
	}
};

/**
 * 总结归纳
 * @param {Object} ret 执行结果
 * @return {Object} 返回归纳后的结果
 */
Stock.prototype.summed = function(ret) {
	var ar = this.maths.const.DATETIME;
	ret.datetime = ar[ar.length - 1];

	var tip = " " + ret.tip + " ";
	// 建议操作手法
	var policy = {
		buy: 0,
		sell: 0,
		hold: 0
	};
	// 预言
	var presage = {
		// 近日
		today: 0,
		// 近日
		recently: 0,
		// 之后
		next: 0
	};

	var lt = this.list;
	var len = lt.length;
	for (var i = 0; i < len; i++) {
		var o = lt[i];
		if (tip.indexOf(" " + o.name + " ") !== -1) {
			if (o.policy === "买") {
				policy.buy++;
			} else if (o.policy === "卖") {
				policy.sell++;
			} else {
				policy.hold++;
			}

			var arr = o.presage.split('，');
			arr.map(function(val) {
				var key = "";
				if (val.indexOf("今日") !== -1) {
					key = "today";
				} else if (val.indexOf("近日") !== -1) {
					key = "recently";
				} else if (val.indexOf("后市") !== -1 || val.indexOf("之后") !== -1) {
					key = "next";
				}

				if (val.indexOf("大涨") !== -1) {
					presage[key] += 3;
				} else if (val.indexOf("大跌") !== -1) {
					presage[key] -= 3;
				} else if (val.indexOf("涨") !== -1) {
					presage[key] += 2;
				} else if (val.indexOf("跌") !== -1) {
					presage[key] -= 2;
				} else if (val.indexOf("好") !== -1) {
					presage[key] += 1;
				} else if (val.indexOf("淡") !== -1) {
					presage[key] -= 1;
				}
			});
		}
	}
	ret.policy = policy;
	ret.presage = presage;
	var predict = ""
	predict += this.predict("今日", presage.today);
	predict += "，" + this.predict("近日", presage.recently);
	predict += "，" + this.predict("后市", presage.next);
	ret.predict = predict;

	ret.action = this.action(policy, presage);
	return ret;
};


/**
 * 行动决策
 * @param {Object} policy 决策参考项
 * @param {Object} presage 预兆
 * @return {String} 返回行动决策
 */
Stock.prototype.action = function(policy, presage) {
	var act = "";
	if (policy.sell == policy.hold && policy.buy == policy.sell) {
		act = "观察"
	} else if (policy.sell >= policy.hold) {
		if (policy.sell > policy.buy) {
			act = "卖出"
		} else if (policy.sell < policy.buy) {
			act = "买入"
		} else {
			// 买卖相等的下
			if (presage.today > 1) {
				act = "留守"
			} else if (presage.today < -1) {
				act = "警惕"
			} else {
				// 如果今日可能横盘，则看近日
				if (presage.recently > 0) {
					act = "留守"
				} else if (presage.recently < 0) {
					act = "警惕"
				} else {
					act = "观察"
				}
			}
		}
	} else if (policy.buy >= policy.hold) {
		if (policy.buy > policy.sell) {
			act = "买入"
		} else if (policy.buy < policy.sell) {
			act = "卖出"
		}
	} else {
		// 买卖相等的下
		if (presage.today > 1) {
			act = "留守"
		} else if (presage.today < -1) {
			act = "警惕"
		} else {
			// 如果今日可能横盘，则看近日
			if (presage.recently > 0) {
				act = "留守"
			} else if (presage.recently < 0) {
				act = "警惕"
			} else {
				act = "观察"
			}
		}
	}
	return act;
};


/**
 * 评论
 * @param {String} time 时态
 * @param {Number} weight 得分
 * @return {String} 返回
 */
Stock.prototype.predict = function(time, weight) {
	var ret = "不明";
	if (weight === 0) {
		if (time == "今日") {
			if (weight > 0) {
				ret = "看好";
			} else if (weight < 0) {
				ret = "看淡";
			}
		}
	} else if (weight === -1 || weight === 1) {
		if (time == "今日") {
			if (weight === 1) {
				ret = "看好";
			} else if (weight === -1) {
				ret = "看淡";
			}
		} else {
			ret = "横盘";
		}
	} else if (weight > 4) {
		ret = "大涨";
	} else if (weight > 2) {
		ret = "看涨";
	} else if (weight === 2) {
		ret = "看好";
	} else if (weight === -2) {
		ret = "看淡";
	} else if (weight > -4) {
		ret = "看跌";
	} else {
		ret = "大跌";
	}
	return time + ret;
};

/**
 * 执行股票分析
 * @param {Array} arr 股票数据数组
 * @param {Object} vm 视图模型用户取数据
 * @return {Object} 返回分析结果
 */
Stock.prototype.run = function(arr, vm) {
	this.set_const(arr, vm);
	var tip = "";
	var weight = 0;
	var lt = this.list;
	var len = lt.length;
	for (var i = 0; i < len; i++) {
		var o = lt[i];
		if (o.express) {
			try {
				var bl = this.maths.run_code(o.express);
				if (bl) {
					tip += " " + o.name;
					weight += o.weight;
				}
			} catch (e) {
				console.log(e);
			}
		}
	}
	var ret = this.filter({
		tip,
		weight
	});

	return this.summed(ret);
}


/**
 * 循环执行
 * @return {Array} 返回执行结果集合
 */
Stock.prototype.for_run = function(arr, vm) {
	if (arr.length < 59) {
		return;
	}
	var rets = [];
	for (var i = 59; i < arr.length; i++) {
		var ret = this.run(arr.slice(0, i + 1), vm);
		rets.push(ret);
	}
	return rets;
};

module.exports = Stock;
