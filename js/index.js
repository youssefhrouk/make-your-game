import { createShip, moveShip } from "./ship.js";

export const gameDiv = document.querySelector(".game");
export let boxBCR = document.querySelector(".box").getBoundingClientRect;

export let gameRunning = false;
// export let gameOver = false;
// export let gamePaused = false;
export const gameKeys = {
  ArrowLeft : false,
  ArrowRight : false,
  Space : false,
}



window.onload = function() {
  const startGameElement = document.getElementById('startGame');

  setInterval(() => {
      startGameElement.classList.toggle('hidden');
  }, 700);
};

window.addEventListener("load",()=>{
  
  createShip();

})

document.addEventListener("keydown",(e)=>{
  if (e.code in gameKeys){
    gameKeys[e.code] = true;
  }
  if(e.code=="Enter"){
    if (gameRunning){

      console.log("par iciiii");
    }
    
    startGame();
  }

});

document.addEventListener("keyup",(e)=>{
  if (e.code in gameKeys){
    gameKeys[e.code] = false;
  }

  
})



function startGame(){
  if (!gameRunning){
    gameRunning = true;  

    console.log("Game started! 1111111111",gameRunning);
    
    
  }
  requestAnimationFrame(startGame);

  
  moveShip();  
}

startGame();
  // console.log("datdgh 086666666");
