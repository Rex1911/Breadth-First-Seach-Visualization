export default (grid, state) => {
    let {currentTraceCol, currentTraceRow} = state
    let parentCol = grid.parentCol[currentTraceCol][currentTraceRow];
    let parentRow = grid.parentRow[currentTraceCol][currentTraceRow];

    if(grid.cell[parentCol][parentRow] == "s") {
        state.isTracing = false;
        return;
    }

    grid.cell[parentCol][parentRow] = "v";
    state.currentTraceCol = parentCol;
    state.currentTraceRow = parentRow;
}