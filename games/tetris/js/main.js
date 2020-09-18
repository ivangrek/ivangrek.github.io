var symbols = {
    "0": [
        [1, 1, 1],
        [1, 0, 1],
        [1, 0, 1],
        [1, 0, 1],
        [1, 1, 1]
    ],
    "1": [
        [0, 1, 0],
        [1, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 1]
    ],
    "2": [
        [1, 1, 1],
        [0, 0, 1],
        [0, 1, 0],
        [1, 0, 0],
        [1, 1, 1]
    ],
    "3": [
        [1, 1, 1],
        [0, 0, 1],
        [0, 1, 1],
        [0, 0, 1],
        [1, 1, 1]
    ],
    "4": [
        [1, 0, 1],
        [1, 0, 1],
        [1, 1, 1],
        [0, 0, 1],
        [0, 0, 1]
    ],
    "5": [
        [1, 1, 1],
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 1],
        [1, 1, 1]
    ],
    "6": [
        [1, 1, 1],
        [1, 0, 0],
        [1, 1, 1],
        [1, 0, 1],
        [1, 1, 1]
    ],
    "7": [
        [1, 1, 1],
        [0, 0, 1],
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0]
    ],
    "8": [
        [1, 1, 1],
        [1, 0, 1],
        [1, 1, 1],
        [1, 0, 1],
        [1, 1, 1]
    ],
    "9": [
        [1, 1, 1],
        [1, 0, 1],
        [1, 1, 1],
        [0, 0, 1],
        [1, 1, 1]
    ],
    ".": [
        [1, 1, 0],
        [1, 1, 0],
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
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
var PieceType;
(function (PieceType) {
    PieceType["I"] = "I";
    PieceType["L"] = "L";
    PieceType["J"] = "J";
    PieceType["S"] = "S";
    PieceType["Z"] = "Z";
    PieceType["O"] = "O";
    PieceType["T"] = "T";
})(PieceType || (PieceType = {}));
var pieceTypes = new Map([
    [0, PieceType.I],
    [1, PieceType.L],
    [2, PieceType.J],
    [3, PieceType.S],
    [4, PieceType.Z],
    [5, PieceType.O],
    [6, PieceType.T]
]);
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // [min, max)
}
let $glassCells;
let $nextCells;
let $score;
let $state;
let $sound;
document.addEventListener("DOMContentLoaded", function () {
    $glassCells = document.querySelectorAll(".glass .cell");
    $nextCells = document.querySelectorAll(".next .cell");
    $score = document.querySelector(".score .value");
    $state = document.querySelector(".state .value");
    $sound = document.getElementById("audio");
    Promise.all([
        Display.drawСountdown(),
        Display.drawPieces()
    ])
        .then(() => Application.run(new Game()));
});
class Display {
    static clear() {
        $glassCells.forEach(cell => {
            cell.classList.remove("active");
        });
    }
    static clearNext() {
        $nextCells.forEach(cell => {
            cell.classList.remove("active");
        });
    }
    static drawPixel(point, display) {
        let cells = $glassCells;
        let size = 10;
        if (display === 1) {
            cells = $nextCells;
            size = 4;
        }
        const cell = cells[point.x + (point.y) * size];
        if (cell) {
            cell.classList.add("active");
        }
    }
    static drawSymbol(symbol, start, display) {
        const symbolMeta = symbols[symbol];
        for (let y = 0; y < symbolMeta.length; ++y) {
            for (let x = 0; x < symbolMeta[y].length; ++x) {
                if (symbolMeta[y][x] === 1) {
                    Display.drawPixel(new Point(x + start.x, y + start.y), display);
                }
            }
        }
    }
    static drawGlass(glass) {
        for (let y = 0; y < glass.length; ++y) {
            for (let x = 0; x < glass[y].length; ++x) {
                if (glass[y][x] === 1) {
                    Display.drawPixel(new Point(x, y), 0);
                }
            }
        }
    }
    static drawScore(value) {
        $score.textContent = value.toString();
    }
    static drawState(play) {
        $state.textContent = play ? "Play" : "Over";
    }
    //----
    static drawClock() {
        let dots = true;
        return new Promise((resolve, reject) => {
            const process = setInterval(function () {
                Display.clear();
                Display.drawTime();
                if (dots) {
                    this.drawDots();
                }
                dots = !dots;
            }, 500);
        });
    }
    static drawClock2() {
        Display.drawTime();
        const now = new Date();
        if (Math.floor(now.getMilliseconds() / 500) === 1) {
            this.drawDots();
        }
    }
    static drawСountdown() {
        let counter = 9;
        return new Promise((resolve, reject) => {
            const process = setInterval(function () {
                Display.clear();
                Display.drawSymbol("0", new Point(1, 5), 0);
                Display.drawSymbol(counter.toString(), new Point(6, 5), 0);
                if (counter === 0) {
                    clearInterval(process);
                    resolve();
                }
                --counter;
            }, 300);
        });
    }
    static drawPieces() {
        let counter = 6;
        return new Promise((resolve, reject) => {
            const process = setInterval(function () {
                Display.clearNext();
                Display.drawSymbol(pieceTypes.get(counter), new Point(0, 0), 1);
                if (counter === 0) {
                    clearInterval(process);
                    resolve();
                }
                --counter;
            }, 300);
        });
    }
    static drawDots() {
        Display.drawSymbol(".", new Point(2, 9), 0);
        Display.drawSymbol(".", new Point(6, 9), 0);
    }
    static drawTime() {
        const now = new Date();
        const time = {
            hours: (now.getHours() < 10 ? "0" : "") + now.getHours(),
            minutes: (now.getMinutes() < 10 ? "0" : "") + now.getMinutes()
        };
        const hoursDigits = time.hours.split("");
        const minutesDigits = time.minutes.split("");
        Display.drawSymbol(hoursDigits[0], new Point(1, 2), 0);
        Display.drawSymbol(hoursDigits[1], new Point(6, 2), 0);
        Display.drawSymbol(minutesDigits[0], new Point(1, 13), 0);
        Display.drawSymbol(minutesDigits[1], new Point(6, 13), 0);
    }
}
Display.width = 10;
Display.height = 20;
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
class Piece {
    constructor(type, position) {
        this.pieces = new Map([
            [
                PieceType.I, [
                    [
                        [0, 1, 0, 0],
                        [0, 1, 0, 0],
                        [0, 1, 0, 0],
                        [0, 1, 0, 0]
                    ],
                    [
                        [0, 0, 0, 0],
                        [1, 1, 1, 1],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0]
                    ],
                    [
                        [0, 1, 0, 0],
                        [0, 1, 0, 0],
                        [0, 1, 0, 0],
                        [0, 1, 0, 0]
                    ],
                    [
                        [0, 0, 0, 0],
                        [1, 1, 1, 1],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0]
                    ]
                ],
            ],
            [
                PieceType.L, [
                    [
                        [0, 1, 0, 0],
                        [0, 1, 0, 0],
                        [0, 1, 1, 0],
                        [0, 0, 0, 0]
                    ],
                    [
                        [0, 0, 0, 0],
                        [1, 1, 1, 0],
                        [1, 0, 0, 0],
                        [0, 0, 0, 0]
                    ],
                    [
                        [1, 1, 0, 0],
                        [0, 1, 0, 0],
                        [0, 1, 0, 0],
                        [0, 0, 0, 0]
                    ],
                    [
                        [0, 0, 1, 0],
                        [1, 1, 1, 0],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0]
                    ]
                ],
            ],
            [
                PieceType.J, [
                    [
                        [0, 1, 0, 0],
                        [0, 1, 0, 0],
                        [1, 1, 0, 0],
                        [0, 0, 0, 0]
                    ],
                    [
                        [1, 0, 0, 0],
                        [1, 1, 1, 0],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0]
                    ],
                    [
                        [0, 1, 1, 0],
                        [0, 1, 0, 0],
                        [0, 1, 0, 0],
                        [0, 0, 0, 0]
                    ],
                    [
                        [0, 0, 0, 0],
                        [1, 1, 1, 0],
                        [0, 0, 1, 0],
                        [0, 0, 0, 0]
                    ]
                ],
            ],
            [
                PieceType.S, [
                    [
                        [0, 0, 0, 0],
                        [0, 1, 1, 0],
                        [1, 1, 0, 0],
                        [0, 0, 0, 0]
                    ],
                    [
                        [1, 0, 0, 0],
                        [1, 1, 0, 0],
                        [0, 1, 0, 0],
                        [0, 0, 0, 0]
                    ],
                    [
                        [0, 1, 1, 0],
                        [1, 1, 0, 0],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0]
                    ],
                    [
                        [0, 1, 0, 0],
                        [0, 1, 1, 0],
                        [0, 0, 1, 0],
                        [0, 0, 0, 0]
                    ]
                ],
            ],
            [
                PieceType.Z, [
                    [
                        [0, 0, 0, 0],
                        [1, 1, 0, 0],
                        [0, 1, 1, 0],
                        [0, 0, 0, 0]
                    ],
                    [
                        [0, 1, 0, 0],
                        [1, 1, 0, 0],
                        [1, 0, 0, 0],
                        [0, 0, 0, 0]
                    ],
                    [
                        [1, 1, 0, 0],
                        [0, 1, 1, 0],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0]
                    ],
                    [
                        [0, 0, 1, 0],
                        [0, 1, 1, 0],
                        [0, 1, 0, 0],
                        [0, 0, 0, 0]
                    ]
                ],
            ],
            [
                PieceType.O, [
                    [
                        [0, 0, 0, 0],
                        [0, 1, 1, 0],
                        [0, 1, 1, 0],
                        [0, 0, 0, 0]
                    ],
                    [
                        [0, 0, 0, 0],
                        [0, 1, 1, 0],
                        [0, 1, 1, 0],
                        [0, 0, 0, 0]
                    ],
                    [
                        [0, 0, 0, 0],
                        [0, 1, 1, 0],
                        [0, 1, 1, 0],
                        [0, 0, 0, 0]
                    ],
                    [
                        [0, 0, 0, 0],
                        [0, 1, 1, 0],
                        [0, 1, 1, 0],
                        [0, 0, 0, 0]
                    ]
                ],
            ],
            [
                PieceType.T, [
                    [
                        [0, 0, 0, 0],
                        [1, 1, 1, 0],
                        [0, 1, 0, 0],
                        [0, 0, 0, 0]
                    ],
                    [
                        [0, 1, 0, 0],
                        [1, 1, 0, 0],
                        [0, 1, 0, 0],
                        [0, 0, 0, 0]
                    ],
                    [
                        [0, 1, 0, 0],
                        [1, 1, 1, 0],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0]
                    ],
                    [
                        [0, 1, 0, 0],
                        [0, 1, 1, 0],
                        [0, 1, 0, 0],
                        [0, 0, 0, 0]
                    ]
                ],
            ],
        ]);
        this.type = pieceTypes.get(getRandomInt(0, 7)); //type;
        this.position = position;
        this.rotation = getRandomInt(0, 4);
        this.blocks = this.pieces.get(this.type)[this.rotation];
    }
    update(delta) {
    }
    draw() {
        for (let y = 0; y < this.blocks.length; ++y) {
            for (let x = 0; x < this.blocks[y].length; ++x) {
                if (this.blocks[y][x] === 1) {
                    Display.drawPixel(new Point(this.position.x + x, this.position.y + y), 0);
                }
            }
        }
    }
    rotate() {
        this.rotation = (this.rotation + 1) % 4;
        this.blocks = this.pieces.get(this.type)[this.rotation];
    }
    moveLeft() {
        --this.position.x;
    }
    moveRight() {
        ++this.position.x;
    }
    moveUp() {
        --this.position.y;
    }
    moveDown() {
        ++this.position.y;
    }
}
class Game {
    constructor() {
        this.startTime = 0;
        this.play = true;
        this.speed = 1000;
        this.current = new Piece(pieceTypes.get(getRandomInt(0, 7)), new Point(3, 0));
        this.next = new Piece(pieceTypes.get(getRandomInt(0, 7)), new Point(3, 0));
        this.glass = new Array(Display.height)
            .fill(0)
            .map(() => new Array(Display.width).fill(0));
        this.score = 0;
    }
    update(delta) {
        this.current.update(delta);
        this.next.update(delta);
        if (!this.play) {
            return;
        }
        if (Application.getButtonDown(Button.Up)) {
            this.current.rotate();
            if (this.hasCollisions()) {
                this.current.rotate();
                this.current.rotate();
                this.current.rotate();
            }
        }
        if (Application.getButtonDown(Button.Left)) {
            this.current.moveLeft();
            if (this.hasCollisions()) {
                this.current.moveRight();
            }
        }
        if (Application.getButtonDown(Button.Right)) {
            this.current.moveRight();
            if (this.hasCollisions()) {
                this.current.moveLeft();
            }
        }
        this.startTime += delta;
        const timeToDrop = this.startTime > this.speed;
        if (Application.getButton(Button.Down) || timeToDrop) {
            this.current.moveDown();
            if (this.hasCollisions()) {
                $sound.currentTime = 0;
                $sound.play();
                this.current.moveUp();
                this.freezePiece();
                const lines = this.removeLines();
                this.addScore(lines);
                this.nextPiece();
                if (this.hasCollisions()) {
                    this.play = false;
                }
            }
            if (timeToDrop) {
                this.startTime -= this.speed;
            }
        }
    }
    draw() {
        Display.drawState(this.play);
        if (!this.play) {
            Display.drawClock2();
            return;
        }
        this.current.draw();
        //this.next.draw();
        Display.clearNext();
        for (let y = 0; y < this.next.blocks.length; ++y) {
            for (let x = 0; x < this.next.blocks[y].length; ++x) {
                if (this.next.blocks[y][x] === 1) {
                    Display.drawPixel(new Point(x, y), 1);
                }
            }
        }
        Display.drawGlass(this.glass);
        Display.drawScore(this.score);
        //Display.drawState(this.play);
    }
    start() {
        this.play = true;
    }
    hasCollisions() {
        for (let y = 0; y < this.current.blocks.length; ++y) {
            for (let x = 0; x < this.current.blocks[y].length; ++x) {
                if (this.current.blocks[y][x] === 1) {
                    if (this.current.position.x + x < 0) {
                        return true;
                    }
                    if (this.current.position.x + x > Display.width - 1) {
                        return true;
                    }
                    if (this.current.position.y + y > Display.height - 1) {
                        return true;
                    }
                    if (this.glass[this.current.position.y + y][this.current.position.x + x] === 1) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    nextPiece() {
        this.current = this.next;
        this.next = new Piece(pieceTypes.get(getRandomInt(0, 7)), new Point(3, 0));
    }
    freezePiece() {
        for (let y = 0; y < this.current.blocks.length; ++y) {
            for (let x = 0; x < this.current.blocks[y].length; ++x) {
                if (this.current.blocks[y][x] === 1) {
                    this.glass[this.current.position.y + y][this.current.position.x + x] = 1;
                }
            }
        }
    }
    removeLines() {
        let count = 0;
        for (let y = 0; y < Display.height; ++y) {
            let line = true;
            for (let x = 0; x < Display.width; ++x) {
                line = line && this.glass[y][x] === 1;
            }
            if (line) {
                ++count;
                for (let yy = y; yy > 0; --yy) {
                    for (let xx = 0; xx < Display.width; ++xx) {
                        this.glass[yy][xx] = this.glass[yy - 1][xx];
                    }
                }
                for (let xx = 0; xx < Display.width; ++xx) {
                    this.glass[0][xx] = 0;
                }
            }
        }
        return count;
    }
    addScore(lines) {
        this.score += lines * 100 + getRandomInt(10, 20);
    }
}
