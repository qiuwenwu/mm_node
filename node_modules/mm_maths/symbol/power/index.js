/**
 * 平方
 * @param {string} 公式
 * @return {string} 返回计算结果
 */
module.exports = function power(val) {
	var arr = val.match(/[a-zA-Z]\^-?[0-9]+/g);
	
	if (arr) {
		var len = arr.length;
		for (var i = 0; i < len; i++) {
			var o = arr[i];
			if (o) {
				var ar = o.split('^');
				var k = ar[0];
				var t = ar[1];
				var v = "";
				var r = new RegExp("/ ?[0-9a-zA-Z.]+" + o.replace('^', '\\^'), "g");
				var mh = val.match(r);
				if(mh)
				{
					if(t.indexOf('-') === 0)
					{
						var len = Number(t.replace('-', ''));
						for(var t = 0; t < len; t++){
							v += " * " + k;
						}
					}
					else {
						var len = Number(t);
						for(var t = 0; t < len; t++){
							v += " / " + k;
						}
					}
					for(var n =0 ; n < mh.length; n++){
						var key = mh[n];
						val = val.replace(key, key.replace(o, '') + v);
					}
				}
				else 
				{
					var rx = new RegExp("/ ?" + o.replace('^', '\\^'), "g");
					if(t.indexOf('-') === 0)
					{
						var len = Number(t.replace('-', ''));
						v = " * 1"
						for(var t = 0; t < len; t++){
							v += " / " + k;
						}
						val = val.replace(rx, v.replace(" * 1 ", "").replace(/\//g, '*'));
					}
					else {
						var len = Number(t);
						for(var t = 0; t < len; t++){
							v += " * " + k;
						}
						v = v.replace(' * ', '');
						val = val.replace(rx, "/ " + v.replace(/\*/g, '/'));
					}
					val = val.replace(o, v);
				}
			}
		}
	}
	arr = val.match(/([0-9]+\.)?[0-9]+\^-?[0-9]+/g);
	if (arr) {
		var len = arr.length;
		for (var i = 0; i < len; i++) {
			var o = arr[i];
			if (o) {
				var ar = o.split('^');
				var k = ar[0];
				var t = ar[1];
				var v = Math.pow(Number(ar[0]), Number(ar[1].replace('-', '')));
				
				var r = new RegExp("/ ?[0-9a-zA-Z.]+" + o.replace('^', '\\^'), "g");
				var mh = val.match(r);
				if(mh)
				{
					if(t.indexOf('-') === 0)
					{
						for(var n =0 ; n < mh.length; n++){
							var key = mh[n];
							val = val.replace(key, key.replace(o, '') + " * " + v);
						}
					}
					else {
						for(var n =0 ; n < mh.length; n++){
							var key = mh[n];
							val = val.replace(key, key.replace(o, '') + " / " + v);
						}
					}
				}
				else
				{
					var rx = new RegExp("/ ?" + o.replace('^', '\\^'), "g");
					if(t.indexOf('-') === 0)
					{
						v = " * 1/" + v;
						val = val.replace(rx, v.replace(" * 1/", "* "));
					}
					val = val.replace(o, v);
				}
			}
		}
	}
	if(val.indexOf(' * ') == 0){
		val = val.substring(3);
	}
	return val;
};
