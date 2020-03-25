/**
 * @fileOverview 快递查询的指令
 * @version 1.0
 */
const market = require('../../com/market.js');

var http = new $.Http();


module.exports = {
	/**
	 * @description 指令行为主函数
	 * @param {Object} msg 消息
	 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
	 * @return {Object} 执行结果
	 */
	async main(msg, db) {
		var ret = "";
		var {
			content
		} = msg;
		var type = "";
		var content = content.trim();
		var today = content.matchs("{日期}");
		if(today){
			content = content.replace(today, '').trim();
		}
		switch (content) {
			case "比特币":
			case "BTC":
				type = "btc";
				break;
			case "以太坊":
			case "ETH":
				type = "eth";
				break;
			case "柚子币":
			case "柚子":
			case "EOS":
				type = "eos";
				break;
			case "以太经典":
			case "ETC":
				type = "etc";
				break;
			case "莱特币":
			case "LTC":
				type = "ltc";
				break;
			case "达世币":
			case "DASH":
				type = "dash";
				break;
			case "零币":
			case "ZEC":
				type = "zec";
				break;
			case "比特现金":
			case "比特币现金":
			case "BCH":
				type = "bch";
				break;
			case "数字货币":
				type = "all";
				break;
		}
		if (type) {
			if (type == "all") {
				ret = market.get(null, today);
			}
			else {
				ret = market.get([type], today);
			}
		}
		else 
		{
			type = content.matchs("^[A-Za-z]+$");
			if (type) {
				ret = market.get([type], today);
			}
		}
		return ret;
	}
};
