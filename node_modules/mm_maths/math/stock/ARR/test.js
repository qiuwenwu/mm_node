var ARR = require('./index');

var list = [{
		// 股票编码
		"gid": "sh601009",
		// 股票名称
		"name": "南京银行",
		// 昨日收盘价
		"close": 11,
		// 今日开盘价
		"open": 0,
		// 今日最高价
		"high": 0,
		// 今日最低价
		"low": 0,
		// 当前价
		"now": 0,
		// 日期时间
		"datetime": "",
		// 成交量
		"vol": 0
	},
	{
		// 股票编码
		"gid": "sh601009",
		// 股票名称
		"name": "南京银行",
		// 昨日收盘价
		"close": 10,
		// 今日开盘价
		"open": 0,
		// 今日最高价
		"high": 0,
		// 今日最低价
		"low": 0,
		// 当前价
		"now": 0,
		// 日期时间
		"datetime": "",
		// 成交量
		"vol": 0
	}
]

console.log(ARR(list, 1));
