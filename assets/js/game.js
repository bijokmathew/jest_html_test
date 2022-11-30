let game = {
    score :0,
    turnNumber:0,
    currentGame:[],
    playerMoves:[],
    choices:["button1","button2","button3","button4"],
}

function newGame() {
    game.score =0;
    game.turnNumber=0;
    game.currentGame=[];
    game.playerMoves=[];
    for(let circle of document.getElementsByClassName("circle")) {
        if(circle.getAttribute("data-listener") === "false") {
            circle.addEventListener("click",(e)=>{
                let id = e.target.getAttribute("id");
                lightsOn(id);
                game.playerMoves.push(id);
                playerTurn();
            });
            circle.setAttribute("data-listener","true");
        }
    }
    showScore();
    addTurn();
}

function showScore() {
    document.getElementById("score").innerText = game.score;
}

function addTurn() {
    game.playerMoves=[];
    game.currentGame.push(game.choices[(Math.floor(Math.random()*4))])
    showTurn();
}

function lightsOn(button){
    document.getElementById(button).classList.add("light");
    setTimeout(()=>{
        document.getElementById(button).classList.remove("light");
    },400);
}

function showTurn() {
    game.turnNumber=0;
    let intreval = setInterval(()=>{
        lightsOn(game.currentGame[game.turnNumber]);
        game.turnNumber++;
        if (game.turnNumber >= game.currentGame.length) {
            clearInterval(intreval);
        }
    },800);
}
module.exports={game,newGame,showScore,addTurn,lightsOn,showTurn};