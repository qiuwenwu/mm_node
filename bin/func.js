var api = $.api_admin('activity_client', '活动RPC端API');
// 首次启动更新api接口;
api.update('activity/');

var methods = {
	/**
	 * grpc请求
	 * @param {Object} call 请求
	 * @param {Object} callback 回调函数
	 */
	async activity(call, callback) {
		var {
			method,
			query,
			body
		} = call.request;
		
		var db = {
			ret: null,
			uin: ""
		};
		$.push(db, $.sql.db(), true);
		
		var header = $.proto.CommonHeader.decode(call.metadata.get('header-bin')[0])
		if(header){
			header = $.proto.CommonHeader.toObject(header, {
				longs: Number
			});
			db.uin = header.uin;
		}

		var arr = method.split('.');
		if(arr.length > 1){
			var class_name = arr[0];
			var method = arr[1];
			if(!query)
			{
				query = "{}"
			}
			if(!body)
			{
				body = "{}"
			}
			var ret = await api.runRPC(db, class_name, method, query.toJson(), body.toJson());
			
			if(!ret)
			{
				callback(null, {
					error: {
						code: 10000,
						message: "没有响应结果"
					}
				});
			}
			else if (typeof(ret) == 'string') {
				callback(null, {
					result: ret
				});
			} else if (Array.isArray(ret)) {
				callback(null, {
					result: JSON.stringify(ret)
				});
			}
			else if(typeof(ret.result) == 'string'){
				callback(null, {
					error: ret.error,
					result: ret.result
				});
			}
			else
			{
				callback(null, {
					error: ret.error,
					result: JSON.stringify(ret.result)
				});
			}
		}
		else {
			callback(null, {
				error: {
					code: 10000,
					message: "缺少类名和方法"
				}
			});
		}
	}
}

module.exports = methods;
