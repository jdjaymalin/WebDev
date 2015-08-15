function Tile (pos,val){
  this.x     = pos.x;
  this.y     = pos.y;
  this.value = val;

  this.previousPos = null;

  this.merged = null;
}

Tile.prototype = {
  setPosition: function(new_pos){
    this.x = new_pos.x;
    this.y = new_pos.y;
  },

  resetMerge: function(){
    this.merged = null;
  },
  
  setPreviousPosition: function(){
    this.previousPos = {
      x: this.x,
      y: this.y
    };
  }


}
