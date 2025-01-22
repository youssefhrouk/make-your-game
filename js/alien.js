import { boxBCR,gameDiv } from "./index.js";

const Enemy = document.createElement("img");

let EnemyX, EnemyY;
export function createEnemies(){
    EnemyX = boxBCR.width/2 - 25;
    EnemyY = boxBCR.height - 75;
    Enemy.src= "../images/ship.png";
    Enemy.setAttribute("class","Enemy");
    Enemy.width = 50;
    Enemy.style.transform = `translate(${EnemyX}px,${EnemyY}px)`;
    gameDiv.appendChild(Enemy);


}