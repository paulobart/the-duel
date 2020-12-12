window.onload = function () {
  document.getElementById("start-button").onclick = function () {
    startGame();
  };

  function startGame() {
    gameArea.clearButton();
    bgAudioStart();
    gameArea.start();
  }

  function preGame() {
    gameArea.clear();
    background.draw();
    board.drawBoards();
  }

  const bgAudio = new Audio();
  bgAudio.src = "./audio/bg-audio2.mp3";
  bgAudio.volume = 0.1;

  const shotSound = new Audio();
  shotSound.src = "./audio/shot.mp3";
  shotSound.volume = 0.1;

  const gameArea = {
    showtext: false,
    realGuns: false,
    restartControl: false,
    canvas: document.querySelector("#canvas"),

    start: function () {
      this.context = this.canvas.getContext("2d");
      this.canvas.width = 800;
      this.canvas.height = 600;
    },

    startDuel: function () {
      this.interval = setInterval(updateGameArea, 20);
      this.controller = false;
      this.showtext = true;
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
      setTimeout(gameOver(), 2000);
    },
  };

  function bgAudioStart() {
    bgAudio.play();
  }

  function shotSoundPlay() {
    shotSound.play();
  }

  function gameOver() {
    gameArea.clear();
    background.draw();
    text.drawText();
    leftPlayer.draw();
    rightPlayer.draw();
    gameArea.context.textAlign = "center";
    gameArea.context.fillStyle = "#705246";
    gameArea.context.font = "bold 50px CFWildWestPERSONAL-Regular";
    gameArea.context.fillText(
      "GAME OVER",
      gameArea.canvas.width / 2,
      gameArea.canvas.height / 2  
    );
    //controle passa o restartcontrol para true
  }

  function updateGameArea() {
    gameArea.clear();
    checkWhoIsWinner();
    background.draw();
    leftPlayer.draw();
    rightPlayer.draw();
    leftPlayer.drawScore();
    rightPlayer.drawScore();
    text.drawText();
  }

  function restartGame() {
    setTimeout(function () {
      leftPlayer.state = "idle";
      rightPlayer.state = "idle";
    }, 3000);
    if (leftPlayer.lives > 0 && rightPlayer.lives > 0){
      setTimeout(function () {
        console.log(gameArea.showtext)
        gameArea.showtext = true;
      }, 2000);
    }
  }

  class Text {
    constructor() {
     this.state = "ready";
    }

    drawText() {
      if (gameArea.showtext) {
        if (this.state === "ready") {
          gameArea.context.textAlign = "center";
          gameArea.context.fillStyle = "#705246";
          gameArea.context.font = "bold 60px CFWildWestPERSONAL-Regular";
          gameArea.context.fillText("Ready", gameArea.canvas.width / 2, 301);
          setTimeout(() => {
            this.state = "steady";
          }, 1500);
        } else if (this.state === "steady") {
          gameArea.context.textAlign = "center";
          gameArea.context.fillStyle = "#705246";
          gameArea.context.font = "bold 60px CFWildWestPERSONAL-Regular";
          gameArea.context.fillText("Steady", gameArea.canvas.width / 2, 331);
          setTimeout(() => {
            this.state = "go";
          }, 1500);
        } else if (this.state === "go") {
          gameArea.context.textAlign = "center";
          gameArea.context.fillStyle = "#705246";
          gameArea.context.font = "bold 60px CFWildWestPERSONAL-Regular";
          gameArea.context.fillText("Go", gameArea.canvas.width / 2, 361);
          setTimeout(() => {
            gameArea.controller = true;
            gameArea.showtext = false;
            this.state = "nextRound";
          }, 1000);
        } else if (this.state === "nextRound") {
          gameArea.context.textAlign = "center";
          gameArea.context.fillStyle = "#705246";
          gameArea.context.font = "bold 50px CFWildWestPERSONAL-Regular";
          gameArea.context.fillText("Next Round", gameArea.canvas.width / 2, 301);
          setTimeout(() => {
            this.state = "ready";
          }, 1000);
        }
      }
    }
  }
  const text = new Text();

  function checkWhoIsWinner() {
    if (leftPlayer.lives === 0) {
      leftPlayer.state = "loose";
      rightPlayer.state = "liveWinner";
      checkIsGameOver();
    } else if (rightPlayer.lives === 0) {
      rightPlayer.state = "loose";
      leftPlayer.state = "liveWinner";
      console.log(leftPlayer)
      checkIsGameOver();
    }
  }

  function checkIsGameOver() {
    setTimeout(() => {
      if (leftPlayer.state === 'loose') {
        leftPlayer.state = "rip";
        gameArea.stop();
      } else if (rightPlayer.state === 'loose') {
        rightPlayer.state = "rip";
        gameArea.stop();
      }   
    }, 2000);
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
  const background = new Background("./images/bg.png");

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
    "./images/the-duel.png",
    "./images/choose-guns.png",
    "./images/instructions.png",
    "./images/instructions2.png",
    "./images/shoot-stamp.png",
    225,
    43
  );

  document.addEventListener("click", () => {
    if (board.state === "theDuel") {
      preGame();
      board.state = "chooseGuns";
    } else if (board.state === "chooseGuns") {
      preGame();
      board.state = "instructions";
    } else if (board.state === "instructions") {
      preGame();
      board.state = "instructions2";
    } else if (board.state === "instructions2") {
      preGame();
      board.state = "start duel";
    } else if (board.state === "start duel") {
      board.state = "theDuel";
      gameArea.startDuel();
    }
    // if do restart control
    //leftPlayer.lives = 3;
    //rightPlayer.lives = 3;
    //preGame();
    // voltar para restart control para false
  });

  class Player {
    constructor(
      idle,
      shooting,
      looseOneLife,
      looseTwoLife,
      crying,
      winner,
      defeated,
      realIdle,
      realShot,
      hatshot,
      shouldershot,
      realWinnerLive,
      deadshot,
      rip,
      x,
      y
    ) {
      this.imgIdle = new Image();
      this.imgIdle.src = idle;
      this.imgShooting = new Image();
      this.imgShooting.src = shooting;
      this.imgLooseOneLife = new Image();
      this.imgLooseOneLife.src = looseOneLife;
      this.imgLooseTwoLife = new Image();
      this.imgLooseTwoLife.src = looseTwoLife;      
      this.imgCrying = new Image();
      this.imgCrying.src = crying;
      this.imgWinner = new Image();
      this.imgWinner.src = winner;
      this.imgDefeated = new Image();
      this.imgDefeated.src = defeated;
      this.imgRealIdle = new Image();
      this.imgRealIdle.src = realIdle;
      this.imgRealShot = new Image();
      this.imgRealShot.src = realShot;
      this.imgHatShot = new Image();
      this.imgHatShot.src = hatshot;
      this.imgShoulderShot = new Image();
      this.imgShoulderShot.src = shouldershot;
      this.imgRealWinnerShot = new Image();
      this.imgRealWinnerShot.src = realWinnerLive;
      this.imgDeadShot = new Image();
      this.imgDeadShot.src = deadshot;
      this.imgRip = new Image();
      this.imgRip.src = rip;
      this.x = x;
      this.y = y;
      this.lives = 3;
      this.state = "idle";
      this.fullLife = new Image();
      this.fullLife.src = "./images/left-three.png";
      this.halflife = new Image();
      this.halflife.src = "./images/left-two.png";
      this.lifeleft = new Image();
      this.lifeleft.src = "./images/left-one.png";
      this.nolife = new Image();
      this.nolife.src = "./images/left-zero.png";
    }

  // armas reais 
    draw() {
      if (gameArea.realGuns){
        if (this.state === "idle") {
          gameArea.context.drawImage(this.imgRealIdle, this.x, this.y - this.imgRealIdle.height);
        
        } else if (this.state === "shooting") {
          gameArea.context.drawImage(this.imgRealShot, this.x, this.y - this.imgRealShot.height);
        
        } else if (this.state === "loose" && this.lives === 2) {
          gameArea.context.drawImage(this.imgHatShot, this.x, this.y - this.imgHatShot.height);
        
        } else if (this.state === "loose" && this.lives === 1) {
          gameArea.context.drawImage(this.imgShoulderShot, this.x, this.y - this.imgShoulderShot.height);
        
        } else if (this.state === "loose" && this.lives === 0) {
          gameArea.context.drawImage(this.imgDeadShot, this.x, this.y - this.imgDeadShot.height);
        
        } else if (this.state === "liveWinner") {
          gameArea.context.drawImage(this.imgRealWinnerShot, this.x, this.y - this.imgRealWinnerShot.height);
        
        } else if (this.state === "rip") { 
          gameArea.context.drawImage(this.imgRip, this.x, this.y - this.imgRip.height);
        }
        //armas falsas
      } else {
        if (this.state === "idle") {
          gameArea.context.drawImage(this.imgIdle, this.x, this.y - this.imgIdle.height);
        
        } else if (this.state === "shooting") {
          gameArea.context.drawImage(this.imgShooting, this.x, this.y - this.imgShooting.height);
        
        } else if (this.state === "loose" && this.lives === 2) {
          gameArea.context.drawImage(this.imgLooseOneLife, this.x, this.y - this.imgLooseOneLife.height);
          
        } else if (this.state === "loose" && this.lives === 1) {
          gameArea.context.drawImage(this.imgLooseTwoLife, this.x, this.y - this.imgLooseTwoLife.height);
        
        } else if (this.state === "loose" && this.lives === 0) {
          gameArea.context.drawImage(this.imgCrying, this.x, this.y - this.imgCrying.height);
        
        } else if (this.state === "liveWinner") {
          gameArea.context.drawImage(this.imgWinner, this.x, this.y - this.imgWinner.height);
        
        } else if (this.state === "rip"){
          gameArea.context.drawImage(this.imgDefeated, this.x, this.y - this.imgDefeated.height);
        }
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
    "./images/fake/left/idle-left.png",
    "./images/fake/left/shooting-left.png",
    "./images/fake/left/left-lost-one-life.png",
    "./images/fake/left/left-lost-two-life.png",
    "./images/fake/left/lost-left-cry.png",
    "./images/fake/left/winner-left.png",
    "./images/fake/left/defeated-left.png",
    "./images/real/left/left-real-idle.png",
    "./images/real/left/left-real-shot.png",
    "./images/real/left/left-real-hat-shot.png",
    "./images/real/left/left-real-shoulder-shot.png",
    "./images/real/left/left-real-life-shot.png",
    "./images/real/left/left-real-dead-shot.png",
    "./images/real/left/left-rip.png",
    47,
    521
  );
  const rightPlayer = new Player(
    "./images/fake/right/idle-right.png",
    "./images/fake/right/shooting-right.png",
    "./images/fake/right/right-lost-one-life.png",
    "./images/fake/right/right-lost-two-life.png",
    "./images/fake/right/lost-right-cry.png",
    "./images/fake/right/winner-right.png",
    "./images/fake/right/defeated-right.png",
    "./images/real/right/right-real-idle.png",
    "./images/real/right/right-real-shot.png",
    "./images/real/right/right-real-hat-shot.png",
    "./images/real/right/right-real-shoulder-shot.png",
    "./images/real/right/right-real-life-shot.png",
    "./images/real/right/right-real-dead-shot.png",
    "./images/real/right/right-rip.png",
    590,
    521
  );

  document.addEventListener("keydown", (e) => {
    //left player
    //e.preventDefault(); - previde que o comportamento seja o default
    if (e.keyCode === 65 && gameArea.controller) {
      gameArea.controller = false;
      shotSoundPlay();
      leftPlayer.state = "shooting";
      rightPlayer.state = "loose";
      rightPlayer.lives -= 1;
      restartGame();
    }
    // right player
    if (e.keyCode === 76 && gameArea.controller) {
      gameArea.controller = false;
      shotSoundPlay();
      rightPlayer.state = "shooting";
      leftPlayer.state = "loose";
      leftPlayer.lives -= 1;
      restartGame();
    }
        if (e.keyCode === 82) {
          gameArea.realGuns = true;
          preGame();
          board.state = "instructions2"
        }
        if (e.keyCode === 70) {
          gameArea.realGuns = false;
          preGame();
          board.state = "instructions2"
      }
  });

};
