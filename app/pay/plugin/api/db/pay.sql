/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 50553
 Source Host           : localhost:3306
 Source Schema         : mm

 Target Server Type    : MySQL
 Target Server Version : 50553
 File Encoding         : 65001

 Date: 30/09/2019 09:13:45
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for pay_config
-- ----------------------------
DROP TABLE IF EXISTS `pay_config`;
CREATE TABLE `pay_config`  (
  `config_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '配置ID',
  `title` varchar(16) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '变量标题：可以用中文名',
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '变量描述：描述该变量的作用',
  `name` varchar(16) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '变量名',
  `value` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '变量值',
  `type` varchar(16) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'string' COMMENT '数据类型：string文本型、number数字型、boolean布尔型',
  `model` text CHARACTER SET utf8 COLLATE utf8_bin NULL COMMENT '数据模型：json格式，用于单选、多选模式',
  PRIMARY KEY (`config_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for pay_discount_list
-- ----------------------------
DROP TABLE IF EXISTS `pay_discount_list`;
CREATE TABLE `pay_discount_list`  (
  `discount_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '提现申请ID',
  `state` smallint(1) UNSIGNED NOT NULL DEFAULT 1 COMMENT '提现状态：1申请中，2转帐中，3已完成，4已拒绝',
  `create_time` datetime NOT NULL DEFAULT '1970-01-01 00:00:00' COMMENT '创建时间',
  `pay_time` datetime NOT NULL DEFAULT '1970-01-01 00:00:00' COMMENT '转账支付时间',
  `end_time` datetime NOT NULL DEFAULT '1970-01-01 00:00:00' COMMENT '资金到账时间',
  `update_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP COMMENT '最后编辑时间：用于判断提现申请是否异常',
  `ip` varchar(32) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '发起提现时的IP',
  `platform` varchar(12) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '应用平台：pc电脑版网站、moblie移动版网站、wechat微信公众号、app手机应用',
  `way` varchar(12) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '收款方式：third第三方支付、bank网银、digiccy数字货币',
  `institution` varchar(16) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '转账机构：第三方填支付宝、微信，银行填银行名称例如建设银行，数字货币填数字货币名称，例如比特币',
  `from_user` varchar(128) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '付款账户',
  `to_user` varchar(128) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '收款账户',
  `to_user_id` mediumint(8) UNSIGNED NOT NULL DEFAULT 0 COMMENT '收款人: 如果是商户收款，可选填',
  `seller_id` mediumint(8) UNSIGNED NOT NULL DEFAULT 0 COMMENT '商户ID: 商户收款的ID',
  `cause` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '拒绝原因：告知商户为什么拒绝本次提现',
  `note` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '商户备注：提现完成后的商户备注信息，便于商户查询',
  `amount` decimal(17, 8) UNSIGNED NOT NULL DEFAULT 0.00000000 COMMENT '提现金额',
  `user_id` mediumint(8) UNSIGNED NOT NULL DEFAULT 0 COMMENT '审批人：转账申请处理负责人，即由谁放款的',
  `fee` decimal(16, 8) UNSIGNED ZEROFILL NULL DEFAULT 00000000.00000000 COMMENT '手续费',
  PRIMARY KEY (`discount_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for pay_seller_account
-- ----------------------------
DROP TABLE IF EXISTS `pay_seller_account`;
CREATE TABLE `pay_seller_account`  (
  `seller_id` mediumint(8) UNSIGNED NOT NULL DEFAULT 0 COMMENT '商户ID',
  `state` smallint(1) UNSIGNED NOT NULL DEFAULT 1 COMMENT '状态：1为正常，2为异常，3为冻结，4为注销',
  `bank` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '网银账户',
  `bank_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '网银名称：含支行',
  `bank_state` tinyint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '微信认证：0未认证，1已认证',
  `wechat` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '收款微信账户',
  `wechat_state` tinyint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '微信认证：0未认证，1已认证',
  `alipay` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '收款支付宝账户',
  `alipay_state` tinyint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '微信认证：0未认证，1已认证',
  `btc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '比特币地址',
  `btc_state` tinyint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '比特币地址认证：0未认证，1已认证',
  `eth` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '以太币地址',
  `eth_state` tinyint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '以太币地址认证：0未认证，1已认证',
  `eos` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '柚子币地址',
  `eos_state` tinyint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '柚子币地址认证：0未认证，1已认证',
  `mm` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '美眉币地址',
  `mm_state` tinyint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '美眉币地址认证：0未认证，1已认证',
  PRIMARY KEY (`seller_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for pay_seller_amount
-- ----------------------------
DROP TABLE IF EXISTS `pay_seller_amount`;
CREATE TABLE `pay_seller_amount`  (
  `seller_id` mediumint(8) UNSIGNED NOT NULL COMMENT '商户ID:用于对应商户',
  `usd` decimal(16, 2) UNSIGNED NOT NULL DEFAULT 0.00 COMMENT '美元余额',
  `btc` decimal(16, 8) UNSIGNED NOT NULL DEFAULT 0.00000000 COMMENT '比特币余额',
  `eth` decimal(16, 8) UNSIGNED NOT NULL DEFAULT 0.00000000 COMMENT '以太币余额',
  `eos` decimal(16, 8) UNSIGNED NOT NULL DEFAULT 0.00000000 COMMENT '柚子币余额',
  `cny` decimal(16, 2) UNSIGNED NOT NULL DEFAULT 0.00 COMMENT '人民币余额',
  `mm` decimal(16, 4) UNSIGNED NOT NULL DEFAULT 0.0000 COMMENT '美眉币余额',
  PRIMARY KEY (`seller_id`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Fixed;

-- ----------------------------
-- Table structure for pay_seller_list
-- ----------------------------
DROP TABLE IF EXISTS `pay_seller_list`;
CREATE TABLE `pay_seller_list`  (
  `seller_id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '商户ID',
  `name` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '商户名称',
  `province_id` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '省份ID：用户所在地的省份',
  `city_id` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '所在城市ID',
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '详细地址：商户办公地的详细地址',
  `institution` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '注册企业名',
  `institution_code` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '组织机构码',
  `institution_img` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '营业执照图片',
  `institution_state` smallint(1) UNSIGNED NOT NULL DEFAULT 1 COMMENT '认证状态:1为未认证，2为认证中，3为已认证，4为认证失败',
  `business` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '经营范围',
  `user_id` mediumint(8) UNSIGNED NOT NULL DEFAULT 0 COMMENT '商户持有人',
  PRIMARY KEY (`seller_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for pay_trade_list
-- ----------------------------
DROP TABLE IF EXISTS `pay_trade_list`;
CREATE TABLE `pay_trade_list`  (
  `trade_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '交易序号',
  `transaction_id` varchar(32) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '交易ID: 类似合同编号，可用来查询该笔交易明细',
  `state` smallint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '付款状态：1待付款，2待确认，3已完成，4已取消',
  `create_time` datetime NOT NULL DEFAULT '1970-01-01 00:00:00' COMMENT '订单创建时间',
  `pay_time` datetime NOT NULL DEFAULT '1970-01-01 00:00:00' COMMENT '转账支付时间',
  `end_time` datetime NOT NULL DEFAULT '1970-01-01 00:00:00' COMMENT '付款到账时间',
  `update_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP COMMENT '最后编辑时间：用于判断订单是否异常',
  `ip` varchar(67) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '转账时的用户IP',
  `app` varchar(16) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '付款应用：cms内容管理系统、mall商城、bbs论坛，可自定义',
  `platform` varchar(12) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '应用平台：pc电脑版网站、moblie移动版网站、wechat微信公众号、app手机应用',
  `way` varchar(12) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '付款方式：third第三方支付、bank网银、digiccy数字货币',
  `institution` varchar(16) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '转账机构：第三方填支付宝、微信，银行填银行名称例如建设银行，数字货币填数字货币名称，例如比特币',
  `from_user` varchar(128) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '付款账户',
  `to_user` varchar(128) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '收款账户',
  `from_user_id` mediumint(8) UNSIGNED NOT NULL DEFAULT 0 COMMENT '付款人',
  `to_user_id` mediumint(8) UNSIGNED NOT NULL DEFAULT 0 COMMENT '收款人: 如果是商户收款，可选填',
  `seller_id` mediumint(8) UNSIGNED NOT NULL DEFAULT 0 COMMENT '商户ID: 商户收款的ID',
  `title` varchar(16) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '付款标题',
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '付款描述：告知用户付款的原因',
  `content` text CHARACTER SET utf8 COLLATE utf8_bin NULL COMMENT '付款内容：根据应用定格式，一般为json格式',
  `note` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '付款人备注：付款完成后的用户备注信息，便于用户查询',
  `total` decimal(16, 8) UNSIGNED ZEROFILL NOT NULL DEFAULT 00000000.00000000 COMMENT '付款总计金额',
  `amount` decimal(16, 8) UNSIGNED ZEROFILL NOT NULL DEFAULT 00000000.00000000 COMMENT '实际付款金额',
  `fee` decimal(16, 8) UNSIGNED ZEROFILL NULL DEFAULT 00000000.00000000 COMMENT '手续费',
  PRIMARY KEY (`trade_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for pay_user_account
-- ----------------------------
DROP TABLE IF EXISTS `pay_user_account`;
CREATE TABLE `pay_user_account`  (
  `seller_id` mediumint(8) UNSIGNED NOT NULL COMMENT '商户ID',
  `state` smallint(1) UNSIGNED NOT NULL COMMENT '状态：1为正常，2为异常，3为冻结，4为注销',
  `bank` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '网银账户',
  `bank_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '网银名称：含支行',
  `bank_state` tinyint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '微信认证：0未认证，1已认证',
  `wechat` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '收款微信账户',
  `wechat_state` tinyint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '微信认证：0未认证，1已认证',
  `alipay` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '收款支付宝账户',
  `alipay_state` tinyint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '微信认证：0未认证，1已认证',
  `user_id` mediumint(8) UNSIGNED NOT NULL DEFAULT 0 COMMENT '商户对应用户ID',
  `btc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '比特币地址',
  `btc_state` tinyint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '比特币地址认证：0未认证，1已认证',
  `eth` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '以太币地址',
  `eth_state` tinyint(1) NOT NULL COMMENT '以太币地址认证：0未认证，1已认证',
  `eos` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '柚子币地址',
  `eos_state` tinyint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '柚子币地址认证：0未认证，1已认证',
  `mm` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '美眉币地址',
  `mm_state` tinyint(1) NOT NULL COMMENT '美眉币地址认证：0未认证，1已认证',
  PRIMARY KEY (`seller_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for pay_user_amount
-- ----------------------------
DROP TABLE IF EXISTS `pay_user_amount`;
CREATE TABLE `pay_user_amount`  (
  `seller_id` mediumint(8) UNSIGNED NOT NULL COMMENT '商户ID:用于对应商户',
  `usd` decimal(16, 2) UNSIGNED NOT NULL DEFAULT 0.00 COMMENT '美元余额',
  `btc` decimal(16, 8) UNSIGNED NOT NULL DEFAULT 0.00000000 COMMENT '比特币余额',
  `eth` decimal(16, 8) UNSIGNED NOT NULL DEFAULT 0.00000000 COMMENT '以太币余额',
  `eos` decimal(16, 8) UNSIGNED NOT NULL DEFAULT 0.00000000 COMMENT '柚子币余额',
  `cny` decimal(16, 2) UNSIGNED NOT NULL DEFAULT 0.00 COMMENT '人民币余额',
  `mm` decimal(16, 4) UNSIGNED NOT NULL DEFAULT 0.0000 COMMENT '美眉币余额',
  PRIMARY KEY (`seller_id`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Fixed;

SET FOREIGN_KEY_CHECKS = 1;
