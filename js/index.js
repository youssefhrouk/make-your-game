// const boxEnemy = document.getElementById("boxEnemy");
// const boxShooter =document.getElementById("boxShooter");
// const gameContainer = document.getElementById("game-container");

// let enemyX = 0,enemyY = 0,enemyBulletFire;
// let enemySpeed = 2;
// let animationId;
// let position=0;
// let score =0;

// export function createEnemies(enemyCount){
//   for (let i=0;i<enemyCount;i++){
//     const enemy = document.createElement('div');
//     enemy.classList.add("enemy");
//     gameContainer.appendChild(enemy);
//     enemy.style.top = `${Math.floor(Math.random()*400)}px`;
//     enemy.style.left = `${Math.floor(Math.random()*600)}px`;
//     enemy.style.background = "red";
//     enemy.style.width = "20px";
//     enemy.style.height = "20px";
//     enemy.style.borderRadius = "50%";
  
//   }
  
// }

// function animate(timestamp){
//   enemyX += enemySpeed;
//   boxEnemy.style.left= `${enemyX}px`;
//   if (enemyX + boxEnemy.offsetWidth > gameContainer.offsetWidth || enemyX < 0) {
//     enemySpeed *= -1; // Reverse direction
//     enemyY += 20; // Move the enemy down
//     boxEnemy.style.top = `${enemyY}px`;
//   }

//   // Reset enemy position if it goes below the container
//   if (enemyY > gameContainer.offsetHeight) {
//     enemyX = 0;
//     enemyY = 0;
//     boxEnemy.style.left = `${enemyX}px`;
//     boxEnemy.style.top = `${enemyY}px`;
//   }

//   animationId = requestAnimationFrame(animate); // Continue the animation
// }
// requestAnimationFrame(animate);



// boxShooter.addEventListener("click",()=>{
  
// // const div = createDiv();
// // document.body.appendChild(div);
// })


window.onload = function() {
  // Select the element
  const startGameElement = document.getElementById('startGame');

  // Toggle visibility every 3 seconds
  setInterval(() => {
      startGameElement.classList.toggle('hidden');
  }, 700);
};