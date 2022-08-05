import { gameController as game } from "./gameController";
import { artyom } from "./artyom";
import { MovedRecord } from "./MovedRecord";
import { commandListener } from "./commandListener";
import {
	MAP_OF_CODES_TO_PREFIXES,
	MAP_OF_CODES_TO_PIECES,
	PINYIN,
} from "./constantTable"


//走棋指令
commandListener.addHandler([
	new RegExp(`
(${PINYIN.PIECES.join("|")}) 
(${PINYIN.CHINESE_NUMERALS.join("|")}) 
(${PINYIN.MOVE_DIRECTIONS.join("|")}) 
(${PINYIN.CHINESE_NUMERALS.join("|")})
|
(${PINYIN.PREFIXES.join("|")}) 
(${PINYIN.PIECES.join("|")}) 
(${PINYIN.MOVE_DIRECTIONS.join("|")}) 
(${PINYIN.CHINESE_NUMERALS.join("|")})
`.replace(/\n/g, ""), "g"),
], function (i, results) {
	const command = results.pop();  //只提取最后一个合法命令
	const movedRecord = new MovedRecord(command, game.redInAction);
	game.move(movedRecord);
});


//询问棋子位置
commandListener.addHandler([
	// new RegExp(`我的(${PIECES.join("|")})在哪`),
	new RegExp(`wo de (${PINYIN.PIECES.join("|")}) zai na`),
	// new RegExp(`对方的(${PIECES.join("|")})在哪`),
	new RegExp(`dui fang de (${PINYIN.PIECES.join("|")}) zai na`),
], function (i, found) {
	const rawPiece = found[1];
	const pieceCode = PINYIN.MAP_OF_PIECES_TO_CODES[rawPiece];
	const piece = MAP_OF_CODES_TO_PIECES[pieceCode][+!game.redInAction];
	const isMe = i == 0;
	let positions = null;
	if (isMe) {
		positions = game.getPiecePositions(pieceCode, game.redInAction ? "r" : "b")
	} else {
		positions = game.getPiecePositions(pieceCode, !game.redInAction ? "r" : "b")
	}
	let answer = "";
	if (positions.length > 1) {
		answer = `${isMe ? "您" : "对方"}有${positions.length}个${piece}。`;
		positions.forEach((p, i) => {
			answer += `第 ${i + 1} 个${piece}位于${p[0]}行，${p[1]}列。`;
		});
	} else if (positions.length == 1) {
		const p = positions[0];
		answer = `${isMe ? "您" : "对方"}的${piece}位于${p[0]}行，${p[1]}列。`;
	}
	artyom.say(answer);
});
