/*
Navicat MySQL Data Transfer

Source Server         : 本地数据库
Source Server Version : 50553
Source Host           : localhost:3306
Source Database       : mm

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2019-12-15 01:14:48
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `finance_formula`
-- ----------------------------
DROP TABLE IF EXISTS `finance_formula`;
CREATE TABLE `finance_formula` (
  `formula_id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '公式ID',
  `weight` smallint(2) DEFAULT '0' COMMENT '权重：权重决定买卖和看涨看跌',
  `policy` varchar(4) DEFAULT NULL COMMENT '方针：只想操作方式',
  `tense` varchar(8) DEFAULT NULL COMMENT '分析时态：同时过去还是今时、今日数据分析。now今时、today今日、past昔日',
  `name` varchar(16) NOT NULL COMMENT '公式名称：技术分析名称',
  `filter` varchar(16) DEFAULT NULL COMMENT '过滤：当出现该技术分析时结果时，其他某个分析结果将无效，所以将其过滤调',
  `presage` varchar(255) DEFAULT NULL COMMENT '预示：今日、近日、之后走势的看涨、看跌',
  `description` varchar(255) DEFAULT NULL COMMENT '公式简介：介绍该公式是什么技术分析的',
  `express` text COMMENT '股票公式：用于分析走势，返回逻辑值',
  PRIMARY KEY (`formula_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of finance_formula
-- ----------------------------
INSERT INTO `finance_formula` VALUES ('1', '3', null, null, '均线金叉', null, null, null, null);

-- ----------------------------
-- Table structure for `finance_stock`
-- ----------------------------
DROP TABLE IF EXISTS `finance_stock`;
CREATE TABLE `finance_stock` (
  `stock_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '股票ID',
  `name` varchar(16) DEFAULT NULL COMMENT '股票名称',
  `code` varchar(12) NOT NULL COMMENT '股票代码',
  `company` varchar(32) DEFAULT NULL COMMENT '公司名称',
  `description` varchar(255) DEFAULT NULL COMMENT '股票简介',
  `profit` float(8,4) NOT NULL DEFAULT '0.0000' COMMENT '公司利润：如果为0或负数，表示公司不盈利',
  `bonus` double(4,2) unsigned DEFAULT '0.00' COMMENT '分红频率：1年1次为1.0；2年一次为0.5；3年一次为0.33；不分红为0',
  PRIMARY KEY (`stock_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of finance_stock
-- ----------------------------

-- ----------------------------
-- Table structure for `finance_stock_analyse`
-- ----------------------------
DROP TABLE IF EXISTS `finance_stock_analyse`;
CREATE TABLE `finance_stock_analyse` (
  `analyse_id` int(10) unsigned NOT NULL COMMENT '分析ID：用来查询和修改结果',
  `weight` smallint(2) unsigned NOT NULL COMMENT '权重得分',
  `update_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `datetime` datetime NOT NULL DEFAULT '1970-01-01 00:00:00' COMMENT '当日时间：指股票当天',
  `code` varchar(16) DEFAULT NULL COMMENT '股票代码',
  `action` varchar(16) DEFAULT NULL COMMENT '行动方式：买、卖、留',
  `policy` varchar(125) DEFAULT NULL COMMENT '决策：buy买, sell买, hold留，如果没买有，留就是观察',
  `presage` varchar(125) DEFAULT NULL COMMENT '预示得分：today今日, recently近日, next之后（后市）',
  `tip` varchar(255) DEFAULT NULL COMMENT '分析提示：告诉技术分析',
  `predict` varchar(255) DEFAULT NULL COMMENT '预言：告知近日和将来走势',
  PRIMARY KEY (`analyse_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of finance_stock_analyse
-- ----------------------------

-- ----------------------------
-- Table structure for `finance_stock_subscribe`
-- ----------------------------
DROP TABLE IF EXISTS `finance_stock_subscribe`;
CREATE TABLE `finance_stock_subscribe` (
  `subscribe_id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT COMMENT '订阅ID',
  `user_id` mediumint(8) unsigned NOT NULL DEFAULT '0' COMMENT '订阅用户ID',
  `time1` time NOT NULL DEFAULT '10:00:00' COMMENT '通知时段1：默认为开盘后半小时，一般通知什么股票要卖',
  `time2` time NOT NULL DEFAULT '13:00:00' COMMENT '通知时段2：默认为下午开盘时间，一般通知什么股票要卖',
  `time3` time NOT NULL DEFAULT '14:30:00' COMMENT '通知时段3：默认为收盘前半小时。一般通知什么股票要买',
  `way` varchar(12) NOT NULL DEFAULT 'wechat' COMMENT '订阅方式: phone手机短信、email邮箱、wechat微信公众号、app应用端',
  `stocks` varchar(255) DEFAULT NULL COMMENT '订阅的股票',
  PRIMARY KEY (`subscribe_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of finance_stock_subscribe
-- ----------------------------
