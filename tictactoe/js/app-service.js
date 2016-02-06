function AppService() {
    this.size = 5;
    this.infinity = 99;
    this.maxDepth = 4;
    this.winArr = [];
    this.boardObj = new Board(this.size);
	this.board = this.boardObj.board;
    //this.boardObj.drawBoard();
    this.getWinningCombinations();
    this.getInput();


}

AppService.prototype = {
    getInput: function(){
        var self = this;
        document.addEventListener("click", function (e) {
            //console.log(e.target.id);
            var index = e.target.id.split('-').pop();
            if (e.target.id && !self.board[index]){ 
                if (self.checkWinner(0) < 0) {
                    return alert('you win');
                }
                self.boardObj.drawMove(index,-1);
                var next = self.getComputerMove(0,1,-self.infinity,self.infinity);
                if (next === undefined) {
                    return alert('it\'s a tie')
                }
                self.boardObj.drawMove(next,1);
                if (self.boardObj.isBoardFull()){
                    return alert('it\'s a tie')
                }
                console.log(next);
                console.log(self.board);
                if (self.checkWinner(0) > 0) {
                    return alert('you lose');
                }
                //console.log(self.board);
            }
        });
    },

    getWinningCombinations: function() {
        var dia1   = [],
            dia2   = [];
        var i,j;

        for ( i = 0; i<this.size; i++ ){
            var hor = [],
                ver = [];
            for ( j = 0; j<this.size; j++ ) {
                    hor.push(i*this.size + j);
                    ver.push(j*this.size + i);
            }
            this.winArr.push(hor,ver);
            dia1.push(i*this.size + i);
            dia2.push(i*(this.size-1) + (this.size-1));
        }
        this.winArr.push(dia1,dia2);
        //console.log(this.winArr);
		//console.log(this.boardObj.board);
        
        //console.log(this.board);
        //console.log(this.isGameOver());
    },

    checkWinner: function(depth){
		for (var i in this.winArr){					
            var x = o = this.size;
            for (var j=0; j<this.size; j++) {
                if (this.board[this.winArr[i][j]] > 0) {
                    x--;
                }
                if (this.board[this.winArr[i][j]] < 0) {
                    o--;
                }
            }
            if (!x) {
                return this.infinity-depth;
            }
            if (!o) {
                return depth-this.infinity;
            }
        }
			//console.log(this.winArr[i]);
    },

    getComputerMove: function(depth, player, alpha, beta) {
        var i   = this.size*this.size,
            min = -this.infinity,
            max,
            next,
            value = this.checkWinner(depth);
            //console.log(this.checkWinner(depth));
        if (value){
            return value * player;
        }
        /*
        if (this.boardObj.isBoardFull()){
            return undefined;
        }
        */
        if (this.maxDepth > depth){
        for (i-=1; i>0; i--){
          //console.log(i);
            if (!this.board[i]) {
                this.board[i] = player;
                value = - this.getComputerMove(depth+1, -player, -beta, -alpha);
                this.board[i] = 0;
                if (max === undefined || value > max) {
                    max = value;
                }
                if (value > alpha) {
                    alpha = value;
                }
                if (alpha >= beta) {
                    return alpha;
                }
                if (max > min) {
                    min = max;
                    next = i;
                }
            }
        }
        }
        if (depth) {
            return max || 0;
        }
        else {
            return next;
        }
    }

}

var check = new AppService();
check.getWinningCombinations();
