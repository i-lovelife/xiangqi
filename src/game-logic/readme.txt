实例化Game类；

行动方法：
action(id,chess_piece,location,act,size);
id:"r","b" //表示红方或黑方;
chess_piece:棋子类型
"v":车
"h":马
"e":象
"o"：侍
"t"：将或帅
"c":泡
"w":兵或足
location:位置，例如车1，马八等，直接用字符串数字即可，前和后用"f"和"b"来表示；
act:行动类型，包括进"gf",退"gb"，平"gh"；
size：行动幅度，直接用字符串数字表示即可；
举例：
action("r","c","2","gh","5");//红炮二平五
action("b","h","8","gf","7");//黑马八近期
action("r","v","f","gb","2");红钱车退2

返回状态码：
# 0:行动失败；
# 1：行动成功，但不吃子；
# 2:行动成功，吃子；
#3: 红方胜利；
#4:黑方胜利；
#5:将军

毁其方法：stepback();