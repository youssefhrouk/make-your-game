import { createShip } from "./ship.js";

export const gameDiv = document.querySelector(".game");
export let boxBCR = document.querySelector(".box").getBoundingClientRect;

export let gameRunning = false;
export const gameKaye = {
  ArrowLeft = false
}


console.log(boxBCR);

window.onload = function() {
  const startGameElement = document.getElementById('startGame');

  setInterval(() => {
      startGameElement.classList.toggle('hidden');
  }, 700);
};
window.addEventListener("load",()=>{
  createShip();

})

document.addEventListener("keydown",(e)=>{
  if(e.key=="Enter"){
    // console.log(e.key);
    
    startGame();
  }
})

function startGame(){
  console.log("bdaaa l3aaaaaaaaaaaaaaaaaab a 3chiriii");

}