var Matchs = require('./index.js');

// 测试
async function test() {
	var ms = new Matchs();
}

test();
var str = '职位不对';
// console.log(str.matchs("*{不对}"));

// 正则加g表示匹配多个, 否则只匹配一个
// console.log("今年28岁了".matchs('/[0-9]+/'));
// console.log("手机号码是15817188815,哦5646546".matchs('/[0-9]+/g'));

// str = "我叫文武, 手机号码是1581718881";
// console.log(str.matchs('手机号码*'));
// console.log(str.matchs('*武'));

// str = "因为如果它是一只鸟,那么它就会飞";
// console.log(str.matchs('它*'));
// console.log(str.matchs('如果*鸟'));
// console.log(str.matchs('如果*就*'));
// console.log(str.matchs('*如果*就*'));

// console.log("酒店厨师长".matchs('{职位}'));
// console.log("宠物美容师".matchs('{职位}'));
// console.log("广告设计师".matchs('{职位}'));
// console.log("游戏设计总监".matchs('{职位}'));
// console.log("软件开发工程师".matchs('{职位}'));
// console.log("游戏设计师".matchs('[\u4e00-\u9fa5]{2}{职位}'));
// console.log("广告设计实习生".matchs('[\u4e00-\u9fa5]{1,2}{职位}'));

// str = "今天不是我的生日, 我是1991-04-01日生的,生日是4月1日";
str = "今天不是我的生日, 我是一九九一年四月一日生的,生日是4月1日";

console.log(str.matchs('{时态}'));
console.log(str.matchs('{日期}'));

// str = "1991-04-01 12:15:36";
// console.log(str.matchs('{日期时间}'));

// str = "1991年4月1日,小宝宝诞生了";
// console.log(str.matchs('{年月日}'));

// console.log(str.matchs('{月日}'));

// str = "十五天内";
// console.log(str.matchs('{周期}'));

// str = "10-15天左右";
// console.log(str.matchs('{周期}'));

// str = "十到十五天内";
// console.log(str.matchs('{周期}'));

// str = "10至15天内";
// console.log(str.matchs('{周期}'));

// str = "15号之前";
// console.log(str.matchs('{周期}'));


// str = "数日内";
// console.log(str.matchs('{周期}'));

// str = "几个小时后";
// console.log(str.matchs('{周期}'));

// str = "从现在起几个小时之内";
// console.log(str.matchs('{周期}'));
// srt = "今天天起怎么样?";


// str = "我叫文武, 手机号码是15817188815";
// console.log(str.matchs('{手机号码}'));
// console.log(str.matchs('{手机号码}'));
// console.log(str.matchs('{数字}'));

// str = "现在的时间是十九点三十五分五十九秒";
// str = "现在的时间是19点35分59秒";
// str = "现在的时间是19:35:59";
// console.log(str.matchs('{时间}'));

// console.log(str.matchs('{时分秒}'));
// console.log(str.matchs('{时分}'));

// str = "星期天去哪玩？";
// console.log(str.matchs('{星期}'));

// str = "http://www.elins.cn";
// console.log(str.matchs('{网址}'));

// str = "573242395@qq.com";
// console.log(str.matchs('{邮箱}'));

// str = "身份证号441423199104018011";
// console.log(str.matchs('{身份证号}'));

// str = "128.0.1.0";
// str = "QQ号是573242395";
// console.log(str.matchs('{QQ}'));

// str = "my name is qww, QQ号是573242395";
// console.log(str.matchs('{中英文}'));

// str = "我的名字叫文武qww";
// console.log(str.matchs('{中文或英文}'));

// str = '<img src="   http://www.elins.cn/logo.png " />';
// console.log(str.matchs('{img标签}'));
// console.log(str.matchs('{网址}'));

// str = '<a href="http://www.elins.cn/logo.png">123123123</a>';
// str = `这是一个链接<a href="http://www.elins.cn/logo.png">
// <div class="test">你好吗？</div>
// </a>`;
// console.log(str.matchs('{链接}'));

// console.log(str.matchs('{html标签}'));
// console.log(str.matchs('{标签之间}'));

// str = "广东省深圳市南山区粤海街道在中国南方";
// console.log(str.matchs('{省份}'));
// console.log(str.matchs('{城市}'));
// console.log(str.matchs('{管辖区}'));
// console.log(str.matchs('{方位}'));
// console.log(str.matchs('在*{方位}'));
// console.log(str.matchs('在{国家}'));

// str = "我乘坐的车的车牌号是粤B12312";
// console.log(str.matchs('{车牌号}'));

// str = "圆周率是3.1415926";
// console.log(str.matchs('{浮点数}'));

// str = "做到了什么程度？";
// console.log(str.matchs('{疑问}'));

// str = "买了什么东西？";
// console.log(str.matchs('{疑问}'));

// str = "摸到了什么东西？";
// console.log(str.matchs('{疑问}'));

// str = "获得了什么东西？";
// console.log(str.matchs('{疑问}'));

// str = "想到了什么？";
// console.log(str.matchs('{疑问}'));

// str = "今天天气怎么样？"
// console.log(str.matchs('{疑问}'));

// str = "听见什么没？";
// console.log(str.matchs('{疑问}'));

// str = "你到哪里了？";
// console.log(str.matchs('{疑问}'));

// str = "买到了没？";
// console.log(str.matchs('{疑问}'));

// str = "紫红色";
// console.log(str.matchs('{颜色}'));

// str = "朱红色";
// console.log(str.matchs('{颜色}'));

// str = "大红大紫";
// console.log(str.matchs('{颜色}'));


// str = "年方二八";
// console.log(str.matchs('{年龄}'));

// str = "28岁了";
// console.log(str.matchs('{年龄}'));

// str = "十八岁了";
// console.log(str.matchs('{年龄}'));

