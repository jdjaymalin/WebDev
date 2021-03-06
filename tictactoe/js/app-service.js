function AppService() {
    this.size = null;
    this.infinity = 99;
    this.maxDepth = 7;
    this.winArr = [];
    this.boardObj = new Board();
    this.board = [];
}

AppService.prototype = {
    start: function(size) {
        this.size = size;
        this.boardObj.init(this.size);
	    this.board = this.boardObj.board;
        this.getWinningCombinations();
        this.getInput();
    },
    restart: function(size) {
        this.start(size);
    },
    getInput: function(){
        var self = this;
        var grid = document.querySelector("#board");
        grid.addEventListener("click", function (e) {
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
                if (self.checkWinner(0) > 0) {
                    return alert('you lose');
                }
            }
        });
    },

    getWinningCombinations: function() {
        var dia1   = [],
            dia2   = [];
        var i,j;
        this.winArr = [];
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
            if (x == 0) {
                return (this.size*this.size)-depth;
            }
            if (o == 0) {
                return depth-(this.size*this.size);
            }
        }
    },

    getComputerMove: function(depth, player, alpha, beta) {
        var cells   = (this.size*this.size), 
            min = -this.infinity,
            max,
            next,
            value = this.checkWinner(depth);
        if (value){
            return value * player;
        }
		
        if (this.maxDepth > depth){
            for (var i=0; i<cells; i++){
                if (this.board[i] == 0) {
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
		    // Note both are maximizers
		    // we are interested in getting the maximum outcome everytime
		    // if max is greater than the min, it's a good move
                    if (max > min) {
                        min = max;
                        next = i;
                    }
                }
            }
        }
        if (depth > 0) {
            return max || 0;
        }
	// We are at the root
        else {
            return next;
        }
    }
}
