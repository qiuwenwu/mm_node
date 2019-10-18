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
			// 加载进度, 小于100表示加载中，大于100表示加载完成
			loading: 0,
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
			// 列表
			list: [],
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
			admin_group: [],
			// 允许访问的用户级别需多少以上
			vip: 0,
			// 允许访问的管理级别需多少以上
			gm: 0,
			// 允许访问的角色
			roles: [],
			// 身份验证
			oauth: false,
			// 显示中
			showing: 0,
			// 上传进度
			uploading: 0,
			// 获取中
			getting: 0,
			// 消息
			message: "",
			// 执行结果
			bl: false
		}
	},
	methods: {
		/**
		 * @description 提示框
		 * @param {String} text 提示内容
		 * @param {String} icon 提示图标
		 */
		toast(text, icon) {
			if (!icon) {
				icon = "none";
			}
			this.$toast(text, icon);
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
		 * @param {Object} query 查询条件
		 * @param {Object} value 要修改的数据
		 */
		set(query, value) {

		},
		/**
		 * @description 查询数据
		 * @param {Object} query 查询条件
		 */
		get(query) {
			if (this.url_get_obj) {
				this.get_obj(query);
			} else {
				this.get_list(query);
			}
		},
		/**
		 * @description 查询一条数据
		 * @param {Object} query 查询条件
		 */
		get_obj(query) {
			var url = this.url_get_obj;
			if (url) {
				if (query) {
					$.push(this.query, query);
				}
				var _this = this;
				this.$get(this.toUrl(this.events('get_obj_before', this.query), url), function(json, status) {
					var obj = _this.events('get_obj_after', json, status);
					if (obj) {
						$.clear(_this.obj);
						$.push(_this.obj, obj);
					} else if (json.result) {
						$.clear(this.obj);
						$.push(this, json.result);
						if (!json.result.obj) {
							var list = json.default.list;
							if (list.length > 0) {
								$.push(this.obj, list[0]);
							}
						}
					} else if (json.error) {
						_this.toast(json.error.message);
					} else {
						_this.toast('服务器连接失败！');
					}
				});
			}
		},
		/**
		 * @description 查询多条数据
		 * @param {Object} query 查询条件
		 * @param {fun} fun 回调函数
		 */
		get_list(query, fun) {
			var url = this.url_get_list ? this.url_get_list : this.url;
			if (url) {
				if (query) {
					$.push(this.query, query);
				}
				var _this = this;
				this.$get(this.toUrl(this.events('get_list_before', this.query), url), function(json, status) {
					var list = _this.events('get_list_after', json, fun);
					if (list) {
						_this.list.addList(list);
					} else if (json.result) {
						list = json.result.list;
						if (list) {
							_this.list.addList(list);
							if (json.result.count !== undefined) {
								_this.count = json.result.count;
							}
						}
					} else if (json.error) {
						_this.toast(json.error.message);
					} else {
						_this.toast('服务器连接失败！');
					}
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
			if (bl) {
				this.reset();
			}
			if (query) {
				$.push(this.query, query);
			}
			this.list.clear();
			this.get();
		},

		/**
		 * 提交表单
		 */
		submit() {
			var url = this.url_submit;
			if (url) {
				var form = this.submit_before(this.form);
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
		 * 上下翻页
		 * @param {Number} n 加减页码
		 */
		go(n) {
			this.goTo(this.page + n);
		},

		/// 
		/// page: 加减数
		/**
		 * 跳转到第N页
		 * @param {Number} page 页码
		 */
		goTo(page) {
			if (page < 1) {
				page = 1;
			} else if (page > this.page_count) {
				page = this.page_count;
			}
			this.page = page;
			this.get_list();
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
		 * 登录验证
		 */
		check_oauth() {
			if (this.oauth) {
				var _this = this;
				this.$get_user(function() {
					var token = $.db.get("token");
					if (token) {
						_this.$store.commit('web/set_redirect_url', _this.$route.path + location.search);
						_this.search();
					} else {
						_this.$nav(_this.redirect);
					}
				});
			} else {
				this.search();
			}
		},
		/**
		 * 初始化
		 */
		init() {
			$.push(this.query, this.$route.query);
			this.check_oauth();
		},
		/**
		 * @param {Object} param 验证参数
		 * @param {Object} dict
		 * @return {Boolean} 验证通过空, 否则返回错误提示
		 */
		check(param, dict) {
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
		 * 提交前验证事件
		 * @param {Object} 请求参数
		 * @return {String} 验证成功返回null, 失败返回错误提示
		 */
		submit_check(param) {
			return this.check(param, this.vm);
		},
		/// 提交前验证事件
		/// param: 请求参数
		/// 返回: 转换后的结果
		submit_before(param) {
			return param;
		},
		/// 获取到对象后事件
		/// json: 响应结果
		/// status: 服务器状态码
		/// 返回: 转换后的结果
		submit_after(json, status) {
			if (json.result) {
				this.toast(json.result.message);
			} else if (json.error) {
				this.toast(json.error.message);
			} else {
				this.toast('服务器连接失败！');
			}
		},
		/// 请求对象事件
		/// param: 请求参数
		/// 返回: 转换后的结果
		get_obj_before(param) {
			return param;
		},
		/// 获取到对象后事件
		/// json: 响应结果
		/// status: 服务器状态码
		/// 返回: 转换后的结果
		get_obj_after(json, status) {
			if (this.url_get_list || this.url) {
				this.get_list();
			}
		},
		/// 请求列表前事件
		/// param: 请求参数
		/// 返回: 转换后的结果
		get_list_before(param) {
			return param;
		},
		/// 获取到列表事件
		/// json: 响应结果
		/// status: 服务器状态码
		/// fun: 回调函数
		/// 返回: 转换后的结果
		get_list_after(json, status, fun) {
			if (fun) {
				fun();
			}
		},
		upload_after(json, status) {
			if (json.result) {
				this.toast(json.result.message);
			} else if (json.error) {
				this.toast(json.error.message);
			} else {
				this.toast('服务器连接失败！');
			}
		},
		/// 请求列表前事件
		/// param: 请求参数
		/// 返回: 转换后的结果
		upload_before(param) {
			return param;
		},
		upload_check(param) {
			return null;
		},
		upload() {
			var form = this.upload_before(this.form);
			var tip = this.upload_check(form);
			if (tip) {
				this.toast(tip);
			} else {
				this.uploading = 0;
				var file;
				if (this.file.name) {
					file = this.file;
				} else if (this.files.name) {
					file = this.files;
				}
				this.$upload(this.url_upload, form, file, this.upload_after);
			}
		}
	},
	computed: {
		/// 分页数
		page_count() {
			return parseInt(this.count / this.size);
		},
		// 加载时展示，true为加载中
		loading_show() {
			if (this.loading === 100 || this.loading == 0) {
				return false;
			}
			return true;
		}
	},
	created() {
		this.init();
	}
};
