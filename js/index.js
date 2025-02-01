import { createShip, moveShip, createFire } from "./ship.js";
import {  moveEnemies,createEnemies } from "./enemy.js";

export const gameDiv = document.querySelector(".game");
export let boxBCR = document.querySelector(".box").getBoundingClientRect();
const titleDiv = document.querySelector(".title");
const gameOverScreen = document.getElementById("gameOverScreen");
export let gameRunning = false;
export let gameOver = false;
export let gamePaused = false;
export const gameKeys = {
  ArrowLeft: false,
  ArrowRight: false,
  Space: false,
};
const resumeBtn = document.getElementById("resume");
const restartBtn = document.getElementById("restart");
const pauseScreen = document.getElementById("pauseScreen");

window.addEventListener('resize', () => {
  boxBCR = document.querySelector(".box").getBoundingClientRect();
  checkScreen();
});
const isSmallScreen = document.querySelector(".isSmallScreen")
let gamePausedByChecker = false;

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
});

restartBtn.addEventListener("click", () => {
  pauseScreen.close();
  gamePaused = false;
  startGame();
});

let lastShotTime = 0; // Track last shot time
const shotCooldown = 1000; // 1 second (1000 milliseconds)

window.addEventListener("load", () => {
  createShip();
  createEnemies(32);
  const startGameBtn = document.getElementById("startGame");

  setInterval(() => {
    startGameBtn.classList.toggle("hidden");
  }, 700);
});

// Event listener for keydown actions
document.addEventListener("keydown", (e) => {
  if (e.code === "ArrowLeft") gameKeys["ArrowLeft"] = true;
  if (e.code === "ArrowRight") gameKeys["ArrowRight"] = true;

  const currentTime = Date.now();

  if ((e.code === "Space" || e.key === " ") && !gameKeys["Space"]) {
    if (gameRunning && currentTime - lastShotTime >= shotCooldown) {
      gameKeys["Space"] = true;
      lastShotTime = currentTime; 
      createFire();
    }

    if (!gameRunning) {
      titleDiv.remove();
      gameDiv.removeAttribute("hidden");
      gameRunning = true;
    }
  }

  // Pause and unpause game on Escape key
  if (e.code === "Escape") {
    if (gameRunning && !gamePaused) {
      pauseScreen.show();
      gamePaused = true;
    } else if (gamePaused) {
      pauseScreen.close();
      gamePaused = false;
      startGame();
    }
  }
});

// Event listener for keyup actions
document.addEventListener("keyup", (e) => {
  if (e.code === "ArrowLeft") gameKeys["ArrowLeft"] = false;
  if (e.code === "ArrowRight") gameKeys["ArrowRight"] = false;
  if (e.code === "Space" || e.key === " ") {
    gameKeys["Space"] = false; // Reset space key on release
  }
});

// Main game loop
function startGame() {
  if (!gamePaused && !gameOver) {
    moveShip();
    moveEnemies();
    requestAnimationFrame(startGame); // Loop the game
  }
}

export function gameLost() {
  gameRunning = false;
  gameOver = true;
  gameOverScreen.show(); // Show game over screen
}

startGame();
