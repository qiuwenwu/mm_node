require('./expand.js');

$.runPath = process.argv[0];
$.task = $.task_admin('sys');
$.task.update();
// 启动计时器
$.timer.start();