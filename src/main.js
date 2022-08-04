import { gameController as game } from "./gameController"
import { artyom, artyomConfig } from "./artyom"
import { printLog } from "./printLog";

const startOrEndBtn = document.querySelector('#start-or-end-btn');  //开始或结束游戏
const revokeBtn = document.querySelector('#revoke-btn');  //悔棋
const drawBtn = document.querySelector('#draw-btn');  //求和
const surrenderBtn = document.querySelector('#surrender-btn');  //认输
const listenBtn = document.querySelector('#listen-btn');  //语音聆听

startOrEndBtn.addEventListener("click", e => {
	if (game.started) {
		game.endGame();
	} else {
		game.startGame();
	}
});

revokeBtn.addEventListener("click", e => {
	game.moveRevoke();
});

drawBtn.addEventListener("click", e => {
	game.draw();
});

surrenderBtn.addEventListener("click", e => {
	const isOk = confirm("确定要认输吗？");
	if (isOk) {
		game.surrender();
	}
});

listenBtn.addEventListener("click", e => {
	if (!artyom.isRecognizing()) {
		artyom.initialize(artyomConfig);
		// artyom.obey();
	} else {
		artyom.fatality()
		// artyom.dontObey();
	}
});

//初始提示
printLog("欢迎来到盲棋游戏！");
printLog("本游戏支持语音走棋，模拟真实的盲棋对弈场景。");
printLog("您可点击“开始游戏”按钮，听到提示音后即可说出您的指令。");
printLog("走棋指令例如：“炮二平五”、“马八进七”等。");
printLog("若您在对弈过程中忘记了棋子位置，可随时询问，例如，您可以说：“我的兵在哪？”");
printLog("预祝您游戏愉快！");

//侦听游戏事件

game.on("gameStarted", () => {
	artyom.say("游戏开始！", {
		onEnd() {
			artyom.initialize(artyomConfig);
		}
	});
	startOrEndBtn.innerText = "结束游戏";
	revokeBtn.disabled = drawBtn.disabled = surrenderBtn.disabled = listenBtn.disabled = false;
});

game.on("gameEnded", winner => {
	artyom.say("游戏结束！");
	switch (winner) {
		case "r":
			artyom.say("红方获胜！");
			break;
		case "b":
			artyom.say("黑方获胜！");
			break;
		case "draw":
			artyom.say("平局！");
			break;
	}
	artyom.fatality();
	startOrEndBtn.innerText = "开始游戏";
	revokeBtn.disabled = drawBtn.disabled = surrenderBtn.disabled = listenBtn.disabled = true;
});

game.on("moveCompleted", movedRecord => {
	artyom.say(movedRecord.toString());
});

game.on("moveFailed", movedRecord => {
	artyom.say("无法完成" + movedRecord.toString());
});

game.on("moveRevoke", () => {
	artyom.say("悔棋成功！");
});

game.on("eat", () => {
	artyom.say("吃子！");
});

game.on("jiang", () => {
	artyom.say("将军！");
});

game.on("draw", isRed => {
	const isOk = confirm(`${isRed ? "红" : "黑"}方求和，是否同意？`);
	if (isOk) {
		game.endGame("draw");
	}
});

game.on("surrender", isRed => {
	artyom.say(`${isRed ? "红" : "黑"}方认输`);
});

artyom.when("COMMAND_RECOGNITION_START", function () {
	listenBtn.innerText = "停止聆听";
});

artyom.when("COMMAND_RECOGNITION_END", function (status) {
	listenBtn.innerText = "开始聆听";
});
