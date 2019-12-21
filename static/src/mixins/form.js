define(function() {
	return {
		model: {
			prop: 'value',
			event: 'input'
		},
		props: {
			// 宽度
			width: {
				type: String,
				default: ''
			},
			height: {
				type: String,
				default: ''
			},
			// 类型
			type: {
				type: String,
				default: 'text'
			},
			// 选项
			options: {
				type: Array,
				default: function() {
					return []
				}
			},
			// 赋值
			value: {
				type: [String, Number, Boolean]
			},
			// 回调函数
			func: {
				type: Function,
				default: function(fun, param1, param2) {
					return null
				}
			},
			// 显示方式
			display: {
				type: String,
				default: "1"
			},
			// 显示隐藏
			show: {
				type: Boolean,
				default: false
			},
			// 标题
			title: {
				type: String,
				default: ""
			},
			// 图标
			icon: {
				type: String,
				default: ''
			},
			// 单位
			unit: {
				type: String,
				default: ''
			},
			// 描述
			desc: {
				type: String,
				default: ""
			},
			// 错误提示
			tip: {
				type: String,
				default: ""
			},
			// 最小值
			min: {
				type: Number,
				default: 0
			},
			// 最大值
			max: {
				type: Number,
				default: 0
			},
			// 最小长度
			min_length: {
				type: Number,
				default: 0
			},
			// 最大长度
			max_length: {
				type: Number,
				default: 65535
			},
			// 主键
			field: {
				type: String,
				default: "value"
			},
			// 标签
			type: {
				type: String,
				default: "text"
			},
			// 数量
			num: {
				type: Number,
				default: 1
			},
			// 文本
			text: {
				type: String,
				default: ""
			},
			disabled: {
				type: Boolean,
				default: false
			},
			// 链接
			url: {
				type: String,
				default: ""
			},
			// 允许访问的用户组
			user_group: {
				type: Array,
				default: function() {
					return []
				}
			},
			// 允许访问的管理组
			user_admin: {
				type: Array,
				default: function() {
					return []
				}
			},
			// 允许访问的用户级别需多少以上
			vip: {
				type: Number,
				default: 0
			},
			// 允许访问的管理级别需多少以上
			gm: {
				type: Number,
				default: 0
			},
			// 身份验证
			oauth: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				// 显示方式
				dy: this.display,
				// 显示隐藏
				sw: this.show,
				// 加载中
				load: this.loading,
				// 列表
				oj: this.obj,
				// 数量
				nm: this.num,
				// 文本
				txt: this.text,
				// 值
				val: this.value,
				// 禁用
				dd: this.disabled
			}
		},
		methods: {
			data: function data() {
				return {
					// 显示方式
					dy: this.display,
					// 显示隐藏
					sw: this.show,
					// 加载中
					load: this.loading,
					// 列表
					oj: this.obj,
					// 数量
					nm: this.num,
					// 文本
					txt: this.text,
					// 值
					val: this.value,
					// 禁用
					dd: this.disabled
				};
			},
			/// 可更改其他属性，默认绑定回调函数
			/// fun: 函数名
			/// param1: 参数1
			/// param2: 参数2
			/// param3: 参数3
			run: function run(fun, param1, param2, param3) {
				if (this.func) {
					return this.func(param1, param2, param3);
				}
				return null;
			},
			// 删除
			/// query: 查询条件
			del: function del() {
				var query = {};
				query[this.field] = this.id;
				this.run('del', query);
			},
			// 修改
			/// query: 查询条件
			/// obj: 修改的对象
			set: function set(obj) {
				var query = {};
				query[this.field] = this.id;
				this.run('set', query, obj);
			}
		}
	};
});
