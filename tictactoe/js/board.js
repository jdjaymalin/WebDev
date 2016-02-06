function Board(size) {
        this.size = size;
        this.FREE = ' ';
        this.X = -1;
        this.O = 1;
}

Board.prototype = {
        init: function() {

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
                                cell.id = 'cell' + cellNo;
                        }
                }

        },

        drawMove: function() {

        },


}
