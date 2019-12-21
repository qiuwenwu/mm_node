/**
 * @fileOverview {0}
 * @author <a href="作者主页地址">插件作者</a>
 * @version 1.0
 */

/**
 * @description 支付合约
 */
var Pay_contract = {
	/**
	 * @description 初始化脚本，用于重置一些信息
	 * @param {Object} option 配置参数
	 * @param {Object} db 数据管理器
	 * @return {String} 成功返回null, 否则返回错误提示
	 */
	init(option) {
		var msg = null;
		return msg;
	};
	
	/**
	 * @description 更新脚本，用于更新配置数据
	 * @param {Object} option 配置参数
	 * @param {Object} db 数据管理器
	 * @return {String} 成功返回null, 否则返回错误提示
	 */
	update(option) {
		var msg = null;
		return msg;
	};
	
	/**
	 * @description 收到后，可用于修改合约格式，或发起通知
	 * @param {Object} contract 合约参数
	 * @param {Object} db 数据管理器
	 * @return {Object} 如果合约内容不符返回空，否则返回修改后的合约参数
	 */
	receive_after(contract, db) {
		return contract;
	};
	
	/**
	 * @description 保存前，用于修改合约格式保存到数据库
	 * @param {Object} contract 合约参数
	 * @param {Object} db 数据管理器
	 * @return {Object} 如果不保存到数据库返回空，否则返回修改后的合约参数
	 */
	save_before(contract, db) {
		return contract;
	};
	
	/**
	 * @description 回复前，用于修改合约格式返回给前端
	 * @param {Object} contract 合约参数
	 * @param {Object} db 数据管理器
	 * @return {Object} 如果回复给前端返回空，否则返回修改后的合约参数
	 */
	reply_before(contract, db) {
		return contract;
	};
	
	/**
	 * @description 订单创建前, 一般用来判断是否符合创建合约的条件
	 * @param {Object} contract 合约参数
	 * @param {Object} db 数据管理器
	 * @return {Object} 如果要中断合约则返回false，否则返回true
	 */
	create_before(contract, db) {
		return true;
	};
	
	/**
	 * @description 订单创建后，一般用来发送通知，例如冻结商品库存
	 * @param {Object} contract 合约参数
	 * @param {Object} db 数据管理器
	 * @return {Object} 如果要中断合约则返回false，否则返回true
	 */
	create_after(contract, db) {
		return true;
	};
	
	/**
	 * @description 支付前, 一般用来判断支付信息是否正确，例如是否支持该支付方式
	 * @param {Object} contract 合约参数
	 * @param {Object} db 数据管理器
	 * @return {Object} 如果要中断合约则返回false，否则返回true
	 */
	pay_before(contract, db) {
		return true;
	};
	
	/**
	 * @description 支付后，一般用来发送通知
	 * @param {Object} contract 合约参数
	 * @param {Object} db 数据管理器
	 * @return {Object} 如果要中断合约则返回false，否则返回true
	 */
	pay_after(contract, db) {
		return true;
	};
	
	/**
	 * @description 到账完成前, 一般用来判断支付信息是否正确，例如是否支持该支付方式
	 * @param {Object} contract 合约参数
	 * @param {Object} db 数据管理器
	 * @return {Object} 如果要中断合约则返回false，否则返回true
	 */
	complete_before(contract, db) {
		return true;
	};
	
	/**
	 * @description 到账完成后，一般用来发送通知，例如减少商品库存
	 * @param {Object} contract 合约参数
	 * @param {Object} db 数据管理器
	 * @return {Object} 如果要中断合约则返回false，否则返回true
	 */
	complete_after(contract, db) {
		return true;
	};
	
	/**
	 * @description 取消前, 一般用来变更合约状态或续约
	 * @param {Object} contract 合约参数
	 * @param {Object} db 数据管理器
	 * @return {Object} 如果要中断合约则返回false，否则返回true
	 */
	cancel_before(contract, db) {
		return true;
	};
	
	/**
	 * @description 取消后，一般用来发送通知，例如解除冻结商品库存
	 * @param {Object} contract 合约参数
	 * @param {Object} db 数据管理器
	 * @return {Object} 如果要中断合约则返回false，否则返回true
	 */
	cancel_after(contract, db) {
		return true;
	};
};

module.exports = Pay_contract;
