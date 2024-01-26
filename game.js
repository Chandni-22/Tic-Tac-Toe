//----------Selecting the buttons
let pieces=document.querySelectorAll(".piece");
let reStart=document.querySelector("#restart");
let msgBox=document.querySelector(".msg-box")
let msg=document.querySelector("#msg")
let winnerFound=false;
var drawMsg = document.getElementById("draw-msg");

let playerO=true;
//----------Putting all the winning chances together in an array
const winningChances=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,4,6],
    [2,5,8],
    [3,4,5],
    [6,7,8]
];

//----------Restart button
const reStartGame=()=>{
    drawMsg.classList.add("hide-draw")
    count=0
    playerO=true;
    enablePiece();
    msgBox.classList.add("hide");
    RestartSound();
}

let count=0;
//----------To put values O & X on one piece
pieces.forEach((piece)=>{
    piece.addEventListener("click",()=>{
        count=count+1;
        if(count===9 && !winnerFound){
            showDraw();   
        }
        //PlayerO
        if(playerO){
            piece.innerText="O";
            playerO=false;
        }else{//PlayerX
            piece.innerText="X"
            playerO=true;   
        }
        piece.disabled=true;
        checkWinner();          
    });
});

//----------Disabling the pieces after showing winner  
const disablePiece=()=>{
    for(let piece of pieces){
        piece.disabled=true;
    }
}

//----------Enabling the pieces after restarting the game  
const enablePiece=()=>{
    for(let piece of pieces){
        piece.disabled=false;
        piece.innerText="";
    }
}

//----------Adding congratulation message
const showWinner=(winner)=>{
    drawMsg.classList.add("hide-draw");
    msg.innerText=`Congratulations, Winner is "${winner}".`;
    msgBox.classList.remove("hide");
    disablePiece();
    WinningSound1();
    WinningSound2();
}

//----------Checking winner
const checkWinner=()=>{
    winnerFound=false;
    for(let chances of winningChances){
        //----------Checking position & values
        // console.log(chances[0],chances[1],chances[2]);
        // console.log(
        //     pieces[chances[0]].innerText,
        //     pieces[chances[1]].innerText,
        //     pieces[chances[2]].innerText
        // );
        //----------Assigning & adding position & values
        let position1=pieces[chances[0]].innerText;
        let position2=pieces[chances[1]].innerText;
        let position3=pieces[chances[2]].innerText;
        //----------Deciding the winner
        if(position1!="" && position2!="" && position3!=""){
            if(position1===position2 && position2===position3){
                winnerFound=true;
                showWinner(position1)
            } 
        }
    }
}

// //----------Showing draw 
const showDraw = () => {
    drawMsg.textContent = "Opps!! It's a Draw."; 
    drawMsg.classList.remove("hide-draw");
    disablePiece();
    DrawSound()
}

//----------Calling restart button
reStart.addEventListener("click",reStartGame);

//----------Adding audios
pieces.forEach((piece) => {
    piece.addEventListener("click", function () {
        makesound();
    });
});
function makesound(){
    let audio=new Audio("pieces-click.wav");
    audio.play();
}

function WinningSound1() {
    let audio=new Audio("tada-first.mp3");
    audio.play();
}
function WinningSound2() {
    let audio=new Audio("congratulations-second.mp3")
    audio.play();
}

function RestartSound() {
    let audio = new Audio("restart-button.mp3");
    audio.play();
}

function DrawSound(){
    let audio=new Audio("Draw.mp3");
    audio.play();
}