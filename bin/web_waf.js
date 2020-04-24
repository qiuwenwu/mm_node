
$.log.danger = function(danger, ...args){
	$.log.warn(danger, ...args);
}

/**
 * 使用正则表达式，检测字符串是否含有攻击特征，检测到攻击特征返回true，没检测到返回false
 * @param {String} url 网址
 */
function waf_check(url) {
	// 基本防御
	var rule = [
		/select.+(from|limit)/i,
		/(?:(union(.*?)select))/i,
		/sleep\((\s*)(\d*)(\s*)\)/i,
		/group\s+by.+\(/i,
		/(?:from\W+information_schema\W)/i,
		/(?:(?:current_)user|database|schema|connection_id)\s*\(/i,
		/\s*or\s+.*=.*/i,
		/order\s+by\s+.*--$/i,
		/benchmark\((.*)\,(.*)\)/i,
		/base64_decode\(/i,
		/(?:(?:current_)user|database|version|schema|connection_id)\s*\(/i,
		/(?:etc\/\W*passwd)/i,
		/into(\s+)+(?:dump|out)file\s*/i,
		/xwork.MethodAccessor/i,
		/(?:define|eval|file_get_contents|include|require|require_once|shell_exec|phpinfo|system|passthru|preg_\w+|execute|echo|print|print_r|var_dump|(fp)open|alert|showmodaldialog)\(/i,
		/\<(iframe|script|body|img|layer|div|meta|style|base|object|input)/i,
		/(onmouseover|onmousemove|onerror|onload)\=/i,
		/javascript:/i,
		/\.\.\/\.\.\//i,
		/\|\|.*(?:ls|pwd|whoami|ll|ifconfog|ipconfig|&&|chmod|cd|mkdir|rmdir|cp|mv)/i,
		/(?:ls|pwd|whoami|ll|ifconfog|ipconfig|&&|chmod|cd|mkdir|rmdir|cp|mv).*\|\|/i,
		/(gopher|doc|php|glob|file|phar|zlib|ftp|ldap|dict|ogg|data)\:\//i
	];
	for (var i = 0; i < rule.length; i++) {
		if (rule[i].test(url) == true) {
			return rule[i];
		}
	}
	return null;
}

module.exports = function(app){
	/* WAF（web防火墙） */
	app.use(async (ctx, next) => {
		var url = ctx.url;
		var danger = waf_check(url);
		if (danger) {
			$.log.danger('检测到攻击', "规则:", danger);
		}
		else {
			next();
		}
	});
}