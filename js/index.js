import { createShip, moveShip } from "./ship.js";

export const gameDiv = document.querySelector(".game");
export let boxBCR = document.querySelector(".box").getBoundingClientRect;

export let gameRunning = false;
export let gameOver = false;
export let gamePaused = false;
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
  if(e.code=="Enter" && !gameRunning){
    // console.log(e.key);
    startGame();
  }
 // Update gameKeys for movement
 if (e.code in gameKeys) {
  gameKeys[e.code] = true;
}
});



function startGame(){
  if (!gameRunning){
    gameRunning = true;    
    console.log("Game started!");

  }
  moveShip();
  requestAnimationFrame(startGame);

}

startGame();