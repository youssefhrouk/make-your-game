import { boxBCR,gameDiv } from "./index.js";
import { gameRunning } from "./index.js";

const enemyDiv = document.querySelector(".enemies");
let enemyDirection;

window.addEventListener('focus', () => {
    windowFocused = true;
});

window.addEventListener('blur', () => {
    windowFocused = false;
});
let enemyX , enemyY;
export function createEnemies(enemyCount) {
    enemyDirection = 1;
    enemyX = boxBCR.width / 2 - 200;
    enemyY = 0;
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
    if (gameRunning) {
        console.log("here");
        
            enemyDirection *= -1;
            enemyY += 20;
        
        enemyX += enemyDirection;
    }
    enemyDiv.style.transform = `translate(${enemyX}px, ${enemyY}px)`
}
