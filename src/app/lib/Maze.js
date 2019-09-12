const getOddRandom = (start, end) => {
    let num = Math.floor(Math.random() * (end-start) + start) 
    if(num%2 == 0) {
        if(num + 1 >= end) {
            num--;
        } else {
            num++
        }
    }
    return num
}

const mazeSetup = (grid) => {
    grid.clearAll()
    
    //Bordering the edge of the grid
    for(let i = 0; i < grid.totalCol; i++) {
        grid.cell[i][0] = -1;
        grid.cell[i][grid.totalRow-1] = -1;
    }
    for(let j = 0; j < grid.totalRow; j++) {
        grid.cell[0][j] = -1;
        grid.cell[grid.totalCol-1][j] = -1;
    }

    //Making even cols and rows as walls
    for(let i = 2; i < grid.totalCol-1; i += 2) {
        for(let j = 1; j < grid.totalRow-1; j ++) {
            grid.cell[i][j] = -1;
        }
    }
    for(let i = 2; i < grid.totalRow-1; i += 2) {
        for(let j = 1; j < grid.totalCol-1; j ++) {
            grid.cell[j][i] = -1;
        }
    }
}

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const generate = (currentCol, currentRow, grid) => {
    grid.cell[currentCol][currentRow] = "v"
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
        if(nextCellCol >= grid.totalCol-1 || nextCellRow >= grid.totalRow-1) continue;

        //Checking if visited already
        if(grid.cell[nextCellCol][nextCellRow] == "v") continue;

        grid.cell[nextWallCol][nextWallRow] = 0;
        generate(nextCellCol, nextCellRow, grid);
    }
}

export default (grid) => {
    mazeSetup(grid)
    let randCol = getOddRandom(1, grid.totalCol-1);
    let randRow = getOddRandom(1,grid.totalRow-1);
    generate(randCol,randRow, grid);
    grid.clearPath()
    //Setting the start and end points 
    grid.setStartPos(getOddRandom(1, grid.totalCol-1), getOddRandom(1, grid.totalRow-1))
    grid.setEndPos(getOddRandom(1, grid.totalCol-1),getOddRandom(1, grid.totalRow-1))
}