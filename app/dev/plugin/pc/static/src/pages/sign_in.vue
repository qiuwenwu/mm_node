<template>
	<mm_grid id="sign_in">
		<mm_col>
			<mm_view id="account_sign_in">
				<mm_title>
					<span class="h5">后台管理系统</span>
				</mm_title>
				<mm_form class="pc" id="form_account">
					<mm_input title="账号" type="text" v-model="form.account" desc="用户名/手机/邮箱"></mm_input>
					<mm_input title="密码" type="password" v-model="form.password" desc="由6-12位英文+数字符号组成"></mm_input>
					<mm_btn class="btn_primary wave linear_blue-1" @click.native="sign_in()">登录</mm_btn>
					<mm_switch title="记住账户" v-model="remember_me"></mm_switch>
				</mm_form>
					<p class="copyright"><span>@ 超级美眉工作室</span></p>
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
				remember_me: 1
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
		background-image: linear-gradient(-20deg, #b721ff 0%, #21d4fd 100%);
		max-width: initial;
		height: 100vh;
	}

	#account_sign_in .title {
		color: #fff;
	}
	#account_sign_in {
		position: absolute;
		min-width: 27rem;
		width: 25%;
		top: 45%;
		left: 50%;
		transform: translate(-50%, -50%);
		background: rgba(255, 255, 255, 0.25);
		border-radius: 0.25rem;
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

	#sign_in #form_account {
		text-align: left;
		padding: 2rem 1rem 3rem 1rem;
	}

	#sign_in #form_account input {
		border: 1px solid #01d1e4;
	}
	
	#account_sign_in .copyright {
		position: absolute;
		top: 120%;
		left: 50%;
		transform: translate(-50%, 0);
		color: rgba(255,255,255, 0.5);
	}
	
	#account_sign_in .mm_title {
		color: #fff;
		background: none;
		border-color: #fff;
	}
	
	#account_sign_in .btn_primary {
		float: left;
		margin-left: 1rem;
		width: calc(55% - 1rem);
		border-radius: 0.5rem;
	}
	
	#account_sign_in .mm_switch {
		transform: scale(.85);
		padding: 0 0.75rem;
		width: 45%;
		float: right;
	}
	.mm_switch .onoff
	{
		float: right;
		border:  none;
	}
	.mm_switch .onoff::after {
		border:  none;
		box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.15);
	}

	#account_sign_in .btn_primary:active {
		-webkit-filter: brightness(-1);
		filter: brightness(-1);
	}
</style>
