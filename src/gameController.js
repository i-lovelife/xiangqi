import { EventEmitter } from "events"
import GameLogic from "./game-logic/gameLogic"

/**
 * 游戏控制器
 * @classdesc 提供游戏流程控制接口、状态信息查询接口、事件监听接口
 */
class GameController extends EventEmitter {
	_started = false; // 游戏是否开始
	_movedCount = 0;  //走棋数
	_startTime = 0; // 游戏开始时间

	constructor() {
		super();
		this.logic = new GameLogic();
	}

	startGame() {
		if (this._started) {
			return false;
		}
		this.logic = new GameLogic();
		this._started = true;
		// this._redInAction = true;
		// this._roundNumber = 1;
		this._movedCount = 0;
		this._startTime = Date.now();
		this.emit("gameStarted");
		return true;
	}

	endGame(winner) {
		if (!this._started) {
			return false;
		}
		this.logic = null;
		this._started = false;
		this.emit("gameEnded", winner);
		return true;
	}

	//走棋
	move(movedRecord) {
		if (!this.started) {
			return false;
		}
		if (!movedRecord) {
			return false;
		}

		const ret = this.logic.action(
			movedRecord.color,
			movedRecord.piece,
			movedRecord.prefix || movedRecord.location,
			movedRecord.moveDirection,
			movedRecord.moveRange,
		);

		switch (ret) {
			case 0:  //走棋失败
				this._moveFailed(movedRecord);
				break;
			case 1:  //走棋成功
				this._moveCompleted(movedRecord);
				break;
			case 2:  //走棋成功并吃子
				this._moveCompleted(movedRecord);
				this._eat();
				break;
			case 3: //红方胜
				this._moveCompleted(movedRecord);
				this.endGame("r");
				break;
			case 4:  //黑方胜
				this._moveCompleted(movedRecord);
				this.endGame("b");
				break;
			case 5:  //将军
				this._moveCompleted(movedRecord);
				this._jiang();
				break;
			default:
				console.error("Unknown return value: " + ret);
		}
		return !!ret;
	}

	_moveCompleted(movedRecord) {
		this._movedCount++;
		this.emit("moveCompleted", movedRecord);
	}

	_moveFailed(movedRecord) {
		this.emit("moveFailed", movedRecord);
	}

	//吃子
	_eat() {
		this.emit("eat");
	}

	//将军
	_jiang() {
		this.emit("jiang");
	}

	//悔棋
	moveRevoke() {
		if (!this.started) {
			return false;
		}
		if (this._movedCount == 0) {
			return false;
		}
		const completed = this.logic.stepback();
		if (!completed) {
			return false;
		}
		this._movedCount--;
		this.emit("moveRevoke");
		return true;
	}

	//求和
	draw() {
		if (!this.started) {
			return;
		}
		this.emit("draw", this.redInAction);
	}

	//认输
	surrender() {
		if (!this.started) {
			return;
		}

		this.emit("surrender", this.redInAction);
		const winner = this.redInAction ? "b" : "r";
		this.endGame(winner);
	}

	//获取棋子位置
	getPiecePositions(piece, color) {
		if (!this.started) {
			throw new Error("Game not started");
		}
		return this.logic.searchRole(color, piece);
	}

	get started() {
		return this._started;
	}

	get movedCount() {
		return this._movedCount;
	}

	//判断是否红方行动
	get redInAction() {
		return this._movedCount % 2 == 0;
	}

	//获取回合数
	get roundNumber() {
		return 1 + (this._movedCount >> 1);
	}

	get startTime() {
		return this._startTime;
	}
}


const gameController = new GameController();

export {
	gameController
}