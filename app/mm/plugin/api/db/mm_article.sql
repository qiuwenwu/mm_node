/*
Navicat MySQL Data Transfer

Source Server         : 本地数据库
Source Server Version : 50553
Source Host           : localhost:3306
Source Database       : mm

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2019-09-16 17:09:47
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `mm_article_channel`
-- ----------------------------
DROP TABLE IF EXISTS `mm_article_channel`;
CREATE TABLE `mm_article_channel` (
  `channel_id` smallint(6) unsigned NOT NULL AUTO_INCREMENT COMMENT '频道ID',
  `name` varchar(16) NOT NULL COMMENT '频道名称:[2,16]',
  `father_id` mediumint(6) unsigned NOT NULL COMMENT '上级ID：在频道列表操作时，当上级频道展开时，才显示该频道',
  `display` mediumint(3) unsigned NOT NULL DEFAULT '100' COMMENT '排序：决定频道显示的先后顺序',
  `icon` varchar(255) DEFAULT NULL COMMENT '频道图标',
  `url` varchar(255) DEFAULT NULL COMMENT '外链地址：如果该频道是跳转到其他网站的情况下，就在该URL上设置',
  `description` varchar(255) DEFAULT NULL COMMENT '描述：描述该频道的作用',
  `tpl_type` varchar(16) NOT NULL DEFAULT 'article' COMMENT '模板类型：question问答、info资讯、news新闻、article文章、activity活动',
  `available` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '是否启用：[0,1]启用后才可以看到该频道',
  `hide` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '是否隐藏: [0,1]隐藏非管理员该频道无法查看. 0为不隐藏，1为隐藏',
  `can_comment` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '是否可评论：[0,1]不可评论则用户只能看，无法点评。0为不可评论，1为可评论',
  `city_id` mediumint(8) unsigned NOT NULL DEFAULT '0' COMMENT '所属城市：一些地方频道，可以通过该条判断是否可查看',
  PRIMARY KEY (`channel_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of mm_article_channel
-- ----------------------------

-- ----------------------------
-- Table structure for `mm_article_comment`
-- ----------------------------
DROP TABLE IF EXISTS `mm_article_comment`;
CREATE TABLE `mm_article_comment` (
  `comment_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '回帖id',
  `article_id` mediumint(8) unsigned NOT NULL DEFAULT '1' COMMENT '所属文章id',
  `display` smallint(5) unsigned NOT NULL DEFAULT '100' COMMENT '排序：决定文章显示的顺序',
  `available` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '是否启用：[0,1]启用则显示该回帖',
  `content` text COMMENT '正文：回帖内容',
  `user_id` mediumint(8) unsigned NOT NULL DEFAULT '0' COMMENT '用户ID：编辑这篇文章到本站的用户ID',
  `tag` varchar(64) DEFAULT NULL COMMENT '标签：回帖人给的标签，多个标签用空格隔开',
  `name` varchar(16) DEFAULT NULL COMMENT '留言者姓名：[2,16]用于实名回复',
  `score` smallint(1) unsigned NOT NULL COMMENT '评分：[0,5]最低1分、最多5分',
  PRIMARY KEY (`comment_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of mm_article_comment
-- ----------------------------

-- ----------------------------
-- Table structure for `mm_article_info`
-- ----------------------------
DROP TABLE IF EXISTS `mm_article_info`;
CREATE TABLE `mm_article_info` (
  `article_id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT COMMENT '文章id',
  `title` varchar(125) DEFAULT NULL COMMENT '标题：用于文章和html的<title>标签中',
  `display` smallint(5) unsigned NOT NULL DEFAULT '100' COMMENT '排序：决定文章显示的顺序',
  `img` varchar(255) DEFAULT NULL COMMENT '封面图：用于显示于文章列表页，多个封面图用换行分隔',
  `url` varchar(255) DEFAULT NULL COMMENT '来源地址：用于跳转到发布该文章的网站',
  `description` varchar(255) DEFAULT NULL COMMENT '描述：用于文章提纲和搜索引擎收录',
  `available` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '是否启用：[0,1]启用后前台才会显示该文章',
  `keywords` varchar(64) DEFAULT NULL COMMENT '关键词：用于搜索引擎收录',
  `content` text COMMENT '正文：文章的主体内容',
  `author` varchar(16) DEFAULT NULL COMMENT '作者：写出该文章的人',
  `user_id` mediumint(8) unsigned NOT NULL COMMENT '用户ID：编辑这篇文章到本站的用户ID',
  `source` varchar(255) DEFAULT NULL COMMENT '来源：文章的出处',
  `create_time` datetime NOT NULL DEFAULT '1997-01-01 00:00:00' COMMENT '创建时间',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `hot` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '热度：访问这篇文章的人次',
  `praise` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '点赞次数',
  `channel_id` int(10) unsigned NOT NULL DEFAULT '1' COMMENT '频道ID：该文章所属频道，仅该频道列表可以看到该文章',
  `tag` varchar(255) DEFAULT NULL COMMENT '标签：用于标注文章所属相关内容，多个标签用空格隔开',
  `collect_id` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '采集规则ID：如果文章是通过采集的方式获得，那么具有采集ID',
  `city_id` mediumint(8) unsigned NOT NULL DEFAULT '0' COMMENT '所属城市ID：对于一些地方文章，可以通过该ID筛看',
  PRIMARY KEY (`article_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of mm_article_info
-- ----------------------------
