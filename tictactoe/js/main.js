var app = new AppService();
var grid = document.querySelector("#three");
grid.addEventListener("click", function (e) {
      app.restart(3);
});
var grid = document.querySelector("#four");
grid.addEventListener("click", function (e) {
      app.restart(4);
});
var grid = document.querySelector("#five");
grid.addEventListener("click", function (e) {
      app.restart(5);
});

