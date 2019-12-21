const Store = require('./store.js');

module.exports = (opts = {}) => {
	const {
		key = $.dict.session_id ? $.dict.session_id : "mm:uuid", store = new Store()
	} = opts;

	return async (ctx, next) => {
		let uuid = ctx.cookies.get(key, opts);
		let need_refresh = false;

		function new_session() {
			return new Proxy({}, {
				set: function(obj, prop, value) {
					obj[prop] = value;
					if (!obj.uuid) {
						store.getID(ctx).then(function(uuid) {
							obj.uuid = uuid;
						});
					}
				}
			});
		}

		if (!uuid) {
			/// 如果没有获到uuid 则为空对象
			ctx.session = new_session();
		} else {
			/// 如果有获取到则在sotre中尝试获取
			ctx.session = await store.get(uuid);

			// 如果当前没有找到重新分配会话ID
			if (ctx.session == null) {
				uuid = await store.getID(ctx);
				need_refresh = true;
			}

			// 检查会话必须是没有空对象
			if (typeof ctx.session !== "object" || ctx.session == null) {
				ctx.session = new_session();
			}
		}

		const old = JSON.stringify(ctx.session);

		// 添加刷新功能
		ctx.session.refresh = () => {
			need_refresh = true
		}

		// 添加刷新功能
		ctx.session.getID = () => {
			return ctx.cookies.get(key, opts);
		}

		await next();

		// 删除刷新功能
		if (ctx.session && 'refresh' in ctx.session) {
			delete ctx.session.refresh
		}

		const sess = JSON.stringify(ctx.session);

		// 如果没有改变
		if (!need_refresh && old == sess) return;

		// 如果是一个空对象
		if (sess == '{}') {
			ctx.session = null;
		}

		// 需要明确的旧会话
		if (uuid && !ctx.session) {
			await store.destroy(uuid, ctx);
			ctx.cookies.set(key, null);
			return;
		}

		// 建立/更新会话
		var o = Object.assign({}, opts, {
			uuid: ctx.session.uuid ? ctx.session.uuid : uuid
		});
		const sid = await store.set(ctx.session, o, ctx);

		var cg = Object.assign({}, opts);
		if (cg.maxAge) {
			cg.maxAge = cg.maxAge * 1000;
		}
		if (!uuid || uuid !== sid || need_refresh) ctx.cookies.set(key, sid, cg);
	}
}
