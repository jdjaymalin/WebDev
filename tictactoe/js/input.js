function Input(){
}

Input.prototype = {
    restart: function(callback){
        var button = document.querySelector("#three");
        button.addEventListener("click", callback.bind(this));
    }

}
