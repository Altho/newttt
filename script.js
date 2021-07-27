const boxes = document.querySelectorAll('.box');
console.log(boxes);
console.log('working');
let currentMove;
const playerClick = new Audio('audio/playerclick.wav')
const iaClick = new Audio('audio/iaclick.wav')
const playerWinSound = new Audio('audio/success.wav')
const iaWinSound = new Audio('audio/gameover.wav')
let winningLine;
let pScore = 0;
let iaScore = 0;
const replay = document.querySelector('#replay');
let pScoreDisplay = document.querySelector('#p-score-counter').innerText;
let iaScoreDisplay = document.querySelector('#ia-score-counter').innerText;

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

let playerTurn = true;
let board = ["", "", "",
    "", "", "",
    "", "", ""
];

function newGame() {
    for (let i = 0; i < boxes.length; i++) {
        const objectBox = {
            position: i + 1,
            ownership: 'none'
        }

        //board.push(objectBox);
        boxes[i].dataObject = objectBox;
        boxes[i].addEventListener("click", mainGame);

    }
}

function mainGame() {
    {
        console.log(this);
        console.log(this.dataObject);
        currentMove = this.dataObject;
        if (this.dataObject.ownership === 'none') {
            if (playerTurn == true) {

                this.classList.remove("no-ownership");
                this.classList.add("player");
                this.dataObject.ownership = 'player';
                console.log(this.dataObject);
                board[this.dataObject.position - 1] = 1
                playerClick.play();

                playerTurn = false;
                scoreCheck()
            } else {

                this.classList.remove("no-ownership");
                this.classList.add("ia");
                this.dataObject.ownership = 'ia';
                console.log(this.dataObject);
                board[this.dataObject.position - 1] = 2
                iaClick.play();

                playerTurn = true;
                scoreCheck()
            }


        }

    }
}


function scoreCheck() {

    let player = board[currentMove.position - 1];
    for (let i = 0; i < winLines[currentMove.position - 1].length; i++) {
        let line = winLines[currentMove.position - 1][i];
        if (player === board[line[0]] && player === board[line[1]]) {
            if (board[line[0]] == 1) {
                console.log('player win');
                console.log(line);
                winningLine = line;
                winningLine.push(currentMove.position - 1);
                console.log(winningLine);
                showLine('player');



            } else {
                console.log('ia win');
                console.log(line);
                winningLine = line;
                winningLine.push(currentMove.position - 1);
                console.log(winningLine);
                showLine('ia');

            }
            ;

            replay.addEventListener("click", function(){
                resetBoard();
            })
            //return true;
        }
    }
    return false;

}

function showLine(winner) {
    for (let i = 0; i < 3; i++) {
        console.log(boxes[winningLine[i]])

        boxes[winningLine[i]].classList.add(`${winner}-line`);

    }
    if (winner === 'player') {
        pScore++;
        console.log(pScore);
        console.log(pScoreDisplay);
        document.querySelector('#p-score-counter').innerText = pScore;
        playerWinSound.play();
    } else {
        iaScore++;
        document.querySelector('#ia-score-counter').innerText = iaScore;
        iaWinSound.play();


    }
}

function resetBoard(){

    winningLine=0;
    playerTurn=true;
    board = ["", "", "",
        "", "", "",
        "", "", ""
    ];
    for(let box of boxes){
        box.classList.remove('player-line');
        box.classList.remove('ia-line');
        box.classList.remove('player');
        box.classList.remove('ia');
        box.classList.add('no-ownership');


    }
    newGame();
}
newGame();