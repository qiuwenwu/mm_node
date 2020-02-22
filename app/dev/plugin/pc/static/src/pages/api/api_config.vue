<template>
	<main>
		<header>
			<span class="h4">{{ obj.title }}</span>
		</header>
		<mm_body class="pc">
			<mm_grid>
				<mm_col width="20">
					<span>路由</span>
				</mm_col>
				<mm_col width="80">
					<mm_input title="请求路径" v-model="obj.path"></mm_input>
					<mm_select title="请求方式" v-model="obj.method" :options="options_method"></mm_select>
					<mm_select title="返回类型" v-model="obj.contentType" :options="options_type"></mm_select>
					<mm_number title="缓存时长" v-model.number="obj.cache" :min="0"></mm_number>
					<mm_select title="缓存方式" v-model="obj.client_cache" :options="options_cache"></mm_select>
				</mm_col>
			</mm_grid>
			<mm_grid>
				<mm_col width="20">
					<span>权限</span>
				</mm_col>
				<mm_col width="80">
					<mm_switch title="开放域" v-model="obj.oauth.scope" type="bool"></mm_switch>
					<mm_switch title="需要登录" v-model="obj.oauth.signIn" type="bool"></mm_switch>
					<mm_number title="会员权限" v-model.number="obj.oauth.vip" :min="0" :max="5"></mm_number>
					<mm_number title="管理权限" v-model.number="obj.oauth.gm" :min="0" :max="5"></mm_number>
					<mm_number title="商户权限" v-model.number="obj.oauth.mc" :min="0" :max="5"></mm_number>
					<mm_input title="用户组" v-model="user_group"></mm_input>
					<mm_input title="管理组" v-model="user_admin"></mm_input>
				</mm_col>
			</mm_grid>
			<mm_btn class="btn-save" type="primary" @click.native="set_sub()">保存</mm_btn>
		</main>
	</main>
</template>
