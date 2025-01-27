import { boxBCR,gameDiv, gameOver } from "./index.js";
import { gameRunning } from "./index.js";
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
    enemyDiv.style.width = '400px';
    enemyDiv.style.transform = `translate(${enemyX}px, ${enemyY}px)`;

    const enemiesPerRow = 8; 
    const enemyWidth = 45; 
    const enemyHeight = 45; 
    const gapX = 10; // 
    const gapY = 10; 

    for (let i = 0; i < enemyCount; i++) {
        const row = Math.floor(i / enemiesPerRow);
        const col = i % enemiesPerRow;

        const x = col * (enemyWidth + gapX);
        const y = row * (enemyHeight + gapY);
        
        const enemy = document.createElement('img');
        enemy.setAttribute("id", i);
        enemy.setAttribute('class', 'enemy');
        enemy.src = `../images/enemy${Math.floor(Math.random() * 6)}.png`;
        enemy.width = enemyWidth;
        enemy.style.position = 'absolute';
        enemy.style.left = `${x}px`;
        enemy.style.top = `${y}px`; 
        enemyDiv.appendChild(enemy);
    }
}


export function moveEnemies() {
    if (gameRunning && windowFocused) {
        if (enemyTouching()) {
            enemyDirection *= -1;
            enemyY += 50;
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