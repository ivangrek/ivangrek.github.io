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
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
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
    var cells = document.getElementsByClassName("cell");

    function clear() {
        for (const cell of cells) { 
            cell.classList.remove("active");
        } 
    }
    
    function drawSymbol(symbol, startPoint) {
        const symbolMeta = symbols[symbol];

        for (let y = 0; y < symbolMeta.length; ++y) {
            for (let x = 0; x < symbolMeta[y].length; ++x) {
                const cell = cells[x + startPoint.x + (y + startPoint.y) * 10];
                
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
        
        drawSymbol(hoursDigits[0], firstStart);

        const secondStart = { x: 6, y: 2 };
        
        drawSymbol(hoursDigits[1], secondStart);

        const minutesDigits = time.minutes.split("");
        
        const thirdStart = { x: 1, y: 13 };
        
        drawSymbol(minutesDigits[0], thirdStart);
        
        const fourthStart = { x: 6, y: 13 };
        
        drawSymbol(minutesDigits[1], fourthStart);
    }
    
    function drawDots() {
        const firstStart = { x: 2, y: 9 };
        const secondtStart = { x: 6, y: 9 };
        
        drawSymbol(".", firstStart);
        drawSymbol(".", secondtStart);
    }
   
    function drawСountdown() {
        const firstStart = { x: 1, y: 5 };
        const secondtStart = { x: 6, y: 5 };
        let counter = 9;

        return new Promise((resolve, reject) => {
            const process = setInterval(function() {
                clear();
                drawSymbol("0", firstStart);
                drawSymbol(counter.toString(), secondtStart);
                
                if(counter === 0) {
                    clearInterval(process);
                    resolve();
                }
                
                --counter;
            }, 500);
        });
    }

    function drawPieces() {
        const startPoint = { x: 3, y: 5 };
        //const random = Math.min(counter, 6);//getRandomInt(0, 7);
        let counter = 6;

        return new Promise((resolve, reject) => {
            let dots = true;

            const process = setInterval(function() {
                clear();
                drawSymbol(pieceNames[counter], startPoint);
                
                if(counter === 0) {
                    clearInterval(process);
                    resolve();
                }
                
                --counter;
            }, 500);
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

    drawСountdown()
        .then(drawPieces)
        .then(drawClock);
});