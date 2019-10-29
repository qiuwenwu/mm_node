export default {
	data() {
		return {
			// 页标题
			title: "",
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

			/* === 缓存 === */
			// 显示方式
			display: "",
			// 当前索引
			index: 0,
			// 列数
			col: 4,
			// 总计
			count: 0,
			// 显示隐藏
			show: false,
			// 表单
			form: {},
			// 对象
			obj: {},
			// 上一组列表
			list_prev: [],
			// 列表
			list: [],
			// 下一组列表
			list_next: [],
			// 验证、视图模型
			vm: {},
			// 重定向
			redirect: "/account/signin",
			// 主键字段
			field: "id",
			// 查询
			query: {},
			// 配置
			config: {
				// 页面
				page: 1,
				// 大小
				size: 10,
				// 默认状态
				state: 0
			},
			// 允许访问的用户组
			user_group: [],
			// 允许访问的管理组
			user_admin: [],
			// 允许访问的用户级别需多少以上
			vip: 0,
			// 允许访问的管理级别需多少以上
			gm: 0,
			// 允许访问的角色
			roles: [],
			// 身份验证
			oauth: false,
			// 加载进度, 小于100表示加载中，大于100表示加载完成
			loading: 0,
			// 页面加载进度, 小于100表示加载中，大于100表示加载完成
			showing: 0,
			// 上传进度, 小于100表示加载中，大于100表示上传完成
			uploading: 0,
			// 数据提交进度, 小于100表示加载中，大于100表示提交完成
			posting: 0,
			// 消息
			message: "",
			// 执行结果
			bl: false,
			// 执行结果提示
			tip: "",
			// 模式 list列表模式、obj对象模式
			mode: "obj"
		}
	},
	methods: {
		/**
		 * @description 提示框
		 * @param {String} text 提示内容
		 * @param {Number} longTime 显示时长
		 */
		toast(text, longTime) {
			this.$.toast(text, longTime ? longTime : 2000);
		},
		/**
		 * @description 添加数据
		 * @param {Object} value 要添加的数据
		 */
		add(value) {

		},
		/**
		 * @description 删除数据
		 * @param {Object} query 查询条件
		 */
		del(query) {

		},
		/**
		 * @description 修改数据
		 * @param {Object} value 要修改的数据
		 * @param {Object} query 查询条件
		 */
		set(value, query) {
			var url = this.url_set;
			if (url) {
				var param = this.events('set_before', value);
				if (!param) {
					param = value;
				}
				if (!query) {
					if (this.field) {
						query = {};
						query[this.field] = param[this.field];
					} else {
						return;
					}
				}
				var _this = this;
				this.$post(this.toUrl(query, url), param, function(json, status) {
					_this.events('set_after', json, status);
				});
			}
		},
		/**
		 * @description 查询数据
		 * @func {Function} 回调函数
		 */
		get(func) {
			if (this.url_get_obj) {
				var _this = this;
				this.get_obj(this.query, function() {
					_this.get_list_first(_this.query, func);
				});
			} else {
				this.get_list_first(this.query, func);
			}
		},
		/**
		 * @description 查询一条数据
		 * @param {Object} query 查询条件
		 * @func {Function} 回调函数
		 */
		get_obj(query, func) {
			console.log('获取对象');
			var url = this.url_get_obj;
			if (url) {
				if (!query) {
					query = this.query;
				}
				var param = this.events('get_obj_before', query);
				if (!param) {
					param = query;
				}
				var msg = this.events('get_obj_check', param);
				if (msg) {
					if (func) {
						func();
					};
					return;
				} else {
					var _this = this;
					this.$get(this.toUrl(param, url), function(json, status) {
						var res = json.result;
						var obj = _this.events('get_obj_after', res, func);
						if (!obj && res) {
							$.push(_this, res);
							if (res.obj) {
								obj = res.obj;
							} else {
								var list = res.list;
								if (list && list.length > 0) {
									obj = list[0]
								} else {
									$.push(_this.obj, res);
								}
							}
						}
						if (obj) {
							$.push(_this.obj, obj);
						} else if (json.error) {
							console.log(json.error.message);
						} else if (!res) {
							_this.toast('服务器连接失败！');
						}
					});
				}
			}
		},
		/**
		 * @description 获取到对象后事件
		 * @param {Object} res 响应结果
		 * @param {Function} func 回调函数
		 */
		get_obj_after(res, func) {
			console.log('获取对象后');
			if (func) {
				func();
			}
		},
		/**
		 * @description 查询多条数据
		 * @param {Object} query 查询条件
		 * @param {Function} func 回调函数
		 */
		get_list(query, func) {
			var url = this.url_get_list;
			if (url) {
				if (!query) {
					query = this.query;
				}
				var param = this.events('get_list_before', query);
				if (!param) {
					param = query;
				}
				var msg = this.events('get_list_check', param);
				if (!msg) {
					var _this = this;
					this.$get(this.toUrl(param, url), function(json, status) {
						// 结束数据加载中动画
						_this.loading = 100;
						var res = json.result;
						var list = _this.events('get_list_after', res, func);
						if (!list && res) {
							list = res.list;
						}
						if (list) {
							_this.list.addList(list);
							if (res.count !== undefined) {
								_this.count = res.count;
							}
						} else if (json.error) {
							console.log(json.error.message);
						} else if (!res) {
							_this.toast('服务器连接失败！');
						}
					});
				}
			}
		},
		/**
		 * @description 获取到列表事件
		 * @param {Object} res 响应结果
		 * @param {Function} func 回调函数
		 */
		get_list_after(res, func) {
			if (func) {
				func();
			}
		},
		/**
		 * @description 查询多条数据 (首次)
		 * @param {Object} query 查询条件
		 * @param {Function} func 回调函数
		 */
		get_list_first(query, func) {
			console.log('首次获取列表');
			// 显示数据加载中动画
			this.loading = 0;
			// 清空查询结果
			this.list.clear();
			this.list_next.clear();
			this.list_prev.clear();

			if (!query) {
				query = this.query;
			}
			// 首次首次查询参数
			if (this.mode === 'list') {
				var q = Object.assign({
					count: true
				}, query);
				var _this = this;
				//  查询列表
				this.get_list(q, function() {
					// 结束数据加载中动画
					_this.loading = 100;
					if (_this.list.length > 0) {
						if (query.page === 1) {
							_this.get_list_next(func);
						} else {
							_this.get_list_next(function() {
								_this.get_list_prev(func);
							});
						}
					} else if (func) {
						func();
					}
				});
			} else {
				var _this = this;
				//  查询列表
				this.get_list(query, function() {
					// 结束数据加载中动画
					_this.loading = 100;
					if (func) {
						func();
					}
				})
			}
		},
		/**
		 * @description 查询下一页数据
		 * @param {Function} func 回调函数
		 */
		get_list_next(func) {
			console.log('查询下一页数据');
			$.push(this.list, this.list_next);
			this.list_next.clear();
			var q = Object.assign({}, this.query);
			if (q < this.page_count) {
				q.page += 1;
				this.get_list(q, function(res, f) {
					if (res.list) {
						this.list_next.addList(res.list)
					}
					if (func) {
						func();
					}
					return [];
				});
			}
		},
		/**
		 * @description 查询上一页数据
		 * @param {Function} func 回调函数
		 */
		get_list_prev(func) {
			console.log('查询上一页数据');
			$.push(this.list, this.list_prev);
			this.list_prev.clear();
			var q = Object.assign({}, this.query);
			if (q > 1) {
				q.page -= 1;
				this.get_list(q, function(res, f) {
					if (res.list) {
						this.list_prev.addList(res.list)
					}
					if (func) {
						func();
					}
					return [];
				});
			}
		},
		/**
		 * 重置
		 */
		reset() {
			// 重置查询条件
			$.clear(this.query);
			$.push(this.query, this.config);
		},
		/**
		 * 搜索
		 * @param {Object} query 查询条件
		 * @param {Boolean} bl 是否重置再搜索
		 */
		search(query, bl) {
			console.log('搜索');
			if (bl) {
				this.reset();
			}
			if (query) {
				// 设置查询条件
				$.push(this.query, query);
			}
			this.query.page = 1;
			$.route.push('?' + this.toUrl(this.query));

			// 执行首次获取列表函数
			this.get_list_first();
		},
		/**
		 * 提交表单
		 */
		submit() {
			var url = this.url_submit;
			if (url) {
				var form = this.submit_before(this.form);
				if (!form) {
					form = this.form;
				}
				var tip = this.submit_check(form);
				if (tip) {
					this.toast(tip);
				} else {
					var _this = this;
					this.$post(url, this.events('submit_before', form), function(json, status) {
						var msg = _this.events('submit_after', json, status);
						if (msg) {
							_this.toast(msg);
						}
					});
				}
			}
		},
		/**
		 * 提交前验证事件
		 * @param {Object} 请求参数
		 * @return {String} 验证成功返回null, 失败返回错误提示
		 */
		submit_check(param) {
			return this.check(param, this.vm);
		},
		/**
		 * @description 获取到对象后事件
		 * @param {Object} json 响应结果
		 * @param {Number} status 服务器状态码
		 */
		submit_after(json, status) {
			if (json.result) {
				this.toast(json.result.message);
			} else if (json.error) {
				this.toast(json.error.message);
			} else {
				this.toast('服务器连接失败！');
			}
		},
		/**
		 * 上下翻页
		 * @param {Number} n 加减页码
		 */
		go(n) {
			var page = this.query.page + n;
			// 跳转指定页
			this.goTo(page);
		},
		/**
		 * 跳转指定页
		 * @param {Number} page 页码
		 */
		goTo(page) {
			if (page < 1) {
				page = 1;
			} else if (page > this.page_count) {
				page = this.page_count;
			}
			var p = this.query.page;
			this.query.page = page;
			$.route.push('?' + this.toUrl(this.query));
			if (p + 1 == page) {
				// 搜索
				this.get_list_next();
			} else if (p - 1 == page) {
				// 搜索
				this.get_list_prev();
			} else {
				// 搜索
				this.get_list_first();
			}
		},
		/**
		 * @description 转查询参数
		 * @param {Object} obj 被转换的对象
		 * @param {String} url 请求地址
		 * @return {String} url字符串
		 */
		toUrl(obj, url) {
			return $.toUrl(obj, url);
		},
		/**
		 * 初始化后函数
		 */
		init_after(func) {
			// 结束页面加载动画
			this.showing = 100;
			if (func) {
				func();
			}
		},
		/**
		 * 初始化
		 */
		init() {
			// 显示页面加载动画
			this.showing = 0;
			var q = this.$route.query;
			// 执行初始化前事件函数
			var query = this.events('init_before', q);
			if (!query) {
				query = q;
			}

			// 设置查询参数
			$.push(this.query, query);

			var _this = this;
			// 判断是否直接加载页面，历史记录大于1表示切换页面
			if ($.route.history.length > 1) {
				// 重置查询参数
				// this.reset();

				// 执行初始化后事件函数
				_this.init_after(_this.get);
			} else {

				// 获取用户信息
				_this.$get_user(function() {
					// 执行初始化后事件函数
					_this.init_after(_this.get);
				});
			}
		},
		/**
		 * @param {Object} param 验证参数
		 * @param {Object} dict
		 * @return {Boolean} 验证通过空, 否则返回错误提示
		 */
		check(param, dict) {
			if (dict) {}
			return null;
		},
		/**
		 * @description 事件管理, 用于管理函数
		 * @param {String} name 事件名
		 * @param {Object} param1 参数1
		 * @param {Object} param2 参数2
		 * @return {Object} 返回事件特定值
		 */
		events(name, param1, param2) {
			var func = this[name];
			if (func) {
				return func(param1, param2);
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
		func(fun, param1, param2, param3) {
			var funObj = this[fun];
			if (funObj) {
				if (param1 === undefined) {
					return funObj()
				} else if (param2 === undefined) {
					return funObj(param1)
				} else if (param3 === undefined) {
					return funObj(param1, param2)
				} else {
					return funObj(param1, param2, param3);
				}
			} else {
				return null;
			}
		},
		/**
		 * @description 加载进度设置函数
		 * @param {Number} progress 加载进度, 小于100表示加载中，大于100表示加载完成
		 */
		load(progress) {
			if (progress) {
				this.loading = progress;
			} else {
				this.loading = 0;
			}
		},
		/**
		 * @description 上传文件
		 * @param {Function} func 回调函数
		 */
		upload(func) {
			var param = this.events('upload_before', this.form);
			if (!param) {
				param = this.form;
			}
			var msg = this.upload_check(param);
			if (msg) {
				this.toast(msg);
			} else {
				this.uploading = 0;
				var _this = this;
				this.$upload(this.url_upload, param, function(json, status) {
					_this.uploading = 100;
					// 执行上传成功后事件函数
					_this.events('upload_after', json, func);
				});
			}
		},
		/**
		 * @description 上传完成时
		 * @param {Object} json 响应结果
		 * @param {Function} func
		 */
		upload_after(json, func) {
			if (json.result) {
				this.toast(json.result.tip);
			} else if (json.error) {
				this.toast(json.error.message);
			} else {
				this.toast('服务器连接失败！');
			}
			if (func) {
				func();
			}
		}
	},
	computed: {
		/**
		 * 分页数量
		 */
		page_count() {
			return parseInt(this.count / this.size);
		}
	},
	created() {
		this.init();
	}
};
