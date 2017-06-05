$(function() {
  function Game() {
    this.desk = [[0,0,0], [0,0,0], [0,0,0]]; //0: empty; 1: user; 4: cpu
    var cpuType = "x"; // "x" or "o"
    this.ended = 0;
    this.init = 1;

    this.setType = function(type) {
      cpuType = type;
    }

    function getType(state) {
      if (state == 4) {
        return cpuType;
      } else {
        if (cpuType == "x") {
          return "o";
        } else {
          return "x";
        }
      }
    }

    this.move = function(type, row, col) {
      this.desk[row - 1][col - 1] = type;
    }

    this.draw = function() {
      this.desk.forEach(function(cols, row) {
        cols.forEach(function(state, col) {
          var position = "#f" + (row + 1).toString() + (col + 1).toString();
          if (state !== 0) {
            $(position).html("<img src='img/" + getType(state) + ".png'>");
            $(position).removeClass("unset");
            $(position).addClass("set");            
          } else {
            $(position).html("");
            $(position).removeClass("set");
            $(position).addClass("unset");               
          }
        });
      });
    }

    this.random = function() {
      var found = 0;
      var row = 0;
      var col = 0;
      function getRandom() {
        min = Math.ceil(1);
        max = Math.floor(3);
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }      
      while (found == 0) {
        row = getRandom();
        col = getRandom();
        if (this.desk[row-1][col-1] === 0) {
          found = 1;
          this.move(4, row, col)
        }
      }
    }

    this.clear = function() {
      this.desk = [[0,0,0], [0,0,0], [0,0,0]];
      this.draw();
      this.ended = 0;
      $("#new").css("visibility", "hidden");
      $(".desk").css("background-color", "#caebba");
    }

    this.analyze = function() {
      var moved = 0;
      var check = [[[0,0],[0,1],[0,2]],[[1,0],[1,1],[1,2]],[[2,0],[2,1],[2,2]],[[0,0],[1,0],[2,0]],[[0,1],[1,1],[2,1]],[[0,2],[1,2],[2,2]],[[0,0],[1,1],[2,2]],[[0,2],[1,1],[2,0]]];
      for (var i=0; i <= (check.length-1); i++) {
        if (this.desk[check[i][0][0]][check[i][0][1]]+this.desk[check[i][1][0]][check[i][1][1]]+this.desk[check[i][2][0]][check[i][2][1]] == 8) {
          if (this.desk[check[i][0][0]][check[i][0][1]] === 0) {
            this.move(4, check[i][0][0]+1, check[i][0][1]+1);
            this.draw();
            moved = 1;
            return;
          }
          if (this.desk[check[i][1][0]][check[i][1][1]] === 0) {
            this.move(4, check[i][1][0]+1, check[i][1][1]+1);
            this.draw();
            moved = 1;
            return;
          }
          if (this.desk[check[i][2][0]][check[i][2][1]] === 0) {
            this.move(4, check[i][2][0]+1, check[i][2][1]+1);
            this.draw();
            moved = 1;
            return;
          }
        }
      }
      if (moved === 0) {
        for (var i=0; i <= (check.length-1); i++) {
          if (this.desk[check[i][0][0]][check[i][0][1]]+this.desk[check[i][1][0]][check[i][1][1]]+this.desk[check[i][2][0]][check[i][2][1]] == 2) {
            if (this.desk[check[i][0][0]][check[i][0][1]] === 0) {
              this.move(4, check[i][0][0]+1, check[i][0][1]+1);
              this.draw();
              moved = 1;
              return;
            }
            if (this.desk[check[i][1][0]][check[i][1][1]] === 0) {
              this.move(4, check[i][1][0]+1, check[i][1][1]+1);
              this.draw();
              moved = 1;
              return;
            }
            if (this.desk[check[i][2][0]][check[i][2][1]] === 0) {
              this.move(4, check[i][2][0]+1, check[i][2][1]+1);
              this.draw();
              moved = 1;
              return;
            }
          }
        }        
      }
      this.random();
      this.draw();
    }

    this.winCheck = function() {
      var moved = 0;
      var position = "";
      var check = [[[0,0],[0,1],[0,2]],[[1,0],[1,1],[1,2]],[[2,0],[2,1],[2,2]],[[0,0],[1,0],[2,0]],[[0,1],[1,1],[2,1]],[[0,2],[1,2],[2,2]],[[0,0],[1,1],[2,2]],[[0,2],[1,1],[2,0]]];
      for (var i=0; i <= (check.length-1); i++) {
        if (this.desk[check[i][0][0]][check[i][0][1]]+this.desk[check[i][1][0]][check[i][1][1]]+this.desk[check[i][2][0]][check[i][2][1]] == 12) {
          $("#status").html("Computer wins!");
          position = "#f" + (check[i][0][0] + 1).toString() + (check[i][0][1] + 1).toString();
          $(position).css("background-color", "#FFE4C4");
          position = "#f" + (check[i][1][0] + 1).toString() + (check[i][1][1] + 1).toString();
          $(position).css("background-color", "#FFE4C4");
          position = "#f" + (check[i][2][0] + 1).toString() + (check[i][2][1] + 1).toString();
          $(position).css("background-color", "#FFE4C4");                    
          this.ended = 1;
          this.init = 1;
          $("#new").css("visibility", "visible");
          return;
        }
      }
      for (var i=0; i <= (check.length-1); i++) {
        if (this.desk[check[i][0][0]][check[i][0][1]]+this.desk[check[i][1][0]][check[i][1][1]]+this.desk[check[i][2][0]][check[i][2][1]] == 3) {
          $("#status").html("You win!");
          position = "#f" + (check[i][0][0] + 1).toString() + (check[i][0][1] + 1).toString();
          $(position).css("background-color", "#FFE4C4");
          position = "#f" + (check[i][1][0] + 1).toString() + (check[i][1][1] + 1).toString();
          $(position).css("background-color", "#FFE4C4");
          position = "#f" + (check[i][2][0] + 1).toString() + (check[i][2][1] + 1).toString();
          $(position).css("background-color", "#FFE4C4");            
          this.ended = 1;
          this.init = 1;
          $("#new").css("visibility", "visible");
          return;
        }
      }          
    }

    this.endDraw = function() {
      $("#status").html("It's a draw!");
      this.ended = 1;
      this.init = 1;
      $("#new").css("visibility", "visible");
    }

    this.initial = function() {
      $("#f21").html("<img src='img/x.png'>");
      $("#f23").html("<img src='img/o.png'>");
      $("#f21").css("background-color", "#FFE4C4");
      $("#f23").css("background-color", "#FFE4C4");      
      $("#status").html("Choose your mark");
    }

    this.initial();
  }

  $("#new").css("visibility", "hidden");

  var game = new Game();

  $(".desk").click(function() {
    if (game.ended !== 1 && game.init !== 1) {
      if (!$(this).hasClass("set")) {
        game.move(1, parseInt($(this).attr("id").slice(1,2)), parseInt($(this).attr("id").slice(2,3)));
        game.draw();
        game.winCheck();
        if (game.ended !=1) {
          if ($(".unset").length !== 0) {
            $("#status").html("Thinking...");                 
            setTimeout(function() {
              game.analyze();
              $("#status").html("Your turn!");              
              game.winCheck();
              if (game.ended != 1 && $(".unset").length === 0) {
                game.endDraw();
              }                  
              }, 1000);      
          } else {
            game.endDraw();
          }
        }
      }
    }

    if (game.init == 1 && $(this).hasClass("unset")) {
      if ($(this).attr("id") == "f21") {
        game.setType("o");
        game.init = 0;
        game.clear();
        $("#status").html("Your turn!");      
      }
      if ($(this).attr("id") == "f23") {
        game.setType("x");
        game.init = 0;
        game.clear();
        game.analyze();
        $("#status").html("Your turn!");              
      }      
    }
  });

  $("#new").click(function() {
    game.clear();
    game.initial();
  });
});