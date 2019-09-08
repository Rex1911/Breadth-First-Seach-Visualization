let w = 20;
let col,row, board;
let i = 0, j = 0;
let sc,sr,ec,er;
let rq = new Queue();
let cq = new Queue();
let dc = [1,-1,0,0]
let dr = [0,0,1,-1];
let isRunning = false;
let isTracing = false;
let currentMode;
let parentCol, parentRow;
let dragging = 0;
let finalCol, finalRow;
let pCol, pRow

function handleClearWalls() {
	for(let i = 0; i < col; i++) {
		for(let j = 0; j < row; j++) {
			if(board[i][j] == -1) {
				board[i][j] = 0;
			}
		}
	}
}

function handleClearPath() {
	for(let i = 0; i < col; i++) {
		for(let j = 0; j < row; j++) {
			if(board[i][j] == "v" || board[i][j] == "q") {
				board[i][j] = 0;
			}
		}
	}
}

function handleStart() {
	cq.enqueue(sc);
	rq.enqueue(sr);
	handleClearPath();
	isRunning = true;
}

// Trace the path once the target node is found. 
function tracePath() {
	pCol = parentCol[finalCol][finalRow]
	pRow = parentRow[finalCol][finalRow]
	if(board[pCol][pRow] == "s") {
		isTracing = false;
		return;
	}
	board[pCol][pRow] = "v";
	finalCol = pCol;
	finalRow = pRow;
}

function explore(currentCol,currentRow) {
	for(let i = 0; i < 4; i++) {
		let newCol = currentCol + dc[i];
		let newRow = currentRow + dr[i];

		
		// Out of Bounds check
		if(newCol < 0 || newRow < 0) continue;
		if(newCol > col-1 || newRow > row-1) continue;

		// Blocked, or visited check
		if(board[newCol][newRow] == -1 || board[newCol][newRow] == "v" || board[newCol][newRow] == "q" || board[newCol][newRow] == "s") continue;

		//Else enqueue the newCol and newRow
		cq.enqueue(newCol);
		rq.enqueue(newRow);
		// Add the parent nodes to trace the path later!
		parentCol[newCol][newRow] = currentCol;
		parentRow[newCol][newRow] = currentRow;
		if(board[newCol][newRow] == "e") continue;
		board[newCol][newRow] = "q";
	}
}

function bfs() {
	let c = cq.dequeue();
	let r = rq.dequeue();
	if(board[c][r] == "e") {
		cq.empty();
		rq.empty();
		isRunning = false;
		// tracePath(c,r);
		isTracing = true;
		finalCol = c;
		finalRow = r;
		handleClearPath();
		return;
	}
	if(board[c][r] != "s") board[c][r] = "v"
	explore(c,r);
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    col = floor(width / w);
	row = floor(height / w);
	sc = floor(random(col))
	sr = floor(random(row))
	ec = floor(random(col))
	er = floor(random(row))
	board = new Array(col);
	parentCol = new Array(col);	
	parentRow = new Array(row);
    for (let i = 0; i < col; i++) {
		board[i] = new Array(row);
		parentCol[i] = new Array(row);
		parentRow[i] = new Array(row);
	}
	
	// Looping over the entire board and setting the position of the start, end and other nodes
    for (let i = 0; i < col; i++) {
        for (let j = 0; j < row; j++) {
            if (i == sc && j == sr) {
                board[i][j] = "s";
            } else if (i == ec && j == er) {
                board[i][j] = "e";
            } else {
                board[i][j] = 0;
			}
			parentCol[i][j] = 0;
			parentRow[i][j] = 0;
        }
	}
	background(255);
}

function draw() {
	if(cq.size() > 0 && isRunning == true) {
		bfs();
	}
	
	if(isTracing) {
		tracePath();
	}
    for (let i = 0; i < col; i++) {
        for (let j = 0; j < row; j++) {
            stroke(240);
            if (board[i][j] == -1) {
				stroke(100);
				fill(100);
            } else if (board[i][j] == "s") {
				stroke(26, 188, 156);
				fill(26, 188, 156);
            } else if (board[i][j] == "e") {
				stroke(192, 57, 43);
				fill(192, 57, 43);
            } else if(board[i][j] == "v") {
				stroke(52, 152, 219);
				fill(52, 152, 219)
			} else if(board[i][j] == "q") {
				stroke(46, 134, 193);
				fill(46, 134, 193);
			}else {
                fill(255);
            }
            rect(i * w, j * w, w - 1, w - 1);
        }
	}
}

function mousePressed() {
    let i = floor(mouseX / w);
	let j = floor(mouseY / w);
	if(board[i][j] == "s") {
		dragging = "s";
	} else if(board[i][j] == "e") {
		dragging="e";
	}else {
		dragging = board[i][j] == -1 ? 0 : -1
		if(i >= 0 && i <= col-1 && j >=0 && j <= row-1) {
			board[i][j] = dragging;
		}
	}
}

function mouseReleased() {
	let i = floor(mouseX / w);
	let j = floor(mouseY / w);
	if(dragging == "s") {
		let current_sc = sc;
		let current_sr = sr;
		sc = i;
		sr = j;
		board[i][j] = "s"
		board[current_sc][current_sr] = 0;
	} else if(dragging == "e") {
		let current_ec = ec;
		let current_er = er;
		ec = i;
		er = j;
		board[i][j] = "e"
		board[current_ec][current_er] = 0;
	}
}

function mouseDragged() {
	let i = floor(mouseX / w);
	let j = floor(mouseY / w);
	
 	if(i >= 0 && i <= col-1 && j >=0 && j <= row-1 && board[i][j] != "s" && board[i][j] != "e" && dragging != "s" && dragging != "e") {
		board[i][j] = dragging;
	}
}
