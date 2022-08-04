const PREFIXES = ['前', '后'];
const PIECES = ['帅', '将', '士', '相', '象', '车', '马', '炮', '兵', '卒'];
const CHINESE_NUMERALS = ['一', '二', '三', '四', '五', '六', '七', '八', '九'];
const MOVE_DIRECTIONS = ['进', '退', '平'];

const MAP_OF_PREFIXES_TO_CODES = {
	"前": "f",
	"后": "b",
}
const MAP_OF_CODES_TO_PREFIXES = {
	"f": "前",
	"b": "后",
}
const MAP_OF_PIECES_TO_CODES = {
	"帅": "t",
	"将": "t",
	"士": "o",
	"相": "e",
	"象": "e",
	"车": "v",
	"马": "h",
	"炮": "c",
	"兵": "w",
	"卒": "w",
}
const MAP_OF_CODES_TO_PIECES = {
	"t": "帅将",
	"o": "士士",
	"e": "相象",
	"v": "车车",
	"h": "马马",
	"c": "炮炮",
	"w": "兵卒",
}
const MAP_OF_MOVE_DIRECTIONS_TO_CODES = {
	"进": "gf",
	"退": "gb",
	"平": "gh",
}
const MAP_OF_CODES_TO_MOVE_DIRECTIONS = {
	"gf": "进",
	"gb": "退",
	"gh": "平",
}
const MAP_OF_CHINESE_NUMERALS_TO_CODES = {
	"一": "1",
	"二": "2",
	"三": "3",
	"四": "4",
	"五": "5",
	"六": "6",
	"七": "7",
	"八": "8",
	"九": "9",
}
const MAP_OF_CODES_TO_CHINESE_NUMERALS = {
	"1": "一",
	"2": "二",
	"3": "三",
	"4": "四",
	"5": "五",
	"6": "六",
	"7": "七",
	"8": "八",
	"9": "九",
}

export {
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
}
