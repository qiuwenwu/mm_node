export default {
	state: function() {
		return {
			lang_now: "zh",
			lang: [
				/*
				{
					"name": ""
					"title": ""
				}
				*/
			],
			nav: {
				top: [{
						title: "应用",
						name: "app",
						url: "/app",
						message: 0
					},
					{
						title: "事件",
						name: "event",
						url: "/event",
						message: 0
					},
					{
						title: "接口",
						name: "api",
						url: "/api",
						message: 0
					},
					{
						title: "任务",
						name: "task",
						url: "/task",
						message: 0
					},
					{
						title: "素材",
						name: "source",
						url: "/source",
						message: 0
					},
					{
						title: "SQL",
						name: "sql",
						url: "/sql",
						message: 0
					},
					{
						title: "数据库",
						name: "db",
						url: "/db",
						message: 0
					},
					{
						title: "视图",
						name: "view",
						url: "/view",
						message: 0
					},
					{
						title: "帮助",
						name: "help",
						url: "/help",
						message: 0
					}
				],
				side: [],
				bottom: [{
					title: "加入我们",
					name: "support",
					url: "http://dev.elins.cn/",
					message: 0
				}],
				float: []
			},
			diy: {
				head_left: [],
				foot_left: [],
				foot_right: []
			}
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
