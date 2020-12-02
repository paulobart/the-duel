window.onload = function () {
  document.getElementById("start-button").onclick = function () {
    startGame();
  };

  function startGame() {
    gameArea.start();
    background.draw();
    gameArea.clearButton();
    leftPlayer.drawIdle();
    leftPlayer.drawScore();
    rightPlayer.drawIdle();
    rightPlayer.drawScore();
  }

  const gameArea = {
    canvas: document.querySelector("#canvas"),

    start: function () {
      this.context = this.canvas.getContext("2d");
      this.interval = setInterval(updateGameArea, 20);
      this.canvas.width = 800;
      this.canvas.height = 600;
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
  };

  function updateGameArea() {
    gameArea.clear();
    background.draw();
    leftPlayer.draw();
    rightPlayer.draw();
    leftPlayer.drawScore();
    rightPlayer.drawScore();
    //não esqueça de criar o gameOver quando lives for = 0
  }

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
  
  
  class Player {
    constructor(idle, shooting, loose, x, y) {
      this.imgIdle = new Image();
      this.imgIdle.src = idle;
      this.imgShooting = new Image();
      this.imgShooting.src = shooting;
      this.imgLoose = new Image();
      this.imgLoose.src = loose;
      this.x = x;
      this.y = y;
      this.lives = 3;
      this.state = 'idle';
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
      if (this.state === 'idle') {
        gameArea.context.drawImage(this.imgIdle, this.x, this.y - this.imgIdle.height);
      } else if (this.state === 'shooting'){
        gameArea.context.drawImage(this.imgShooting, this.x, this.y - this.imgShooting.height);
      } else {
        gameArea.context.drawImage(this.imgLoose, this.x, this.y - this.imgLoose.height);
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
    47,
    521
  );
  const rightPlayer = new Player(
    "../images/idle-right.png",
    "../images/shooting-right.png",
    "../images/lost-right.png",
    590,
    521
  );

  let controller = false;
  document.addEventListener("keydown", (e) => {
    //left player
    if (e.keyCode === 65 && !controller) {
      controller = true;
      leftPlayer.state = 'shooting';
      rightPlayer.state = 'loose';
      rightPlayer.lives -= 1;
    }
    // right player
    if (e.keyCode === 76 && !controller) {
      controller = true;
      rightPlayer.state = 'shooting';
      leftPlayer.state = 'loose';
      leftPlayer.lives -= 1;
    }
    controller = false;
  })


};
