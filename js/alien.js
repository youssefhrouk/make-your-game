import { boxBCR,gameDiv } from "./index.js";

const enemyDiv = document.querySelector(".enemies");
let enemyDirection;



let enemyX, enemyY;
export function createEnemies(enemyCount){
    enemyDirection = 1;
    enemyX = boxBCR.width / 2 - 200;
    enemyY = 0;
    enemyDiv.style.transform = `translate(${boxBCR.width / 2 - 200}px)`;
    enemyDiv.style.width = '400px';

    for (let i = 0; i < enemyCount; i++){
        let x = i * 50 - Math.floor(i / 8) * 400;
        const enemy = document.createElement("img");
        enemy.setAttribute("id",i);
        enemy.setAttribute("class","enemy");
        enemy.src= "../images/alien.png";
        enemy.width = 45;
        enemy.style.transform = `translate(${enemyX}px,${enemyY}px)`;
        enemy.onload = () =>{
            enemyDiv.appendChild(enemy);
        }
    }
}