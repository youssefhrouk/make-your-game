import { createShip, moveShip } from "./ship.js";
import { createEnemies } from "./enemy.js";

export const gameDiv = document.querySelector(".game");
export let boxBCR = document.querySelector(".box").getBoundingClientRect();
const titleDiv = document.querySelector(".title");
export let gameRunning = false;
export let gameOver = false;
export let gamePaused = false;
export const gameKeys = {
  ArrowLeft: false, 
  ArrowRight: false,
  Space: false,
}

window.addEventListener("load", () => {
  createShip();
  createEnemies(32);
  const startGame = document.getElementById("startGame");


  setInterval(() => {
    startGame.classList.toggle('hidden');
  }, 700);
  
});





document.addEventListener("keydown", (e) => {
  if (e.code === "ArrowLeft") gameKeys['ArrowLeft'] = true;
  if (e.code === "ArrowRight") gameKeys['ArrowRight'] = true;
  
  if (e.code == "Space" || e.key === " ") {
      if (gameRunning){

        gameKeys["Space"] = true;
      }
      if (!gameRunning){
        titleDiv.remove();
        gameDiv.removeAttribute('hidden');
        gameRunning = true;
      }

    
  }


});

document.addEventListener("keyup", (e) => {
  if (e.code in gameKeys) {
    gameKeys[e.code] = false;
  }
})


function startGame() {
  moveEnemies();

  moveShip();
  requestAnimationFrame(startGame);

}

startGame();