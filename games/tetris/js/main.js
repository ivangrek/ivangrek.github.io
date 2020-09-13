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
    ]
};

var time = {
    hours: 10,
    minutes: 10,
    dot: true
};

document.addEventListener("DOMContentLoaded", function(){
    var cells = document.getElementsByClassName("cell");

    function clear() {
        for (const cell of cells) { 
            cell.classList.remove("active");
        } 
    }
    
    function drawSymbol(symbol, startPoint) {
        for (let y = 0; y < 5; ++y) {
            for (let x = 0; x < 3; ++x) {
                const cell = cells[x + startPoint.x + (y + startPoint.y) * 10];
                
                if(symbol[y][x] === 1) {
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
        
        const firstSymbol = symbols[hoursDigits[0]];
        const firstStart = { x: 1, y: 2 };
        
        drawSymbol(firstSymbol, firstStart);

        const secondSymbol = symbols[hoursDigits[1]];
        const secondStart = { x: 6, y: 2 };
        
        drawSymbol(secondSymbol, secondStart);

        const minutesDigits = time.minutes.split("");
        
        const thirdSymbol = symbols[minutesDigits[0]];
        const thirdStart = { x: 1, y: 13 };
        
        drawSymbol(thirdSymbol, thirdStart);
        
        const fourthSymbol = symbols[minutesDigits[1]];
        const fourthStart = { x: 6, y: 13 };
        
        drawSymbol(fourthSymbol, fourthStart);
    }
    
    function drawDots() {
        const dotSymbol = symbols["."];
        const firstStart = { x: 2, y: 9 };
        const secondtStart = { x: 6, y: 9 };
        
        drawSymbol(dotSymbol, firstStart);
        drawSymbol(dotSymbol, secondtStart);
    }
    
    let dots = true;

    function draw() {
        clear();
        drawTime();
        
        if(dots) {
            drawDots();
        }
        
        dots = !dots;
    }
    
    function drawСountdown(counter) {
        const firstStart = { x: 1, y: 5 };
        const secondtStart = { x: 6, y: 5 };
        const symbol = counter.toString();
            
        drawSymbol(symbols["0"], firstStart);
        drawSymbol(symbols[symbol], secondtStart);
    }
    
    let counter = 9;
    let counterInterval = setInterval(function() {
        clear();
        drawСountdown(counter);
        
        if(counter === 0) {
            clearInterval(counterInterval);
            setInterval(draw, 500);
        }
        
        --counter;
    }, 500);
});