function Board(size){
  this.size    = size;
  this.squares = [];

  this.init();

}

Board.prototype = {
  
  // Initialize the board to contain all 0 values
  init: function(){
    for (var i = 0; i < this.size; i++){
      this.squares[i] = [];
      for (var j = 0; j < this.size; j++) {
        this.squares[i][j] = 0;
      }
    }
  },

  getFreeSquares: function() {
    var free_squares = [];
    for (var i = 0; i < this.size; i++){
      for (var j = 0; j < this.size; j++) {
        var position = [i,j];
        if (this.squares[i][j] == 0){
          free_squares.push(position);
        }
      }
    }
    return free_squares;
  },

  addToRandomPosition: function(rand_num){
    var rand_pos = Math.floor(Math.random() * 11) + 0;

    var free_squares = this.getFreeSquares();
    var tile_pos = free_squares[rand_pos];
    var x = tile_pos[0];
    var y = tile_pos[1];
    this.squares[x][y] = rand_num;
    console.log(tile_pos);
    console.log(this.squares);
  },

  getSquareValue: function(position){
    if (this.isInBoard(position)){
      return this.squares[position.x][position.y];
    }
    else {
      return null;
    }
  },

  isInBoard: function(position){
    return position.x >= 0 && position.x < this.size &&
      position.y >= 0 && position.y < this.size;
  },


}
