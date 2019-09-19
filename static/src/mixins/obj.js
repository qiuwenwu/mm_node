export default {
	props: {
		// 回调函数
		func: {
			type: Object,
			default: function(fun, param1, param2) {
				return null
			}
		},
		// 主题
		theme: {
			type: String,
			default: "primary"
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
		// 加载进度, 小于100表示加载中，大于100表示加载完成
		loading: {
			type: Number,
			default: 0
		},
		// 主键
		field: {
			type: String,
			default: "id"
		},
		// 对象
		obj: {
			type: Object,
			default: function() {
				return {}
			}
		},
		// 允许访问的用户组
		user_group: {
			type: Array,
			default: function() {
				return []
			}
		},
		// 允许访问的管理组
		admin_group: {
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
		// 允许访问的角色
		roles: {
			type: Array,
			default: function() {
				return []
			}
		},
		// 身份验证
		oauth: {
			type: Boolean,
			default: false
		},
		// 视图模型
		vm: {
			type: Object,
			default: function() {
				return {
					// 当前ID
					id: 'id',
					// 上级ID
					fid: 'fid',
					// 图片
					img: 'img',
					// 图标
					icon: 'icon',
					// 标题
					title: 'title',
					// 描述
					desc: 'desc',
					// 内容
					content: 'content',
					// 时间
					time: 'time',
					// 链接
					url: 'url',
					// 方式
					mode: 'mode',
					// 来源
					source: 'source',
					// 来源地址
					source_url: 'source_url',
					// 标签
					label: 'label',
					// 名称
					name: 'name',
					// 值
					value: 'value',
					// 提示
					tip: 'tip',
					// 热度
					hot: 'hot',
					// 原价
					price_old: 'price_old',
					// 价格
					price: 'price',
					// 总价
					total: 'total',
					// 点赞数
					zan: 'zan',
					// 总量
					count: 'count',
					// 数量
					num: 'num',
					// 作者
					author: 'author'
				}
			}
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
			// 当前值
			val: this.value,
			// 数量
			nm: this.num,
			// 文本
			txt: this.text
		}
	},
	methods: {
		/// 可更改其他属性，默认绑定回调函数
		/// fun: 函数名
		/// param1: 参数1
		/// param2: 参数2
		/// param3: 参数3
		run(fun, param1, param2, param3) {
			if (this.func) {
				return this.func(param1, param2, param3)
			}
			return null;
		},
		// 修改
		/// query: 查询条件
		/// obj: 修改的对象
		set() {
			var query = {};
			query[this.field] = this.oj[this.field];
			this.run('set', query, this.oj);
		}
	}
}
