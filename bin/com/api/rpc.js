/**
 * 实例化一个PRC方法集
 * @class
 */
function methods(cm) {
	return {
		/**
		 * 增加数据
		 * @param {Object} db 数据库管理器
		 * @param {Object} query 查询条件，键值对
		 * @param {Object} body 要添加的数据，键值对
		 */
		async add(db, query, body) {
			var q = {
				method: 'add'
			};
			return await cm.sql.run(q, body, db);
		},
		/**
		 * 删除数据
		 * @param {Object} db 数据库管理器
		 * @param {Object} query 查询条件，键值对
		 * @param {Object} body 要添加的数据，键值对
		 */
		async del(db, query, body) {
			var q = Object.assign(query, {
				method: 'del'
			});
			return await cm.sql.run(q, body, db);
		},
		/**
		 * 修改数据
		 * @param {Object} db 数据库管理器
		 * @param {Object} query 查询条件，键值对
		 * @param {Object} body 要添加的数据，键值对
		 */
		async set(db, query, body) {
			var q = Object.assign(query, {
				method: 'set'
			});
			return await cm.sql.run(q, body, db);
		},
		/**
		 * 查询数据
		 * @param {Object} db 数据库管理器
		 * @param {Object} query 查询条件，键值对
		 * @param {Object} body 要添加的数据，键值对
		 */
		async get(db, query, body) {
			var q = Object.assign(query, {
				method: 'get'
			});
			return await cm.sql.run(q, null, db);
		},

		/**
		 * 更新数据
		 * @param {Object} db 数据库管理器
		 * @param {Object} query 查询条件，键值对
		 * @param {Object} body 要添加的数据，键值对
		 */
		async update(db, query, body) {

		},
		/**
		 * 从备份文件中加载数据
		 * @param {Object} db 数据库管理器
		 * @param {Object} query 查询条件，键值对
		 * @param {Object} body 要添加的数据，键值对
		 */
		async load(db, query, body) {
			// 	if (file) {
			// 		var p = file.fullname(cm.dir);
			// 		if (p.hasFile()) {

			// 		}
			// 	}
		},
		/**
		 * 清空数据
		 * @param {Object} db 数据库管理器
		 * @param {Object} query 查询条件，键值对
		 * @param {Object} body 要添加的数据，键值对
		 */
		async clear(db, query, body) {

		},
		/**
		 * 备份数据到文件
		 * @param {Object} db 数据库管理器
		 * @param {Object} query 查询条件，键值对
		 * @param {Object} body 要添加的数据，键值对
		 */
		async save(db, query, body) {

		},
		/**
		 * 上传数据
		 * @param {Object} db 数据库管理器
		 * @param {Object} query 查询条件，键值对
		 * @param {Object} body 要添加的数据，键值对
		 */
		async upload(db, query, body) {

		},
		/**
		 * 下载数据
		 * @param {Object} db 数据库管理器
		 * @param {Object} query 查询条件，键值对
		 * @param {Object} body 要添加的数据，键值对
		 */
		async download(db, query, body) {

		}
	}
}

module.exports = methods;
