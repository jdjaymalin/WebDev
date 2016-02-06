function AppService() {
        this.size = 3;
        this.winArr = [];
        this.board = new Board(this.size);
        this.board.drawBoard();

        document.addEventListener("click", function (e) {
                console.log(e.target.id);
        });
}

AppService.prototype = {
        getWinningCombinations: function() {
                    dia1   = [],
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
                console.log(this.winArr);
        },

}

var check = new AppService();
check.getWinningCombinations();
