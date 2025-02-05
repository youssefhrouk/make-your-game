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
let nbrLives = 3;
function addLives(){
    const lives = document.querySelector(".lives");
    lives.innerHTML = "";
    for (let i=0;i<3;i++){
        const divLive = document.createElement("img");
        divLive.src = "../images/life.png";
        divLive.style.top= '10px';
        divLive.style.left ="20px"
        divLive.style.position = "absolute";
        divLive.style.width = '30px'
        divLive.alt= "life";
        divLive.classList.add="lives";
        lives.appendChild(divLive);
    }
}
function loseLife() {
    if (nbrLives > 0) {
        nbrLives--; // Decrease the number of lives
        addLives(); // Update the DOM to reflect the change
    } else {
        console.log("Game Over! No lives left.");
    }
}
addLives();
loseLife();