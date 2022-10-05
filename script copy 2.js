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
let attackedShipIndex = null;
let originalIndex = null;
let checkSurroundedIndexes = -1;
let found = false;
// let clickable = false;


let playerArrOfIndexes = [];
let computerArrOfIndexes = [];
let playerShipsIndexes = [];
let computerShipsIndexes = [];
let playerTurn = false;


function fillArray(arr){
    for (let i = 0; i < 100; i++){
        arr.push(i);
    }
    return arr;
}

fillArray(playerArrOfIndexes);
fillArray(computerArrOfIndexes);

const randomNum = () => {
    return Math.floor(Math.random() * 99);
}

const playAudio = (path) => {
    new Audio(path ?? 'defaultPath').play()
}

function randomComputerClickIndex() {
    let random = Math.floor(Math.random() * computerArrOfIndexes.length);
    return computerArrOfIndexes[random]; 
 }


class Ship{
    constructor(height, width) {
        this.height = height; 
        this.width = width;
    }
    

    randomDimGenerator(arrayOfIndexes, shipsIndexes ){
        let randomIndex = Math.floor(Math.random() * arrayOfIndexes.length);
        let index = arrayOfIndexes[randomIndex];
        if (99 < index + (this.height * 10) ||
            Math.floor((index) / 10) !== Math.floor((index+ this.width) / 10) ||
            shipsIndexes.includes(index) ||
            shipsIndexes.includes(index + (10 * this.height)) || 
            shipsIndexes.includes(index + this.width)) {
            randomIndex = Math.floor(Math.random() * arrayOfIndexes.length);
            index = arrayOfIndexes[randomIndex];
            this.randomDimGenerator(arrayOfIndexes, shipsIndexes );
        } else {
            for (let i = 0; i < this.width; i++) {
                shipsIndexes.push(index + i);
                arrayOfIndexes.splice(index + i, 1);
                for (let j = 1; j < this.height; j++) {
                    shipsIndexes.push((index + i) + (10 * j));
                    arrayOfIndexes.splice(index + i + (10 * j), 1);
                }
            }
        }
    }
    
    drawShip() {
        console.log("New ship is drawing....");
        this.randomDimGenerator(playerArrOfIndexes, playerShipsIndexes);
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
    playerBoardItems.forEach((el) => {
        el.classList.remove('ship');
    });
    btnContainer.classList.add('hide');
    playerTurnContainer.classList.remove('hide');
    container.classList.add('flex-box');
    playerBoard.classList.remove('hide');
    computerArrOfIndexes = [];
    fillArray(computerArrOfIndexes);
    playerTurn = true;
});

drawShips();

function drawShips() {
    playerShipsIndexes = [];
    playerArrOfIndexes = [];
    fillArray(playerArrOfIndexes);


    ship1.drawShip();
    ship2.drawShip();
    ship3.drawShip();
    ship4.drawShip();
    ship5.drawShip();
    ship6.drawShip();
    ship7.drawShip();

    computerShipsIndexes = [];
    computerArrOfIndexes = [];
    fillArray(computerArrOfIndexes);
    
    ship1.randomDimGenerator(computerArrOfIndexes,computerShipsIndexes);
    ship3.randomDimGenerator(computerArrOfIndexes,computerShipsIndexes);
    ship2.randomDimGenerator(computerArrOfIndexes,computerShipsIndexes);
    ship4.randomDimGenerator(computerArrOfIndexes,computerShipsIndexes);
    ship5.randomDimGenerator(computerArrOfIndexes,computerShipsIndexes);
    ship6.randomDimGenerator(computerArrOfIndexes,computerShipsIndexes);
    ship7.randomDimGenerator(computerArrOfIndexes,computerShipsIndexes);
    
  
    console.log('player',playerShipsIndexes);
    console.log('computer',computerShipsIndexes);
}



playerBoardItems.forEach(function (item, key) {
    item.addEventListener('click', () => {
        if (playerTurn && item.innerText === "") {
                if (computerShipsIndexes.includes(key)){ 
                    computerShipsIndexes.splice(computerShipsIndexes.indexOf(key), 1);
                    item.innerText = '💥';
                    playAudio('./explosion.mp4');
                } else {
                    item.innerText = '●';
                    playerTurn = false;
                    if (!playerTurn && attackedShipIndex) {
                        surroundingIndexes();
                    } else {
                        setTimeout(() => {
                            computerClick(randomComputerClickIndex());
                        }, 1000);
                    }
                }
            }
       
    });
});


function computerClick(clickedIndex) {
    console.log(clickedIndex);
    if(!playerTurn){
    computerBoardItems.forEach(function (item, key) { 
        if (clickedIndex === key && item.innerText === "") {
            if (playerShipsIndexes.includes(clickedIndex)) {
                playerShipsIndexes.splice(playerShipsIndexes.indexOf(key), 1);
                let splicedIndex = computerArrOfIndexes.indexOf(key);
                computerArrOfIndexes.splice(splicedIndex, 1);
                console.log(computerArrOfIndexes);
                item.innerText = '💥';
                playAudio('./explosion.mp4');
                if (!originalIndex) {
                    originalIndex = clickedIndex;
                }
                attackedShipIndex = clickedIndex; // if found ship then assign the index to var
                if (attackedShipIndex !== originalIndex) {
                    found = true;
                } 
                surroundingIndexes();
            } else {
                item.innerText = '●';
                playerTurn = true;
                let splicedIndex = computerArrOfIndexes.indexOf(key);
                computerArrOfIndexes.splice(splicedIndex, 1);
                console.log(computerArrOfIndexes);

                if (attackedShipIndex && found) {
                    found = false;
                    // attackedShipIndex = originalIndex;

                } else {
                    // attackedShipIndex = null; // checkSurroundedIndexes = null;
                }
            }
        } else {
            // what will happen if the clickedIndex is not found.
        }
    });
}
    
}

function surroundingIndexes(){
      if ((originalIndex !== attackedShipIndex) && !found){
            if (checkSurroundedIndexes === 0){
                checkSurroundedIndexes = 2
                positionChecker(checkSurroundedIndexes, originalIndex);
                attackedShipIndex = originalIndex;
            } else if (checkSurroundedIndexes === 1){
                checkSurroundedIndexes = 3;
                positionChecker(checkSurroundedIndexes, originalIndex);
            } else if (checkSurroundedIndexes === 2){
                checkSurroundedIndexes = 0;
                positionChecker(checkSurroundedIndexes, originalIndex);
            } else if(checkSurroundedIndexes === 3){
                checkSurroundedIndexes = 4;
                positionChecker(checkSurroundedIndexes, originalIndex);
            }
      } else if ((originalIndex !== attackedShipIndex) && found) {
          positionChecker(checkSurroundedIndexes,attackedShipIndex);
      }else {
            checkSurroundedIndexes++;
            positionChecker(checkSurroundedIndexes, attackedShipIndex);
        }
}

// function positionChecker(position, index) {
//     if (position === 0){
//         if(index - 10 > 0 && ){
//             checkSurroundedIndexes++;
//             positionChecker(checkSurroundedIndexes, index);
//         }else if(){

//         }
        
//         else{
//             computerClick(index - 10);  
//         }
//     } else if (position === 1) {
//         if(Math.floor(index/10) !== Math.floor((index+1)/10)){
//             positionChecker(position+1, index);
//         }else{
//             computerClick(index+1);  
//         }
//     } else if (position === 2) {
//         if(index + 10 > 99){
//             positionChecker(position+1, index);
//         }else{
//             computerClick(index + 10);
//         }
//     } else if(position === 3) {
//         if(Math.floor(index/10) !== Math.floor((index-1)/10)){
//             positionChecker(position+1, index);
//         }else{
//             computerClick(index - 1);
//         }
//     } else {
//         attackedShipIndex = null;
//         originalIndex = null;
//         playerTurn = true;
//         found = false;
//         checkSurroundedIndexes = -1;
//         computerClick(randomComputerClickIndex());
//    }
// }



function positionChecker(position, index){
    let index_ ; 
    if(position ===0){
        index_ = index -10;
    }else if(position === 1){
        index_ = index +1;
    }else if (position === 2){
        index_  = index+10;
    }else if(position === 3){
        index_ = index - 1 ;
    }
    else{
        attackedShipIndex = null;
        originalIndex = null;
        playerTurn = true;
        found = false;
        checkSurroundedIndexes = -1;
        setTimeout(() => {
            computerClick(randomComputerClickIndex()); 
        }, 1000);
    }

    if(computerArrOfIndexes.includes(index_)){
        setTimeout(() => {
            computerClick(index_);
        }, 1000);
    }else{
        found = false;
        computerClick(randomComputerClickIndex());
    }
}


