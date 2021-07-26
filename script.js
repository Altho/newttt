const boxes = document.querySelectorAll('.box');
console.log(boxes);
console.log('working');
let currentMove;
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
    boxes[i].addEventListener("click", function(){
        console.log(this);
        currentMove = this.dataObject;
        if(this.dataObject.ownership === 'none'){
            if(playerTurn==true){
                this.classList.remove("no-ownership");
                this.classList.add("player");
                this.dataObject.ownership='player';
                console.log(this.dataObject);
                board[this.dataObject.position-1]=1
                scoreCheck()
                playerTurn=false;
            }
            else {
                this.classList.remove("no-ownership");
                this.classList.add("ia");
                this.dataObject.ownership='ia';
                console.log(this.dataObject);
                board[this.dataObject.position-1]=2
                scoreCheck();
                playerTurn=true;
            }


        }

    });

}}

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
        alert('Player wins');
        playerTurn=true;
        board = [ "","","",
            "","","",
            "","",""
        ];
        for (let box of boxes){
            box.classList.remove("ia");
            box.classList.remove("player");
            box.classList.add("no-ownership");


        }
        newGame();
    }
    else if(board[0]==2 && board[1]==2 && board[2]==2
        || board[3]==2 && board[4]==2 && board[5]==2
        || board[6]==2 && board[7]==2 && board[28]==2
        || board[0]==2 && board[3]==2 && board[6]==2
        || board[1]==2 && board[4]==2 && board[7]==2
        || board[2]==2 && board[5]==2 && board[8]==2
        || board[0]==2 && board[4]==2 && board[8]==2
        || board[2]==2 && board[4]==2 && board[6]==2){
        alert('IA wins');
        playerTurn=true;
        board = [ "","","",
            "","","",
            "","",""
        ];
        for (let box of boxes){
            box.classList.remove("ia");
            box.classList.remove("player");
            box.classList.add("no-ownership");


        }
        newGame();
    }
    }


newGame();