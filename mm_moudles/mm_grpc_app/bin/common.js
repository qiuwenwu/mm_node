require('mm_expand')

$.redis_admin = require("mm_redis").redis_admin;
$.mysql_admin = require('mm_mysql').mysql_admin;
$.api_admin = require("./com/api").api_admin; 

// 加载全局配置
const NODE_ENV = process.env.NODE_ENV || 'local';
$.config = `./config/${NODE_ENV}.json`.loadJson(__dirname);

