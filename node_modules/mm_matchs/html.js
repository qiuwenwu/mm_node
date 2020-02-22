const htmlformat = require('./htmlformat');

/**
 * HTML转正文类
 * 解析Html页面的文章正文内容,基于文本密度的HTML正文提取类
 * @class
 */
class Html2Article {
	/**
	 * 构造函数
	 * @param {Object} arg
	 */
	constructor(arg) {
		// 正则表达式过滤：正则表达式，要替换成的文本
		this.filters = [{
			rx: "/<script.*?>.*?<\\/script>/g",
			value: ""
		}, {
			rx: "/<style.*?>.*?<\\/style>/g",
			value: ""
		}, {
			rx: "/<!--.*?-->/g",
			value: ""
		}, {
			rx: "/<\\/a>/g",
			value: "</a>\n"
		}];

		/**
		 * 是否使用追加模式，默认为false
		 * 使用追加模式后，会将符合过滤条件的所有文本提取出来
		 */
		this.appendMode = false;

		/**
		 * 按行分析的深度，默认为6
		 */
		this.depth = 6;

		/**
		 * 字符限定数，当分析的文本数量达到限定数则认为进入正文内容
		 * 默认180个字符数
		 */
		this.limitCount = 125;

		// 确定文章正文头部时，向上查找，连续的空行到达this.headEmptyLines，则停止查找
		this.headEmptyLines = 2;

		// 用于确定文章结束的字符数
		this.endLimitCharCount = 20;
	}
}

/**
 * 从给定的Html原始文本中获取正文信息
 * @param {String} html
 * @return {String} 返回正文
 */
Html2Article.prototype.getArticle = function(html) {
	// 如果换行符的数量小于10，则认为html为压缩后的html
	// 由于处理算法是按照行进行处理，需要为html标签添加换行符，便于处理
	var arr = html.split('\n');
	if (arr.length < 10) {
		html = html.replace(/>/g, ">\n");
	}
	var tabsize = 1;
	var tabchar = '	';
	var max_char = 80;
	html = htmlformat(html, tabsize, tabchar, max_char);
	// 获取html，body标签内容
	var body = "";

	if (html.indexOf("<article") !== -1) {
		var mh = html.match(/<article[\s\S]*<\/article>/gi);
		if (mh) {
			body = mh[0];
		}
	} else {
		if (html.indexOf("<main") !== -1) {
			var mh = html.match(/<main[\s\S]*<\/main>/gi);
			if (mh) {
				body = mh[0];
			}
		}
		else {
			var mh = html.match(/<body[\s\S]*<\/body>/gi);
			if (mh) {
				body = mh[0];
			}
		}
		// 过滤样式，脚本等不相干标签
		var lt = this.filters;
		var len = lt.length;
		for (var i = 0; i < len; i++) {
			var o = lt[i];
			var rx = eval(o.rx);
			body = body.replace(rx, o.value);
		}
	}
	
	var {
		content,
		content_tag
	} = this.getContent(body);

	var article = {
		title: this.getTitle(html),
		datetime: this.getPublishDate(body),
		content: content,
		html: htmlformat(content_tag, tabsize, tabchar, max_char)
	};

	return article;
};


/**
 * 获取标题
 * @param {String} html
 * @return {String} 返回标题
 */
Html2Article.prototype.getTitle = function(html) {
	var titleFilter = /<title>[\s\S]*?<\/title>/gi;
	var h1Filter = /<h1.*?>.*?<\/h1>/gi;
	var clearFilter = /<.*?>/g;

	var title = "";
	var mh = html.match(titleFilter);
	if (mh) {
		title = mh[0].replace(clearFilter, "");
	}

	if (!title) {
		// 正文的标题一般在h1中，比title中的标题更干净
		mh = html.match(h1Filter);
		if (mh) {
			title = mh[0].replace(clearFilter, "");
		}
	}
	return title;
};

/**
 * 获取文章发布日期
 * @param {String} html
 * @return {String} 返回时间字符串
 */
Html2Article.prototype.getPublishDate = function(html) {
	// 过滤html标签，防止标签对日期提取产生影响
	var text = html.replace(/<.*?>/g, "");
	var rx =
		/((\d{4}(\-|\/|\.)(0[1-9]|1[012]|[1-9])(\-|\/|\.)([12][0-9]|0[1-9]|3[01]|[1-9]))|(([一二三四五六七八九]+年)?[一二三四五六七八九十]+月([一二三四五六七八九十]+(日|号))?)|((\d{4}年)?(0?[1-9]|1[012]|[1-9])月([12][0-9]|0?[1-9]|3[01]|[1-9])(日|号))) ?((([01][0-9]|2[0-3]):([0-4][0-9]|5[0-9])(:([0-4][0-9]|5[0-9]))?)|(([01][0-9]|2[0-3])点([0-4][0-9]|5[0-9])分(([0-4][0-9]|5[0-9])秒)?)|([一二三四五六七八九十]+点[一二三四五六七八九十]+分([一二三四五六七八九十]+秒)?))/;
	var mh = text.match(rx);
	var result = "1900-01-01";
	if (mh) {
		result = mh[0].replace('年', '-').replace('月', '-').replace('日', '-').replace('时', ':').replace('分', ':').replace('秒',
			'').replace(/\//g, '-');
	}
	return result;
};

/**
 * 从body标签文本中分析正文内容
 * @param {Striing} bodyText
 * @param {Striing} content 只过滤了script和style标签的body文本内容
 * @param {Striing} content_tag 返回文本正文，不包含标签
 */
Html2Article.prototype.getContent = function(bodyText) {
	// 保存干净的文本内容，不包含标签
	var lines = [];

	// 保存原始内容，按行存储
	var orgLines = bodyText.split('\n');

	// 去除每行的空白字符,剔除标签
	for (var i = 0; i < orgLines.length; i++) {
		var lineInfo = orgLines[i];
		// 处理回车，使用[crlf]做为回车标记符，最后统一处理
		var str = lineInfo.replace(/<\/p>|<br.*?\/>/gi, "\r\n").replace(/<.*?>/g, "").trim();
		if (str) {
			lines.push(str);
		}
	}
	var sb = "";
	var orgSb = "";

	// 记录上一次统计的字符数量
	var preTextLen = 0;

	// 记录文章正文的起始位置
	var startPos = -1;
	var d = this.depth;
	for (var i = 0; i < lines.length - d; i++) {
		var len = 0;
		for (var j = 0; j < d; j++) {
			len += lines[i + j].length;
		}

		if (startPos == -1) // 还没有找到文章起始位置，需要判断起始位置
		{
			if (preTextLen > this.limitCount && len > 0) // 如果上次查找的文本数量超过了限定字数，且当前行数字符数不为0，则认为是开始位置
			{
				// 查找文章起始位置, 如果向上查找，发现2行连续的空行则认为是头部
				var emptyCount = 0;
				for (var j = i - 1; j > 0; j--) {
					if (!lines[j]) {
						emptyCount++;
					} else {
						emptyCount = 0;
					}
					if (emptyCount == this.headEmptyLines) {
						startPos = j + this.headEmptyLines;
						break;
					}
				}
				// 如果没有定位到文章头，则以当前查找位置作为文章头
				if (startPos == -1) {
					startPos = i;
				}
				// 填充发现的文章起始部分
				for (var j = startPos; j <= i; j++) {
					sb += lines[j];
					orgSb += orgLines[j];
				}
			}
		} else {
			//if (len == 0 && preTextLen == 0)    // 当前长度为0，且上一个长度也为0，则认为已经结束
			if (len <= this.endLimitCharCount && preTextLen < this.endLimitCharCount) // 当前长度为0，且上一个长度也为0，则认为已经结束
			{
				if (!this.endLimitCharCount) {
					break;
				}
				startPos = -1;
			}
			sb += lines[i];
			orgSb += orgLines[i];
		}
		preTextLen = len;
	}
	// 处理回车符，更好的将文本格式化输出
	var content = sb;
	// 输出带标签文本
	var content_tag = orgSb;
	return {
		content,
		content_tag
	}
};

module.exports = Html2Article;
