
    //startGame()

    let controller = false
    document.addEventListener("keydown", (e) => {
        //left player
      if(e.keyCode === 65 && !controller) {
        controller = true;
        console.log(e.keyCode)
        rightPlayer.lives -= 1       
        // chamar a funcao do tiro
      }
        // right player
      if (e.keyCode === 76 && !controller) {
        controller = true
        leftPlayer.lives -= 1
      }
    })
    

    


