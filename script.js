let indexes = [];
let shipsIndexes = [];
let playerBoardItems = document.querySelectorAll('.player-board-item');
let randomBtn = document.querySelector('.random');
let submitBtn = document.querySelector('.submit');
let board = document.querySelector('.board');
let btnContainer = document.querySelector('.btn-container');
let container = document.querySelector('.container');
let playerTurnContainer = document.querySelector('.player-turn-container');
let secondContainer = document.querySelector('.second-container');
let playerBoard = document.querySelector('.player_board');
let computerBoardItems = document.querySelectorAll('.computer-board-item');
let attackedShipIndex;


let playerArrOfIndexes = [];
let computerArrOfIndexes = [];
let playerShipsIndexes = [];
let computerShipsIndexes = [];
clickable = false;
let playerTurn = true;


function fillArray(arr){
    for (let i = 0; i < 100; i++){
        arr.push(i);
    }
    return arr;
}

fillArray(playerArrOfIndexes);
fillArray(computerArrOfIndexes);

randomNum = () => {
    return Math.floor(Math.random() * 99);
}
class Ship{
    constructor(height, width) {
        this.height = height; 
        this.width = width;
    }
    

    randomDim() {
        let randomIndex = Math.floor(Math.random() * playerArrOfIndexes.length);
        let index = playerArrOfIndexes[randomIndex];

        // this condition checks if (the height of the ship is greater than 99 || all the divs of a single ship is in the same line 
        if (99 < index + (this.height * 10) ||
            Math.floor((index) / 10) !== Math.floor((index+ this.width) / 10) ||
            playerShipsIndexes.includes(index) ||
            playerShipsIndexes.includes(index + (10 * this.height)) || 
            playerShipsIndexes.includes(index + this.width)) {
            randomIndex = Math.floor(Math.random() * playerArrOfIndexes.length);
            index = playerArrOfIndexes[randomIndex];
            this.randomDim();
        } else {
            for (let i = 0; i < this.width; i++) {
                playerShipsIndexes.push(index + i);
                playerArrOfIndexes.splice(index + i, 1);
                for (let j = 1; j < this.height; j++) {
                    playerShipsIndexes.push((index + i) + (10 * j));
                    playerArrOfIndexes.splice(index + i + (10 * j), 1);
                }
            }
        }
    }

    randomDimComputer() {
        let randomIndex = Math.floor(Math.random() * computerArrOfIndexes.length);
        let index = computerArrOfIndexes[randomIndex];

        // this condition checks if (the height of the ship is greater than 99 || all the divs of a single ship is in the same line 
        if (99 < index + (this.height * 10) ||
            Math.floor((index) / 10) !== Math.floor((index+ this.width) / 10) ||
            computerShipsIndexes.includes(index) ||
            computerShipsIndexes.includes(index + (10 * this.height)) || 
            computerShipsIndexes.includes(index + this.width)) {
            
            randomIndex = Math.floor(Math.random() * computerArrOfIndexes.length);
            index = computerArrOfIndexes[randomIndex];
            this.randomDimComputer();
        } else {
            for (let i = 0; i < this.width; i++) {
                computerShipsIndexes.push(index + i);
                computerArrOfIndexes.splice(index + i, 1);
                for (let j = 1; j < this.height; j++) {
                    computerShipsIndexes.push((index + i) + (10 * j));
                    computerArrOfIndexes.splice(index + i + (10 * j), 1);
                }
            }
        }
    }

   
    drawShip() {
        console.log("New ship is drawing....");
        this.randomDim();
        // console.log('indexes', indexes);
        playerBoardItems.forEach((el, index) => {
            if (playerShipsIndexes.includes(index)) {
                el.classList.add('ship');
            } else {
                el.classList.remove('ship');
            }
        });
    }
}



let ship1 = new Ship(1, 3);
let ship2 = new Ship(2, 1);
let ship3 = new Ship(1, 2);
let ship4 = new Ship(4, 1);
let ship5 = new Ship(1, 1);
let ship6 = new Ship(3, 1);
let ship7 = new Ship(1, 1);


randomBtn.addEventListener('click', drawShips);

submitBtn.addEventListener('click', () => {
    console.log(playerBoard);
    playerBoardItems.forEach((el, index) => {
        el.classList.remove('ship');
    });
    btnContainer.classList.add('hide');
    playerTurnContainer.classList.remove('hide');
  
    container.classList.add('flex-box');
    playerBoard.classList.remove('hide');
    ship1.randomDimComputer();
    ship3.randomDimComputer();
    ship2.randomDimComputer();
    ship4.randomDimComputer();
    ship5.randomDimComputer();
    ship6.randomDimComputer();
    ship7.randomDimComputer();
    clickable = true;
    computerArrOfIndexes = [];
    fillArray(computerArrOfIndexes);
    console.log('player',playerShipsIndexes);
    console.log('computer',computerShipsIndexes);
});



const playAudio = (path) => {
    new Audio(path ?? 'defaultPath').play()
}

playerBoardItems.forEach( function(el, index){
    el.addEventListener('click', () => {
        el.style.fontSize = "26px";
        if (clickable && playerTurn) {
            if (computerShipsIndexes.includes(index)) {
                let index1 = computerShipsIndexes.indexOf(index);
                computerShipsIndexes.splice(index1, 1);
                console.log('clicked!', index1);
                // console.log(computerShipsIndexes);
                el.innerText = '💥';
                playAudio('./explosion.mp4');
            } else {
                el.innerText = '●';
                el.style.color = 'white';
                clickable = false;
                playerTurn = false;
                computerClick();
            }
        }
       
    })
});

function computerClick() {
    let random= Math.floor(Math.random() * computerArrOfIndexes.length);
    let randomIndex = computerArrOfIndexes[random];
    console.log(randomIndex);
    if (!playerTurn) {
        // console.log('computer1');
        // console.log(playerBoardItems);
        computerBoardItems.forEach(function (item, index) {
            // console.log('item',item);
            if (randomIndex === index) {
                if (playerShipsIndexes.includes(randomIndex)) {
                    let index1 = playerShipsIndexes.indexOf(index);
                    playerShipsIndexes.splice(index1, 1);
                    computerArrOfIndexes.splice(index, 1);
                    console.log('explosion arr',computerArrOfIndexes);
                    item.innerText = '💥';
                    playAudio('./explosion.mp4');
                    attackedShipIndex = index;
                    computerClick();
                } else {
                    item.innerText = '●'; 
                    item.style.color = 'white';
                    computerArrOfIndexes.splice(index, 1);
                    console.log('else log',computerArrOfIndexes);
                    playerTurn = true;
                    clickable = true;

                }
            } else {
            }
        });
    }
}

function drawShips() {
    console.log("hi");
    playerShipsIndexes = [];
    ship1.drawShip();
    ship2.drawShip();
    ship3.drawShip();
    ship4.drawShip();
    ship5.drawShip();
    ship6.drawShip();
    ship7.drawShip();
}

drawShips();
