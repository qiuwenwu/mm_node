define(function() {
	"use strict";

	return {
		data: function data() {
			return {
				// 标题
				title: "",
				// 地址
				url: "",
				// 添加地址
				url_add: "",
				// 删除地址
				url_del: "",
				// 修改地址
				url_set: "",
				// 查询对象地址
				url_get_obj: "",
				// 查询列表地址
				url_get_list: "",
				// 表单提交地址
				url_submit: "",
				// 上传提交地址
				url_upload: "",
				// 获取的列表
				list: [],
				// 获取上一页列表
				list_prev: [],
				// 获取下一页列表
				list_next: [],
				// 视图&验证模型
				vm: {},
				// 提交表单
				form: {},
				// 线上对象
				obj: {},
				// 查询参数
				query: {
					// // 当前页面
					// page: 1,
					// // 页面大小
					// size: 10
				},
				// 配置
				config: {
					// 默认当前页面
					page: 1,
					// 默认页面大小
					size: 10,
					// 状态
					state: 0
				},
				// 加载进度
				loading: 0,
				// 显示进度
				showing: 0,
				// 提交进度
				posting: 0,
				// 选中项
				selete: 0,
				// 查询结果匹配数统计
				count: 0,
				// 显示隐藏，true显示，false隐藏
				show: false,
				// 响应成功或失败
				bl: false,
				// 显示方式
				display: "",
				// 关键字段
				field: "",
				// 响应提示
				tip: "",
				// 默认请求方式
				mode: "list",
				// 清除列表
				clear_list: true,
				// 响应错误消息
				message: "",
				// 选中集
				selects: "",
				// 当前页, 用于跳转页面
				page_now: 1,
				// 选择项状态
				select_state: false,
				// 修改条件
				query_set: {}
			};
		},
		methods: {
			/**
			 * @description 事件管理, 用于管理函数
			 * @param {String} name 事件名
			 * @param {Object} param1 参数1
			 * @param {Object} param2 参数2
			 * @return {Object} 返回事件特定值
			 */
			events: function events(name, param1, param2) {
				// console.log(name);
				if (this[name]) {
					return this[name](param1, param2);
				} else {
					return null;
				}
			},
			/**
			 * 回调函数(中控)
			 * @param {String} name 函数名
			 * @param {Object} param1
			 * @param {Object} param2
			 * @param {Object} param3
			 * @return {Object} 任意值
			 */
			func: function func(name, param1, param2, param3) {
				var f = this[name];
				if (f) {
					if (param1 === undefined) {
						return f();
					} else if (param2 === undefined) {
						return f(param1);
					} else if (param3 === undefined) {
						return f(param1, param2);
					} else {
						return f(param1, param2, param3);
					}
				} else {
					return null;
				}
			},
			/**
			 * @description 添加数据
			 * @param {Object} param 要添加的数据
			 * @param {Function} func 回调函数
			 */
			add: function add(param, func) {
				if (!param) {
					param = this.obj;
				}
				var pm = this.events("add_before", param) || param;
				var msg = this.events("add_check", pm);
				var ret;
				if (!msg) {
					ret = this.events("add_main", pm, func);
				}
				return ret;
			},
			/**
			 * @description 删除数据
			 * @param {Object} param 查询条件
			 */
			del: function del(param, func) {
				if (!param) {
					param = this.query;
				}
				var pm = this.events("del_before", param) || param;
				var msg = this.events("del_check", pm);
				var ret;
				if (!msg) {
					ret = this.events("del_main", pm, func);
				}
				return ret;
			},
			del_show: function(o, id) {
				var _this = this;
				$.confirm('删除后将无法回复!<br/>是否确定要删除?', function() {
					// console.log('确定删除!');
					var query = {};
					query[id] = o[id];
					_this.del(query, function() {
						_this.list.del(query);
						_this.count -= 1;
					});
				}, function() {
					// console.log('取消删除!')
				})
			},
			/**
			 * @description 修改数据
			 * @param {Object} param 修改项
			 * @param {String} query 查询条件
			 * @param {Boolean} includeZero 是否包括0
			 */
			set: function set(param, query, func, includeZero) {
				if (!param) {
					param = this.obj;
				}
				if (query) {
					this.query_set = query;
				} else if (!this.query_set) {
					this.query_set = Object.assign({}, this.query);
				}
				var pm = this.events("set_before", param, includeZero) || param;
				var msg = this.events("set_check", pm);
				var ret;
				if (!msg) {
					ret = this.events("set_main", pm, func);
				}
				return ret;
			},
			/**
			 * 修改前事件
			 * @param {Object} param
			 * @param {Boolean} includeZero 是否包括0
			 * @param {Object} 返回新的参数
			 */
			set_before: function set_before(param, includeZero) {
				// console.log('修改前', $.toJson(param));
				return $.delete(param, includeZero);
			},
			/**
			 * 批量修改
			 */
			batchSet: function batchSet() {
				var _this = this;
				$.confirm('批量修改数据无法挽回<br/>确定要操作吗?', function() {
					var q = Object.assign({}, _this.query, _this.query_set);
					q[_this.field] = _this.selects;
					delete q.page;
					delete q.size;
					delete q.orderby;
					_this.set(_this.form, q, function(json) {
						if (json.result) {
							_this.show = false;
							_this.get();
						}
					}, true);
				});
			},
			/**
			 * @description 查询多条数据
			 * @param {Object} query 查询条件
			 * @param {Function} func 回调函数
			 */
			get_list: function get_list(param, func) {
				if (!param) {
					param = this.query;
				}
				var pm = this.events("get_list_before", param) || param;
				var msg = this.events("get_list_check", pm);
				var ret;
				if (!msg) {
					ret = this.events("get_list_main", pm, func);
				}
				return ret;
			},
			/**
			 * @description 查询一条数据
			 * @param {Object} query 查询条件
			 * @func {Function} 回调函数
			 */
			get_obj: function get_obj(param, func) {
				if (!param) {
					param = this.query;
				}
				var pm = this.events("get_obj_before", param) || param;
				var msg = this.events("get_obj_check", pm);
				var ret;
				if (!msg) {
					ret = this.events("get_obj_main", pm, func);
				} else if (func) {
					func();
				}
				return ret;
			},
			sort: function sort(param, func) {
				var pm = this.events("sort_before", param) || param;
				var msg = this.events("sort_check", pm);
				var ret;
				if (!msg) {
					ret = this.events("sort_main", pm, func);
				}
				return ret;
			},
			init: function init(param, func) {
				var pm = this.events("init_before", param) || param;
				var msg = this.events("init_check", pm);
				var ret;
				if (!msg) {
					ret = this.events("init_main", pm, func);
				} else if (func) {
					func();
				}
				return ret;
			},
			submit: function submit(param, func) {
				if (!param) {
					param = this.form;
				}
				var pm = this.events("submit_before", param) || param;
				var msg = this.events("submit_check", pm);
				var ret;
				if (msg) {
					this.toast(msg);
				} else {
					ret = this.events("submit_main", pm, func);
				}
				return ret;
			},
			/**
			 * 提交前事件
			 * @param {Object} param 提交参数
			 */
			submit_before: function(param) {
				return $.delete(param);
			},
			upload: function upload(param, func) {
				var pm = this.events("upload_before", param) || param;
				var msg = this.events("upload_check", pm);
				var ret;
				if (msg) {
					this.toast(msg);
				} else {
					ret = this.events("upload_main", pm, func);
				}
				return ret;
			},
			/**
			 * @description 提示框
			 * @param {String} text 提示内容
			 * @param {Number} longTime 显示时长
			 */
			toast: function toast(text, longTime) {
				this.$.toast(text, longTime ? longTime : 2000);
			},
			/**
			 * @description 添加数据
			 * @param {Object} value 要添加的数据
			 */
			add_main: function add_main(value, func) {
				var url = "";
				if (this.url) {
					url = this.url + "method=add";
				} else {
					url = this.url_add;
				}
				if (!url) {
					return;
				}
				var _this = this;
				this.$post(url, value, function(json) {
					_this.events("add_after", json, func);
					if (json.result) {
						$.toast(json.result.tip);
					} else if (json.error) {
						$.toast(json.error.message);
					} else {
						$.toast('添加失败! 原因:是服务器连接失败!');
					}
				});
			},
			/**
			 * @description 删除数据
			 * @param {Object} query 查询条件
			 * @param {Function} func 删除回调函数函数
			 */
			del_main: function del_main(query, func) {
				var url = "";
				if (this.url) {
					url = this.url + "method=del";
				} else {
					url = this.url_del;
				}
				var _this = this;
				this.$get(url, query, function(json) {
					_this.events("del_after", json, func);
					if (json.result) {
						$.toast(json.result.tip);
					} else if (json.error) {
						$.toast(json.error.message);
					} else {
						$.toast('删除失败! 原因:是服务器连接失败!');
					}
				});
			},
			/**
			 * 删除之后事件
			 * @param {Object} json 返回的结果
			 * @param {Object} func 回调函数
			 */
			del_after: function del_after(json, func) {
				if (func) {
					func();
				}
			},
			/**
			 * @description 修改数据
			 * @param {Object} value 要修改的数据
			 * @param {Object} value 修改项
			 */
			set_main: function set_main(value, func) {
				var url = "";
				if (this.url) {
					url = this.url + "method=set";
				} else {
					url = this.url_set;
				}
				if (!url) {
					return;
				}
				var _this = this;
				this.$post(this.toUrl(this.query_set, url), value, function(json, status) {
					_this.events("set_after", json, func);
					if (json.result) {
						$.toast(json.result.tip);
					} else if (json.error) {
						$.toast(json.error.message);
					} else {
						$.toast('修改失败! 原因:是服务器连接失败!');
					}
				});
			},
			/**
			 * 修改成功时执行
			 * @param {Object} json 结果
			 * @param {Object} func 回调函数
			 */
			set_after: function set_after(json, func) {
				if (func) {
					func(json);
				}
			},
			/**
			 * @description 查询数据
			 * @param {Object} query 查询参数
			 * @param {Function} func 回调函数
			 */
			get: function get(query, func) {
				this.get_main(query, func);
			},
			/**
			 * @description 查询数据(主程序)
			 * @param {Object} query 查询参数
			 * @param {Function} func 回调函数
			 */
			get_main: function get_main(query, func) {
				var url = "";
				if (this.url) {
					url = this.url + "method=get";
				} else {
					url = this.url_get_obj;
				}
				if (url) {
					var _this = this;
					this.get_obj(query, function() {
						_this.get_first(query, func);
					});
				} else {
					this.get_first(query, func);
				}
			},
			/**
			 * 验证请求
			 * @param {Object} param 请求参数
			 */
			get_obj_check: function get_obj_check(param) {
				var bl = false;
				for (var k in param) {
					if (param[k]) {
						bl = true;
						break;
					};
				}
				if (bl) {
					return null;
				} else {
					return "缺少查询条件";
				}
			},
			/**
			 * @description 查询一条数据(主程序)
			 * @param {Object} query 查询条件
			 * @param {Function} func 回调函数
			 */
			get_obj_main: function get_obj_main(query, func) {
				// console.log("get_obj_main");
				var url = "";
				if (this.url) {
					url = this.url + "method=get";
				} else {
					url = this.url_get_obj;
				}
				if (!url) {
					return;
				}
				var _this = this;
				this.$get(this.toUrl(query, url), null, function(json, status) {
					var res = json.result;
					if (res) {
						var obj;
						$.push(_this, res);
						if (res.obj) {
							obj = res.obj;
						} else {
							var list = res.list;
							if (list && list.length > 0) {
								obj = list[0];
							} else {
								obj = res;
							}
						}
						if (obj) {
							if (Object.keys(_this.obj).length === 0) {
								_this.obj = obj;
							} else {
								$.push(_this.obj, obj);
							}
						}
					} else if (json.error) {
						console.log(json.error.message);
					} else {
						_this.toast("服务器连接失败！");
					}
					_this.events("get_obj_after", res);

					if (func) {
						func(res);
					}
				});
			},
			/**
			 * @description 获取到对象后事件
			 * @param {Object} res 响应结果
			 */
			get_obj_after: function get_obj_after(res) {
				$.push(this.form, this.obj);
				var o = this.form;
				for (var k in o) {
					if (k.indexOf('time') !== -1) {
						o[k] = o[k].replace('T', ' ').replace('Z', '').replace('.000', '').replace('Z', '');
					}
				}
			},
			/**
			 * @description 查询多条数据(主程序)
			 * @param {Object} query 查询条件
			 * @param {Function} func 回调函数
			 */
			get_list_main: function get_list_main(query, func) {
				// console.log("get_list_main");
				var url = this.url_get_list;
				if (!url) {
					return;
				}
				var _this = this;
				this.loading = 0;
				this.$get(this.toUrl(query, url), null, function(json, status) {
					_this.loading = 100;
					var res = json.result;
					if (res) {
						if (_this.list.length === 0 && _this.count === 0) {
							_this.list.addList(res.list);
						}
						if (res.count !== undefined) {
							_this.count = res.count;
						}
					} else if (json.error) {
						console.log(json.error.message);
					} else {
						_this.toast("服务器连接失败！");
					}

					_this.events("get_list_after", res);
					if (func) {
						func(res);
					}
				});
			},
			/**
			 * @description 获取到列表事件
			 * @param {Object} res 响应结果
			 */
			get_list_after: function get_list_after(res) {
				this.page_now = this.query.page;
			},
			/**
			 * 搜索
			 * @param {Object} query 查询条件
			 * @param {Boolean} bl 是否重置再搜索
			 */
			search: function search(query, bl) {
				if (bl) {
					this.reset();
				}
				if (query) {
					$.push(this.query, query);
				}
				this.query.page = 1;
				$.route.push("?" + this.toUrl(this.query));
				this.get_first(this.query);
			},
			/**
			 * 请求上下页数据
			 * @param {Object} res 结果
			 */
			get_prev_next(res) {
				var _this = this;
				var query = this.query;
				if (query.page < this.page_count) {
					var q = Object.assign({}, query);
					q.page += 1;
					_this.get_list(q, function(res) {
						_this.list_next = res.list;
					});
				}
				if (query.page > 1) {
					var q = Object.assign({}, query);
					q.page -= 1;
					_this.get_list(q, function(res) {
						_this.list_prev = res.list;
					});
				}
			},
			/**
			 * @description 查询多条数据 (首次)
			 * @param {Object} query 查询条件
			 * @param {Function} func 回调函数
			 */
			get_first: function get_first(query, func) {
				var _this = this;
				_this.loading = 0;
				this.list.clear();
				this.list_next.clear();
				this.list_prev.clear();
				_this.count = 0;
				var q = Object.assign({
					count_ret: "true"
				}, query);
				if (this.mode === "list") {
					this.get_list(q, function(res) {
						_this.loading = 100;
						if (func) {
							func(res);
						}
						_this.get_prev_next(res);
					});
				} else {
					this.get_list(q, function(res) {
						_this.loading = 100;
						if (func) {
							func(res);
						}
					});
				}
			},
			/**
			 * @description 查询下一页数据
			 * @param {Function} func 回调函数
			 */
			next: function next(func) {
				console.log("next");
				var list_next = this.list_next;
				this.list_prev = [];
				this.list_prev.addList(this.list);
				if (this.clear_list) {
					this.list.clear()
				}
				this.list.addList(list_next);
				list_next.clear();
				if (this.query.page < this.page_count || this.page_count === 0) {
					var q = Object.assign({}, this.query);
					q.page += 1;
					this.get_list(q, function(res, f) {
						if (res.list) {
							list_next.addList(res.list);
						}
						if (func) {
							func(res);
						}
						return [];
					});
				}
			},
			/**
			 * @description 查询上一页数据
			 * @param {Function} func 回调函数
			 */
			prev: function prev(func) {
				console.log("prev");
				var lt = this.list;
				this.list_next = [];
				this.list_next.addList(this.list);
				if (this.clear_list) {
					this.list.clear();
				}
				var list_prev = this.list_prev;
				list_prev.addList(lt);
				this.list.clear();
				this.list.addList(list_prev);
				list_prev.clear();
				var q = Object.assign({}, this.query);
				if (q.page > 1) {
					q.page -= 1;
					this.get_list(q, function(res, f) {
						if (res.list) {
							list_prev.addList(res.list);
						}
						if (func) {
							func(res);
						}
						return [];
					});
				}
			},
			/**
			 * 重置
			 */
			reset: function reset() {
				$.clear(this.query);
				$.push(this.query, this.config);
			},

			/**
			 * 提交表单
			 */
			submit_main: function submit_main(param, func) {
				var url = this.url ? this.url : this.url_submit;
				if (url) {
					if (this.field) {
						var id = param[this.field];
						if (id) {
							var q = {
								method: 'set'
							};
							q[this.field] = id;
							url = this.toUrl(q, url);
						} else {
							url += "method=add"
						}
					} else {
						url += "method=submit"
					}
				} else {
					if (this.field) {
						var id = param[this.field];
						if (id) {
							url = this.url_set;
						} else {
							url = this.url_add;
						}
					}
				}

				// console.log('提交', url);
				if (url) {
					var _this = this;
					this.$post(url, param, function(json, status) {
						_this.events("submit_after", json, func);
						if (json.result) {
							// _this.toast(json.result.tip);
							_this.$back();
						} else if (json.error) {
							_this.toast(json.error.message);
						} else {
							_this.toast("服务器连接失败！");
						}
					});
				}
			},
			/**
			 * 提交前验证事件
			 * @param {Object} 请求参数
			 * @return {String} 验证成功返回null, 失败返回错误提示
			 */
			submit_check: function submit_check(param) {
				return null;
			},
			/**
			 * @description 获取到对象后事件
			 * @param {Object} json 响应结果
			 * @param {Function} func 回调函数
			 */
			submit_after: function submit_after(json, func) {
				if (func) {
					func(json);
				}
			},
			/**
			 * 上下翻页
			 * @param {Number} n 加减页码
			 */
			go: function go(n) {
				var page = this.query.page + n;
				this.goTo(page);
			},
			/**
			 * 跳转指定页
			 * @param {Number} page 页码
			 */
			goTo: function goTo(page) {
				if (page < 1) {
					page = 1;
				} else if (page > this.page_count) {
					page = this.page_count;
				}
				var query = this.query;
				var p = query.page;
				query.page = page;
				$.route.push("?" + this.toUrl(query));
				if (p + 1 == page) {
					this.next();
				} else if (p - 1 == page) {
					this.prev();
				} else if (p == 1 && page !== 1) {
					this.get_first(query);
				} else if (p == this.page_count && page !== this.page_count) {
					this.get_first(query);
				}
			},
			/**
			 * @description 转查询参数
			 * @param {Object} obj 被转换的对象
			 * @param {String} url 请求地址
			 * @return {String} url字符串
			 */
			toUrl: function toUrl(obj, url) {
				return $.toUrl(obj, url);
			},
			/**
			 * 初始化前函数
			 */
			init_before: function init_before(query) {
				if (!query) {
					query = this.config;
				}
				return query;
			},
			/**
			 * 初始化
			 */
			init_main: function init_main(query) {
				var _this = this;
				$.push(this.query, query);
				_this.init_after(function() {
					_this.get(_this.query);
				});
			},
			/**
			 * 初始化后函数
			 */
			init_after: function init_after(func) {
				if (func) {
					func();
				}
			},
			/**
			 * @description 上传文件
			 * @param {Function} func 回调函数
			 */
			upload_main: function upload_main(func) {
				var url = "";
				if (this.url) {
					url = this.url + "method=upload";
				} else {
					url = this.url_upload;
				}

				if (!param) {
					param = this.form;
				}
				if (msg) {
					this.toast(msg);
				} else {
					this.uploading = 0;
					var _this = this;
					this.$upload(url, param, function(json, status) {
						_this.uploading = 100;
						_this.events("upload_after", json, func);
					});
				}
			},
			/**
			 * @description 上传完成时
			 * @param {Object} json 响应结果
			 * @param {Function} func
			 */
			upload_after: function upload_after(json, func) {
				if (json.result) {
					this.toast(json.result.tip);
				} else if (json.error) {
					this.toast(json.error.message);
				} else {
					this.toast("服务器连接失败！");
				}
				if (func) {
					func();
				}
			},
			/**
			 * 结束前
			 * @param {Object} param 参数
			 */
			end_before: function end_before(param) {
				this.reset();
			},
			/**
			 * 选择项全改
			 */
			select_all: function select_all() {
				var bl = !this.select_state;
				if (!bl) {
					this.selects = '';
				} else {
					var s = '';
					var list = this.list;;
					for (var i = 0; i < list.length; i++) {
						s += '|' + list[i][this.field];
					}
					this.selects = s.replace('|', '');
				}
				this.select_state = bl;
			},
			/**
			 * 选择项改变
			 * @param {String|Number} id 选择的ID
			 */
			select_change: function select_change(id) {
				var has = false
				var arr = this.selects.split('|');
				for (var i = 0; i < arr.length; i++) {
					var o = arr[i];
					if (id == o) {
						arr.splice(i, 1);
						has = true;
						break;
					}
				}
				if (!has) {
					arr.push(id)
				}
				var s = arr.join('|');
				if (s.indexOf('|') == 0) {
					this.selects = s.substring(1)
				} else {
					this.selects = s;
				}
			},
			/**
			 * 选择项含有
			 * @param {String|Number} id 选择的ID
			 */
			select_has: function select_has(id) {
				var ids = '|' + this.selects + '|';
				return ids.indexOf('|' + id + '|') !== -1;
			},
			/**
			 * 页面改变时
			 * @param {Object} e 事件
			 */
			page_change: function page_change(e) {
				var n = Number(e.target.value);
				if (isNaN(n)) {
					n = 1;
				}
				if (n < 1) {
					n = 1;
				} else if (n > this.page_count) {
					n = this.page_count
				}
				this.page_now = n;
			},
			/**
			 * 获取名称
			 * @param {Array} list 用来取名的列表
			 * @param {String} arr_str id集合
			 * @param {String} key 键
			 * @param {String} span 分隔符
			 */
			get_name(list, arr_str, key, span) {
				var name = "";
				if (arr_str) {
					if (typeof(arr_str) == 'string') {
						if (!span) {
							span = ',';
						}
						var arr = arr_str.split(span);
						var id = Number(arr[0]);

						for (var i = 0; i < list.length; i++) {
							var o = list[i];
							if (o[key] == id) {
								name += '|' + o.name;
							}
						}
					} else {
						var id = arr_str;
						for (var i = 0; i < list.length; i++) {
							var o = list[i];
							if (o[key] == id) {
								name = o.name;
								break
							}
						}
					}
				}
				return name.replace('|', '');
			},
			/**
			 * 取消并返回
			 */
			cancel: function cancel() {
				this.$back();
			}
		},
		computed: {
			/**
			 * 分页数量
			 */
			page_count: function page_count() {
				return Math.ceil(this.count / this.query.size);
			}
		},
		created: function created() {
			this.showing = 0;
			this.init(this.$route.query);
		},
		mounted: function mounted() {
			this.showing = 100;
		},
		beforeDestroy: function beforeDestroy() {
			this.events('end_before');
		}
	};
});
