/**
 * @description 接口主函数
 * @param {Object} params 请求参数
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
async function main(params, db) {
	// 判断事件类型
	switch (params.Event) {
		case "CLICK":
			// 用户点击自定义菜单
			break;
		case "subscribe":
			/*
			用户扫描带场景值二维码时，可能推送以下两种事件：
			如果用户还未关注公众号，则用户可以关注公众号，关注后微信会将带场景值关注事件推送给开发者。
			如果用户已经关注公众号，则微信会将带场景值扫描事件推送给开发者。
			*/
			break;
		case "SCAN":
			break;
		case "LOCATION":
			// 用户打开公众号会话时，上报地理位置
			break;
		default:
			break;
	}
	return {};
};

exports.main = main;
