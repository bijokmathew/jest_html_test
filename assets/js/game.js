let game = {
    score: 0,
    turnNumber: 0,
    isProgress:false,
    currentGame: [],
    playerMoves: [],
    choices: ["button1", "button2", "button3", "button4"],
}

function newGame() {
    game.score = 0;
    game.isProgrees=false;
    game.turnNumber = 0;
    game.currentGame = [];
    game.playerMoves = [];
    for (let circle of document.getElementsByClassName("circle")) {
        if (circle.getAttribute("data-listener") === "false") {
            circle.addEventListener("click", (e) => {
                if (game.currentGame.length > 0)  {
                    let id = e.target.getAttribute("id");
                    lightsOn(id);
                    game.playerMoves.push(id);
                    playerTurn();
                }
            });
            circle.setAttribute("data-listener", "true");
        }
    }
    showScore();
    addTurn();
}

function showScore() {
    document.getElementById("score").innerText = game.score;
}

function addTurn() {
    game.playerMoves = [];
    game.currentGame.push(game.choices[(Math.floor(Math.random() * 4))])
    showTurn();
}

function lightsOn(button) {
    document.getElementById(button).classList.add("light");
    setTimeout(() => {
        document.getElementById(button).classList.remove("light");
    }, 400);
}

function showTurn() {
    game.isProgress = true;
    game.turnNumber = 0;
    let intreval = setInterval(() => {
        lightsOn(game.currentGame[game.turnNumber]);
        game.turnNumber++;
        if (game.turnNumber >= game.currentGame.length) {
            clearInterval(intreval);
            game.isProgress=false;
        }
    }, 800);
}

function playerTurn() {
    let i = game.playerMoves.length - 1;
    if (game.playerMoves[i] === game.currentGame[i]) {
        if (game.playerMoves.length === game.currentGame.length) {
            game.score++;
            showScore();
            addTurn();
        }
    } else {
        alert("Wrong move!");
        newGame();
    }
}
module.exports = {
    game,
    newGame,
    showScore,
    addTurn,
    lightsOn,
    showTurn,
    playerTurn
};