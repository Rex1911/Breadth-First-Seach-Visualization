import Grid from './lib/Grid'

let grid;

const sketch = (p5) => {
    p5.setup = () => {
        p5.createCanvas(Math.floor(p5.windowWidth * 0.95), Math.floor(p5.windowHeight * 0.8));
        grid = new Grid(p5.width, p5.height, 20)
        let startCol = Math.floor(Math.random() * grid.totalCol);
        let startRow = Math.floor(Math.random() * grid.totalRow);
        let endCol = Math.floor(Math.random() * grid.totalCol);
        let endRow = Math.floor(Math.random() * grid.totalRow);
        grid.setStartPos(startCol, startRow);
        grid.setEndPos(endCol,endRow);
        p5.background(255);
    }

    p5.draw = () => {
        for(let i = 0; i < grid.totalCol; i++) {
            for(let j = 0; j < grid.totalRow; j++) {
                p5.stroke(240);
                if (grid.cell[i][j] == -1) {
                    p5.stroke(100);
                    p5.fill(100);
                } else if (grid.cell[i][j] == "s") {
                    p5.stroke(26, 188, 156);
                    p5.fill(26, 188, 156);
                } else if (grid.cell[i][j] == "e") {
                    p5.stroke(192, 57, 43);
                    p5.fill(192, 57, 43);
                } else if(grid.cell[i][j] == "v") {
                    p5.stroke(52, 152, 219);
                    p5.fill(52, 152, 219)
                } else if(grid.cell[i][j] == "q") {
                    p5.stroke(46, 134, 193);
                    p5.fill(46, 134, 193);
                }else {
                    p5.fill(255);
                }
                p5.rect(i * grid.cellDimension, j * grid.cellDimension, grid.cellDimension - 1, grid.cellDimension - 1);
            }
        }
    }
}

export default sketch;