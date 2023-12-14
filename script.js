let inputDirn={x:0, y:0};
let foodSound=new Audio('./music/food.mp3');
let GameOver=new Audio('./music/gameover.mp3');
let move=new Audio('./music/move.mp3');
let speed=4;
let score=0;
let highScore = 0;
let lastPaintTime=0;
let board=document.getElementById("board");
let snakeArr=[
    {x:11, y:11}
];

let scoreBox = document.getElementById("scoreBox");
let HiscoreBox = document.getElementById("HIscoreBox");

food={x:6, y:7};
 
function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime)
    if((ctime-lastPaintTime)/1000<1/speed)
    {
        return;
    }
    lastPaintTime=ctime;
    gameEngine();
}

function isCollide(Sarr)
{
    const head = snakeArr[0];
    for (let i = 1; i < snakeArr.length; i++) {
        if (head.x === snakeArr[i].x && head.y === snakeArr[i].y) {
            return true; // Snake has collided with itself
        } 
    }
    if(head.x<0 || head.x>=18 || head.y<0 || head.y>=18)
    {
        return true;
    }
    return false;
}

function gameEngine(){ 

    //Updating the snake and food
    if(isCollide(snakeArr))
    {
        GameOver.play();
        inputDirn={x:0, y:0};
        alert("Press any Key to start Game Again  !!");
        snakeArr=[{x:11, y:11}];
        score=0;
    }

    //If snake has eaten the food - Increment the score and regenerate the food
    if(snakeArr[0].y===food.y && snakeArr[0].x===food.x)
    {
        foodSound.play();
        score+=1;
        scoreBox.innerHTML="Score: "+score;
        if (score > highScore) {
            highScore = score;
            HiscoreBox.innerHTML = "High Score: " + highScore;
        }
        snakeArr.unshift({x:snakeArr[0].x+inputDirn.x, y:snakeArr[0].y+inputDirn.y});
        let a=2;
        let b=16;
        food={x:Math.round(a+(b-a)*Math.random()), y:Math.round(a+(b-a)*Math.random())}; 
    }

    //Moving snake
    for(let i=snakeArr.length-2;i>=0;i--)
    {
        snakeArr[i+1]={...snakeArr[i]};
    }
    snakeArr[0].x +=inputDirn.x;
    snakeArr[0].y +=inputDirn.y;

    //Displaying snake
    board.innerHTML="";
    snakeArr.forEach((e, index)=>{
        let snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        
        if(index===0)
        {
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);

        //Displaying the food
        let foodElement=document.createElement('div');
        foodElement.style.gridRowStart=food.y;
        foodElement.style.gridColumnStart=food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);
    })

}



//Main Logic
window.requestAnimationFrame(main);
window.addEventListener('keydown', (e)=>{
    inputDirn={x:0, y:1};
    move.play();
    switch(e.key)
    {
        case "ArrowUp":
        console.log("ArrowUp");
        inputDirn.x=0;
        inputDirn.y=-1;
        break;

        case "ArrowDown":
        console.log("ArrowDown");
        inputDirn.x=0;
        inputDirn.y=1;
        break;

        case "ArrowLeft":
        console.log("ArrowLeft");
        inputDirn.x=-1;
        inputDirn.y=0;
        break;

        case "ArrowRight":
        console.log("ArrowRight");
        inputDirn.x=1;
        inputDirn.y=0;
        break;

        default:
            break;
    }
})
