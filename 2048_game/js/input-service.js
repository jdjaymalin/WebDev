function InputService(){
  this.keyMap = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
  }
}

InputService.prototype = {

  getKeyPressed: function(callback){
    var keyMap = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down',
    };
    var direction;
    document.addEventListener("keydown", function (e) {
      var key = e.keyCode ? e.keyCode : e.which;
      direction = keyMap[key];
      callback(direction);
    });

  }
}
