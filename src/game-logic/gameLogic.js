/*
    description: a class named GameLogic includes action, findOut, stepback, decision and warning several methods.
    developer: Eric.
*/

/***********************************\
 * 棋子 
 \***********************************/
 var Chess = {
	createNew: function(img_size, size, type, x, y, z) {
		var chess = {};
		chess.type = type;
        CODES_MAP = {
            "t": "jiang",
            "o": "shi",
            "e": "xiang",
            "v": "ju",
            "h": "ma",
            "c": "pao",
            "w": "zu"
        };
        chess.img_file = "/img/chess/chess/" + type[0] + "_" + CODES_MAP[type[1]] + ".png";
        // console.log("ori=" + type + "img=" + img_file);

		function norm(x) {
			var max_v = 10;
			var min_v = 2;
			if (x < 0 && x > -min_v) x = -minv_v;
			if (x < -max_v) x = -max_v;
			if (x > 0 && x < min_v) x = min_v;
			if (x > max_v) x = max_v;
			return x;
		}

		/***********************************\
		 * 棋子移动动画 
		 \***********************************/
		chess.moveAnimation = function() {
			chess.sprite.bind('EnterFrame',
				function() {
					if (this.x != this.tx || this.y != this.ty) {
						var speed = 0.3;
						this.dx = (this.tx - this.x) * speed;
						this.dy = (this.ty - this.y) * speed;
						var v = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
						var nv = norm(v);
						//	var nv = 5;
						this.dx = this.dx * nv / v;
						this.dy = this.dy * nv / v;

						this.z = 2;
						if (Math.abs(this.tx - this.x) < Math.abs(this.dx)) {
							this.x = this.tx;
							this.dx = 0;
						} else this.x += this.dx;

						if (Math.abs(this.ty - this.y) < Math.abs(this.dy)) {
							this.y = this.ty;
							this.dy = 0;
						} else this.y += this.dy;

						if (this.x == this.tx && this.y == this.ty) {
							// document.dispatchEvent(chess.game.EndMoveEvent);
						}
					}
				}
			);
		}

		/***********************************\
		* 棋子移动和位置变换 
		\***********************************/
		chess.moveTo = function(p) {
			chess.sprite.tx = p.x;
			chess.sprite.ty = p.y;
			chess.sprite.z = 1;
		}

		chess.setTo = function(p) {
			chess.sprite.x = p.x;
			chess.sprite.y = p.y;
			chess.sprite.tx = p.x;
			chess.sprite.ty = p.y;
			chess.sprite.z = 1;
		}

		/***********************************\
		 * 棋子的加载 
		 \***********************************/
		chess.loadChess = function() {
            console.log("img="+chess.img_file);
			Crafty.sprite(chess.img_file, {
				tmp: [0, 0, img_size, img_size]
			});

			chess.sprite = Crafty.e("2D, Canvas, tmp").attr({
				x: x,
				y: y,
				z: z,
				w: size,
				h: size,
				tx: x,
				ty: y,
				dx: 0,
				dy: 0
			});

			chess.moveAnimation();
		}

		return chess;
	}
}


class GameLogic {
    // ui related
    board_img_file = "/img/chess/board/board.png";
    cell_size = 60;
    cell_img_size = 50;
    b_img_w = 500;
    b_img_h = 544;
    chess_img_size = 50;
    box_img_size = 57;
    w = this.b_img_w * this.cell_size / this.cell_img_size;
    h = this.b_img_h * this.cell_size / this.cell_img_size;
    chess_size = this.cell_size * 0.95;
    b_offset_x = this.cell_size / 2;
    b_offset_y = this.cell_size / 2;

    constructor() {
        this.checkerboard = [["rv", "rh", "re", "ro", "rt", "ro", "re", "rh", "rv"],
        ["", "", "", "", "", "", "", "", ""],
        ["", "rc", "", "", "", "", "", "rc", ""],
        ["rw", "", "rw", "", "rw", "", "rw", "", "rw"],
        ["", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", ""],
        ["bw", "", "bw", "", "bw", "", "bw", "", "bw"],
        ["", "bc", "", "", "", "", "", "bc", ""],
        ["", "", "", "", "", "", "", "", ""],
        ["bv", "bh", "be", "bo", "bt", "bo", "be", "bh", "bv"]];
        this.lastCheckerboard = [];
        console.log("entered");
        this.loadBoard();
        this.loadChess();
    }

    setChess(chess, r, c) {
        if (chess == null || chess.sprite == null) return;
        r = 9 - r;
        c = 8 - c;
        var bias_x = (this.cell_size - chess.sprite.w) / 2 + this.b_offset_x;
        var bias_y = (this.cell_size - chess.sprite.h) / 2 + this.b_offset_y;
        var p = {};
        p.y = r * this.cell_size + bias_y;
        p.x = c * this.cell_size + bias_x;
        chess.setTo(p);
    }

    moveChess(chess, r, c) {
        if (chess == null || chess.sprite == null) return;
        r = 9 - r;
        c = 8 - c;
        var bias_x = (this.cell_size - chess.sprite.w) / 2 + this.b_offset_x;
        var bias_y = (this.cell_size - chess.sprite.h) / 2 + this.b_offset_y;
        var p = {};
        p.y = r * this.cell_size + bias_y;
        p.x = c * this.cell_size + bias_x;
        chess.moveTo(p);
    }

    hideChess(chess) {
        if (chess != null && chess.sprite != null) {
            chess.sprite.z = -1;
            chess.sprite.x = w + 1;
            chess.sprite.y = h + 1;
            chess.sprite.tx = w + 1;
            chess.sprite.ty = h + 1;
        }
    }

	loadBoard() {
        console.log("entered");
		Crafty.init(this.w, this.h, document.getElementById('game'));
		Crafty.sprite(this.board_img_file, {
			board: [0, 0, this.b_img_w, this.b_img_h]
		});

		game.sprite = Crafty.e("2D, Canvas, board, Mouse").attr({
			x: 0,
			y: 0,
			z: 0,
			w: this.w,
			h: this.h
		});	
	}

    loadChess() {
        this.idToChess = [];
        this.idToPoint = [];
        this.pointToId = [];
        for (let i = 0; i < 10; i++) {
            this.pointToId.push(new Array(9).fill(-1));
        }
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 9; j++) {
                if (this.checkerboard[i][j] != "") {
                    this.idToChess.push(Chess.createNew(this.chess_img_size, this.chess_size, this.checkerboard[i][j], 0, 0, 1));
                    // this.idToChess.push(chess);
                    this.idToPoint.push([i, j]);
                    this.pointToId[i][j] = this.idToChess.length - 1;
                }
            }
        }

        for (let i = 0; i < this.idToChess.length; i++) {
            var chess = this.idToChess[i];
            console.log("type="+chess.type);
            var point = this.idToPoint[i];
            chess.loadChess();
            this.setChess(chess, point[0], point[1]);
        }
    }

    uiMove(sourcePoint, targetPoint, removeTarget) {
        var sourceId  = this.pointToId[sourcePoint[0]][sourcePoint[1]];
        var targetId  = this.pointToId[targetPoint[0]][targetPoint[1]];
        if (removeTarget) {
            var targetChess = this.idToChess[targetId];
            this.hideChess(targetChess);
            this.pointToId[targetPoint[0]][targetPoint[1]] = -1;
            this.idToPoint[targetId] = [-1, -1];
        }
        var sourceChess = this.idToChess[sourceId];
        this.moveChess(sourceChess, targetPoint[0], targetPoint[1]);
        this.pointToId[sourcePoint[0]][sourcePoint[1]] = -1;
        this.pointToId[targetPoint[0]][targetPoint[1]] = sourceId;
        this.idToPoint[sourceId] = [targetPoint[0], targetPoint[1]];
    }

    stepback() {
        if (this.lastCheckerboard.length == 0)
            return false;
        this.checkerboard = [];
        for (let i = 0; i < this.lastCheckerboard.length; i++)
            this.checkerboard.push(this.lastCheckerboard[i].slice());
        this.lastCheckerboard = [];
        this.lastMove = [];
        return true;
    }


    action(color, chessPiece, location, moveDirection, moveRange) {
        this.lastCheckerboard = [];
        for (let i = 0; i < this.checkerboard.length; i++)
            this.lastCheckerboard.push(this.checkerboard[i].slice());
        let status = 0;
        let targetPoint = [-1, -1];
        let sourcePoint = [-1, -1];
        let index = -1;
        let temp = [];
        let bf = "";
        // get x of src chess 
        if (location != "b" && location != "f") {
            location = parseInt(location);
            if (color == "r")
                location = 10 - location;
        }
        else {
            bf = location;
            for (let i = 0; i < 9; i++) {
                let count = 0;
                for (let j = 0; j < 10; j++) {
                    if (this.checkerboard[j][i] == color + chessPiece)
                        count += 1;
                }//for2
                if (count > 1)
                    location = i + 1;
            }//for1
            if (location == "b" || location == "f")
                return 0;
        }
        moveRange = parseInt(moveRange);
        location = location - 1;

        var candidate = this.findOut(color + chessPiece, location);
        if (candidate.length < 1) {
            return 0;
        }
        if ((bf == "f" || bf == "b") && candidate.length < 2) {
            return 0;
        }
        if (bf == "f")
            index = this.findOut(color + chessPiece, location)[1][0];
        else
            index = this.findOut(color + chessPiece, location)[0][0];
        sourcePoint[0] = index;
        sourcePoint[1] = location;
        if (moveDirection == "gf") {
            console.log("index", index, "moveRange", moveRange, "moveDirection", moveDirection);
            switch (chessPiece) {
                case "v":
                    if (color == "r") {
                        if (index + moveRange > 9)
                            return status;
                        if (moveRange > 1) {
                            if (this.findOut("", location, "vertical", [index + 1, index + moveRange - 1]).length != moveRange - 1)
                                return status;
                            else {
                                temp = this.decision(color, [index + moveRange, location]);
                                status = temp[0];
                                targetPoint = temp[1];
                            }
                        }// moveRange > 1
                        else {
                            temp = this.decision(color, [index + moveRange, location]);
                            status = temp[0];
                            targetPoint = temp[1];
                        }// moveRange <=1
                    } // color is red
                    else {
                        moveRange = -moveRange;
                        if (index + moveRange < 0)
                            return status;
                        if (moveRange < -1) {
                            if (this.findOut("", location, "vertical", [index - 1, index + moveRange + 1]).length != Math.abs(moveRange) - 1)
                                return status;
                            temp = this.decision(color, [index + moveRange, location]);
                            status = temp[0];
                            targetPoint = temp[1];
                        }//moveRange < -1
                        else {
                            temp = this.decision(color, [index + moveRange, location]);
                            status = temp[0];
                            targetPoint = temp[1];
                        }
                    }//color is black
                    break;
                case "h":
                    if (color == "r") {
                        moveRange = 10 - moveRange;
                        console.log("moveRange", moveRange, "location", location);
                        if (moveRange - 1 == location - 1 || moveRange - 1 == location + 1) {
                            if (this.findOut("", location, "vertical", [index + 1, index + 1]).length != 1)
                                return status;
                            temp = this.decision(color, [index + 2, moveRange - 1]);
                            status = temp[0];
                            targetPoint = temp[1];
                        }
                        else if (moveRange - 1 == location - 2) {
                            if (this.findOut("", index, "horization", [location - 1, location - 1]).length != 1)
                                return status;
                            temp = this.decision(color, [index + 1, moveRange - 1]);
                            status = temp[0];
                            targetPoint = temp[1];
                        }
                        else if (moveRange - 1 == location + 2) {
                            if (this.findOut("", index, "horization", [location + 1, location + 1]).length != 1)
                                return status;
                            temp = this.decision(color, [index + 1, moveRange - 1]);
                            status = temp[0];
                            targetPoint = temp[1];
                        }
                        else {
                            return status;
                        }
                    } //color is red
                    else {
                        if (moveRange - 1 == location - 1 || moveRange - 1 == location + 1) {
                            if (this.findOut("", location, "vertical", [index - 1, index - 1]).length != 1)
                                return status;
                            temp = this.decision(color, [index - 2, moveRange - 1]);
                            status = temp[0];
                            targetPoint = temp[1];
                        }
                        else if (moveRange - 1 == location - 2) {
                            if (this.findOut("", index, "horization", [location - 1, location - 1]).length != 1)
                                return status;
                            temp = this.decision(color, [index - 1, moveRange - 1]);
                            status = temp[0];
                            targetPoint = temp[1];
                        }
                        else if (moveRange - 1 == location + 2) {
                            if (this.findOut("", index, "horization", [location + 1, location + 1]).length != 1)
                                return status;
                            temp = this.decision(color, [index - 1, moveRange - 1]);
                            status = temp[0];
                            targetPoint = temp[1];
                        }
                        else {
                            return status;
                        }
                    }// color is black
                    break;
                case "e":
                    if (color == "r") {
                        moveRange = 10 - moveRange;
                        if (index + 2 > 4)
                            return status;
                        if (moveRange - 1 == location - 2) {
                            if (this.findOut("", location - 1, "vertical", [index + 1, index + 1]).length != 1)
                                return status;
                            temp = this.decision(color, [index + 2, location - 2]);
                            status = temp[0];
                            targetPoint = temp[1];
                        }
                        else if (moveRange - 1 == location + 2) {
                            if (this.findOut("", location + 1, "vertical", [index + 1, index + 1]).length != 1)
                                return status;
                            temp = this.decision(color, [index + 2, location + 2]);
                            status = temp[0];
                            targetPoint = temp[1];
                        }
                        else
                            return status;
                    }// color is red
                    else {
                        if (index - 2 < 5)
                            return status;
                        if (moveRange - 1 == location - 2) {
                            if (this.findOut("", location - 1, "vertical", [index - 1, index - 1]).length != 1)
                                return status;
                            temp = this.decision(color, [index - 2, location - 2]);
                            status = temp[0];
                            targetPoint = temp[1];
                        }
                        else if (moveRange - 1 == location + 2) {
                            if (this.findOut("", location + 1, "vertical", [index - 1, index - 1]).length != 1)
                                return status;
                            temp = this.decision(color, [index - 2, location + 2]);
                            status = temp[0];
                            targetPoint = temp[1];
                        }
                        else
                            return status;
                    }// color is black
                    break;
                case "o":
                    if (color == "r") {
                        moveRange = 10 - moveRange;
                        if (index + 1 > 2)
                            return status;
                        if (!(4 < moveRange && moveRange < 6) || moveRange - 1 == location)
                            return status;
                        temp = this.decision(color, [index + 1, moveRange - 1]);
                        status = temp[0];
                        targetPoint = temp[1];
                    }// color is red
                    else {
                        if (index - 1 < 7)
                            return status;
                        if (!(4 <= moveRange && moveRange <= 6) || moveRange - 1 == location || moveRange - 1 == location + 2 || moveRange - 1 == location - 2)
                            return status;
                        temp = this.decision(color, [index - 1, moveRange - 1]);
                        status = temp[0];
                        targetPoint = temp[1];
                    }// color is black
                    break;
                case "t":
                    if (color == "r") {
                        if (moveRange != 1 || index + 1 > 2)
                            return status;
                        temp = this.decision(color, [index + moveRange, location]);
                        status = temp[0];
                        targetPoint = temp[1];
                    }// color is red
                    else {
                        if (index - 1 < 7 || moveRange != 1)
                            return status;
                        temp = this.decision(color, [index - moveRange, location]);
                        status = temp[0];
                        targetPoint = temp[1];
                    }// color is black
                    break;
                case "c":
                    if (color == "r") {
                        if (index + moveRange > 9)
                            return status;
                        if (moveRange > 1) {
                            if (this.findOut("", location, "vertical", [index + 1, index + moveRange - 1]).length == moveRange - 1) {
                                temp = this.decision(color, [index + moveRange, location]);
                                status = temp[0];
                                targetPoint = temp[1];
                                if (status == 2)
                                    status = 0;
                            }
                            else if (this.findOut("", location, "vertical", [index + 1, index + moveRange - 1]).length == moveRange - 2) {
                                temp = this.decision(color, [index + moveRange, location]);
                                status = temp[0];
                                targetPoint = temp[1];
                                if (status == 1)
                                    status = 0;
                            }
                            else {
                                status = 0;
                            }
                        }// moveRange > 1
                        else {
                            temp = this.decision(color, [index + moveRange, location]);
                            status = temp[0];
                            targetPoint = temp[1];
                            if (status == 2)
                                status = 0;
                        }// moveRange <=1
                    } // color is red
                    else {
                        moveRange = -moveRange;
                        if (index + moveRange < 0)
                            return status;
                        if (moveRange < -1) {
                            if (this.findOut("", location, "vertical", [index - 1, index + moveRange + 1]).length == Math.abs(moveRange) - 1) {
                                temp = this.decision(color, [index + moveRange, location]);
                                status = temp[0];
                                targetPoint = temp[1];
                                if (status == 2)
                                    status = 0;
                            }
                            else if (this.findOut("", location, "vertical", [index - 1, index + moveRange + 1]).length == Math.abs(moveRange) - 2) {
                                temp = this.decision(color, [index + moveRange, location]);
                                status = temp[0];
                                targetPoint = temp[1];
                                if (status == 1)
                                    status = 0;
                            }
                            else
                                status = 0;
                        }//moveRange < -1
                        else {
                            temp = this.decision(color, [index + moveRange, location]);
                            status = temp[0]; targetPoint = temp[1];
                            if (status == 2)
                                status = 0;
                        }
                    }//color is black
                    break;
                case "w":
                    if (color == "r") {
                        if (moveRange > 1 || index + moveRange > 9)
                            return status;
                        temp = this.decision(color, [index + moveRange, location]);
                        status = temp[0];
                        targetPoint = temp[1];
                    }// color is red
                    else {
                        moveRange = -moveRange;
                        if (moveRange < -1 || index + moveRange < 0)
                            return status;
                        temp = this.decision(color, [index + moveRange, location]);
                        status = temp[0];
                        targetPoint = temp[1];
                    }// color is black
                    break;
            } // switch
        } // moveDirection is gf
        else if (moveDirection == "gb") {
            console.log("index", index, "moveRange", moveRange, "moveDirection", moveDirection);
            switch (chessPiece) {
                case "v":
                    if (color == "r") {
                        if (index - moveRange < 0)
                            return status;
                        if (moveRange > 1) {
                            if (this.findOut("", location, "vertical", [index - 1, index - moveRange + 1]).length != moveRange - 1)
                                return status;
                            temp = this.decision(color, [index - moveRange, location]);
                            status = temp[0];
                            targetPoint = temp[1];
                        }// moveRange > 1
                        else {
                            temp = this.decision(color, [index - moveRange, location]);
                            status = temp[0];
                            targetPoint = temp[1];
                        }// moveRange <=1
                    } // color is red
                    else {
                        moveRange = -moveRange;
                        if (index - moveRange > 9)
                            return status;
                        if (moveRange < -1) {
                            if (this.findOut("", location, "vertical", [index + 1, index - moveRange - 1]).length != Math.abs(moveRange) - 1)
                                return status;
                            temp = this.decision(color, [index - moveRange, location]);
                            status = temp[0];
                            targetPoint = temp[1];
                        }//moveRange < -1
                        else {
                            temp = this.decision(color, [index - moveRange, location]);
                            status = temp[0];
                            targetPoint = temp[1];
                        }
                    }//color is black
                    break;
                case "h":
                    if (color == "r") {
                        moveRange = 10 - moveRange;
                        if (moveRange - 1 == location - 1 || moveRange - 1 == location + 1) {
                            if (this.findOut("", location, "vertical", [index - 1, index - 1]).length != 1)
                                return status;
                            temp = this.decision(color, [index - 2, moveRange - 1]);
                            status = temp[0];
                            targetPoint = temp[1];
                        }
                        else if (moveRange - 1 == location - 2) {
                            if (this.findOut("", index, "horization", [location - 1, location - 1]).length != 1)
                                return status;
                            temp = this.decision(color, [index - 1, moveRange - 1]);
                            status = temp[0];
                            targetPoint = temp[1];
                        }
                        else if (moveRange - 1 == location + 2) {
                            if (this.findOut("", index, "horization", [location + 1, location + 1]).length != 1)
                                return status;
                            temp = this.decision(color, [index - 1, moveRange - 1]);
                            status = temp[0];
                            targetPoint = temp[1];
                        }
                        else {
                            return status;
                        }
                    } //color is red
                    else {
                        if (moveRange - 1 == location - 1 || moveRange - 1 == location + 1) {
                            if (this.findOut("", location, "vertical", [index + 1, index + 1]).length != 1)
                                return status;
                            temp = this.decision(color, [index + 2, moveRange - 1]);
                            status = temp[0];
                            targetPoint = temp[1];
                        }
                        else if (moveRange - 1 == location - 2) {
                            if (this.findOut("", index, "horization", [location - 1, location - 1]).length != 1)
                                return status;
                            temp = this.decision(color, [index + 1, moveRange - 1]);
                            status = temp[0];
                            targetPoint = temp[1];
                        }
                        else if (moveRange - 1 == location + 2) {
                            if (this.findOut("", index, "horization", [location + 1, location + 1]).length != 1)
                                return status;
                            temp = this.decision(color, [index + 1, moveRange - 1]);
                            status = temp[0];
                            targetPoint = temp[1];
                        }
                        else {
                            return status;
                        }
                    }// color is black
                    break;
                case "e":
                    if (color == "r") {
                        moveRange = 10 - moveRange;
                        if (index - 2 < 0)
                            return status;
                        if (moveRange - 1 == location - 2) {
                            if (this.findOut("", location - 1, "vertical", [index - 1, index - 1]).length != 1)
                                return status;
                            temp = this.decision(color, [index - 2, location - 2]);
                            status = temp[0];
                            targetPoint = temp[1];
                        }
                        else if (moveRange - 1 == location + 2) {
                            if (this.findOut("", location + 1, "vertical", [index - 1, index - 1]).length != 1)
                                return status;
                            temp = this.decision(color, [index - 2, location + 2]);
                            status = temp[0];
                            targetPoint = temp[1];
                        }
                        else
                            return status;
                    }// color is red
                    else {
                        if (index + 2 > 9)
                            return status;
                        if (moveRange - 1 == location - 2) {
                            if (this.findOut("", location - 1, "vertical", [index + 1, index + 1]).length != 1)
                                return status;
                            temp = this.decision(color, [index + 2, location - 2]);
                            status = temp[0];
                            targetPoint = temp[1];
                        }
                        else if (moveRange - 1 == location + 2) {
                            if (this.findOut("", location + 1, "vertical", [index + 1, index + 1]).length != 1)
                                return status;
                            temp = this.decision(color, [index + 2, location + 2]);
                            status = temp[0];
                            targetPoint = temp[1];
                        }
                        else
                            return status;
                    }// color is black
                    break;
                case "o":
                    if (color == "r") {
                        moveRange = 10 - moveRange;
                        if (index - 1 < 0)
                            return status;
                        if (!(4 < moveRange && moveRange < 6) || moveRange - 1 == location)
                            return status;
                        temp = this.decision(color, [index - 1, moveRange - 1]);
                        status = temp[0];
                        targetPoint = temp[1];
                    }// color is red
                    else {
                        if (index + 1 > 9)
                            return status;
                        if (!(4 <= moveRange && moveRange <= 6) || moveRange - 1 == location || moveRange - 1 == location + 2 || moveRange - 1 == location - 2)
                            return status;
                        temp = this.decision(color, [index + 1, moveRange - 1]);
                        status = temp[0];
                        targetPoint = temp[1];
                    }// color is black
                    break;
                case "t":
                    if (color == "r") {
                        if (moveRange != 1 || index - 1 < 0)
                            return status;
                        temp = this.decision(color, [index - moveRange, location]);
                        status = temp[0];
                        targetPoint = temp[1];
                    }// color is red
                    else {
                        if (index + 1 > 9 || moveRange != 1)
                            return status;
                        temp = this.decision(color, [index + moveRange, location]);
                        status = temp[0];
                        targetPoint = temp[1];
                    }// color is black
                    break;
                case "c":
                    if (color == "r") {
                        if (index - moveRange < 0)
                            return status;
                        if (moveRange > 1) {
                            if (this.findOut("", location, "vertical", [index - 1, index - moveRange + 1]).length == moveRange - 1) {
                                temp = this.decision(color, [index - moveRange, location]);
                                status = temp[0];
                                targetPoint = temp[1];
                                if (status == 2)
                                    status = 0;
                            }
                            else if (this.findOut("", location, "vertical", [index - 1, index - moveRange + 1]).length == moveRange - 2) {
                                temp = this.decision(color, [index - moveRange, location]);
                                status = temp[0];
                                targetPoint = temp[1];
                                if (status == 1)
                                    status = 0;
                            }
                            else {
                                status = 0;
                            }
                        }// moveRange > 1
                        else {
                            temp = this.decision(color, [index - moveRange, location]);
                            status = temp[0];
                            targetPoint = temp[1];
                            if (status == 2)
                                status = 0;
                        }// moveRange <=1
                    } // color is red
                    else {
                        moveRange = -moveRange;
                        if (index - moveRange > 9)
                            return status;
                        if (moveRange < -1) {
                            if (this.findOut("", location, "vertical", [index + 1, index - moveRange - 1]).length == Math.abs(moveRange) - 1) {
                                temp = this.decision(color, [index - moveRange, location]);
                                status = temp[0];
                                targetPoint = temp[1];
                                if (status == 2)
                                    status = 0;
                            }
                            else if (this.findOut("", location, "vertical", [index - 1, index - moveRange - 1]).length == Math.abs(moveRange) - 2) {
                                temp = this.decision(color, [index - moveRange, location]);
                                status = temp[0];
                                targetPoint = temp[1];
                                if (status == 1)
                                    status = 0;
                            }
                            else
                                status = 0;
                        }//moveRange < -1
                        else {
                            temp = this.decision(color, [index - moveRange, location]);
                            status = temp[0];
                            targetPoint = temp[1];
                            if (status == 2)
                                status = 0;
                        }
                    }//color is black
                    break;
            } // switch
        } // moveDirection is gb
        else { // moveDirection is go horization
            if (moveRange > 9 || moveRange < 1)
                return status;
            if (color == "r")
                moveRange = 10 - moveRange;
            moveRange = moveRange - 1;
            console.log("index", index, "moveRange", moveRange, "moveDirection", moveDirection);
            switch (chessPiece) {
                case "v":
                    if ((this.findOut("", index, "horization", [location, moveRange]).length != Math.abs(moveRange - location) - 1 && this.checkerboard[index][moveRange] != "") && (this.findOut("", index, "horization", [location, moveRange]).length != Math.abs(moveRange - location) && this.checkerboard[index][moveRange] == ""))
                        return status;
                    temp = this.decision(color, [index, moveRange]);
                    status = temp[0];
                    targetPoint = temp[1];
                    break;
                case "c":
                    if (this.checkerboard[index][moveRange] == "" && this.findOut("", index, "horization", [location, moveRange]).length == Math.abs(moveRange - location)) {
                        temp = this.decision(color, [index, moveRange]);
                        status = temp[0];
                        targetPoint = temp[1];
                        if (status == 2)
                            status = 0;
                    }
                    else if (this.checkerboard[index][moveRange] != "" && this.findOut("", index, "horization", [location, moveRange]).length == Math.abs(moveRange - location) - 2) {
                        temp = this.decision(color, [index, moveRange]);
                        status = temp[0];
                        targetPoint = temp[1];
                        if (status == 1)
                            status = 0;
                    }
                    else {
                        return status;
                    }
                    break;
                case "t":
                    if (!(3 <= moveRange && moveRange <= 5) || moveRange == location || Math.abs(location - moveRange) != 1)
                        return status;
                    temp = this.decision(color, [index, moveRange]);
                    status = temp[0];
                    targetPoint = temp[1];
                    break;
                case "w":
                    if (Math.abs(location - moveRange) != 1)
                        return status;
                    if (color == "r") {
                        if (index <= 4)
                            return status;
                        temp = this.decision(color, [index, moveRange]);
                        status = temp[0];
                        targetPoint = temp[1];
                    }
                    else {
                        if (index >= 5)
                            return status;
                        temp = this.decision(color, [index, moveRange]);
                        status = temp[0];
                        targetPoint = temp[1];
                    }
                    break;
            }// switch
        }//moveDirection is gh
        if (status != 0) {
            if (this.checkerboard[targetPoint[0]][targetPoint[1]] == "bt") {
                this.checkerboard[targetPoint[0]][targetPoint[1]] = this.checkerboard[index][location];
                this.checkerboard[index][location] = "";
                status = 3;
            }
            else if (this.checkerboard[targetPoint[0]][targetPoint[1]] == "rt") {
                this.checkerboard[targetPoint[0]][targetPoint[1]] = this.checkerboard[index][location];
                this.checkerboard[index][location] = "";
                status = 4;
            }
            else {
                this.checkerboard[targetPoint[0]][targetPoint[1]] = this.checkerboard[index][location];
                this.checkerboard[index][location] = "";
                if (this.warning(color).length > 0)
                    status = 5;
            }
            //console.log("目标点",targetPoint,this.checkerboard[targetPoint[0]][targetPoint[1]]);
            //console.log("远点",[index,location],this.checkerboard[index][location]);
        }
        if (status > 0) {
            this.uiMove(sourcePoint, targetPoint);
            this.lastMove = [sourcePoint, targetPoint];
        }
        return status;
    } //action

    findOut(target, location, direction = "vertical", region = [0, 9]) {
        let pointList = [];
        if (region[0] > region[1]) {
            let temp = region[1];
            region[1] = region[0];
            region[0] = temp;
        }
        if (direction == "vertical") {
            for (let i = region[0]; i <= region[1]; i++) {
                if (this.checkerboard[i][location] == target)
                    pointList.push([i, location]);
            } // for 
        } // if
        else {
            for (let i = region[0]; i <= region[1]; i++) {
                if (this.checkerboard[location][i] == target)
                    pointList.push([location, i]);
            } // for 
        } //else
        return pointList;
    }//findOut

    decision(color, point) {
        console.log("目标位置检测", point);
        if (this.checkerboard[point[0]][point[1]] == "")
            return [1, point];
        else {
            if (this.checkerboard[point[0]][point[1]][0] == color)
                return [0, [-1, -1]];
            else
                return [2, point];
        }//else
    }//decision

    warning(color) {
        let targetColor = "b";
        if (color == "b")
            targetColor = "r";
        let positionList = [];
        let kingPosition = [];
        let threatList = [];
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 9; j++) {
                if (this.checkerboard[i][j] != "" && this.checkerboard[i][j][0] != targetColor)
                    positionList.push([this.checkerboard[i][j], [i, j]]);
                if (this.checkerboard[i][j][0] == targetColor && this.checkerboard[i][j][1] == "t")
                    kingPosition.push(i, j);
            }// for 2
        }//for1
        console.log("我方部署", positionList, positionList.length);
        console.log("kingPosition", kingPosition);
        for (let i = 0; i < positionList.length; i++) {
            let k = positionList[i][1][0];
            let j = positionList[i][1][1];
            switch (positionList[i][0][1]) {
                case "v":
                    if (positionList[i][1][0] == kingPosition[0] || positionList[i][1][1] == kingPosition[1]) {
                        if (this.findOut("", kingPosition[0], "horization", [positionList[i][1][1], kingPosition[1]]).length == Math.abs(positionList[i][1][1] - kingPosition[1]) - 1 || this.findOut("", kingPosition[1], "vertical", [positionList[i][1][0], kingPosition[0]]).length == Math.abs(positionList[i][1][0] - kingPosition[0]) - 1)
                            threatList.push(positionList[i]);
                    }//if
                    break;
                case "c":
                    if (positionList[i][1][0] == kingPosition[0] || positionList[i][1][1] == kingPosition[1]) {
                        if (this.findOut("", kingPosition[0], "horization", [positionList[i][1][1], kingPosition[1]]).length == Math.abs(positionList[i][1][1] - kingPosition[1]) - 2 || this.findOut("", kingPosition[1], "vertical", [positionList[i][1][0], kingPosition[0]]).length == Math.abs(positionList[i][1][0] - kingPosition[0]) - 2)
                            threatList.push(positionList[i]);
                    }
                    break;
                case "w":
                    if (positionList[i][1][0] == kingPosition[0] || positionList[i][1][1] == kingPosition[1]) {
                        if (Math.abs(positionList[i][1][0] - kingPosition[0]) == 1 || Math.abs(positionList[i][1][1] - kingPosition[1]) == 1)
                            threatList.push(positionList[i]);
                    }
                    break;
                case "h":
                    if (Math.abs(positionList[i][1][0] - kingPosition[0]) == 2 && Math.abs(positionList[i][1][1] - kingPosition[1]) == 1) {
                        if ((kingPosition[0] > positionList[i][1][0] && this.checkerboard[k + 1][j] == "") || (kingPosition[0] < positionList[i][1][0] && this.checkerboard[k - 1][j] == ""))
                            threatList.push(positionList[i]);
                    }
                    if (Math.abs(positionList[i][1][1] - kingPosition[1]) == 2 && Math.abs(positionList[i][1][0] - kingPosition[0]) == 1) {
                        if ((kingPosition[1] > positionList[i][1][1] && this.checkerboard[k][j + 1] == "") || (kingPosition[1] < positionList[i][1][1] && this.checkerboard[k][j - 1] == ""))
                            threatList.push(positionList[i]);
                    }
            }//switch
        }//for
        console.log("将军棋", threatList);
        return threatList;
    }//warning

    searchRole(color, role) {
        let result = [];
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 9; j++) {
                if (this.checkerboard[i][j] == color + role) {
                    if (color == "r")
                        result.push([i + 1, 9 - j]);
                    else
                        result.push([10 - i, j + 1]);
                }
            }//for2
        }//for1
        return result;
    } //role
}

//let g=new GameLogic();
//console.log(g.searchRole("b","w"));

module.exports = GameLogic;