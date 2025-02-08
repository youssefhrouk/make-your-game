import { boxBCR, gameLost } from "./index.js";
import { gameRunning } from "./index.js";
import {isBulletHitPlayer} from "./ship.js"

const enemyDiv = document.querySelector(".enemies");

let enemyDirection = 1, enemyX =30 , enemyY = 50;
export let windowFocused = true;
export let bulletExists = false;
let bulletCount = 0;


window.addEventListener('focus', () => {
    windowFocused = true;
});

window.addEventListener('blur', () => {
    windowFocused = false;
});


export function createEnemies(enemyCount) {
 

    const enemiesPerRow = 8; 
    const enemyWidth = 35; 
    const enemyHeight = 35; 
    const gapX = 15;  
    const gapY = 15; 
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
            enemyY += 40;
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

const enemyFire = document.createElement("div")

enemyFire.setAttribute('class', 'enemyFire');

function createEnemyBullet(enemyFireX,enemyFireY){
    enemyFire.style.left = `${enemyFireX}px`;
    enemyFire.style.top= `${enemyFireY}px`;
    document.body.appendChild(enemyFire);
    return enemyFire;
}

function enemyShoot() {
    const enemies = document.querySelectorAll('.enemy');
    const randomEnemy = enemies[Math.floor(Math.random() * enemies.length)];
    const enemyBCR = randomEnemy.getBoundingClientRect();

    // Create a bullet from the enemy's position
    const bullet = createEnemyBullet(enemyBCR.left + enemyBCR.width / 2, enemyBCR.top + enemyBCR.height);
    
    // Move the bullet downward
    moveEnemyBullet(bullet);
}

function moveEnemyBullet(bullet) {
    const bulletSpeed = 5;

    // Recursive function to move the bullet using requestAnimationFrame
    function move() {
        const bulletBCR = bullet.getBoundingClientRect();
        
        // Move bullet down
        bullet.style.top = `${bulletBCR.top + bulletSpeed}px`;

        // Check for collision with player or out of bounds
        if (bulletBCR.bottom < boxBCR.bottom && !isBulletHitPlayer(bulletBCR)) {
            // Continue moving the bullet
            requestAnimationFrame(move);
        } else {
            // Bullet hit the player or went out of bounds
            bullet.remove();
        }
    }

    // Start the animation
    requestAnimationFrame(move);
}




export function startEnemyShooting() {
    const shootInterval = setInterval(() => {
        if (gameRunning) {
            
            enemyShoot(); 
        }
    }, 1000);
}

// Function to reset enemies
export function resetEnemies() {
    enemyX = 40;  // Start from the left
    enemyY = 40;  // Start from the top
    enemyDirection = 1;  // Move from left to right
    enemyDiv.style.transform = `translate(${enemyX}px, ${enemyY}px)`;
}

export function enemyDestroyed(bBCR) {
    const enemies = document.querySelectorAll('.enemy');
    let hit = false;
    enemies.forEach((enemy) => {
        const eBCR = enemy.getBoundingClientRect();
        if (eBCR.top <= bBCR.top && eBCR.bottom >= bBCR.top && eBCR.left <= bBCR.left && eBCR.right >= bBCR.right) {
                enemy.remove();
                hit = true;
                // addScore(false, enemy.id);
                // if (enemies.length <= 1) {
                //     addNewEnemies();
                // }
        }
    })
    return hit;
}