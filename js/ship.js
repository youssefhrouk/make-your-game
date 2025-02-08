import { boxBCR, gameDiv, gameOver, gamePaused } from "./index.js";
import { gameRunning, gameKeys } from "./index.js";
import { enemyDestroyed } from "./enemy.js";

const ship = document.createElement("img");

export let shipX, shipY;
export let bulletExists = false;
let bulletCount = 0;
export let lives;


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

const bullet = document.createElement('div');

bullet.setAttribute('class', 'bullet');

let bulletX, bulletY;

export function fireBullet() {
    bulletExists = true;
    bulletX = shipX + 24;
    bulletY = shipY;

    bullet.style.transform = `translate(${bulletX}px, ${bulletY}px)`
    gameDiv.appendChild(bullet);

    bulletCount++;
    // if (bulletCount === 13) {
    //     createMothership();
    //     bulletCount = 0;
    // }
    moveBullet();
}

export function moveBullet() {
    if (gameOver) {
        bullet.remove();
        bulletExists = false;
        return;
    }
    if (gameRunning && !gamePaused) {
        const bulletBCR = bullet.getBoundingClientRect();
        if (bulletBCR.top < boxBCR.top || enemyDestroyed(bulletBCR) /*|| mothershipDestroyed(bulletBCR)*/) {
            bullet.remove();
            console.log('foihjfiu');

            bulletExists = false;
            return;
        }
        bulletY -= 10;
        bullet.style.transform = `translate(${bulletX}px, ${bulletY}px)`
        requestAnimationFrame(moveBullet)
    }

}

export function addLives() {
    const liveSpan = document.querySelector(".lives");
    lives = 3;
    liveSpan.innerHTML = "";
    let left = 0;
    for (let i = 0; i < lives; i++) {
        const divLive = document.createElement("img");
        divLive.src = "../images/life.png";
        divLive.style.position = "absolute";
        divLive.style.transform = `translate(${left}px, 0)`
        divLive.style.width = '30px'
        divLive.classList.add = "lives";
        left += 30
        console.log(left)
        liveSpan.appendChild(divLive);
    }
}

// function loseLife() {
//     if (nbrLives > 0) {
//         nbrLives--; // Decrease the number of lives
//         addLives(); // Update the DOM to reflect the change
//     } else {
//         console.log("Game Over! No lives left.");
//     }
// }
// addLives();
// loseLife();