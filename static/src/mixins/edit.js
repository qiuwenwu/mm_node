export default {
	data() {
		var password_check = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入密码'));
			} else {
				if (this.form.password !== '') {
					this.$refs.form.validateField('password_check');
				}
				callback();
			}
		};

		var password_confirm_check = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请再次输入密码'));
			} else if (value !== this.form.password) {
				callback(new Error('两次输入密码不一致!'));
			} else {
				callback();
			}
		};

		return {
			// 增加地址
			url_add: "",
			// 修改地址
			url_set: "",
			// 查询
			query: {},
			// 对象
			obj: {},
			// 表单
			form: {},
			// 默认访问链接
			url: "",
			rules: {
				account: [{
					min: 6,
					max: 26,
					message: '长度在 6 到 26 个字符',
					trigger: 'blur'
				}],
				email: [{
					min: 6,
					max: 26,
					message: '长度在 6 到 26 个字符',
					trigger: 'blur'
				}],
				phone: [{
					min: 11,
					max: 11,
					message: '长度在 11 个字符',
					trigger: 'blur'
				}],
				name: [{
						required: true,
						message: '请输入名称',
						trigger: 'blur'
					},
					{
						min: 2,
						max: 8,
						message: '长度在 2 到 8 个字符',
						trigger: 'blur'
					}
				],
				coin_address: [{
						required: true,
						message: '请输入收币地址',
						trigger: 'blur'
					},
					{
						min: 30,
						max: 35,
						message: '长度在 30 到 35 个字符',
						trigger: 'blur'
					}
				],
				date_min: [{
					type: 'date',
					required: true,
					message: '请选择日期',
					trigger: 'change'
				}],
				date_max: [{
					type: 'date',
					required: true,
					message: '请选择时间',
					trigger: 'change'
				}],
				password: [{
						min: 6,
						max: 11,
						message: '长度在 6 到 11 个字符',
						trigger: 'blur'
					},
					{
						validator: password_check,
						trigger: 'blur'
					}
				],
				password_confirm: [{
					validator: password_confirm_check,
					trigger: 'blur'
				}]
			}
		}
	},
	methods: {
		// 添加
		add(val) {

		},

		// 添加一条
		add_one(obj) {

		},

		// 修改
		set(query, val) {

		},

		// 修改一条
		set_one(query, obj) {

		},

		/// 重置
		reset() {
			// 重置查询条件
			$.clear(this.query);
			$.push(this.query, this.config);

			// 重置表单
			$.clear(this.form);
			$.push(this.form, this.obj);
		},
		
		/// 验证参数
		/// 返回: 验证通过空, 否则返回错误提示
		check(param, dict) {
			return null;
		}
	}
};
