/*
    description: several test examples.
*/

const Game =require("./gameLogic.js");

let g=new Game();


//第一组测试

console.table({
"1红兵5进一":g.action("r","w","5","gf","1"),
"2黑兵5进一":g.action("b","w","5","gf","1"),
"3红兵5进一":g.action("r","w","5","gf","1"),
"4黑马八近期":g.action("b","h","8","gf","7"),
"5红炮二平五":g.action("r","c","2","gh","5"),
"6黑兵7进一":g.action("b","w","7","gf","1"),
"7红炮5进7":g.action("r","c","5","gf","7"),
});

/*
//第二组测试
console.table({
"1红马二进三":g.action("r","h","2","gf","3"),
"2黑兵三进1":g.action("b","w","3","gf","1"),
"3红兵三进1":g.action("r","w","3","gf","1"),
"4黑炮二平五":g.action("b","c","2","gh","5"),
"5红马3进2":g.action("r","h","3","gf","2"),
"6黑马二进三":g.action("b","h","2","gf","3"),
"7红马二进三":g.action("r","h","2","gf","3"),
"8黑车1平2":g.action("b","v","1","gh","2"),
"9红马3进1":g.action("r","h","3","gf","1"),
"10黑车2进7":g.action("b","v","2","gf","7"),
"11红向三进五":g.action("r","e","3","gf","5"),
"12黑炮8平6":g.action("b","c","8","gh","6"),
"13红马1进3":g.action("r","h","1","gf","3"),
"14黑匠5进1":g.action("b","t","5","gf","1"),
"15红是4进五":g.action("r","o","4","gf","5"),
"16黑车2平5":g.action("b","v","2","gh","5"),
"17红炮2进6":g.action("r","c","2","gf","6"),
"18黑车5进1":g.action("b","v","5","gf","1"),
});

//第三组测试
console.table({
    "a":g.action("r","c","2","gh","4"),
    "b":g.action("r","c","8","gf","2"),
    "c":g.action("r","c","8","gh","4"),
    "d":g.action("r","c","b","gf","1"),
    "e":g.action("r","c","b","gf","6"),
});

*/