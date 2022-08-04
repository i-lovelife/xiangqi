import {
	PREFIXES,
	PIECES,
	CHINESE_NUMERALS,
	MOVE_DIRECTIONS,
	MAP_OF_PREFIXES_TO_CODES,
	MAP_OF_CODES_TO_PREFIXES,
	MAP_OF_PIECES_TO_CODES,
	MAP_OF_CODES_TO_PIECES,
	MAP_OF_MOVE_DIRECTIONS_TO_CODES,
	MAP_OF_CODES_TO_MOVE_DIRECTIONS,
	MAP_OF_CHINESE_NUMERALS_TO_CODES,
	MAP_OF_CODES_TO_CHINESE_NUMERALS,
} from "./constantTable"

const reg = new RegExp(`
(${PIECES.join("|")})
(${CHINESE_NUMERALS.join("|")})
(${MOVE_DIRECTIONS.join("|")})
(${CHINESE_NUMERALS.join("|")})
|
(${PREFIXES.join("|")})
(${PIECES.join("|")})
(${MOVE_DIRECTIONS.join("|")})
(${CHINESE_NUMERALS.join("|")})
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
		if (PREFIXES.includes(command[0])) {
			this.prefix = MAP_OF_PREFIXES_TO_CODES[command[0]];
			this.piece = MAP_OF_PIECES_TO_CODES[command[1]];
		} else {
			this.piece = MAP_OF_PIECES_TO_CODES[command[0]];
			this.location = MAP_OF_CHINESE_NUMERALS_TO_CODES[command[1]];
		}
		this.moveDirection = MAP_OF_MOVE_DIRECTIONS_TO_CODES[command[2]];
		this.moveRange = MAP_OF_CHINESE_NUMERALS_TO_CODES[command[3]];
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