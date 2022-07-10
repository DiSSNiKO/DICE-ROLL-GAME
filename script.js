'use strict';

class Player {
    constructor(score, possibleScore) {
        this.score = score;
        this.possibleScore = possibleScore;
    }
}
//game prerequisite
let gameOn = true;
let player1 = new Player(0, 0);
let player2 = new Player(0, 0);
let player1turn = true;
let numberoftries = 10;

//scores and shi
const triesLeft = document.querySelector("#triesLeft");
const diceimage = document.querySelector(".diceimage"); //First html elements with the class "diceimage"
const player1posScore = document.querySelector("#player1unsavedscore");
const player2posScore = document.querySelector("#player2unsavedscore");
const player1actualScore = document.querySelector("#player1actualscore");
const player2actualScore = document.querySelector("#player2actualscore");
const winnerTitle = document.querySelector("#winnerTitle");
const triesLeftTitle = document.querySelector("#triesLefth3");
triesLeft.textContent = numberoftries;

//for the visual side
const ngbuttright = document.querySelectorAll(".rightSideNG")[0];
const ngbuttleft = document.querySelectorAll(".leftSideNG")[0];
const hbuttright = document.querySelector(".rightSideH");
const hbuttleft = document.querySelector(".leftSideH");
const rollbuttright = document.querySelectorAll(".rightSideNG")[1];
const rollbuttleft = document.querySelectorAll(".leftSideNG")[1];
const leftPlayerDiv = document.querySelector("#leftPlayerDiv");
const rightPlayerDiv = document.querySelector("#rightPlayerDiv");
const allTheVisuals = [ngbuttleft, ngbuttright, hbuttleft, hbuttright, rollbuttleft, rollbuttright, leftPlayerDiv, rightPlayerDiv];

const finalVisuals = function () {
    for (let element of allTheVisuals) {
        element.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
    }
}

const changeVisuals = function () {
    if (player1turn === true) {
        ngbuttleft.style.backgroundColor = "rgba(255, 255, 255, 0.5)"
        ngbuttright.style.backgroundColor = "rgba(230, 230, 230, 0.5)"
        rollbuttleft.style.backgroundColor = "rgba(255, 255, 255, 0.5)"
        rollbuttright.style.backgroundColor = "rgba(230, 230, 230, 0.5)"
        hbuttleft.style.backgroundColor = "rgba(255, 255, 255, 0.5)"
        hbuttright.style.backgroundColor = "rgba(230, 230, 230, 0.5)"
        leftPlayerDiv.style.backgroundColor = "rgba(255, 255, 255, 0.6)"
        rightPlayerDiv.style.backgroundColor = "rgba(230, 230, 230, 0.4)"
    } else {
        ngbuttleft.style.backgroundColor = "rgba(230, 230, 230, 0.5)"
        ngbuttright.style.backgroundColor = "rgba(255, 255, 255, 0.5)"
        rollbuttleft.style.backgroundColor = "rgba(230, 230, 230, 0.5)"
        rollbuttright.style.backgroundColor = "rgba(255, 255, 255, 0.5)"
        hbuttleft.style.backgroundColor = "rgba(230, 230, 230, 0.5)"
        hbuttright.style.backgroundColor = "rgba(255, 255, 255, 0.5)"
        leftPlayerDiv.style.backgroundColor = "rgba(230, 230, 230, 0.4)"
        rightPlayerDiv.style.backgroundColor = "rgba(255, 255, 255, 0.6)"
    }
    if (gameOn === false) {
        finalVisuals();
    }
}


//reset the number of tries and check for the win condition
const zeroTries = function () {
    numberoftries = 10;
    if (player1turn === true) {
        player1turn = false;
        player1.score += player1.possibleScore;
        player1.possibleScore = 0;
        player1posScore.textContent = player1.possibleScore;
        player1actualScore.textContent = player1.score;
        if (player1.score >= 100) {
            gameOn = false;
            triesLeft.textContent = "";
            triesLeftTitle.textContent = "PLAYER 1 NO SHOORI";
            winnerTitle.style.color = "#00FF00"
            winnerTitle.textContent = "PLAYER 1 WINS"

        }
    } else {
        player1turn = true;
        player2.score += player2.possibleScore;
        player2.possibleScore = 0;
        player2posScore.textContent = player2.possibleScore;
        player2actualScore.textContent = player2.score;
        if (player2.score >= 100) {
            gameOn = false;
            triesLeft.textContent = "";
            triesLeftTitle.textContent = "PLAYER 2 NO SHOORI";
            winnerTitle.style.color = "#00FF00"
            winnerTitle.textContent = "PLAYER 2 WINS"

        }
    }
    changeVisuals();
    triesLeft.textContent = numberoftries;
}

//roll the dice, increase the voletile score of the current player or axe it
const rollDice = function () {
    if (gameOn) {
        const diceroll = Math.floor(Math.random() * 6) + 1;
        switch (diceroll) {
            case 1:
                diceimage.src = "dice-1.png";
                break;
            case 2:
                diceimage.src = "dice-2.png";
                break;
            case 3:
                diceimage.src = "dice-3.png";
                break;
            case 4:
                diceimage.src = "dice-4.png";
                break;
            case 5:
                diceimage.src = "dice-5.png";
                break;
            case 6:
                diceimage.src = "dice-6.png";
                break;
        }
        if (player1turn) {
            if (diceroll === 1) {
                player1.possibleScore = 0;
                player1posScore.textContent = player1.possibleScore;
            } else {
                player1.possibleScore += diceroll;
                player1posScore.textContent = player1.possibleScore;
            }
        } else {
            if (diceroll === 1) {
                player2.possibleScore = 0;
                player2posScore.textContent = player2.possibleScore;
            } else {
                player2.possibleScore += diceroll;
                player2posScore.textContent = player2.possibleScore;
            }
        }
        numberoftries -= 1
        triesLeft.textContent = numberoftries;
        if (numberoftries === 0) {
            zeroTries();
        }
    }
}

//hold, add current score and change turns
const hold = function () {
    if (gameOn) {
        if (player1turn === true) {
            player1.score += player1.possibleScore;
            player1.possibleScore = 0;
            player1posScore.textContent = player1.possibleScore;
            player1turn = false;
            numberoftries = 10;
            player1actualScore.textContent = player1.score;
            if (player1.score >= 100) {
                gameOn = false;
                triesLeft.textContent = "";
                triesLeftTitle.textContent = "PLAYER 1 NO SHOORI";
                winnerTitle.style.color = "#00FF00"
                winnerTitle.textContent = "PLAYER 1 WINS"
            }
        } else {
            player2.score += player2.possibleScore;
            player2.possibleScore = 0;
            player2posScore.textContent = player2.possibleScore;
            player1turn = true;
            numberoftries = 10;
            player2actualScore.textContent = player2.score;
            if (player2.score >= 100) {
                gameOn = false;
                triesLeft.textContent = "";
                triesLeftTitle.textContent = "PLAYER 2 NO SHOORI";
                winnerTitle.style.color = "#00FF00"
                winnerTitle.textContent = "PLAYER 2 WINS"
            }
        }
    }
    changeVisuals();
}

//Reset the game to play again
const newGame = function () {
    if (gameOn === false) {
        gameOn = true;
    }
    numberoftries = 10;
    winnerTitle.style.color = "#000000"
    winnerTitle.textContent = ". . ."
    triesLeftTitle.textContent = 'Tries left ';
    triesLeft.textContent = numberoftries;
    player1.score = 0;
    player1.possibleScore = 0;
    player2.score = 0;
    player2.possibleScore = 0;
    player1posScore.textContent = 0;
    player1actualScore.textContent = 0;
    player2posScore.textContent = 0;
    player2actualScore.textContent = 0;
    player1turn = true;
    changeVisuals();
}

document.querySelector(".commitroll").addEventListener("click", function () { rollDice(); });
document.querySelector(".hbutton").addEventListener("click", function () { hold(); });
document.querySelector(".newgaem").addEventListener("click", function () { newGame(); });