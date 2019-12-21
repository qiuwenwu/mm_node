const crypto = require('crypto')

// 使用的加密算法
const ALGORITHM = 'aes-256-cbc'
// 存放消息体尺寸的空间大小。单位：字节
const MSG_LENGTH_SIZE = 4
// 随机数据的大小。单位：字节
const RANDOM_BYTES_SIZE = 16
// 分块尺寸。单位：字节
const BLOCK_SIZE = 32

/**
 * 提供基于PKCS7算法的加解密接口
 *
 */
var PKCS7Encoder = {};

/**
 * 删除解密后明文的补位字符
 *
 * @param {String} text 解密后的明文
 */
PKCS7Encoder.decode = function(text) {
	var pad = text[text.length - 1];

	if (pad < 1 || pad > 32) {
		pad = 0;
	}

	return text.slice(0, text.length - pad);
};

/**
 * 对需要加密的明文进行填充补位
 *
 * @param {String} text 需要进行填充补位操作的明文
 */
PKCS7Encoder.encode = function(text) {
	var blockSize = 32;
	var textLength = text.length;
	//计算需要填充的位数
	var amountToPad = blockSize - (textLength % blockSize);

	var result = Buffer.alloc(amountToPad);
	result.fill(amountToPad);

	return Buffer.concat([text, result]);
};

/**
 * @description 通讯加密类
 * @class
 */
class Encrypt {
	/**
	 * @description 构造函数
	 * @param {String} appId
	 * @param {String} encodingAESKey
	 * @param {String} token
	 */
	constructor(appId, encodingAESKey, token) {

		if (!token || !encodingAESKey || !appId) {
			throw new Error('please check arguments');
		}
		var key = Buffer.from(encodingAESKey + '=', 'base64');
		if (key.length !== 32) {
			throw new Error('encodingAESKey invalid');
		}

		/**
		 * 应用id
		 */
		this.appId = appId;
		/**
		 * 访问牌
		 */
		this.token = token;
		/**
		 * 加密AES钥匙
		 */
		this.encodingAESKey = encodingAESKey;
		/**
		 * 解码密钥
		 */
		this.key = key;

		/**
		 * 初始化向量
		 */
		this.iv = this.key.slice(0, 16);
	}
}

var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K',
	'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];

function newCode(n) {
	var res = "";
	for (var i = 0; i < n; i++) {
		var id = Math.ceil(Math.random() * 35);
		res += chars[id];
	}
	return res;
}

/**
 * @description 加密消息
 * @param {String} replyMsg
 * @param {Object} timestamp 时间戳，可以自己生成，也可以用URL参数的timestamp
 * @param {Object} nonce 随机串，可以自己生成，也可以用URL参数的nonce
 * @return {type} 加密后的可以直接回复用户的密文，包括msg_signature, timestamp, nonce, encrypt的xml格式的字符串, 加密失败返回空;
 */
Encrypt.prototype.encodeMsg = function(replyMsg, timestamp, nonce) {
	var ret;
	try {
		var encrypt = this.encode(replyMsg, this.key, this.appId);

		if (encrypt) {
			if (!timestamp) {
				timestamp = new Date().stamp();
			}
			if (!nonce) {
				nonce = newCode(16);
			}
			var signature = this.genSign(timestamp, nonce, encrypt);
			var xml =
				`<xml>
				<Encrypt>${encrypt}</Encrypt>
				<MsgSignature>${signature}</MsgSignature>
				<TimeStamp>${timestamp}</TimeStamp>
				<Nonce>${nonce}</Nonce>
			</xml>`;
			ret = xml.trim();
		}
	} catch (e) {
		console.log(e);
	}
	return ret;
};

/**
 * @description 加密消息
 * @param {string} text 待加密的消息体
 */
Encrypt.prototype.encode = function(text) {
	// 算法：AES_Encrypt[random(16B) + msg_len(4B) + msg + $CorpID]
	// 获取16B的随机字符串
	var randomString = crypto.pseudoRandomBytes(16);

	var msg = Buffer.from(text);

	// 获取4B的内容长度的网络字节序
	var msgLength = Buffer.alloc(4);
	msgLength.writeUInt32BE(msg.length, 0);

	var id = Buffer.from(this.appId);

	var bufMsg = Buffer.concat([randomString, msgLength, msg, id]);

	// 对明文进行补位操作
	var encoded = PKCS7Encoder.encode(bufMsg);

	// 创建加密对象，AES采用CBC模式，数据采用PKCS#7填充；IV初始向量大小为16字节，取AESKey前16字节
	var cipher = crypto.createCipheriv('aes-256-cbc', this.key, this.iv);
	cipher.setAutoPadding(false);

	var cipheredMsg = Buffer.concat([cipher.update(encoded), cipher.final()]);

	// 返回加密数据的base64编码
	return cipheredMsg.toString('base64');
};

/**
 * @description 解密消息
 * @param {string} text 待解密的消息体
 */
Encrypt.prototype.decode = function(text) {
	// 创建解密对象，AES采用CBC模式，数据采用PKCS#7填充；IV初始向量大小为16字节，取AESKey前16字节
	var decipher = crypto.createDecipheriv('aes-256-cbc', this.key, this.iv);
	decipher.setAutoPadding(false);
	var deciphered = Buffer.concat([decipher.update(text, 'base64'), decipher.final()]);

	deciphered = PKCS7Encoder.decode(deciphered);
	// 算法：AES_Encrypt[random(16B) + msg_len(4B) + msg + $CorpID]
	// 去除16位随机数
	var content = deciphered.slice(16);
	var length = content.slice(0, 4).readUInt32BE(0);

	var appId = content.slice(length + 4).toString();
	if (appId === this.appId) {
		return content.slice(4, length + 4).toString();
	} else {
		return null;
	}
};

/**
 * 生成签名
 * @param {String} timestamp 时间戳
 * @param {String} nonce 随机数
 */
Encrypt.prototype.genSign = function(timestamp, nonce, encrypt) {
	// 计算签名
	let signature
	try {
		// 原始字符串
		var str = [this.token, timestamp, nonce, encrypt].sort().join('');
		signature = crypto.createHash('sha1').update(str).digest('hex');
	} catch (e) {

	}
	return signature
};

/**
 * 生成签名
 * @param {Object} query 请请求参数
 * @param {String} timestamp 时间戳
 * @param {String} nonce 随机数
 * @param {String} echostr 随机字符串
 */
Encrypt.prototype.sign = function(query) {
	var {
		timestamp,
		nonce,
		signature
	} = query;
	var sign = this.genSign(timestamp, nonce, '');
	return signature === signature
};

if (global.$) {
	$.Encrypt = Encrypt;
}

module.exports = Encrypt
