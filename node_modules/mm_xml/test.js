require('./xml-parser');
var xml =
	`
	<xml>
	        <ToUserName><![CDATA[toUser]]></ToUserName>
	        <FromUserName><![CDATA[fromUser]]></FromUserName>
	        <CreateTime>12345678</CreateTime>
	        <MsgType>
	                <FromUserName><![CDATA[fromUser]]></FromUserName>
	                <CreateTime>2019-09-26 00:00:00</CreateTime>
	        </MsgType>
	        <Content><![CDATA[你好]]></Content>
	</xml>
`;

var xml =
	`
	<xml>
	        <ToUserName>toUser</ToUserName>
	        <FromUserName>fromUser</FromUserName>
	        <CreateTime>12345678</CreateTime>
	        <MsgType>2019-09-26 00:00:00</MsgType>
	        <Content>你好</Content>
	</xml>
`;


console.log(xml.toXml());