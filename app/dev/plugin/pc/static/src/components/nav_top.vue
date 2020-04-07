<template>
	<div id="nav_top">
		<a href="javascript:void(0)">
			<mm_icon src="<i class='fa-search'></i>"></mm_icon>
			<span>搜索</span>
		</a>
		<router-link to="/">
			<span>消息</span>
			<span class="msg">{{ msg_count }}</span>
		</router-link>
		<mm_select class="user" v-model="option" :options="options" type="click" :func="select">
			<mm_icon class="avatar" :src="user.avatar"></mm_icon>
		</mm_select>
		<router-link to="/">
			<mm_icon src="<i class='fa-ellipsis-v'></i>"></mm_icon>
		</router-link>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
				nav: this.$store.state.web.nav,
				user: this.$store.state.user,
				msg_count: 19,
				option: "",
				options: [{
						name: "基本资料",
						value: "/info"
					},
					{
						name: "修改密码",
						value: "/password"
					},
					{
						name: "退出",
						value: "/sign_out"
					}
				]
			}
		},
		methods: {
			select(value){
				if(value == '/sign_out'){
					var _this = this;
					this.$get('~/api/user/sign_out', null, function(res){
						_this.$store.commit('sign_out');
						_this.$router.push('/sign_in');
					});
				}
				else {
					this.$router.push(value);
				}
			}
		}
	};
</script>

<style>
	#nav_top {
		float: right;
	}

	#nav_top .mm_icon {
		width: 1.5rem;
		height: 1.5rem;
		text-align: center;
	}

	#nav_top .mm_icon img {
		width: 1.5rem;
		height: 1.5rem;
		border-radius: 50%;
	}

	#nav_top>* {
		padding: 0.5rem 0.75rem;
		line-height: 1.5rem;
		color: #fff;
		float: left;
		border-left: 1px solid rgba(0, 0, 0, 0.4);
		position: relative;
	}

	#nav_top>*:before {
		content: "";
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		height: 100%;
		border-left: 1px solid rgba(255, 255, 255, 0.1);
	}

	#nav_top>a:hover {
		background: rgba(128, 128, 128, 0.1);
	}

	#nav_top>a:active {
		background: rgb(0, 0, 0);
	}

	#nav_top a .mm_icon {
		float: left;
	}

	#nav_top .msg {
		text-align: center;
		display: inline-block;
		border-radius: 0.15rem;
		min-width: 1rem;
		font-size: 0.625rem;
		height: 1rem;
		line-height: 1.425;
		padding: 0 0.25rem 0 0.2rem;
		background: #ff9000;
	}

	#nav_top .user:hover {
		background: rgba(128, 128, 128, 0.1);
	}

	#nav_top .user {
		float: left;
		padding: 0 .5rem;
		height: 2.5rem;
	}

	#nav_top .user .avatar {
		border-radius: 50%;
	}

	#nav_top .user .mm_box {
		top: 2.55rem;
		left: -50%;
	}

	#nav_top .user a {
		color: #666;
	}
</style>
