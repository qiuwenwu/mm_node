<template>
	<mm_grid id="sign_in">
		<mm_col>
			<mm_view id="account_sign_in">
				<mm_title>
					<span class="h5">超级美眉 — 后台管理系统</span>
				</mm_title>
				<mm_form class="pc" id="form_account">
					<mm_input title="账号" type="text" v-model="form.account" desc="用户名/手机/邮箱"></mm_input>
					<mm_input title="密码" type="password" v-model="form.password" desc="由6-12位英文+数字符号组成"></mm_input>
					<label id="remember_me"><input type="checkbox" v-model="remember_me" /><span>记住账户</span></label>
					<mm_btn type="primary" class="wave linear_blue-1" @click.native="sign_in()">登录</mm_btn>
				</mm_form>
			</mm_view>
		</mm_col>
	</mm_grid>
</template>

<script>
	import Vue from 'Vue';

	export default {
		data: function() {
			return {
				web: this.$store.state.web,
				form: {
					account: "",
					password: ""
				},
				remember_me: false
			}
		},
		methods: {
			sign_in() {
				var f = this.form;
				var form = {
					password: $.md5(f.password)
				};
				var account = f.account;
				if (account.indexOf('@') !== -1) {
					form.email = account;
				} else if (/1[0-9]{10}/.test(account)) {
					form.phone = account;
				} else {
					form.username = account;
				}
				var _this = this;
				this.$post('~/api/user/sign_in', form, function(res) {
					if (res.result) {
						_this.$store.commit('set_user', res.result);
						if (_this.remember_me) {
							$.db.set('account', account);
						}
						var url = _this.$redirect();
						_this.$router.push(url);

					} else if (res.error) {
						$.toast(res.error.message);
					}
				});
			}
		},
		created() {
			// 判断是否已登录, 已登录直接跳转页面
			var _this = this;
			this.$get('~/api/user/state', null, function(res) {
				if (res.result) {
					_this.$store.commit('set_user', res.result);
					var url = _this.$redirect();
					_this.$router.push(url);
				} else {
					_this.form.account = $.db.get('account');
				}
			});
		}
	}
</script>

<style>
	#sign_in {
		background: url(/admin/img/bg_sign.png) center center no-repeat;
		height: 100vh;
	}

	#account_sign_in .title {
		color: #fff;
	}

	#account_sign_in .mm_title {
		background: none;
	}

	#account_sign_in {
		position: absolute;
		width: 22rem;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		margin-left: 25rem;
		background: rgba(255, 255, 255, 0.35);
		border-radius: 0.25rem;
		overflow: hidden;
		box-shadow: 0 1px 0.25rem 0 rgba(0, 0, 0, .3);
	}

	#account_sign_in .body {
		text-align: center;
	}

	#account_sign_in .body h3 {
		text-align: center;
		padding-top: 2rem;
		padding-bottom: 1rem;
		color: #38f;
	}

	#sign_in #remember_me {
		display: inline-block;
		margin-left: 1rem;
		color: #fff;
	}

	#sign_in #form_account {
		text-align: left;
		padding: 2rem 1rem;
	}

	#sign_in #form_account input {
		border: 1px solid #01d1e4;
	}

	#sign_in #remember_me input {
		margin-right: .5rem;
		position: relative;
		top: .125rem;
	}
	
	#account_sign_in .mm_title {
		color: #38f;
	}
	
	#account_sign_in .btn_primary {
		float: right;
		width: 7.5rem;
		border-radius: 0.5rem;
	}

	#account_sign_in .btn_primary:active {
		-webkit-filter: brightness(-1);
		filter: brightness(-1);
	}
</style>
