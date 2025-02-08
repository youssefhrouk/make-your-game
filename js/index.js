import { createShip, moveShip, fireBullet, moveBullet } from "./ship.js";
import {  moveEnemies,createEnemies ,resetEnemies, windowFocused, startEnemyShooting,nbrlives, bulletExists } from "./enemy.js";

export const gameDiv = document.querySelector(".game");
export let boxBCR = document.querySelector(".box").getBoundingClientRect();
const titleDiv = document.querySelector(".title");
const gameOverScreen = document.getElementById("gameOverScreen");
export let gameRunning = false;
export let gameOver = false;
export let gamePaused = false;
const isSmallScreen = document.querySelector(".isSmallScreen")
let gamePausedByChecker = false;
const tryAgainBtn = document.getElementById("tryAgain")
const resumeBtn = document.getElementById("resume");
const restartBtn = document.getElementById("restart");
const pauseScreen = document.getElementById("pauseScreen");
export const gameKeys = {
  ArrowLeft: false,
  ArrowRight: false,
  Space: false,
};

window.addEventListener('resize', () => {
  boxBCR = document.querySelector(".box").getBoundingClientRect();
  checkScreen();
});










function checkScreen(){
  if (tooSmallScreen() && gameRunning && !gamePaused && !gameOver) {
      gamePausedByChecker = true;
      gamePaused = true;
      isSmallScreen.show();
    } else if (!tooSmallScreen() && gameRunning && gamePaused && gamePausedByChecker) {
      gamePaused = false;
      isSmallScreen.close();
      runGame();
      moveBullet();
      gamePausedByChecker = false;
    }
    return;
}

function tooSmallScreen() {
  return window.innerWidth <= boxBCR.width || window.innerHeight <= boxBCR.height;
}




resumeBtn.addEventListener("click", () => {
  pauseScreen.close();
  gamePaused = false;
  startGame();
  moveBullet();
});




restartBtn.addEventListener("click", () => {
  pauseScreen.close();
  gamePaused = false;
  
  resetGame();
  startGame();

  moveBullet();
});

tryAgainBtn.addEventListener('click', ()=>{
  gameOverScreen.close();
  gameRunning = true;
  gameOver = false;
  
  resetGame();
  startGame();
  moveBullet();

})

let lastShotTime = 0; // Track last shot time
const shotCooldown = 1000; // 1 second (1000 milliseconds)

window.addEventListener("load", () => {
  createShip();
  createEnemies(32);
  startEnemyShooting();

  const startGameBtn = document.getElementById("startGame");

  setInterval(() => {
    startGameBtn.classList.toggle("hidden");
  }, 700);
});

document.addEventListener("keydown", (e) => {
  if (e.code === "ArrowLeft") gameKeys["ArrowLeft"] = true;
  if (e.code === "ArrowRight") gameKeys["ArrowRight"] = true;


  if ((e.code === "Space" || e.key === " ") && !gameKeys["Space"]) {
    if (gameRunning && !gamePaused && !bulletExists) {
      gameKeys["Space"] = true;
      checkScreen();
    }

    if (!gameRunning && !gamePaused && !gameOver) {
      titleDiv.remove();
      gameDiv.removeAttribute("hidden");
      gameRunning = true;
    }
  }
  if (e.code === 'Enter') {
    if (gameOver) {
        gameRunning = true;
        gameOver = false;
    }
}
  if (e.code === "Escape") {
    if (gameRunning && !gamePaused) {
      pauseScreen.show();
      gamePaused = true;
    } else if (gamePaused) {
      pauseScreen.close();
      gamePaused = false;
      startGame();
      moveBullet();
    }
  }
});

// Event listener for keyup actions
document.addEventListener("keyup", (e) => {
  if (e.code === "ArrowLeft") gameKeys["ArrowLeft"] = false;
  if (e.code === "ArrowRight") gameKeys["ArrowRight"] = false;
  if (e.code === "Space" || e.key === " ") {
    gameKeys["Space"] = false;
  }
});

// Main game loop
function startGame(time) {
  console.log(nbrlives);
  // if ( (nbrlives== 0) && !gameOver){
  //   pauseScreen.show();
  //   gamePaused = true;
  // }
  
  if (!gamePaused && !gameOver) {
    moveShip();
    moveEnemies();
    if (gameKeys["Space"] && time - lastShotTime > 1000){
      fireBullet()
      lastShotTime = time
    }
    requestAnimationFrame(startGame); 
  }
}

export function gameLost() {
  gameRunning = false;
  gameOver = true;
  gameOverScreen.show(); // Show game over screen
}

function resetGame(){
  gameRunning = true;
  gameOver = false;
  gamePaused = false;
  document.querySelectorAll(".fire,.enemy").forEach(el => el.remove());
  createShip();
  createEnemies(32);
  // addLives();
  lastShotTime = 0;
}


  


startGame();
