function Renderer(){
  this.tileContainer = document.querySelector(".tile-div");
  this.messageContainer = document.querySelector(".game-message");
}

Renderer.prototype = {
  
  render: function(board,stat){
    var self = this;
    window.requestAnimationFrame(function() {
      self.clearDiv(self.tileContainer);     
      for (var i = 0; i < board.length; i++){
        for (var j = 0; j < board.length; j++){
          var tile = board[i][j];
          if (tile) {
            self.insertTile(tile);
          }
        }
      }
    });

    if (stat.is_won || stat.is_over) {
      self.showMessage(stat.is_won);
    }
  },

  insertTile: function(tile){
    var self = this;
    var element  = document.createElement("div");
    var inner    = document.createElement("div");
    var pos;
    var val;
    if (tile.merged) {
      pos = {
        x: tile.merged[0].x + 1,
        y: tile.merged[0].y + 1
      };
      val = tile.merged[0].value;
    }
    else { 
      var position = tile.previousPos ? tile.previousPos : tile
      pos = {
        x: position.x + 1,
        y: position.y + 1
      };
      val = tile.value;
    }

    var classes  = ['tile', 'tile-' + val, 'tile-position-' + pos.x + '-' + pos.y];

    element.setAttribute("class", classes.join(" "));
    inner.classList.add("tile-inner");
    inner.textContent = tile.value;

    var pos = {
      x: tile.x + 1,
      y: tile.y + 1
    };
    classes[2] = 'tile-position-' + pos.x + '-' + pos.y;

    if (tile.previousPos){
      window.requestAnimationFrame(function (){
        element.setAttribute("class", classes.join(" "));
      });

    }
    else if (tile.merged){
      window.requestAnimationFrame(function (){
        classes[1] = 'tile-' + tile.value;
        element.setAttribute("class", classes.join(" "));
      });
    }
    else {
        classes.push("tile-new");
        element.setAttribute("class", classes.join(" "));
    }

    element.appendChild(inner);
    this.tileContainer.appendChild(element);
  },

  clearDiv: function(div){
    while (div.firstChild){
      div.removeChild(div.firstChild);
    }
  },

  showMessage: function(is_won){
    var message = is_won ? "Winner" : "Game Over";
    this.messageContainer.getElementsByTagName("p")[0].textContent = message;
    this.messageContainer.style.display = "block";
  },

  hideMessage: function(){
    this.messageContainer.getElementsByTagName("p")[0].textContent = "";
    this.messageContainer.style.display = "none";
  }
}
