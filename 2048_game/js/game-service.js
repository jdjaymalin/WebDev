function GameService (){
  // Instantiate the board
  this.size = 4;
  this.board = new Board(this.size);
  this.input = new InputService();
  this.render= new Renderer();
  this.start_tiles = 2;
  this.is_over = false;
  this.is_won = false;
  this.win_value = 2048;
  this.input.getKeyPressed(this.move.bind(this));
  this.input.isRestart(this.restart.bind(this));

  this.start();

}

GameService.prototype = {
  
  // Instantiate the board with all 0 values
  start: function(){
    // We want 2 random tiles at the start
    for (var i = 0; i < this.start_tiles; i++) {
      this.board.addRandomTile();
    }

    var game_status = {
      is_won : this.is_won,
      is_over: this.is_over
    };
    this.render.render(this.board.squares,game_status);
  },

  restart: function(){
    this.board.init();
    this.is_over = false;
    this.is_won = false;
    this.render.hideMessage();
    this.start();
  },

  move: function(direction){
    //console.log(direction);
    var self = this;
    var is_moved = false;
    var coordinates = self.board.getCoordinateIndex(direction);

    // need to reset merge/tiles
    self.board.resetTile();

    //console.log(coordinates);
    coordinates.x.forEach(function(x) {
      coordinates.y.forEach(function(y) {
        var original_pos = {x:x,y:y};
        var tile = self.board.getSquareContent(original_pos);
        if (tile !== null){
          //console.log('Tile');
          //console.log(tile);
          var positions = self.board.getNextPosition(original_pos,direction);
          var next_position = positions.next;
          var next_tile = self.board.getSquareContent(next_position);
          //console.log('Next Pos');
          //console.log(positions);

          if (next_tile && next_tile.value === tile.value && !next_tile.merged){
            var new_value = tile.value * 2;
            var merged_tile = self.board.createTile(tile,new_value);
            merged_tile.merged = [tile, next_tile];
            self.board.insertTile(merged_tile);
            self.board.removeTile(tile);
            self.board.moveTile(merged_tile,next_tile);

            if (merged_tile.value >= self.win_value){
              self.is_won = true;
            }
            is_moved = true;
          }
          else {
            self.board.moveTile(tile,positions.new_pos);
          }
          
          if (self.board.hasMoved(original_pos,positions.new_pos)){
            is_moved = true;
          }

        }
      });
    });
    if(is_moved){
      self.board.addRandomTile();

      if (self.isOver()){
        self.is_over = true;
      }
    }
    var game_stat = {
      is_won: self.is_won,
      is_over: self.is_over
    }
    self.render.render(self.board.squares,game_stat);
    //console.log(self.board.squares);
  },

  isOver: function(){
    if (!this.board.hasFreeSquares()) {
      console.log('Free: No free squares');
      if (!this.board.hasMergeTiles()) {
        console.log('Merge: No merge tiles');
        return true;    
      }
      else {
        return false;
      }
    }
    return false;
  },

}


