let indexes = [];
let shipsIndexes = [];
let boardItem = document.querySelectorAll('.board-item');
randomNum = () => {
    return Math.floor(Math.random() * 99);
}
class Ship{
    constructor(height, width) {
        this.height = height; 
        this.width = width;
        // this.xposition = xposition;
        // this.yposition = yposition;
    }
    

    randomDim() {
        let random = randomNum();
        console.log('Random', random);
        // console.log('indexes before', indexes);
        let index = random;
        indexes = [];
        // indexes.push(index);
        console.log(random > random + (this.height * 10) && Math.floor((random + 1) / 10) !== Math.floor((random + 1 + this.width) / 10));
        if (random > random + (this.height * 10) || Math.floor((random + 1) / 10) !== Math.floor((random + 1 + this.width) / 10 )) {
            random = randomNum();  
            indexes = [];
            this.randomDim();
        } else {
            for (let i = 1; i <= this.width; i++) {
                if (!shipsIndexes.includes(index + i)) {
                    indexes.push(index + i);
                    shipsIndexes.push(index + i);
                } else {
                    random = randomNum();  
                    indexes = [];
                    this.randomDim();
                }
                for (let j = 1; j < this.height; j++) {
                    if ((index + i) + (10 * j) < 99 && !shipsIndexes.includes((index + i) + (10 * j))){
                        indexes.push((index + i) + (10 * j));
                        shipsIndexes.push((index + i) + (10 * j));
                    } else {
                        random = randomNum();
                        indexes = [];
                        this.randomDim();

                    }
                }
            }
        }
    }

        
    drawShip() {
        this.randomDim();
        console.log('indexes', indexes);
        boardItem.forEach((el, index) => {
            if (indexes.includes(index)) {
                el.classList.add('ship');
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



ship1.drawShip();
ship2.drawShip();
ship3.drawShip();
ship4.drawShip();
ship5.drawShip();
ship6.drawShip();






