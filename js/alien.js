import { boxBCR,gameDiv } from "./index.js";

const enemyDiv = document.querySelector(".enemies");
let enemyDirection;



let enemyX =0, enemyY=0;
 export function createEnemies(enemyCount) {
    enemyDirection = 1;
    enemyDiv.style.transform = `translate(${boxBCR.width / 2 - 400}px)`;
    enemyDiv.style.width = '400px';
    for (let i = 0; i < enemyCount; i++) {
        const enemy = document.createElement('img');
        enemy.setAttribute("id", i);
        enemy.setAttribute('class', 'enemy');
        enemy.src = `../images/alien.png`;
        enemyDiv.appendChild(enemy);
    }

    console.log(enemyDiv);
    
}
