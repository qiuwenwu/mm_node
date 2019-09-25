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

 Date: 25/09/2019 12:44:27
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for sys_address_area
-- ----------------------------
DROP TABLE IF EXISTS `sys_address_area`;
CREATE TABLE `sys_address_area`  (
  `area_id` mediumint(8) UNSIGNED NOT NULL COMMENT '地区ID',
  `name` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '地区名称',
  `city_id` mediumint(8) UNSIGNED NOT NULL COMMENT '所属城市ID',
  `show` smallint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '是否可见：[0,2]0为仅表单可见，1为仅表单和搜索时可见 ，2为均可见',
  `display` smallint(3) UNSIGNED NOT NULL COMMENT '显示顺序',
  PRIMARY KEY (`area_id`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '行政区域县区信息表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for sys_address_city
-- ----------------------------
DROP TABLE IF EXISTS `sys_address_city`;
CREATE TABLE `sys_address_city`  (
  `city_id` mediumint(8) UNSIGNED NOT NULL COMMENT '城市ID',
  `name` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '城市名称',
  `province_id` mediumint(8) UNSIGNED NOT NULL COMMENT '所属省份ID',
  `show` smallint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '是否可见：[0,2]0为仅表单可见，1为仅表单和搜索时可见 ，2为均可见',
  `display` smallint(3) UNSIGNED NOT NULL COMMENT '显示顺序',
  PRIMARY KEY (`city_id`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '行政区域地州市信息表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for sys_address_province
-- ----------------------------
DROP TABLE IF EXISTS `sys_address_province`;
CREATE TABLE `sys_address_province`  (
  `province_id` mediumint(8) UNSIGNED NOT NULL COMMENT '省份ID',
  `name` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '省份名称',
  `show` smallint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '是否可见：[0,2]0为仅表单可见，1为仅表单和搜索时可见 ，2为均可见',
  `display` smallint(3) UNSIGNED NOT NULL COMMENT '显示顺序',
  PRIMARY KEY (`province_id`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '省份信息表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for sys_app_list
-- ----------------------------
DROP TABLE IF EXISTS `sys_app_list`;
CREATE TABLE `sys_app_list`  (
  `app_id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '应用ID',
  `icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '应用图标：用于用户登录时显示',
  `name` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '应用名称：用于用户登陆时显示授权应用',
  `user_id` mediumint(8) UNSIGNED NOT NULL DEFAULT 0 COMMENT '持有者ID：该客户端所有人的ID',
  `appid` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '应用ID：用于应用授权访问时的账号',
  `appsecret` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '应用密钥：用于应用授权访问时的密码',
  `token` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '消息访问令牌：用于访问应用时验证身份',
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '消息访问地址：当接收到用户所发消息后回访该地址',
  `encoding_aes_key` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '消息加密钥匙：[16,32]用于给应用发送消息时的加密钥匙',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '上次使用时间：用于记录上次授权时间，防止频繁操作',
  `bind_ip` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '访问绑定IP：网站授权时确认重定向网址为已授权IP',
  `times_count` int(11) UNSIGNED NOT NULL DEFAULT 0 COMMENT '请求总次数：用于记录授权总次数',
  `times_allow` smallint(5) UNSIGNED NOT NULL DEFAULT 0 COMMENT '每日允许请求次数：用于限制应用每日可授权次数',
  `times_today` smallint(5) UNSIGNED NOT NULL DEFAULT 0 COMMENT '今日请求次数：用于记录今日请求授权次数，判断授权次数是否超限',
  `scope` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '允许使用的接口：多个接口用”，“分隔',
  `scope_not` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '不允许使用的接口：“多个接口用”，“分隔',
  `max_age` smallint(5) UNSIGNED NOT NULL DEFAULT 1825 COMMENT '有效期时长：授权应用可以使用的时长，超时需重新申请（单位：天）',
  `available` tinyint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '是否可用：在未审核状态下， 该应用授权为不可用',
  `encrypt` smallint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '加解密方式：0明文模式，1兼容模式，2安全模式',
  `users` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '授权的用户',
  PRIMARY KEY (`app_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for sys_app_refresh
-- ----------------------------
DROP TABLE IF EXISTS `sys_app_refresh`;
CREATE TABLE `sys_app_refresh`  (
  `refresh_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '刷新Token的ID',
  `refresh_token` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '刷新令牌：用来刷新访问牌，保留30天',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间：用来判断是否频繁刷新访问牌',
  `create_time` datetime NOT NULL DEFAULT '1970-01-01 00:00:00' COMMENT '创建时间：用来判断刷新令牌有效期',
  `appid` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '应用ID',
  `user_id` mediumint(8) UNSIGNED NOT NULL COMMENT '用户ID：表示当前Token绑定的用户uid',
  PRIMARY KEY (`refresh_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for sys_user_admin
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_admin`;
CREATE TABLE `sys_user_admin`  (
  `admin_id` smallint(3) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(16) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '图标：用于标识用户组',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '描述：描述该用户组的特点或权限范围',
  `type` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '分类：用于区分用户组使用范围',
  `display` smallint(3) UNSIGNED NOT NULL DEFAULT 100 COMMENT '显示顺序',
  PRIMARY KEY (`admin_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for sys_user_count
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_count`;
CREATE TABLE `sys_user_count`  (
  `user_id` mediumint(8) UNSIGNED NOT NULL COMMENT '用户ID',
  `extcredits1` int(10) NOT NULL DEFAULT 0 COMMENT '拓展积分1',
  `extcredits2` int(10) NOT NULL DEFAULT 0 COMMENT '拓展积分2',
  `extcredits3` int(10) NOT NULL DEFAULT 0 COMMENT '拓展积分3',
  `extcredits4` int(10) NOT NULL DEFAULT 0 COMMENT '拓展积分4',
  `extcredits5` int(10) NOT NULL DEFAULT 0 COMMENT '拓展积分5',
  `extcredits6` int(10) NOT NULL DEFAULT 0 COMMENT '拓展积分6',
  `extcredits7` int(10) NOT NULL DEFAULT 0 COMMENT '拓展积分7',
  `extcredits8` int(10) NOT NULL DEFAULT 0 COMMENT '拓展积分8',
  `exp` int(11) UNSIGNED NOT NULL DEFAULT 0 COMMENT '经验值',
  `level` smallint(3) UNSIGNED NOT NULL DEFAULT 1 COMMENT '等级',
  `money` double(10, 2) NOT NULL DEFAULT 0.00 COMMENT '钱：用于现金业务',
  `coin` decimal(17, 8) NOT NULL DEFAULT 0.00000000 COMMENT '货币：用于游戏或数字货币业务',
  `credit` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '信用度：用于评估用户信誉',
  `credit_points` int(11) UNSIGNED NOT NULL DEFAULT 0 COMMENT '积分：用于代金消费或兑换商品',
  `iq` smallint(3) UNSIGNED NOT NULL COMMENT 'IQ智商:[80,200]用于激励用户评论和发帖',
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for sys_user_group
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_group`;
CREATE TABLE `sys_user_group`  (
  `group_id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '用户组ID',
  `name` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '名称',
  `level` smallint(3) UNSIGNED NOT NULL DEFAULT 1 COMMENT '等级划分：用于识别级别分组',
  `exp` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '升级所需经验：用于确定用户的升级',
  `discount` double(3, 2) UNSIGNED NOT NULL DEFAULT 0.00 COMMENT '折扣：用于确定用户的消费折扣',
  `bonus` double(3, 2) UNSIGNED NOT NULL DEFAULT 0.00 COMMENT '奖励比例：用于确定用户的积分奖励',
  `next_group_id` mediumint(8) UNSIGNED NOT NULL COMMENT '下级用户组ID：决定用户升级后所属用户组',
  `icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '图标：用于标识用户组',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '描述：描述该用户组的特点或权限范围',
  `type` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '分类：用于区分用户组使用范围',
  `display` smallint(3) UNSIGNED NOT NULL COMMENT '显示顺序',
  PRIMARY KEY (`group_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for sys_user_info
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_info`;
CREATE TABLE `sys_user_info`  (
  `user_id` mediumint(8) UNSIGNED NOT NULL COMMENT '用户ID',
  `name` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '姓名',
  `sex` smallint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '性别：[0,2]0未设置、1男、2女',
  `age` smallint(3) UNSIGNED NOT NULL DEFAULT 0 COMMENT '年龄：[0,150]',
  `birthday` date NOT NULL DEFAULT '1970-01-01' COMMENT '生日',
  `province` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '省份ID：用户所在地的省份',
  `city_id` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '所在城市ID',
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '详细地址：用户居住地的详细地址',
  `job` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '职业',
  `job_scope` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '工作范围',
  `company_address` varchar(125) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '公司地址：用户当前就职的公司地址',
  `company_business` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '公司经营范围',
  `school` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '毕业学校',
  `major` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '所学专业',
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for sys_user_list
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_list`;
CREATE TABLE `sys_user_list`  (
  `user_id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '用户ID：用户获取其他与用户相关的数据',
  `username` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '用户名：用户登录时所用的账户名称',
  `password` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '密码：用户登录所需的密码，由6-16位数字或英文组成',
  `referee_id` mediumint(8) UNSIGNED NOT NULL DEFAULT 0 COMMENT '推荐人ID：用于推荐注册时积分奖级',
  `vip` smallint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '会员级别：用于确定用户访问权限',
  `gm` smallint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '管理员级别：用于确定用户管理权限',
  `mc` smallint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '商家级别：用于确定商家用户的管理权限',
  `phone` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '手机号码：用户的手机号码，用于找回密码时或登录时',
  `email` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '邮箱：用户的邮箱，用于找回密码时或登录时',
  `login_ip` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '上次登录时的IP地址',
  `login_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '上次登录时间',
  `salt` varchar(6) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '短验证',
  `create_time` datetime NOT NULL DEFAULT '1970-01-01 00:00:00' COMMENT '创建时间',
  `user_group` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '所在用户组: 多个用户组用“,“分隔 ',
  `admin_group` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '所在管理组: 多个管理组用“,“分隔',
  `signature` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '个性签名',
  `nickname` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '昵称',
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '头像地址',
  `invite_code` varchar(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '邀请注册码: 随着用户注册而生成',
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for sys_user_sns
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_sns`;
CREATE TABLE `sys_user_sns`  (
  `user_id` mediumint(8) UNSIGNED NOT NULL COMMENT '用户ID',
  `qq` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'QQ号:[5,12]',
  `wechat` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '微信号:[5,16]',
  `mm` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'MM号:[5,16]',
  `baidu` varchar(14) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '百度账号:[5,14]',
  `taobao` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '淘宝账号:[5,10]',
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Compact;

SET FOREIGN_KEY_CHECKS = 1;
