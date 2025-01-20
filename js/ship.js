import { boxBCR,gameDiv } from "./index.js";
import { gameRunning } from "./index.js";

const ship = document.createElement("img");

export function createShip(){
 let shipX = boxBCR.width/2-25;
 let shipY = boxBCR.height-75;
 ship.src = "../images/alien.png";
 ship.setAttribute("class","ship");
 ship.width = 50;
 ship.style.transform = `translate(${shipX}px,${shipY}px)`;
 gameDiv.appendChild(ship)
}

export function moveShip(){
    if (gameRunning){
        
    }

}