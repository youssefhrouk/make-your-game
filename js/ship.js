import { boxBCR, gameDiv, gameOver,gamePaused } from "./index.js";
import { gameRunning,gameKeys } from "./index.js";

const ship = document.createElement("img");

export let shipX, shipY;
export let bulletExists = false;

export function createShip() {
    shipX = boxBCR.width / 2 - 25;
    shipY = boxBCR.height - 75;
    ship.src = "../images/ship.png";
    ship.setAttribute("class", "ship");
    ship.width = 40;
    ship.style.transform = `translate(${shipX}px,${shipY}px)`;
    gameDiv.appendChild(ship);
}

export function moveShip() {
    if (gameRunning) {
        if (gameKeys.ArrowLeft && shipX >= 2) shipX -= 5;
        if (gameKeys.ArrowRight && shipX < boxBCR.width - 52) shipX += 5;
    } 

    ship.style.transform = `translate(${shipX}px,${shipY}px)`;
}
const fire = document.createElement('div');
fire.setAttribute('class', 'fire');
export function createFire() {
    bulletExists = true;
    fire.style.left = `${shipX + 20}px`;
    fire.style.top = `${shipY}px`;
    gameDiv.appendChild(fire);
    animateFire(fire);
}

function animateFire(fire) {
    if (gameOver){
        fire.remove();
        bulletExists = false;
        return
    } 
    if (gameRunning && !gamePaused) {

    const fireInterval = setInterval(() => {
        const currentTop = parseInt(fire.style.top, 10);
        fire.style.top = `${currentTop - 5}px`;

        // Check for collisions with enemies
        const enemies = document.querySelectorAll('.enemy');
        enemies.forEach((enemy) => {
            const enemyBCR = enemy.getBoundingClientRect();
            const fireBCR = fire.getBoundingClientRect();
            if (
                fireBCR.left < enemyBCR.right &&
                fireBCR.right > enemyBCR.left &&
                fireBCR.top < enemyBCR.bottom &&
                fireBCR.bottom > enemyBCR.top
            ) {
                // Collision detected
                enemy.remove();
                fire.remove();
                clearInterval(fireInterval);
            }
        });

        if (currentTop < 0) {
            clearInterval(fireInterval);
            fire.remove();
        }
    }, 20);
}
}
