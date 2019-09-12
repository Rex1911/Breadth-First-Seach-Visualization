let dc = [1,0,-1,0];
let dr = [0,-1,0,1];

export default (colQueue, rowQueue, grid, state) => {
    let currentCol = colQueue.dequeue();
    let currentRow = rowQueue.dequeue();

    if(grid.cell[currentCol][currentRow] == "e") {
        colQueue.empty();
        rowQueue.empty();
        state.currentTraceCol = currentCol;
        state.currentTraceRow = currentRow;
        state.isRunning = false;
        state.isTracing = true;
        grid.clearPath();
        return;
    }

    if(grid.cell[currentCol][currentRow] != "s") grid.cell[currentCol][currentRow] = "v"
    
    for(let i = 0; i < 4; i++) {
        let newCol = currentCol + dc[i];
        let newRow = currentRow + dr[i];

        // Out of Bounds check
		if(newCol < 0 || newRow < 0) continue;
        if(newCol > grid.totalCol-1 || newRow > grid.totalRow-1) continue;
        
        if(grid.cell[newCol][newRow] == -1 || grid.cell[newCol][newRow] == "v" || grid.cell[newCol][newRow] == "q" || grid.cell[newCol][newRow] == "s") continue;
    
        colQueue.enqueue(newCol);
        rowQueue.enqueue(newRow);
        grid.parentCol[newCol][newRow] = currentCol;
        grid.parentRow[newCol][newRow] = currentRow;
        if(grid.cell[newCol][newRow] == "e") continue;
		grid.cell[newCol][newRow] = "q";
    }
}