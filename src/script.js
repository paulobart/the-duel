
    //startGame()

    let controllerLeftPlayer = false
    document.addEventListener("keydown", (e) => {
      if(e.keyCode === 65 && !controllerLeftPlayer) {
        controllerLeftPlayer = true;
        rightPlayer.lives -= 1       
    }
  });

  let controllerRightPlayer = false
    document.addEventListener("keydown", (e) => {
      if(e.keyCode === 65 && !controllerRightPlayer) {
        controllerRightPlayer = true;
        leftPlayer.lives -= 1       
    }
  });
