const boxEnemy = document.getElementById("boxEnemy");
const boxShooter =document.getElementById("boxShooter");

let animationId;
let position=0;
let score =0;
/*je crée une fonction pour déplacer l'ennemi*/

// function ADDElement(elem, classs, content) {
//   let posts = document.getElementById("posts")

//   let x = document.createElement(elem)
//   x.classList.add(classs)

//   if (content != "") {
//       x.innerText = content
//   }

//   return x
// }

function createDiv(){
 const div = document.createElement('div')
 div.style.width = "100px";
 div.style.height = "50px";
 div.style.position = "absolute";
 div.style.top = `${position}px`;
 div.style.left = `${position}px`;
 div.style.background = "red";
 div.style.borderRadius = "50%";

 return div
}
function animate(timestamp){
  position += 1;
  boxEnemy.style.left= position+"px";
  if (position<1000){
  animationId=requestAnimationFrame(animate); 

  }else{
    position=0;
    boxEnemy.style.left= position+"px";
   animationId= requestAnimationFrame(animate)
  
  }
}
requestAnimationFrame(animate);



boxShooter.addEventListener("click",()=>{
  console.log("hh");
  
const div = createDiv();
document.body.appendChild(div);
})