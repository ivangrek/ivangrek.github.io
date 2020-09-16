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

enum PieceType {
    I = "I",
    L = "L",
    J = "J",
    S = "S",
    Z = "Z",
    O = "O",
    T = "T"
}

var pieceTypes: Map<number, PieceType> = new Map<number, PieceType>([
    [ 0, PieceType.I ],
    [ 1, PieceType.L ],
    [ 2, PieceType.J ],
    [ 3, PieceType.S ],
    [ 4, PieceType.Z ],
    [ 5, PieceType.O ],
    [ 6, PieceType.T ]
]);

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    
    return Math.floor(Math.random() * (max - min) + min); // [min, max)
  }

let $glassCells:NodeListOf<Element>;
let $nextCells:NodeListOf<Element>;
let $score: Element;
let $state: Element;

function clear() {
    $glassCells.forEach(cell => {
        cell.classList.remove("active");
    });
}

function clearNext() {
    $nextCells.forEach(cell => {
        cell.classList.remove("active");
    });
}

function drawSymbol(symbol, start:Point, display) {
    let cells = $glassCells;
    let size = 10;

    if(display === 1) {
        cells = $nextCells;
        size = 4;
    }
    
    const symbolMeta = symbols[symbol];

    for (let y = 0; y < symbolMeta.length; ++y) {
        for (let x = 0; x < symbolMeta[y].length; ++x) {
            const cell = cells[x + start.x + (y + start.y) * size];

            if(symbolMeta[y][x] === 1 && cell) {
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
    const minutesDigits = time.minutes.split("");
    
    drawSymbol(hoursDigits[0], new Point(1 , 2), 0);
    drawSymbol(hoursDigits[1], new Point(6 , 2), 0);
    drawSymbol(minutesDigits[0], new Point(1 , 13), 0);
    drawSymbol(minutesDigits[1], new Point(6 , 13), 0);
}

function drawClock(): Promise<any> {
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

function drawСountdown(): Promise<any> {
    let counter = 9;

    return new Promise((resolve, reject) => {
        const process = setInterval(function() {
            clear();
            drawSymbol("0", new Point(1 , 5), 0);
            drawSymbol(counter.toString(), new Point(6 , 5), 0);
            
            if(counter === 0) {
                clearInterval(process);
                resolve();
            }
            
            --counter;
        }, 300);
    });
}

function drawPieces(): Promise<any> {
    let counter = 6;

    return new Promise((resolve, reject) => {
        const process = setInterval(function() {
            clearNext();
            drawSymbol(pieceTypes.get(counter), new Point(0 , 0), 1);
            
            if(counter === 0) {
                clearInterval(process);
                resolve();
            }
            
            --counter;
        }, 300);
    });
}

function drawDots() {
    drawSymbol(".", new Point(2 , 9), 0);
    drawSymbol(".", new Point(6 , 9), 0);
}

function drawScore(value: number) {
    $score.textContent = value.toString();
}

function drawState(play: boolean) {
    $state.textContent = play ? "No" : "Yes";
}

function start() {
    Input.initialize();
    Display.initialize();
    Time.initialize();

    const game = new Game();

    game.start();
    
    let now: number = performance.now();
    
    function frame(time: number) {
        requestAnimationFrame(frame);

        const delta = Math.min(1000, time - now);

        game.update(delta);
        game.draw();

        now = time;
    }

    frame(now);
}

document.addEventListener("DOMContentLoaded", function() {
    $glassCells = document.querySelectorAll(".glass .cell");
    $nextCells = document.querySelectorAll(".next .cell");
    $score = document.querySelector(".score .value");
    $state= document.querySelector(".state .value");
    
    Promise.all([
        drawСountdown(),
        drawPieces()
    ])
        .then(start);
});

enum Key {
    Up,
    Down,
    Left,
    Right
}

class Input {
    private static keys: Map<Key, boolean> = new Map<Key, boolean>([
        [Key.Up, false],
        [Key.Down, false],
        [Key.Left, false],
        [Key.Right, false]
    ]);

    static initialize() {
        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e));
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e));
    }

    public static getKey(key:Key) {
        return this.keys.get(key);
    }

    private static onKeyDown(e: KeyboardEvent) {
        switch(e.code)
        {
            case "KeyW":
                this.keys.set(Key.Up, true);
                break;
            case "KeyS":
                this.keys.set(Key.Down, true);
                break;
            case "KeyA":
                this.keys.set(Key.Left, true);
                break;
            case "KeyD":
                this.keys.set(Key.Right, true);
                break;
            default:
                break;
        }
    }

    private static onKeyUp(e: KeyboardEvent) {
        switch(e.code)
        {
            case "KeyW":
                this.keys.set(Key.Up, false);
                break;
            case "KeyS":
                this.keys.set(Key.Down, false);
                break;
            case "KeyA":
                this.keys.set(Key.Left, false);
                break;
            case "KeyD":
                this.keys.set(Key.Right, false);
                break;
            default:
                break;
        }
    }
}

class Display {
    public static width: number;
    public static height: number;

    static initialize() {
        this.width = 10;
        this.height = 20;
    }
}

class Time {
    public static deltaTime: number;

    static initialize() {
        this.deltaTime = 0;
    }
}

class Point {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
} 

class Piece {
    public type: PieceType;
    public position: Point;

    constructor(type: PieceType, position: Point) {
        this.type = type;
        this.position = position;
    }

    public update(delta: number) {
        if(Input.getKey(Key.Left)) {
            let collision = false;

            const symbolMeta = symbols[this.type];

            for (let y = 0; y < symbolMeta.length; ++y) {
                for (let x = 0; x < symbolMeta[y].length; ++x) {
                    if(symbolMeta[y][x] === 1 && this.position.x - 1 + x < 0) {
                        collision = true;

                        if(collision) {
                            break;
                        }
                    }
                }
                
                if(collision) {
                    break;
                }
            }     

            if(!collision) {
                this.position.x -= 1;
            }
        }

        if(Input.getKey(Key.Right)) {
            let collision = false;

            const symbolMeta = symbols[this.type];

            for (let y = 0; y < symbolMeta.length; ++y) {
                for (let x = 0; x < symbolMeta[y].length; ++x) {
                    if(symbolMeta[y][x] === 1 && this.position.x + 1 + x >= Display.width) {
                        collision = true;

                        if(collision) {
                            break;
                        }
                    }
                }
                
                if(collision) {
                    break;
                }
            }     

            if(!collision) {
                this.position.x += 1;
            }
        }

        if(Input.getKey(Key.Down)) {
            this.position.y += 1;
        }
    }

    public draw() {
        drawSymbol(this.type, this.position, 0);
    }
}

class Game {
    private startTime: number;
    private play:  boolean;
    private speed: number;
    private current: Piece;
    private next: Piece;

    private score: number;

    constructor() {
        this.startTime = 0;
        this.play = false;
        this.speed = 1000;

        this.current = new Piece(pieceTypes.get(getRandomInt(0, 7)), new Point(3, 0));
        this.next = new Piece(pieceTypes.get(getRandomInt(0, 7)), new Point(3, 0));

        this.score = 0;
    }

    public update(delta: number) {
        if(Input.getKey(Key.Up)) {
            this.play = !this.play;
        }

        if(!this.play) {
            return;
        }

        this.current.update(delta);
        //this.next.update(delta);

        this.startTime += delta;

        if(this.startTime > this.speed) {
            this.startTime -= this.speed;
            this.current.position.y += 1;
        }

        if(this.current.position.y >= Display.height) {
            this.current = this.next;
            this.next = new Piece(pieceTypes.get(getRandomInt(0, 7)), new Point(3, 0));

            this.score += getRandomInt(10, 20);
        }
    }

    public draw() {
        clear();

        this.current.draw();
        //this.next.draw();

        clearNext();
        drawSymbol(this.next.type, new Point(0, 0), 1);

        drawScore(this.score);
        drawState(this.play);
    }

    public start() {
        this.play = true;
    }
}