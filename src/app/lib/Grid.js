export default class Grid {
    constructor(width, height, cellDimension) {
        this.width = width;
        this.height = height;
        this.cellDimension = cellDimension;
        this.totalCol = Math.floor(width/cellDimension);
        this.totalRow = Math.floor(height/cellDimension);
        this.startCol = null;
        this.startRow = null;
        this.endCol = null;
        this.endRow = null;

        //Making sure that totalCol and totalRow are odd
        if(this.totalCol%2 == 0) {
            this.totalCol--;
        }
        if(this.totalRow%2 == 0) {
            this.totalRow--;
        } 

        //Creating the cell array and parent cell array
        this.cell = new Array(this.totalCol);
        this.parentCol = new Array(this.totalCol);
        this.parentRow = new Array(this.totalCol);
        for(let i = 0; i < this.totalCol; i++) {
            this.cell[i] = new Array(this.totalRow);
            this.parentCol[i] = new Array(this.totalRow);
            this.parentRow[i] = new Array(this.totalRow);
        }

        //Setting all cells to state 0
        for(let i = 0; i < this.totalCol; i++) {
            for(let j = 0; j < this.totalRow; j++) {
                this.cell[i][j] = 0;
                this.parentCol[i][j] = 0;
                this.parentRow[i][j] = 0;
            }
        }
    }

    clearAll = () => {
        for(let i = 0; i < this.totalCol; i++) {
            for(let j = 0; j < this.totalRow; j++) {
                this.cell[i][j] = 0;
            }
        }
    }

    clearWalls = () => {
        for(let i = 0; i < this.totalCol; i++) {
            for(let j = 0; j < this.totalRow; j++) {
                if(this.cell[i][j] == "s" || this.cell[i][j] == "e") continue;
                
                if(this.cell[i][j] == -1) {
                    this.cell[i][j] = 0;
                }
            }
        }
    }

    clearPath = () => {
        for(let i = 0; i < this.totalCol; i++) {
            for(let j = 0; j < this.totalRow; j++) {
                if(this.cell[i][j] == "s" || this.cell[i][j] == "e") continue;
                
                if(this.cell[i][j] == "v" || this.cell[i][j] == "q") {
                    this.cell[i][j] = 0;
                }
            }
        }
    }

    setStartPos = (col, row) => {
        if(this.startCol != null) this.cell[this.startCol][this.startRow] = 0;
        this.startCol = col;
        this.startRow = row;
        this.cell[this.startCol][this.startRow] = "s";
    }

    setEndPos = (col, row) => {
        if(this.endCol != null) this.cell[this.endCol][this.endRow] = 0;
        this.endCol = col;
        this.endRow = row;
        this.cell[this.endCol][this.endRow] = "e";
    }
}