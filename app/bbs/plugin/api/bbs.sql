/*
Navicat MySQL Data Transfer

Source Server         : 本地数据库
Source Server Version : 50553
Source Host           : localhost:3306
Source Database       : mm

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2019-10-20 16:35:18
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `bbs_config`
-- ----------------------------
DROP TABLE IF EXISTS `bbs_config`;
CREATE TABLE `bbs_config` (
  `config_id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '配置ID：[1,2147483647]',
  `name` varchar(16) NOT NULL DEFAULT '' COMMENT '变量名：[0,16]',
  `type` varchar(16) NOT NULL DEFAULT 'string' COMMENT '数据类型：[0,16]string文本型、number数字型、boolean布尔型',
  `title` varchar(16) DEFAULT NULL COMMENT '变量标题：[0,16]可以用中文名',
  `value` varchar(255) DEFAULT NULL COMMENT '变量值：[0,255]',
  `description` varchar(255) DEFAULT NULL COMMENT '变量描述：[0,255]描述该变量的作用',
  `model` text COMMENT '数据模型：json格式，用于单选、多选模式',
  PRIMARY KEY (`config_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of bbs_config
-- ----------------------------

-- ----------------------------
-- Table structure for `bbs_thread`
-- ----------------------------
DROP TABLE IF EXISTS `bbs_thread`;
CREATE TABLE `bbs_thread` (
  `thread_id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT COMMENT '主题id：[1,8388607]',
  `available` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '是否启用：[0,1]启用后前台才会显示该主题',
  `state` smallint(1) unsigned NOT NULL DEFAULT '1' COMMENT '状态：[1,5]1正常，2推荐，3认证，4官方，5违规',
  `type_id` smallint(3) unsigned NOT NULL DEFAULT '0' COMMENT '主题分类ID：[1,1000]用来搜索指定类型的主题',
  `channel_id` smallint(5) unsigned NOT NULL DEFAULT '1' COMMENT '频道ID：[1,10000]该主题所属频道，仅该频道列表可以看到该主题',
  `display` smallint(5) unsigned NOT NULL DEFAULT '100' COMMENT '排序：[0,10000]决定主题显示的顺序',
  `city_id` mediumint(8) unsigned NOT NULL DEFAULT '0' COMMENT '所属城市ID：[1,8388607]对于一些地方主题，可以通过该ID筛看',
  `user_id` mediumint(8) unsigned NOT NULL DEFAULT '0' COMMENT '用户ID：[1,8388607]编辑这篇主题到本站的用户ID',
  `hot` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '热度：[0,1000000000]访问这篇主题的人次',
  `praise` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '点赞次数：[0,1000000000]',
  `collect_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '采集规则ID：[1,1000000000]如果主题是通过采集的方式获得，那么具有采集ID',
  `create_time` datetime NOT NULL DEFAULT '1997-01-01 00:00:00' COMMENT '创建时间：',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间：',
  `title` varchar(125) DEFAULT NULL COMMENT '标题：[0,125]用于主题和html的<title>标签中',
  `keywords` varchar(125) DEFAULT NULL COMMENT '关键词：[0,125]用于搜索引擎收录',
  `description` varchar(255) DEFAULT NULL COMMENT '描述：[0,255]用于主题提纲和搜索引擎收录',
  `img` varchar(255) DEFAULT NULL COMMENT '封面图：[0,255]用于显示于主题列表页，多个封面图用换行分隔',
  `url` varchar(255) DEFAULT NULL COMMENT '来源地址：[0,255]用于跳转到发布该主题的网站',
  `tag` varchar(255) DEFAULT NULL COMMENT '标签：[0,255]用于标注主题所属相关内容，多个标签用空格隔开',
  `content` text COMMENT '正文：主题的主体内容',
  `collecter` text COMMENT '收藏者：多个收藏者用”,“分隔',
  PRIMARY KEY (`thread_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of bbs_thread
-- ----------------------------

-- ----------------------------
-- Table structure for `bbs_thread_channel`
-- ----------------------------
DROP TABLE IF EXISTS `bbs_thread_channel`;
CREATE TABLE `bbs_thread_channel` (
  `channel_id` smallint(5) unsigned NOT NULL AUTO_INCREMENT COMMENT '频道ID：[1,10000]',
  `available` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '是否启用：[0,1]启用后才可以看到该频道',
  `hide` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '是否隐藏：[0,1]隐藏非管理员该频道无法查看. 0为不隐藏，1为隐藏',
  `can_comment` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '是否可评论：[0,1]不可评论则用户只能看，无法点评。0为不可评论，1为可评论',
  `display` smallint(4) unsigned NOT NULL DEFAULT '100' COMMENT '显示顺序：[0,1000]决定频道显示的先后顺序',
  `father_id` smallint(5) unsigned NOT NULL DEFAULT '0' COMMENT '上级ID：[1,10000]在频道列表操作时，当上级频道展开时，才显示该频道',
  `city_id` mediumint(8) unsigned NOT NULL DEFAULT '0' COMMENT '所属城市：[1,8388607]一些地方频道，可以通过该条判断是否可查看',
  `type` varchar(16) NOT NULL DEFAULT 'article' COMMENT '频道类型：[0,16]question问答、info资讯、news新闻、article主题、activity活动',
  `name` varchar(16) NOT NULL DEFAULT '' COMMENT '频道名称：[2,16]',
  `template` varchar(64) DEFAULT NULL COMMENT '风格模板：[0,64]频道和主题都使用的样式',
  `description` varchar(255) DEFAULT NULL COMMENT '描述：[0,255]描述该频道的作用',
  `icon` varchar(255) DEFAULT NULL COMMENT '频道图标：[0,255]',
  `url` varchar(255) DEFAULT NULL COMMENT '外链地址：[0,255]如果该频道是跳转到其他网站的情况下，就在该URL上设置',
  PRIMARY KEY (`channel_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of bbs_thread_channel
-- ----------------------------

-- ----------------------------
-- Table structure for `bbs_thread_comment`
-- ----------------------------
DROP TABLE IF EXISTS `bbs_thread_comment`;
CREATE TABLE `bbs_thread_comment` (
  `comment_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '评论id：[1,2147483647]',
  `available` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '是否启用：[0,1]启用则显示该评论',
  `score` smallint(1) unsigned NOT NULL DEFAULT '0' COMMENT '评分：[0,5]最低1分、最多5分',
  `display` smallint(4) unsigned NOT NULL DEFAULT '100' COMMENT '显示排序：[0,1000]决定显示的顺序',
  `thread_id` mediumint(8) unsigned NOT NULL DEFAULT '1' COMMENT '所属主题id：[1,8388607]',
  `user_id` mediumint(8) unsigned NOT NULL DEFAULT '0' COMMENT '用户ID：[1,8388607]编辑评论的用户ID',
  `tag` varchar(64) DEFAULT NULL COMMENT '标签：[0,64]评论人给的标签，多个标签用空格隔开',
  `reply` text COMMENT '评论回复：对评论人的评论做出的回复。通过form-url格式保存，多个人的回复用换行分隔',
  `content` text COMMENT '正文：评论内容',
  PRIMARY KEY (`comment_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of bbs_thread_comment
-- ----------------------------

-- ----------------------------
-- Table structure for `bbs_thread_type`
-- ----------------------------
DROP TABLE IF EXISTS `bbs_thread_type`;
CREATE TABLE `bbs_thread_type` (
  `type_id` smallint(5) unsigned NOT NULL AUTO_INCREMENT COMMENT '主题分类ID：[1,30000]',
  `display` smallint(4) unsigned NOT NULL DEFAULT '100' COMMENT '显示顺序：[0,1000]',
  `father_id` smallint(5) unsigned NOT NULL DEFAULT '0' COMMENT '上级分类ID：[1,32767]',
  `channel_id` smallint(5) unsigned NOT NULL DEFAULT '0' COMMENT '频道ID：[1,10000]',
  `name` varchar(16) DEFAULT NULL COMMENT '分类名称：[0,16]',
  `icon` varchar(255) DEFAULT NULL COMMENT '分类图标：[0,255]',
  `description` varchar(255) DEFAULT NULL COMMENT '分类描述：[0,255]',
  PRIMARY KEY (`type_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of bbs_thread_type
-- ----------------------------
