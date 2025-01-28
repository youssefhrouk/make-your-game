import { boxBCR, gameDiv } from "./index.js";
import { gameRunning } from "./index.js";
import { shipX, shipY } from "./ship.js";

const ship = document.createElement("img");

export let shipX, shipY;
export let bulletExists = false;

export function createShip() {
    shipX = boxBCR.width / 2 - 25;
    shipY = boxBCR.height - 75;
    ship.src = "../images/ship.png";
    ship.setAttribute("class", "ship");
    ship.width = 50;
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

export function shoot() {
    if (!bulletExists) {
        bulletExists = true;
        // Logic to create and fire a bullet goes here
        setTimeout(() => {
            bulletExists = false; // Reset after cooldown
        }, 500); // Cooldown duration
    }
}
