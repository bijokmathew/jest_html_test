
const {game,newGame,showScore,addTurn,lightsOn,showTurn,playerTurn} = require("../js/game");

jest.spyOn(window,"alert").mockImplementation(()=>{

});

beforeAll(()=>{
    let fs = require("fs");
    let fileContent = fs.readFileSync("index.html","utf-8");
    document.open();
    document.write(fileContent);
    document.close();
});

describe("game object contains correct key",()=>{
    test("score key exist",()=>{
        expect("score" in game).toBe(true);
    });
    test("currentGame key exists",()=>{
        expect("currentGame" in game).toBe(true);
    });
    test("playerMoves key exist",()=>{
        expect("playerMoves" in game).toBe(true);
    });
    test("choices key  exist",()=>{
        expect("choices" in game).toBe(true);
    });
    test("choices contain correct ids",()=>{
        expect(game.choices).toEqual(["button1","button2","button3","button4"]);
    });
    
    test("turnNumber key exist",()=>{
        expect("turnNumber" in game).toBe(true);
    });

    test("isProgress key exist",()=>{
        expect("isProgress" in game).toBe(true);
    });
});


describe("newgame() works correctly",()=>{
    beforeAll(()=>{
        game.score =33;
        game.currentGame =["button1","button3"];
        game.playerMoves=["button4","button3"];
        document.getElementById("score").innerText ="56";
        newGame();
    });

    test("game score should set to zeor ",()=>{
        expect(game.score).toEqual(0);
    });

    test("game currentGames should have one value",()=>{
        expect(game.currentGame.length).toBe(1);
    });

    test("game playerMoves set to zero",()=>{
        expect(game.playerMoves.length).toEqual(0);
    });

    test("should display 0 for the element with id of score",()=>{
        expect(document.getElementById("score").innerText).toEqual(0)
    });

});

describe("Game play works correctly",()=>{
    beforeEach(()=>{
        game.score=0;
        game.currentGame=[];
        game.playerMoves=[];
        addTurn();
    });
    afterEach(()=>{
        game.score=0;
        game.currentGame=[];
        game.playerMoves=[];
    })
    
    test("addTurns add new turn to the game",()=>{
        addTurn();
        expect(game.currentGame.length).toBe(2);
    });

    test("should add correct class to light up buttons",()=>{
        let button = document.getElementById(game.currentGame[0]);
        lightsOn(game.currentGame[0]);
        expect(button.classList).toContain("light");
    });

    test("showTurn should update game.turnNumber",()=>{
        beforeAll(()=>{
            game.turnNumber =42;
        })
        showTurn()
        expect(game.turnNumber).toBe(0);
    });
   
    test("All circles should attached with eventlistner",()=>{
        circleList = document.getElementsByClassName("circle");
        for(circle of circleList) {
            expect(circle.getAttribute("data-listener")).toEqual("true");
        }
    })

    test("if player turns matchs computer turn then score should increase",()=>{
       game.playerMoves.push(game.currentGame[0]);
       playerTurn();
       expect(game.score).toEqual(1); 
    });

    test("if player moves wrong then display an alert",()=>{
        game.playerMoves.push("wron");
        playerTurn();
        expect(window.alert).toBeCalledWith("Wrong move!");
    });

    test("if computer turn in progress, toggle isprogress ",()=>{
        showTurn();
        expect(game.isProgress).toBe(true);
    });

    test("if computer turn in progress, disable user turn",()=>{
        showTurn();
        expect(game.playerMoves.length).toBe(0);
    });

});