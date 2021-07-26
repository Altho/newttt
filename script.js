const boxes = document.querySelectorAll('.box');
console.log(boxes);
console.log('working');
let currentMove;
const playerClick = new Audio('audio/playerclick.wav')
const iaClick = new Audio('audio/iaclick.wav')
let playerTurn = true;
let board = [ "","","",
                "","","",
                "","",""
];
function newGame(){
for (let i = 0; i<boxes.length; i++) {
    const objectBox = {position: i+1,
                        ownership: 'none'}

    //board.push(objectBox);
    boxes[i].dataObject = objectBox;
    boxes[i].addEventListener("click", mainGame);

}}

function mainGame(){
    {
        console.log(this);
        console.log(this.dataObject);
        currentMove = this.dataObject;
        if(this.dataObject.ownership === 'none'){
            if(playerTurn==true){

                this.classList.remove("no-ownership");
                this.classList.add("player");
                this.dataObject.ownership='player';
                console.log(this.dataObject);
                board[this.dataObject.position-1]=1
                playerClick.play();

                playerTurn=false;
                scoreCheck()
            }
            else {

                this.classList.remove("no-ownership");
                this.classList.add("ia");
                this.dataObject.ownership='ia';
                console.log(this.dataObject);
                board[this.dataObject.position-1]=2
                iaClick.play();

                playerTurn=true;
                scoreCheck()
            }


        }

    }
}


function scoreCheck(){
    if(board[0]==1 && board[1]==1 && board[2]==1
        || board[3]==1 && board[4]==1 && board[5]==1
        || board[6]==1 && board[7]==1 && board[8]==1
        || board[0]==1 && board[3]==1 && board[6]==1
        || board[1]==1 && board[4]==1 && board[7]==1
        || board[2]==1 && board[5]==1 && board[8]==1
        || board[0]==1 && board[4]==1 && board[8]==1
        || board[2]==1 && board[4]==1 && board[6]==1
    ){

        playerTurn=true;
        board = [ "","","",
            "","","",
            "","",""
        ];
        for (let box of boxes){
            box.classList.remove("ia");
            box.classList.remove("player");
            box.classList.add("no-ownership");


        }newGame();
        alert('Player wins');

    }
    else if(board[0]==2 && board[1]==2 && board[2]==2
        || board[3]==2 && board[4]==2 && board[5]==2
        || board[6]==2 && board[7]==2 && board[8]==2
        || board[0]==2 && board[3]==2 && board[6]==2
        || board[1]==2 && board[4]==2 && board[7]==2
        || board[2]==2 && board[5]==2 && board[8]==2
        || board[0]==2 && board[4]==2 && board[8]==2
        || board[2]==2 && board[4]==2 && board[6]==2){

        playerTurn=true;
        board = [ "","","",
            "","","",
            "","",""
        ];
        for (let box of boxes){
            box.classList.remove("ia");
            box.classList.remove("player");
            box.classList.add("no-ownership");
            box.removeEventListener("click", mainGame);


        }
        newGame();
        alert('IA wins');
    }
    }


newGame();