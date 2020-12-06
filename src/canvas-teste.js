window.onload = function () {
  document.getElementById("start-button").onclick = function () {
    startGame();
  };
  
  function startGame() {
    gameArea.clearButton();
    gameArea.start();
    }

  function preGame() {
    gameArea.clear();
    background.draw();
    board.drawBoards();
  }

  const gameArea = {
    canvas: document.querySelector("#canvas"),
    start: function () {
      this.context = this.canvas.getContext("2d");
      this.canvas.width = 800;
      this.canvas.height = 600;
    },

    startDuel: function (){
      this.interval = setInterval(updateGameArea, 20);
      this.controller = false;
    },  

    clear: function () {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },

    clearButton: function () {
      let button = document.querySelector(".game-load");
      this.canvas.style.display = "block";
      button.style.display = "none";
    },

    showButton: function () {
      let button = document.querySelector(".game-load");
      this.canvas.style.display = "none";
      button.style.display = "block";
    },

    stop: function () {
      clearInterval(this.interval);
      setTimeout(gameOver(), 1000);
    },
  };

  function gameOver () {
    gameArea.clear();
    background.draw();
    leftPlayer.draw();
    rightPlayer.draw();
    gameArea.context.textAlign = 'center';
    gameArea.context.fillStyle = '#705246';
    gameArea.context.font = 'bold 50px serif';
    gameArea.context.fillText('GAME OVER', gameArea.canvas.width/2, gameArea.canvas.height/2);
  }

  //function texts(){

  }

  function updateGameArea() {
    gameArea.clear();
    background.draw();
    leftPlayer.draw();
    rightPlayer.draw();
    leftPlayer.drawScore();
    rightPlayer.drawScore();
    checkIsGameOver();
  }

  function restartGame() {
    setTimeout(function () {
      gameArea.controller = false;
      leftPlayer.state = "idle";
      rightPlayer.state = "idle";
    }, 3000);
    //setTimeout(function () {
    //nomedaplaca.draw()
    //nextround
    //},2000)
  }
  function checkIsGameOver() {
    if (leftPlayer.lives === 0) {
      leftPlayer.state = 'defeated'
      rightPlayer.state = 'winner';
      gameArea.stop();
    } else if(rightPlayer.lives === 0){
      rightPlayer.state = 'defeated'
      leftPlayer.state = 'winner'
      gameArea.stop();
    }
  }

  // criar uma funcao para gameOver,
  // ver quem é o vencedor e redesenhar a tela
  // com um triste e outro comemorando

  class Background {
    constructor(source) {
      this.img = new Image();
      this.img.src = source;
      this.x = 0;
      this.y = 0;
    }
    draw() {
      gameArea.context.drawImage(this.img, this.x, this.y);
    }
  }
  const background = new Background("../images/bg.png");

  class Board {
    constructor(theDuel, chooseGuns, instructions, instructions2, shoot, x, y) {
      this.startBoard = new Image();
      this.startBoard.src = theDuel;
      this.gunsBoard = new Image();
      this.gunsBoard.src = chooseGuns;
      this.instructionsBoard = new Image();
      this.instructionsBoard.src = instructions;
      this.whichKey = new Image();
      this.whichKey.src = instructions2;
      this.stampShoot = new Image();
      this.stampShoot.src = shoot;
      this.x = x;
      this.y = y;
      this.state = "theDuel";
    }

    drawBoards() {
      if (this.state === "theDuel") {
        gameArea.context.drawImage(this.startBoard, this.x, this.y);
      } else if (this.state === "chooseGuns") {
        gameArea.context.drawImage(this.gunsBoard, this.x, this.y);
      } else if (this.state === "instructions") {
        gameArea.context.drawImage(this.instructionsBoard, this.x, this.y);
      } else {
        gameArea.context.drawImage(this.whichKey, this.x, this.y);
      }
    }
  }
  const board = new Board(
    "../images/the-duel.png",
    "../images/choose-guns.png",
    "../images/instructions.png",
    "../images/instructions2.png",
    "../images/shoot-stamp.png",
    225,
    43
  );

  document.addEventListener("click", () => {
    if (board.state === "theDuel"){
        preGame();   
        board.state = 'instructions'
       } else if (board.state === 'instructions'){
        preGame();
        board.state = 'instructions2'
      } else if (board.state === 'instructions2'){
        preGame();
        board.state = 'start duel'
      } else if( board.state === 'start duel'){
        board.state = '';
        gameArea.startDuel();
      }
      
  });

  class Player {
    constructor(idle, shooting, loose, winner, defeated, x, y) {
      this.imgIdle = new Image();
      this.imgIdle.src = idle;
      this.imgShooting = new Image();
      this.imgShooting.src = shooting;
      this.imgLoose = new Image();
      this.imgLoose.src = loose;
      this.imgWinner = new Image();
      this.imgWinner.src = winner;
      this.imgDefeated = new Image();
      this.imgDefeated.src = defeated;
      this.x = x;
      this.y = y;
      this.lives = 3;
      this.state = "idle";
      this.fullLife = new Image();
      this.fullLife.src = "../images/left-three.png";
      this.halflife = new Image();
      this.halflife.src = "../images/left-two.png";
      this.lifeleft = new Image();
      this.lifeleft.src = "../images/left-one.png";
      this.nolife = new Image();
      this.nolife.src = "../images/left-zero.png";
    }

    draw() {
      if (this.state === "idle") {
        gameArea.context.drawImage(
          this.imgIdle,
          this.x,
          this.y - this.imgIdle.height
        );

      } else if (this.state === "shooting") {
        gameArea.context.drawImage(
          this.imgShooting,
          this.x,
          this.y - this.imgShooting.height
        );

      } else if (this.state === "loose") {
        gameArea.context.drawImage(
          this.imgLoose,
          this.x,
          this.y - this.imgLoose.height
        );
      
      } else if (this.state === "winner") {
        gameArea.context.drawImage(
          this.imgWinner,
          this.x,
          this.y - this.imgWinner.height
        );  

      }  else {
          gameArea.context.drawImage(
            this.imgDefeated,
            this.x,
            this.y - this.imgDefeated.height
          );
        }  
    }

    drawScore() {
      if (this.lives === 3) {
        gameArea.context.drawImage(this.fullLife, this.x + 20, this.y + 15);
      } else if (this.lives === 2) {
        gameArea.context.drawImage(this.halflife, this.x + 20, this.y + 15);
      } else if (this.lives === 1) {
        gameArea.context.drawImage(this.lifeleft, this.x + 20, this.y + 15);
      } else if (this.lives === 0) {
        gameArea.context.drawImage(this.nolife, this.x + 20, this.y + 15);
      }
    }
  }
  const leftPlayer = new Player(
    "../images/idle-left.png",
    "../images/shooting-left.png",
    "../images/lost-left.png",
    "../images/winner-left.png",
    "../images/defeated-left.png",
    47,
    521
  );
  const rightPlayer = new Player(
    "../images/idle-right.png",
    "../images/shooting-right.png",
    "../images/lost-right.png",
    "../images/winner-right.png",
    "../images/defeated-right.png",
    590,
    521
  );

  document.addEventListener("keydown", (e) => {
    //left player
    if (e.keyCode === 65 && !gameArea.controller) {
      gameArea.controller = true;
      leftPlayer.state = "shooting";
      rightPlayer.state = "loose";
      rightPlayer.lives -= 1;
      restartGame();
    }
    // right player
    if (e.keyCode === 76 && !gameArea.controller) {
      gameArea.controller = true;
      rightPlayer.state = "shooting";
      leftPlayer.state = "loose";
      leftPlayer.lives -= 1;
      restartGame();
    }
  });
};
