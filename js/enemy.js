import { boxBCR,gameDiv, gameOver } from "./index.js";
import { gameRunning } from "./index.js";
import { shipX,shipY } from "./ship.js";
const enemyDiv = document.querySelector(".enemies");

let enemyDirection = 1, enemyX =30 , enemyY = 50;
export let windowFocused = true;


window.addEventListener('focus', () => {
    windowFocused = true;
});

window.addEventListener('blur', () => {
    windowFocused = false;
});


export function createEnemies(enemyCount) {
 

    const enemiesPerRow = 8; 
    const enemyWidth = 45; 
    const enemyHeight = 45; 
    const gapX = 5; 
    const gapY = 5; 
    enemyX = boxBCR.width / 2 - 200;
    enemyY = 100;

    enemyDiv.style.transform = `translate(${enemyX}px, ${enemyY}px)`;
    for (let i = 0; i < enemyCount; i++) {
        const row = Math.floor(i / enemiesPerRow);
        const col = i % enemiesPerRow;

        const x = col * (enemyWidth + gapX);
        const y = row * (enemyHeight + gapY);
        
        const enemy = document.createElement('img');
        enemy.setAttribute("id", i);
        enemy.setAttribute('class', 'enemy');
        enemy.width = enemyWidth;
        enemy.style.position = 'absolute';
        enemy.style.left = `${x}px`;
        enemy.style.top = `${y}px`; 

        enemy.onload = ()=> {
            enemyDiv.appendChild(enemy);
        }
        enemy.src = `../images/enemy${Math.floor(Math.random() * 6)}.png`;
    }
}


export function moveEnemies() {
    if (gameRunning && windowFocused) {
        if (enemyTouching()) {
            enemyDirection *= -1;
            enemyY += 20;
        }
        enemyX += enemyDirection;
    }
    enemyDiv.style.transform = `translate(${enemyX}px, ${enemyY}px)`
}

function enemyTouching() {
    const enemies = document.querySelectorAll('.enemy');
    let touching = false;
    enemies.forEach((enemy) => {
        const enemyBCR = enemy.getBoundingClientRect();
        if (enemyBCR.bottom > boxBCR.bottom - 80) gameLost();
        if (enemyBCR.right >= boxBCR.right || enemyBCR.left <= boxBCR.left) touching = true;
    }) 
    return touching;
}

export function createFire(){
    const fire = document.createElement("div");
    fire.className = "fire";
    fire.style.position = "absolute";
    fire.style.left = `${shipX + 20}px`; // Adjust fire position relative to the ship
    fire.style.top = `${shipY}px`; // Start fire at the ship's top
    fire.style.width = "10px";
    fire.style.height = "20px";
    fire.style.backgroundColor = "orange";
    gameDiv.appendChild(fire);

    // Animate the fire moving upward
    animateFire(fire);
    }
    // Animate the fire moving upward
function animateFire(fire) {
    const fireInterval = setInterval(() => {
        const currentTop = parseInt(fire.style.top, 10);
        fire.style.top = `${currentTop - 5}px`; // Move fire upward

        // Remove fire when it goes off-screen
        if (currentTop < 0) {
            clearInterval(fireInterval);
            fire.remove();
        }
    }, 20);
}