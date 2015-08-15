function InputService(){
  this.keyMap = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
  }
}

InputService.prototype = {

  getKeyPressed: function(){
    window.onkeyup = function(e) {
      var key = e.keyCode ? e.keyCode : e.which;
      var direction = this.keyMap[key];
      console.log(direction);
    }
  }
}
