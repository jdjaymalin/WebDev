function Board(size){
  this.size    = size;
  this.squares = [];
  this.tiles = [];

  this.vectorMap = {
    'left' : { x: 0, y: -1 },
    'right': { x: 0, y: 1  },
    'up'   : { x: -1, y: 0 },
    'down' : { x: 1, y: 0  }
  };

  this.init();

}

Board.prototype = {
  
  // Initialize the board to contain all 0 values
  init: function(){
    for (var i = 0; i < this.size; i++){
      this.squares[i] = [];
      for (var j = 0; j < this.size; j++) {
        this.squares[i][j] = null;
      }
    }
  },

  getFreeSquares: function() {
    var free_squares = [];
    for (var i = 0; i < this.size; i++){
      for (var j = 0; j < this.size; j++) {
        var position = [i,j];
        if (this.squares[i][j] === null){
          free_squares.push(position);
        }
      }
    }
    return free_squares;
  },

  hasFreeSquares: function(){
    if (this.getFreeSquares().length > 0){
      return true;
    }
    else{
      return false;
    }
  },

  addRandomTile: function(){
    var rand_num = Math.floor(Math.random() * 100) + 1 <= 95 ? 2 : 4;
    var free_squares = this.getFreeSquares();
    var free_count = free_squares.length - 1;
    var rand_pos = Math.floor(Math.random() * free_count);
    var tile_pos = free_squares[rand_pos];
    var pos = {
      x: tile_pos[0],
      y: tile_pos[1]
    };

    this.squares[pos.x][pos.y] = new Tile(pos,rand_num);;
    //console.log(this.squares[pos.x][pos.y]);
  },

  getSquareContent: function(position){
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
  
  getCoordinateIndex: function(direction){
    var positions = {
      x: [], 
      y: []
    };

    for (var i = 0; i < this.size; i++) {
      positions.x.push(i);
      positions.y.push(i);
    }

    // Note that in an array (x,y)
    // If right traverese from right to left
    if (direction == 'right') {
      positions.y = positions.y.reverse();
    }
    // If down traverse from bottom to up
    if (direction == 'down') {
      positions.x = positions.x.reverse();
    }
    return positions;
  },

  isSquareAvailable(pos){
    if (this.getSquareContent(pos) !== null){
      return false;
    }
    return true;
  },

  getNextPosition: function(pos,direction){
    var vector = this.vectorMap[direction];
    var current;
    var next;

    do {
      previous = pos;
      pos = {
        x: previous.x + vector.x,
        y: previous.y + vector.y
      };
    } while (this.isInBoard(pos) && this.isSquareAvailable(pos));

    return {
      new_pos: previous,
      next   : pos
    };
  },

  createTile: function(pos,value){
    new_tile = new Tile(pos,value);
    return new_tile;
  },

  insertTile: function(tile){
    this.squares[tile.x][tile.y] = tile;
  },

  removeTile: function(tile){
    this.squares[tile.x][tile.y] = null;
  },

  setSquareContent: function(position,val){
    if (this.isInBoard(position)){
      this.squares[position.x][position.y] = val;
    }
  },

  moveTile: function(tile,new_pos){
    var cur_pos = {
      x: tile.x,
      y: tile.y
    };

    this.setSquareContent(cur_pos,null);
    this.setSquareContent(new_pos,tile);
    tile.setPosition(new_pos);

  },

  hasMoved: function(tile1,tile2){
    if (tile1.x === tile2.x && tile1.y === tile2.y){
      return false;
    }
    else {
      return true;
    }
  },

  resetTile: function(){
    for (var i = 0; i < this.size; i++){
      for (var j = 0; j < this.size; j++) {
        var tile = this.getSquareContent({x:i,y:j});
        if (tile){
          tile.merged = null;
          tile.setPreviousPosition();
          //console.log(tile);
        }
      }
    }
  },

  hasMergeTiles: function() {
    var self = this;
    var has_merge = false;
    for (var i = 0; i < this.size; i++){
      for (var j = 0; j < this.size; j++) {
        var tile = this.getSquareContent({x:i,y:j});
        var direction = ['left', 'right', 'up', 'down'];
        if (tile){
          direction.forEach( function(direction) {
            var vector = self.vectorMap[direction];
            var pos = {
              x: i + vector.x,
              y: j + vector.y
            }
            var neighbor = self.getSquareContent(pos);
            if (neighbor && neighbor.value === tile.value) {
              console.log('TRUE');
              has_merge = true;
              return true;
            }
          });
        }
      }
    }
    return has_merge;
  },

}
