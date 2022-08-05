import {
	MAP_OF_CODES_TO_PREFIXES,
	MAP_OF_CODES_TO_PIECES,
	MAP_OF_CODES_TO_MOVE_DIRECTIONS,
	MAP_OF_CODES_TO_CHINESE_NUMERALS,
	PINYIN,
} from "./constantTable"

const reg = new RegExp(`
(${PINYIN.PIECES.join("|")})
(${PINYIN.CHINESE_NUMERALS.join("|")})
(${PINYIN.MOVE_DIRECTIONS.join("|")})
(${PINYIN.CHINESE_NUMERALS.join("|")})
|
(${PINYIN.PREFIXES.join("|")})
(${PINYIN.PIECES.join("|")})
(${PINYIN.MOVE_DIRECTIONS.join("|")})
(${PINYIN.CHINESE_NUMERALS.join("|")})
`.replace(/\n/g, ""), "g");

/**
 * 提取合法命令-已弃用
 * @param {String} rawCommand 原始命令
 * @returns {String} 提取成功返回合法命令，否则返回空串
 */
function extractCommand(rawCommand) {
	//过滤中文标点
	let command = rawCommand.replace(/[。；，：“”（）、？！《》]/g, "");
	//查找最后一个合法命令
	command = command.match(reg)?.pop();
	return command || "";
}


/**
 * 走棋信息记录
 */
class MovedRecord {
	/**
	 * @param {String} commandText 着法文本
	 * @param {Boolean} isRed 是否红方
	 */
	constructor(commandText, isRed) {
		this.color = isRed ? "r" : "b";
		this._parse(commandText);
	}

	//解析招法
	_parse(command) {
		command = command.split(" ");
		if (command.length == 1) {  //兼容汉字匹配
			command = command[0];
		}
		if (PINYIN.PREFIXES.includes(command[0])) {
			this.prefix = PINYIN.MAP_OF_PREFIXES_TO_CODES[command[0]];
			this.piece = PINYIN.MAP_OF_PIECES_TO_CODES[command[1]];
		} else {
			this.piece = PINYIN.MAP_OF_PIECES_TO_CODES[command[0]];
			this.location = PINYIN.MAP_OF_CHINESE_NUMERALS_TO_CODES[command[1]];
		}
		this.moveDirection = PINYIN.MAP_OF_MOVE_DIRECTIONS_TO_CODES[command[2]];
		this.moveRange = PINYIN.MAP_OF_CHINESE_NUMERALS_TO_CODES[command[3]];
	}

	/**
	 * 将走棋信息转换为棋谱文本
	 * @returns {String} 棋谱文本，例如："红炮二平五"或"黑前炮进一"
	 */
	toString() {
		const isRed = this.color == "r";
		return [
			isRed ? "红" : "黑",
			MAP_OF_CODES_TO_PREFIXES[this.prefix],
			MAP_OF_CODES_TO_PIECES[this.piece][+!isRed],
			MAP_OF_CODES_TO_CHINESE_NUMERALS[this.location],
			MAP_OF_CODES_TO_MOVE_DIRECTIONS[this.moveDirection],
			MAP_OF_CODES_TO_CHINESE_NUMERALS[this.moveRange],
		].join("");
	}
}


export {
	MovedRecord,
}