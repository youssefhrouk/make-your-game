import { createShip, moveShip, fireBullet, moveBullet, bulletExists, addLives,addTime,initTimeAndScore } from "./ship.js";
import { moveEnemies, createEnemies, startEnemyShooting } from "./enemy.js";

export const gameDiv = document.querySelector(".game");
export let boxBCR = document.querySelector(".box").getBoundingClientRect();
const titleDiv = document.querySelector(".title");
const gameOverScreen = document.getElementById("gameOverScreen");
export let gameRunning = false;
export let gameOver = false;
export let gamePaused = false;
let gamePausedByChecker = false;
const isSmallScreen = document.querySelector(".isSmallScreen")
const tryAgainBtn = document.getElementById("tryAgain")
const resumeBtn = document.getElementById("resume");
const restartBtn = document.getElementById("restart");
const pauseScreen = document.getElementById("pauseScreen");
export const gameKeys = {
  ArrowLeft: false,
  ArrowRight: false,
  Space: false,
};

export const keys = []

window.addEventListener('resize', () => {
  boxBCR = document.querySelector(".box").getBoundingClientRect();
  checkScreen();
});


function checkScreen() {
  if (tooSmallScreen() && gameRunning && !gamePaused && !gameOver) {
    gamePausedByChecker = true;
    gamePaused = true;
    isSmallScreen.show();
  } else if (!tooSmallScreen() && gameRunning && gamePaused && gamePausedByChecker) {
    gamePaused = false;
    isSmallScreen.close();
    startGame();
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

tryAgainBtn.addEventListener('click', () => {
  gameOverScreen.close();
  gameRunning = true;
  gameOver = false;

  resetGame();
  startGame();
  moveBullet();

})

let lastShotTime = 0;

window.addEventListener("load", () => {
  createShip();
  createEnemies(32);
  addLives();
  startEnemyShooting();
  

  const startGameBtn = document.querySelector(".start-game");

  setInterval(() => {
    startGameBtn.classList.toggle("hidden");
  }, 700);
});

document.addEventListener("keydown", (e) => {
  if (e.code === "ArrowLeft") {
    if (!keys.includes('l')) keys.unshift("l")
  }
  if (e.code === "ArrowRight") {
    if (!keys.includes('r')) keys.unshift("r")
  }


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

document.addEventListener("keyup", (e) => {
  if (e.code === "ArrowLeft") keys.splice(keys.indexOf("l"), 1)
  if (e.code === "ArrowRight") keys.splice(keys.indexOf("r"), 1)
  if (e.code === "Space" || e.key === " ") {
    gameKeys["Space"] = false;
  }
  
});

function startGame() {

  if (!gamePaused && !gameOver) {
    moveShip();
    moveEnemies();
    if (gameKeys["Space"] && !bulletExists) {
      fireBullet()
    }
    startEnemyShooting();

    requestAnimationFrame(startGame)
  }
}

export function gameLost() {
  gameRunning = false;
  gameOver = true;
  gameOverScreen.show();
}

function resetGame() {
console.log('wash had zmar khdam olla la????????????');

  gameRunning = true;
  gameOver = false;
  gamePaused = false;
  // addScore();
  createShip();
  createEnemies(32);
  initTimeAndScore();
  addLives();
  addTime();

  lastShotTime = 0;
}

//setInterval is used to update the time every second
setInterval(addTime, 1000)

//initTimeAndScore is called on load and restart
initTimeAndScore();


startGame();