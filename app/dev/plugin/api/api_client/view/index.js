var tpl = new $.Tpl();
const dir = __dirname + "/page/";

async function get_config(api_head, name, path) {
	var dist = $.pool.api;
	var config = {};
	const ne = name.replace('_edit', '').replace('_view', '');
	var ph = api_head + path;
	for (var k in dist) {
		var lt = dist[k].list;
		var len = lt.length;
		for (var i = 0, o; o = lt[i++];) {
			var cg = o.config;
			if (cg.name === ne || cg.path === ph) {
				config = cg;
				break;
			}
		}
	}
	console.log(ph, ne);
	console.log(config);
	return config;
}

async function create_page(o, db) {
	var page;
	var name = o.name;
	var path = o.path;
	
	if (name.indexOf('_edit') !== -1) {
		// 为后端编辑修改模板
		var m = {};
		var config = get_config('/apis', name, path);
		page = tpl.view(dir + 'edit.vue', m);
	} else if (name.indexOf('_view') !== -1) {
		// 为前端详情模板
		var m = {};
		var config = get_config('/api', name, path);
		page = tpl.view(dir + 'view.vue', m);
	} else if (o.component.indexOf('/admin') !== -1) {
		// 为后端表格模板
		var m = {};
		var config = get_config('/apis', name, path);
		page = tpl.view(dir + 'table.vue', m);
	} else if (name.indexOf('channel') !== -1 || name.indexOf('_type') !== -1) {
		// 为前端分类模板
		var m = {};
		var config = get_config('/api', name, path);
		page = tpl.view(dir + 'type.vue', m);
	} else {
		// 为前端列表模板
		var m = {};
		var config = get_config('/api', name, path);
		page = tpl.view(dir + 'list.vue', m);
	}
	if (page) {
		
	}
}

/**
 * @description 接口主函数
 * @param {Object} ctx HTTP上下文
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
async function main(ctx, db) {
	var req = ctx.request;
	var q = req.query;
	var scope = q["scope"];
	var obj = await $.nav.run(scope);
	var lt;
	if(!obj)
	{
		return;
	}
	else {
		lt = obj.routes;
	}
	var method = q["method"];
	if (!method) {
		method = "create";
	}
	var name = q["name"];
	if (name) {
		var page_type = q["page_type"];
		if (!page_type) {
			page_type = "list";
		}
	} else {
		// 如果名车没有填写, 则根据所有创建
		for (var i = 0, o; o = lt[i++];) {
			create_page(o);
			break;
		}
	}
	// {
	//   name: 'mall_shop_type',
	//   path: '/mall/shop_type',
	//   component: '/mall/admin/src/pages/shop_type.vue',
	//   level: 2,
	//   oauth: { signIn: true, gm: 2, user_admin: [] }
	// }
	console.log();
};

exports.main = main;
