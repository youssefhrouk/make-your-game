import { boxBCR, gameLost ,gamePaused, gameOver} from "./index.js";
import { gameRunning } from "./index.js";
import {isBulletHitPlayer,addScore} from "./ship.js"
let enemyBulletFrequency = 1000;
let enemyBulletSpeed = 2; 
export let scoreMultiplier = 1;

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
    const enemyWidth = 50; 
    const enemyHeight = 40; 
    const gapX = 10;  
    const gapY = 10; 
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
    enemyFire.style.top= `${enemyFireY + enemyBulletSpeed}px`;
    document.body.appendChild(enemyFire);
    console.log(enemyBulletSpeed);
    return enemyFire;
    
}

function enemyShoot() {
    if (!windowFocused || gamePaused || !gameRunning || gameOver) return;

    const enemies = document.querySelectorAll('.enemy');
    const randomEnemy = enemies[Math.floor(Math.random() * enemies.length)];
    const enemyBCR = randomEnemy.getBoundingClientRect();

    // Create a bullet from the enemy's position
    const bullet = createEnemyBullet(enemyBCR.left + enemyBCR.width / 2, enemyBCR.top + enemyBCR.height);
    
    // Move the bullet downward
    moveEnemyBullet(bullet);
}

function moveEnemyBullet(bullet) {

    function move() {
        const bulletBCR = bullet.getBoundingClientRect();
        
        bullet.style.top = `${bulletBCR.top + 5}px`;

        if (bulletBCR.bottom < boxBCR.bottom && !isBulletHitPlayer(bulletBCR)) {
            requestAnimationFrame(move);
        } else {
            bullet.remove();
        }
    }

    requestAnimationFrame(move);
}



let lastEnemyShotTime = 0;  // Track the last time an enemy shot

export function startEnemyShooting() {
    let time = Date.now(); 
    if (gameRunning && !gamePaused && !gameOver && time - lastEnemyShotTime > enemyBulletFrequency) {
        enemyShoot();
        lastEnemyShotTime = time; // Update the last shot time
    }
}



export function enemyDestroyed(bBCR) {
    const enemies = document.querySelectorAll('.enemy');
    let hit = false;
    enemies.forEach((enemy) => {
        const eBCR = enemy.getBoundingClientRect();
        if (eBCR.top <= bBCR.top && eBCR.bottom >= bBCR.top && eBCR.left <= bBCR.left && eBCR.right >= bBCR.right) {
                enemy.remove();
                hit = true;
                addScore(enemy.id);
                if (enemies.length <= 1) {
                    addNewEnemies();
                }
        }
    })
    return hit;
}

function addNewEnemies() {
    console.log("khdama olla la ???");
    
    if (enemyBulletFrequency > 1000) enemyBulletFrequency -= 100;
    enemyBulletSpeed += 1;
    scoreMultiplier *= 2;
    
    createEnemies(32);
}