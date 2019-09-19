export default {
	state: function() {
		return {
			nav_top: [{
					title: "应用",
					name: "app",
					url: "/app",
					color: "",
					message: 0
				},
				{
					title: "事件",
					name: "event",
					url: "/event",
					color: "",
					message: 0
				},
				{
					title: "接口",
					name: "api",
					url: "/api",
					color: "",
					message: 0
				},
				{
					title: "任务",
					name: "task",
					url: "/task",
					color: "",
					message: 0
				},
				{
					title: "素材",
					name: "source",
					url: "/source",
					color: "",
					message: 0
				},
				{
					title: "SQL",
					name: "sql",
					url: "/sql",
					color: "",
					message: 0
				},
				{
					title: "数据库",
					name: "db",
					url: "/db",
					color: "",
					message: 0
				},
				{
					title: "视图",
					name: "view",
					url: "/view",
					color: "",
					message: 0
				},
				{
					title: "帮助",
					name: "help",
					url: "/help",
					color: "",
					message: 0
				}
			],
			nav_side: [],
			nav_bottom: [{
				title: "加入我们",
				name: "support",
				url: "http://dev.elins.cn/",
				color: "",
				message: 0
			}],
			nav_float: [],
			diy_head_left: [],
			diy_foot_left: [],
			diy_foot_right: []
		}
	},
	mutations: {
		set(state, data) {
			$.push(state, data);
		},
		req(state, data) {

		}
	},
	actions: {},
	getters: {}
};
