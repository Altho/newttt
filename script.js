///DOM Elements///
const boxes = document.querySelectorAll('.box');
const soundSwitch = document.querySelector('#soundToggle')
const playerFw = document.querySelector('#player-score');
const iaFw = document.querySelector('#ia-score');
let announce = document.querySelector('#announce');
const replay = document.querySelector('#replay');
const text = document.querySelector("#text")
let pScoreDisplay = document.querySelector('#p-score-counter').innerText;
///Audio///
const playerClick = new Audio('audio/playerclick.wav');
const iaClick = new Audio('audio/iaclick.wav');
const playerWinSound = new Audio('audio/success.wav');
const iaWinSound = new Audio('audio/gameover.wav');
const shuffle = new Audio('audio/shuffle.wav');
let soundToggle = true;
///logic variables///
let playerTotalMove = 0;
let iaTotalMove = 0;
let currentMove;
let playedMoves = 0;
let winningLine;
let pScore = 0;
let iaScore = 0;
let playerTurn = true;
///grids///
//Keeps track of the available spots on the gris
let indexesPossible = [0, 1, 2, 3, 4, 5, 6, 7, 8];
//Keeps track of the used spots on the grid
let filteredBoardIndexes;
//References for the win logic.
/*EXAMPLE
*   Here is the board
*   |0|1|2|
*   |3|4|5|
*   |6|7|8|
* winLines keeps track of the lines required for each line to be a winning line.
* winLines[0] for example contains [1, 2], [4, 8], [3, 6] . If box O is played, those are the 3 arrays that can make
* box 0 part of a winning line.
*
*  */
let winLines = [
    [[1, 2], [4, 8], [3, 6]],
    [[0, 2], [4, 7]],
    [[0, 1], [4, 6], [5, 8]],
    [[4, 5], [0, 6]],
    [[3, 5], [0, 8], [2, 6], [1, 7]],
    [[3, 4], [2, 8]],
    [[7, 8], [2, 4], [0, 3]],
    [[6, 8], [1, 4]],
    [[6, 7], [0, 4], [2, 5]]
];

//Keeps track of the board through the game
let board = ["", "", "",
    "", "", "",
    "", "", ""
];
// Sound on/off
soundSwitch.addEventListener('click', () => {
    soundToggle = !soundToggle;
    soundSwitch.classList.toggle('toggled-off');
})

// board is also stored into objects, intent is to add more rules in future updates
function newGame() {
    replay.style.display = "none";
    for (let i = 0; i < boxes.length; i++) {
        const objectBox = {
            position: i + 1,
            ownership: 'none'
        }

        boxes[i].dataObject = objectBox;
        boxes[i].addEventListener("click", mainGame);

    }
}

function mainGame() {
    {
//player turn
        currentMove = this.dataObject;
        if (this.dataObject.ownership === 'none') {
            if (playerTurn == true) {
                playerTotalMove++;
                this.classList.remove("no-ownership");
                this.classList.add("player");
                this.dataObject.ownership = 'player';
                console.log(this.dataObject);
                board[this.dataObject.position - 1] = 1
                playedMoves++;
                soundMixer.playerSfx();

                playerTurn = false;
                const check = scoreCheck()
                if (check != 1 && check != -1) {


                    setTimeout(function () {
                        iaPlay();
                    }, 500);
                }
                ;

            } else {


            }


        }

    }
}


function scoreCheck() {

//check is a line has been filled
    let player = board[currentMove.position - 1];
    console.log(`player:${player}`)
    for (let i = 0; i < winLines[currentMove.position - 1].length; i++) {
        console.log(`winLines[currentMove.position - 1].length:${winLines[currentMove.position - 1].length}`)
        let line = winLines[currentMove.position - 1][i];
        console.log(`line:${line}`);
        if (player === board[line[0]] && player === board[line[1]]) {
            console.log(board[line[0]]);
            //check if line has been filed by the player
            if (board[line[0]] == 1) {
                console.log('player win');
                //keeps track of the winning line and pass it to the showLine function in order to display winning line
                winningLine = line;
                winningLine.push(currentMove.position - 1);
                console.log(winningLine);
                showLine('player');
                replay.addEventListener("click", function () {
                    resetBoard();
                })
                return 1;

                //if a line has been filed and it wasn't by the player then IA wins
            } else if (board[line[0]] == 2) {
                winningLine = line;
                winningLine.push(currentMove.position - 1);
                console.log(winningLine);
                showLine('ia');
                replay.addEventListener("click", function () {
                    resetBoard();
                })
                return -1;

            }


            ;

            //if the board has been filed but nobody filled a line that means there is a draw
        } else {
            drawCheck()
        }
        ;
    }
    return false;


}

//Show the winning line and also displays winner
function showLine(winner) {

    for (let i = 0; i < 3; i++) {

        boxes[winningLine[i]].classList.add(`${winner}-line`);

    }
    if (winner === 'player') {
        text.innerText = "YOU WIN !";
        announce.classList.add('win');
        announce.style.display = "flex";
        playerFw.classList.add('pyro');
        pScore++;
        document.querySelector('#p-score-counter').innerText = pScore;
        for (let box of boxes) {
            box.removeEventListener("click", mainGame);
        }
        replay.style.display = "block";

        soundMixer.victorySfx();

    } else {
        text.innerText = "YOU LOSE !";
        announce.classList.add('lose');
        announce.style.display = "flex";
        iaFw.classList.add('pyro');
        iaScore++;
        document.querySelector('#ia-score-counter').innerText = iaScore;
        for (let box of boxes) {
            box.removeEventListener("click", mainGame);
        }
        replay.style.display = "block";
        iaFw.classList.add('pyro');

        soundMixer.gameOverSfx();


    }

}

function iaPlay() {
    if (playerTotalMove < 5) {
        filter();
        iaTotalMove = iaTotalMove + 2;
        for (let i = 0; i < filteredBoardIndexes.length; i++) {
            const index = indexesPossible.indexOf(filteredBoardIndexes[i]);
            if (index > -1) {
                indexesPossible.splice(index, 1);

            }
        }
        const iaMoveSet = Math.floor(Math.random() * indexesPossible.length);
        const iaMove = indexesPossible[iaMoveSet];
        currentMove = boxes[iaMove].dataObject
        boxes[iaMove].classList.remove("no-ownership");
        boxes[iaMove].classList.add("ia");
        boxes[iaMove].dataObject.ownership = 'ia';
        board[boxes[iaMove].dataObject.position - 1] = 2
        playedMoves++;
        soundMixer.iaSfx();
        playerTurn = true;
        scoreCheck()


    }

}

//gets the indexes of the played boxes ([1,"",2,2,"",1,1,2,1] would return [0,2,3,5,6,7,8]
function filter() {
    for (let box of board) {
        filteredBoardIndexes = [...board
            .entries()]
            .filter(([_, boxValue]) => boxValue !== "")
            .map(([boxIndex]) => boxIndex);

    }
}

//Removes classes and resets variables
function resetBoard() {
    text.innerText = "";
    announce.classList.remove('draw');
    announce.classList.remove('win');
    announce.classList.remove('lose');


    announce.style.display = "none";
    playerTotalMove = 0;
    iaTotalMove = 0;
    soundMixer.shuffleSfx();
    iaFw.classList.remove('pyro');
    playerFw.classList.remove('pyro');
    winningLine = 0;
    playedMoves = 0;
    filteredBoardIndexes = [];
    currentMove = "";
    playerTurn = true;
    indexesPossible = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    board = ["", "", "",
        "", "", "",
        "", "", ""
    ];
    for (let box of boxes) {
        box.classList.remove('player-line');
        box.classList.remove('ia-line');
        box.classList.remove('player');
        box.classList.remove('ia');
        box.classList.add('no-ownership');


    }
    newGame();
}


//Sound  module
const soundMixer = (() => {


    const playerSfx = () => {
        if (soundToggle === true) {
            playerClick.play();
        }
    };
    const iaSfx = () => {
        if (soundToggle === true) {
            iaClick.play();
        }
    };
    const victorySfx = () => {
        if (soundToggle === true) {
            playerWinSound.play();
        }
    };
    const gameOverSfx = () => {
        if (soundToggle === true) {
            iaWinSound.play();
        }
    };
    const shuffleSfx = () => {
        if (soundToggle === true) {
            shuffle.play();
        }
    };
    return {playerSfx, victorySfx, iaSfx, gameOverSfx, shuffleSfx};

})();

//Check if there is a draw
function drawCheck() {

    if (playerTotalMove >= 5 && iaTotalMove >= 8) {

        text.innerText = "DRAW !";
        announce.classList.add('draw');
        announce.style.display = "flex";
        replay.style.display = "block";
        replay.addEventListener("click", function () {
            resetBoard();
        })
        return 1;


    }

}

newGame();