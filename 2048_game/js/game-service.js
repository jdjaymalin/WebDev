function GameService (){
  // Instantiate the board
  this.size = 4;
  this.board = new Board(this.size);
  this.input = new InputService();
  this.start_tiles = 2;
  this.is_over = false;
  this.is_won = false;
  this.start();
  this.input.getKeyPressed(this.move.bind(this));

}

GameService.prototype = {
  
  // Instantiate the board with all 0 values
  start: function(){
    // We want 2 random tiles at the start
    for (var i = 0; i < this.start_tiles; i++) {
      this.addRandomTile();
    }
  },

  addRandomTile: function(){
    // We want 2 to appear more often
    var rand_num = Math.floor(Math.random() * 10) + 1 <= 8 ? 2 : 4;
    this.board.addToRandomPosition(rand_num);
  },

  move: function(direction){
    console.log(direction);
    var self = this;
    var positions = this.traverseDirections(direction);

    positions.x.forEach(function(x) {
      positions.y.forEach(function(y) {
        var original_pos = {x:x,y:y};
        var tile_content = self.board.getSquareValue(original_pos);
        console.log(original_pos);
        console.log(tile_content);
        if (tile_content > 0){
          var new_position = 
        }
      });
    });
  },

  traverseDirections: function(direction){
    var vectors = {
      'left': { x: -1, y: 0 },
      'right': { x: 1, y: 0 },
      'up': { x: 0, y: -1 },
      'down': { x: 0, y: 1 }
    }; 

    var vector = vectors[direction];
    var positions = {x: [], y: []};
    for (var i = 0; i < this.size; i++) {
      positions.x.push(i);
      positions.y.push(i);
    }

    if (vector.y > 0) {
      positions.y = positions.y.reverse();
    }
    if (vector.x > 0) {
      positions.x = positions.x.reverse();
    }
    return positions;
  }
}


