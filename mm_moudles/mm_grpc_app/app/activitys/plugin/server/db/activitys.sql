/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 50726
 Source Host           : localhost:3306
 Source Schema         : mm

 Target Server Type    : MySQL
 Target Server Version : 50726
 File Encoding         : 65001

 Date: 03/03/2020 23:10:16
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for activitys_action_log
-- ----------------------------
DROP TABLE IF EXISTS `activitys_action_log`;
CREATE TABLE `activitys_action_log`  (
  `action_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '操作行为ID：[1,2147483647]',
  `time_create` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建时间：',
  `time_update` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '更新时间：',
  `func_name` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '参操函数名：[0,32]',
  `uin_action` varchar(65) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '操作者uin：[0,65]',
  `method` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '操作方法：[0,255]',
  `log` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '操作记录：',
  PRIMARY KEY (`action_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of activitys_action_log
-- ----------------------------
INSERT INTO `activitys_action_log` VALUES (1, '2020-03-03 22:58:00', '2020-03-03 22:58:21', 'activiys_item', 'xxx', 'get', NULL);

-- ----------------------------
-- Table structure for activitys_info
-- ----------------------------
DROP TABLE IF EXISTS `activitys_info`;
CREATE TABLE `activitys_info`  (
  `activitys_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '活动ID：[1,2147483647]',
  `period_num` smallint(3) UNSIGNED NOT NULL DEFAULT 0 COMMENT '活动周期数：[0,999]即多少天或多少年为一个周期',
  `num_people` int(11) UNSIGNED NOT NULL DEFAULT 0 COMMENT '参与人数：[0,2147483647]',
  `num_winner` int(11) UNSIGNED NOT NULL DEFAULT 0 COMMENT '中奖人数：[0,2147483647]',
  `time_create` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建时间：',
  `time_update` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '更新时间：',
  `time_start` datetime(0) NOT NULL DEFAULT '1970-01-01 00:00:00' COMMENT '开始时间：',
  `time_end` datetime(0) NOT NULL DEFAULT '1970-01-01 00:00:00' COMMENT '结束时间：',
  `name` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '活动名称：[0,16]',
  `type` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '活动类型：[0,16]',
  `period_unit` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '活动周期单位：[0,16]year年、month月、day日、week星期',
  `uin_creator` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '创建者uin：[0,64]',
  `title` varchar(125) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '活动标题：[0,125]',
  `descrtption` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '活动描述：[0,255]',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '活动详情：',
  `prize_1` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '一等奖：,[5,20]数组中前者为奖品item_id，后者为中奖概率',
  `prize_2` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '二等奖：,[5,20]数组中前者为奖品item_id，后者为中奖概率',
  `prize_3` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '三等奖：,[5,20]数组中前者为奖品item_id，后者为中奖概率',
  `price_t` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '特等奖：,[5,20]数组中前者为奖品item_id，后者为中奖概率',
  PRIMARY KEY (`activitys_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of activitys_info
-- ----------------------------
INSERT INTO `activitys_info` VALUES (1, 1, 0, 10, '2020-03-03 22:46:14', '2020-03-03 22:50:40', '2020-01-21 00:00:00', '2020-03-01 00:00:00', '心电捐赠活动', '抽奖', 'day', '', '腾讯联合武汉人民医院东院新冠21病区和武汉市第五医院推出智能心电服务捐赠活动', NULL, NULL, NULL, NULL, NULL, NULL);

-- ----------------------------
-- Table structure for activitys_item
-- ----------------------------
DROP TABLE IF EXISTS `activitys_item`;
CREATE TABLE `activitys_item`  (
  `item_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '物品ID：[1,2147483647]',
  `price` double(10, 2) UNSIGNED NOT NULL DEFAULT 0.00 COMMENT '物品价值：',
  `time_create` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建时间：',
  `time_update` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '更新时间：',
  `num` int(11) UNSIGNED NOT NULL DEFAULT 0 COMMENT '物品剩余数量：[0,2147483647]',
  `name` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '物品名称：[0,16]',
  `type` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '物品类型：[0,16]',
  `creator_uin` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '创建者uin：[0,64]',
  `title` varchar(125) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '物品标题：[0,125]',
  `descrtption` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '物品描述：[0,255]',
  `img_cover` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '封面图：传base64',
  PRIMARY KEY (`item_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of activitys_item
-- ----------------------------
INSERT INTO `activitys_item` VALUES (1, 698.00, '2020-03-03 22:49:37', '2020-03-03 22:59:01', 50, '心电监测设备', '智能家电', NULL, '心电监测设备', '可穿戴心电监测设备及智能分析服务', NULL);

-- ----------------------------
-- Table structure for activitys_user_info
-- ----------------------------
DROP TABLE IF EXISTS `activitys_user_info`;
CREATE TABLE `activitys_user_info`  (
  `info_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '表单ID：[1,2147483647]填表时的ID，用于查改表单',
  `state` smallint(1) UNSIGNED NOT NULL DEFAULT 1 COMMENT '用户验证状态：[0,9]1待审核，2已认证，3未通过，4黑名单',
  `phone` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '手机号码：[0,11]',
  `liaison_phone` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '紧急联系人号码：[0,11]',
  `name` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '参与人姓名：[0,16]',
  `idcard` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '身份证号：[0,32]',
  `liaison_name` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '紧急联系人姓名：[0,16]',
  `uin_user` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '用户唯一标识：[0,64]用来识别用户',
  `uin_checker` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '审核人uin：[0,64]',
  `location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '所在位置：[0,255]用户所在位置，同时用来接收快递，传省市区',
  `address` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '详细地址：[0,64]',
  `idcard_img_a` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '身份证正面照：传base64字符串',
  `idcard_img_b` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '身份证反面照：传base64字符串',
  `note` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '其他补充信息：',
  PRIMARY KEY (`info_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of activitys_user_info
-- ----------------------------
INSERT INTO `activitys_user_info` VALUES (1, 1, '15817188815', '18928814799', '邱文X', '44142319910401XXXX', '邱志X', 'xxx', NULL, '广东 深圳 南山', '粤海街道汇景豪苑', NULL, NULL, NULL);

-- ----------------------------
-- Table structure for activitys_user_log
-- ----------------------------
DROP TABLE IF EXISTS `activitys_user_log`;
CREATE TABLE `activitys_user_log`  (
  `log_id` int(255) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '参与者记录：[1,2147483647]',
  `activitys_id` int(11) UNSIGNED NOT NULL DEFAULT 0 COMMENT '活动ID：[1,2147483647]用来识别是那个活动',
  `state` smallint(1) UNSIGNED NOT NULL DEFAULT 1 COMMENT '领取状态：[0,9]1未领取，2已寄出，3已签收，4已领取',
  `time_update` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '更新时间：',
  `time_create` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建时间：',
  `uin_user` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '用户唯一标识：[0,64]',
  `uin_prize winners` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '颁奖者uin：[0,64]',
  `prize_item_1` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '一等奖：传入中奖物品id',
  `prize_item_2` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '二等奖：传入中奖物品id',
  `prize_item_3` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '三等奖：传入中奖物品id',
  `price_item_t` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '特等奖：传入中奖物品id',
  PRIMARY KEY (`log_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of activitys_user_log
-- ----------------------------
INSERT INTO `activitys_user_log` VALUES (1, 1, 1, '2020-03-03 23:01:41', '2020-03-03 22:54:58', 'xxx', NULL, '1', NULL, NULL, NULL);

SET FOREIGN_KEY_CHECKS = 1;
