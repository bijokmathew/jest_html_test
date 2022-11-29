
const {game} = require("../js/game");

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
});