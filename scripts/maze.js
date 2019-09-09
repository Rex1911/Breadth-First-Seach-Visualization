function getOddRandom(start, end) {
    let num = floor(random(start,end))
    if(num%2 == 0) {
        if(num + 1 >= end) {
            num--;
        } else {
            num++
        }
    }
    return num
}

function mazeSetup() {
    //Clearing the board
    for(let i = 0; i < col; i++) {
        for(let j = 0; j < row; j++) {
            board[i][j] = 0
        }
    }
    
    //Bordering the edge of the board
    for(let i = 0; i < col; i++) {
        board[i][0] = -1;
        board[i][row-1] = -1;
    }
    for(let j = 0; j < row; j++) {
        board[0][j] = -1;
        board[col-1][j] = -1;
    }

    //Making even cols and rows as walls
    for(let i = 2; i < col-1; i += 2) {
        for(let j = 1; j < row-1; j ++) {
            board[i][j] = -1;
        }
    }
    for(let i = 2; i < row-1; i += 2) {
        for(let j = 1; j < col-1; j ++) {
            board[j][i] = -1;
        }
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function generate(currentCol, currentRow) {
    board[currentCol][currentRow] = "v"
    let directions = ["N", "S", "E", "W"];
    shuffleArray(directions)
    for(let i = 0; i < directions.length; i++) {
        let neighbourCellColDir, neighbourWallColDir;
        let neighbourCellRowDir, neighbourWallRowDir;

        switch(directions[i]) {
            case "N": 
                neighbourCellColDir = 0;
                neighbourWallColDir = 0;
                neighbourCellRowDir = 2;
                neighbourWallRowDir = 1;
                break;
            case "S":
                neighbourWallColDir = 0;
                neighbourCellColDir = 0;
                neighbourCellRowDir = -2;
                neighbourWallRowDir = -1;
                break;
            case "E":
                neighbourCellColDir = 2;
                neighbourWallColDir = 1;
                neighbourCellRowDir = 0;
                neighbourWallRowDir = 0;
                break;
            case "W":
                neighbourCellColDir = -2;
                neighbourWallColDir = -1;
                neighbourCellRowDir = 0;
                neighbourWallRowDir = 0;
                break;
        }

        let nextCellCol = currentCol + neighbourCellColDir;
        let nextCellRow = currentRow + neighbourCellRowDir;
        let nextWallCol = currentCol + neighbourWallColDir;
        let nextWallRow = currentRow + neighbourWallRowDir;

        // Checking Out of Bounds
        if(nextCellCol <= 0 || nextCellRow <= 0) continue;
        if(nextCellCol >= col-1 || nextCellRow >= row-1) continue;

        //Checking if visited already
        if(board[nextCellCol][nextCellRow] == "v") continue;

        board[nextWallCol][nextWallRow] = 0;
        generate(nextCellCol, nextCellRow);
    }
}

function createMazeHelper() {
    mazeSetup()
    let randCol = getOddRandom(1, col-1);
    let randRow = getOddRandom(1,row-1);
    generate(randCol,randRow);
    handleClearPath();
    //Setting the start and end points 
    sc = randCol;
    sr = randRow;
    board[sc][sr] = "s"
    ec = getOddRandom(1,col-1);
    er = getOddRandom(1,row-1);
    board[ec][er] = "e";
}