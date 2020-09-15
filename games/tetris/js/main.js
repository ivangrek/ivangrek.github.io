var symbols = {
    "0": [
        [1 , 1 , 1],
        [1 , 0 , 1],
        [1 , 0 , 1],
        [1 , 0 , 1],
        [1 , 1 , 1]
    ],
    "1": [
        [0 , 1 , 0],
        [1 , 1 , 0],
        [0 , 1 , 0],
        [0 , 1 , 0],
        [1 , 1 , 1]
    ],
    "2": [
        [1 , 1 , 1],
        [0 , 0 , 1],
        [0 , 1 , 0],
        [1 , 0 , 0],
        [1 , 1 , 1]
    ],
    "3": [
        [1 , 1 , 1],
        [0 , 0 , 1],
        [0 , 1 , 1],
        [0 , 0 , 1],
        [1 , 1 , 1]
    ],
    "4": [
        [1 , 0 , 1],
        [1 , 0 , 1],
        [1 , 1 , 1],
        [0 , 0 , 1],
        [0 , 0 , 1]
    ],
    "5": [
        [1 , 1 , 1],
        [1 , 0 , 0],
        [1 , 1 , 1],
        [0 , 0 , 1],
        [1 , 1 , 1]
    ],
    "6": [
        [1 , 1 , 1],
        [1 , 0 , 0],
        [1 , 1 , 1],
        [1 , 0 , 1],
        [1 , 1 , 1]
    ],
    "7": [
        [1 , 1 , 1],
        [0 , 0 , 1],
        [0 , 1 , 0],
        [0 , 1 , 0],
        [0 , 1 , 0]
    ],
    "8": [
        [1 , 1 , 1],
        [1 , 0 , 1],
        [1 , 1 , 1],
        [1 , 0 , 1],
        [1 , 1 , 1]
    ],
    "9": [
        [1 , 1 , 1],
        [1 , 0 , 1],
        [1 , 1 , 1],
        [0 , 0 , 1],
        [1 , 1 , 1]
    ],
    ".": [
        [1 , 1 , 0],
        [1 , 1 , 0],
        [0 , 0 , 0],
        [0 , 0 , 0],
        [0 , 0 , 0]
    ],
    "I": [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0]
    ],
    "L": [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0]
    ],
    "J": [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [1, 1, 0, 0],
        [0, 0, 0, 0]
    ],
    "S": [
        [0, 1, 1, 0],
        [1, 1, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ],
    "Z": [
        [1, 1, 0, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ],
    "O": [
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0]
    ],
    "T": [
        [0, 1, 0, 0],
        [1, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]
};

var pieceNames = ["I", "L", "J", "S", "Z", "O", "T"];

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

document.addEventListener("DOMContentLoaded", function(){
    var glassCells = document.querySelectorAll(".glass .cell");
    var nextCells = document.querySelectorAll(".next .cell");

    function clear() {
        for (const cell of glassCells) { 
            cell.classList.remove("active");
        } 
    }

    function clearNext() {
        for (const cell of nextCells) { 
            cell.classList.remove("active");
        } 
    }
    
    function drawSymbol(symbol, startPoint, display) {
        let cells = glassCells;
        let size = 10;

        if(display === 1) {
            cells = nextCells;
            size = 4;
        }
        
        const symbolMeta = symbols[symbol];

        for (let y = 0; y < symbolMeta.length; ++y) {
            for (let x = 0; x < symbolMeta[y].length; ++x) {
                const cell = cells[x + startPoint.x + (y + startPoint.y) * size];
                
                if(symbolMeta[y][x] === 1) {
                    cell.classList.add("active");
                }
            }  
        }     
    }
    
    function drawTime() {
        const now = new Date();
        const time = {
            hours: (now.getHours() < 10 ? "0" : "") + now.getHours(),
            minutes: (now.getMinutes() < 10 ? "0" : "") + now.getMinutes()
        };
        
        const hoursDigits = time.hours.split("");
        
        const firstStart = { x: 1, y: 2 };
        
        drawSymbol(hoursDigits[0], firstStart, 0);

        const secondStart = { x: 6, y: 2 };
        
        drawSymbol(hoursDigits[1], secondStart, 0);

        const minutesDigits = time.minutes.split("");
        
        const thirdStart = { x: 1, y: 13 };
        
        drawSymbol(minutesDigits[0], thirdStart, 0);
        
        const fourthStart = { x: 6, y: 13 };
        
        drawSymbol(minutesDigits[1], fourthStart, 0);
    }
    
    function drawDots() {
        const firstStart = { x: 2, y: 9 };
        const secondtStart = { x: 6, y: 9 };
        
        drawSymbol(".", firstStart, 0);
        drawSymbol(".", secondtStart, 0);
    }
   
    function drawСountdown() {
        const firstStart = { x: 1, y: 5 };
        const secondtStart = { x: 6, y: 5 };
        let counter = 9;

        return new Promise((resolve, reject) => {
            const process = setInterval(function() {
                clear();
                drawSymbol("0", firstStart, 0);
                drawSymbol(counter.toString(), secondtStart, 0);
                
                if(counter === 0) {
                    clearInterval(process);
                    resolve();
                }
                
                --counter;
            }, 300);
        });
    }

    function drawPieces() {
        const startPoint = { x: 3, y: 5 };
        let counter = 6;

        return new Promise((resolve, reject) => {
            let dots = true;

            const process = setInterval(function() {
                clear();
                drawSymbol(pieceNames[counter], startPoint, 0);
                
                if(counter === 0) {
                    clearInterval(process);
                    resolve();
                }
                
                --counter;
            }, 300);
        });
    }

    function drawClock() {
        let dots = true;

        return new Promise((resolve, reject) => {
            const process = setInterval(function() {
                clear();
                drawTime();
                
                if(dots) {
                    drawDots();
                }
                
                dots = !dots;
            }, 500);
        });
    }

    function drawNext() {
        const process = setInterval(function() {
            const startPoint = { x: 0, y: 0 };
            const random = getRandomInt(0, 7);
            
            clearNext();
            drawSymbol(pieceNames[random], startPoint, 1);
        }, 1300);
    }

    drawСountdown()
        .then(drawPieces)
        .then(() => {
            drawClock();
            drawNext();
        });
});