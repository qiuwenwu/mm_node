/*
Navicat MySQL Data Transfer

Source Server         : 本地数据库
Source Server Version : 50553
Source Host           : localhost:3306
Source Database       : mm

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2019-12-15 01:15:41
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `wechat_app`
-- ----------------------------
DROP TABLE IF EXISTS `wechat_app`;
CREATE TABLE `wechat_app` (
  `app_id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT COMMENT '应用序号：[1,8388607]',
  `available` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '是否可用：[0,1]在未审核状态下， 该应用授权为不可用',
  `encrypt` smallint(1) unsigned NOT NULL DEFAULT '1' COMMENT '加解密方式：[0,10]0明文模式，1兼容模式，2安全模式',
  `times_allow` smallint(5) unsigned NOT NULL DEFAULT '0' COMMENT '每日允许请求次数：[0,32767]用于限制应用每日可授权次数',
  `times_today` smallint(5) unsigned NOT NULL DEFAULT '0' COMMENT '今日请求次数：[0,32767]用于记录今日请求授权次数，判断授权次数是否超限',
  `max_age` smallint(5) unsigned NOT NULL DEFAULT '1825' COMMENT '有效期时长：[0,32767]授权应用可以使用的时长，超时需重新申请（单位：天）',
  `user_id` mediumint(8) unsigned NOT NULL DEFAULT '0' COMMENT '持有者ID：[1,8388607]该客户端所有人的ID',
  `times_count` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '请求总次数：[0,2147483647]用于记录授权总次数',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '上次使用时间：用于记录上次授权时间，防止频繁操作',
  `name` varchar(16) NOT NULL DEFAULT '' COMMENT '应用名称：[0,16]用于用户登陆时显示授权应用',
  `appid` varchar(16) NOT NULL DEFAULT '' COMMENT '应用ID：[0,16]用于应用授权访问时的账号',
  `token` varchar(32) DEFAULT NULL COMMENT '消息访问令牌：[0,32]用于访问应用时验证身份',
  `encoding_aes_key` varchar(43) DEFAULT NULL COMMENT '消息加密钥匙：[16,43]用于给应用发送消息时的加密钥匙',
  `appsecret` varchar(64) NOT NULL DEFAULT '' COMMENT '应用密钥：[0,64]用于应用授权访问时的密码',
  `icon` varchar(255) DEFAULT NULL COMMENT '应用图标：[0,255]用于用户登录时显示',
  `url` varchar(255) DEFAULT NULL COMMENT '消息访问地址：[0,255]当接收到用户所发消息后回访该地址',
  `bind_ip` text COMMENT '访问绑定IP：网站授权时确认重定向网址为已授权IP',
  `scope` text COMMENT '允许使用的接口：多个接口用”，“分隔',
  `scope_not` text COMMENT '不允许使用的接口：“多个接口用”，“分隔',
  `users` text COMMENT '授权的用户：',
  PRIMARY KEY (`app_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of wechat_app
-- ----------------------------

-- ----------------------------
-- Table structure for `wechat_app_refresh`
-- ----------------------------
DROP TABLE IF EXISTS `wechat_app_refresh`;
CREATE TABLE `wechat_app_refresh` (
  `refresh_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '刷新Token的ID：[1,2147483647]',
  `user_id` mediumint(8) unsigned NOT NULL DEFAULT '0' COMMENT '用户ID：[1,8388607]表示当前Token绑定的用户uid',
  `create_time` datetime NOT NULL DEFAULT '1970-01-01 00:00:00' COMMENT '创建时间：用来判断刷新令牌有效期',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间：用来判断是否频繁刷新访问牌',
  `appid` varchar(16) NOT NULL DEFAULT '' COMMENT '应用ID：[0,16]',
  `refresh_token` varchar(32) NOT NULL DEFAULT '' COMMENT '刷新令牌：[0,32]用来刷新访问牌，保留30天',
  PRIMARY KEY (`refresh_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of wechat_app_refresh
-- ----------------------------

-- ----------------------------
-- Table structure for `wechat_message`
-- ----------------------------
DROP TABLE IF EXISTS `wechat_message`;
CREATE TABLE `wechat_message` (
  `message_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '消息ID：[1,2147483647]',
  `end` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '结束会话：[0,1]1已结束,0为未结束会话,如果未结束则查询当前正文',
  `create_time` datetime NOT NULL DEFAULT '1970-01-01 00:00:00' COMMENT '会话创建时间：',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '会话更新时间：',
  `group` varchar(64) DEFAULT NULL COMMENT '用户群组：[0,64]',
  `type` varchar(16) DEFAULT '1' COMMENT '会话类型：[0,16]一般情况下，1永久会话/群、2临时会话/群',
  `from_user` varchar(64) DEFAULT NULL COMMENT '会话发起人：[0,64]',
  `to_user` varchar(64) DEFAULT NULL COMMENT '会话接收人：[0,64]',
  `robot` varchar(64) DEFAULT NULL COMMENT '服务的机器人：[0,64]',
  `cmd` varchar(24) DEFAULT NULL COMMENT '所使用的指令：[0,24]',
  `keyword` varchar(255) DEFAULT NULL COMMENT '关键词句：[0,255]除指令外，过滤、抽取后的词句',
  `check` varchar(255) DEFAULT NULL COMMENT '复查指令：[0,255]当用户再驱动指令而缺少参数时，执行该语句',
  `content` text COMMENT '会话正文：',
  `note` text COMMENT '备注信息：',
  `msg_type` varchar(16) DEFAULT NULL COMMENT '消息类型：[0,16]',
  `form` text COMMENT '表单:用于记录用户已填参数',
  PRIMARY KEY (`message_id`)
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of wechat_message
-- ----------------------------
INSERT INTO `wechat_message` VALUES ('11', '1', '2019-11-24 20:41:25', '2019-11-24 20:43:42', '', '1', 'oxn1OtzdF4ra66ObrkYJQ3Ahy5nc', 'gh_c41337e972b2', null, 'ems', 'null\r\n773009367627529', null, '今天天气怎么样？\r\n深圳\r\n773009367627529\r\n快递查询', null, 'text', null);
INSERT INTO `wechat_message` VALUES ('12', '1', '2019-11-24 20:55:17', '2019-11-24 20:58:42', '', '1', 'oxn1OtzdF4ra66ObrkYJQ3Ahy5nc', 'gh_c41337e972b2', null, 'music', null, null, '听音乐\r\n光年之外\r\n泡沫', null, 'text', null);
INSERT INTO `wechat_message` VALUES ('13', '1', '2019-11-24 20:58:50', '2019-11-24 21:04:56', '', '1', 'oxn1OtzdF4ra66ObrkYJQ3Ahy5nc', 'gh_c41337e972b2', null, 'ems', 'null\r\n7', null, '泡沫\r\n计算\r\n1+3+7\r\n1+3+7=\r\n有事吗？\r\n吃饭了没\r\n找工作\r\n快递查询', null, 'text', null);
INSERT INTO `wechat_message` VALUES ('14', '1', '2019-11-24 21:05:10', '2019-11-24 21:05:22', '', '1', 'oxn1OtzdF4ra66ObrkYJQ3Ahy5nc', 'gh_c41337e972b2', null, 'ems', 'null\r\n773009367627529', null, '773009367627529\r\n快递查询', null, 'text', null);
INSERT INTO `wechat_message` VALUES ('15', '1', '2019-11-24 21:05:48', '2019-11-24 21:05:51', '', '1', 'oxn1OtzdF4ra66ObrkYJQ3Ahy5nc', 'gh_c41337e972b2', null, 'ems', '9897043662549', null, '快递查询9897043662549', null, 'text', null);
INSERT INTO `wechat_message` VALUES ('16', '1', '2019-11-24 21:07:13', '2019-11-25 07:24:39', '', '1', 'oxn1OtzdF4ra66ObrkYJQ3Ahy5nc', 'gh_c41337e972b2', null, 'music', null, null, '今日头条\r\n新闻\r\n王心凌爱你\r\n听音乐\r\n王心凌爱你', null, 'text', null);
