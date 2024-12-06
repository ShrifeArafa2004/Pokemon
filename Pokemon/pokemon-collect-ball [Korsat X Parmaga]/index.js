
const BALL_CLASS="ball", BALL_COUNT=10, GRASS_CLASS="grass", GRASS_COUNT=50;
const PLAYER_SPEED =1.8;
const sound = new Audio("assets/coin.mp3")
let PLAYER=document.querySelector('.player');
let playerPos ={
    x:0,
    y:0,
}
let playerVel ={
    x:0,
    y:0,
}
const START_PLAYER_POS ={
    x:window.innerWidth/2,
    y:window.innerHeight/2,
}
function start(){
generateRondomElements(BALL_CLASS,BALL_COUNT);
generateRondomElements(GRASS_CLASS,GRASS_COUNT);
playerPos= START_PLAYER_POS;
}
function update(){
    
    playerPos.x+=playerVel.x;
    playerPos.y+=playerVel.y;
    PLAYER.style.left=playerPos.x + "px";
    PLAYER.style.top=playerPos.y + "px";
    checkCollisions();
    requestAnimationFrame(update);
}

function generateRondomElements(className, elementCount){
    for(let i=0;i<elementCount;i++){
        const newElement=document.createElement("div");
        newElement.classList.add(className);
        newElement.style.left=Math.random()*100 +"%"
        newElement.style.top=Math.random()*100 +"%";
        document.body.appendChild(newElement)
    }
}
function checkCollisions(){
    let balls =document.querySelectorAll(".ball");
    balls.forEach((ball) => {
        if(collision(ball,PLAYER)){
            ball.style.left = Math.random() * 100 + "%";
            ball.style.top = Math.random() * 100 + "%";
            sound.play();
        }
    });
}
function collision($div1, $div2) {
    var x1 = $div1.getBoundingClientRect().left;
    var y1 = $div1.getBoundingClientRect().top;
    var h1 = $div1.clientHeight;
    var w1 = $div1.clientWidth;
    var b1 = y1 + h1;
    var r1 = x1 + w1;
  
    var x2 = $div2.getBoundingClientRect().left;
    var y2 = $div2.getBoundingClientRect().top;
    var h2 = $div2.clientHeight;
    var w2 = $div2.clientWidth;
    var b2 = y2 + h2;
    var r2 = x2 + w2;
  
    if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
    return true;
  }
  window.addEventListener("keydown",(el)=>{
    if(el.key=="ArrowUp"){
        playerVel.y=  -1*PLAYER_SPEED;
        PLAYER.style.backgroundImage="URL('assets/player_front.png')";
    }
    if(el.key=="ArrowDown"){
        playerVel.y=1*PLAYER_SPEED;
        PLAYER.style.backgroundImage="URL('assets/player_back.png')";
    }
    if(el.key=="ArrowRight"){
        playerVel.x=1*PLAYER_SPEED;
        PLAYER.style.backgroundImage="URL('assets/player_right.png')";
    }
    if(el.key=="ArrowLeft"){
        playerVel.x=-1*PLAYER_SPEED;
        PLAYER.style.backgroundImage="URL('assets/player_left.png')";
    }
    PLAYER.classList.add("walk");

  })
  window.addEventListener("keyup",(e)=>{
playerVel.x=0;
playerVel.y=0;
PLAYER.classList.remove("walk");
  })
start();
update();