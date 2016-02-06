function Board(size) {
    this.size = size;
    this.FREE = ' ';
    this.X = -1; //user
    this.O = 1; //comp
	this.board = [];
	//this.board = [1,1,1,0,0,0,0,0,0];
	this.init();
}

Board.prototype = {
    init: function() {
		for ( var i=0; i<this.size*this.size; i++ ){
			this.board[i] = 0;
		}
		this.drawBoard();
		//return this.board;
    },

    drawBoard: function() {
        var board = document.getElementById('board');
        var i,j;
        for (i=0; i<this.size; i++){
            var row = board.insertRow(i);
                    row.className = 'row';
            for (j=0; j<this.size; j++){
                var cell = row.insertCell(j);
                var cellNo = i*this.size + j;
                cell.id = 'cell-' + cellNo;
            }
        }

    },

    drawMove: function(position,piece) {
        var token = piece < 0 ? 'x' : 'o';
        document.getElementById('cell-' + position).innerHTML = token;
        this.board[position] = piece;
    },

    isBoardFull: function() {
        for (var i=0; i<this.size*this.size; i++){
            if (this.board[i] === 0){
                return false;
            }
        }
        return true;
    }
		
}
