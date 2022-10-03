let indexes = [];
let shipsIndexes = [];
let boardItem = document.querySelectorAll('.board-item');
let randomBtn = document.querySelector('.random');
let arrOfIndexes = [];
let fillArray = () => {
    for (let i = 0; i < 100; i++){
        arrOfIndexes.push(i);
    }
    return arrOfIndexes;
}
fillArray();
randomNum = () => {
    return Math.floor(Math.random() * 99);
}
class Ship{
    constructor(height, width) {
        this.height = height; 
        this.width = width;
    }
    

    randomDim() {
        let randomIndex = Math.floor(Math.random() * arrOfIndexes.length);
        let index = arrOfIndexes[randomIndex];

        // this condition checks if (the height of the ship is greater than 99 || all the divs of a single ship is in the same line 
        if (99 < index + (this.height * 10) ||
            Math.floor((index) / 10) !== Math.floor((index+ this.width) / 10) ||
            shipsIndexes.includes(index) ||
            shipsIndexes.includes(index + (10 * this.height)) || 
            shipsIndexes.includes(index + this.width)) {
            randomIndex = Math.floor(Math.random() * arrOfIndexes.length);
            index = arrOfIndexes[randomIndex];
            this.randomDim();
        } else {
            for (let i = 0; i < this.width; i++) {
                shipsIndexes.push(index + i);
                arrOfIndexes.splice(index + i, 1);
                for (let j = 1; j < this.height; j++) {
                    shipsIndexes.push((index + i) + (10 * j));
                    arrOfIndexes.splice(index + i + (10 * j), 1);
                }
            }
        }
    }

   
    drawShip() {
        console.log("New ship is drawing....");
        this.randomDim();
        // console.log('indexes', indexes);
        boardItem.forEach((el, index) => {
            if (shipsIndexes.includes(index)) {
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


function drawShips() {
    console.log("hi");
    shipsIndexes = [];
    ship1.drawShip();
    ship2.drawShip();
    ship3.drawShip();
    ship4.drawShip();
    ship5.drawShip();
    ship6.drawShip();
    ship7.drawShip();
}

drawShips();





