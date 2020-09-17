var Button;
(function (Button) {
    Button[Button["Up"] = 0] = "Up";
    Button[Button["Down"] = 1] = "Down";
    Button[Button["Left"] = 2] = "Left";
    Button[Button["Right"] = 3] = "Right";
})(Button || (Button = {}));
class Application {
    static run(root) {
        window.addEventListener("keydown", (e) => this.onKeyDown(e), false);
        window.addEventListener("keyup", (e) => this.onKeyUp(e), false);
        let now = performance.now();
        const frame = (time) => {
            requestAnimationFrame(frame);
            const delta = Math.min(1000, time - now);
            root.update(delta);
            root.draw();
            now = time;
            this.firedButtons = new Map([
                [Button.Up, false],
                [Button.Down, false],
                [Button.Left, false],
                [Button.Right, false]
            ]);
        };
        requestAnimationFrame(frame);
    }
    static getButton(button) {
        return this.holdedButtons.get(button);
    }
    static getButtonDown(button) {
        return this.firedButtons.get(button);
    }
    static onKeyDown(e) {
        switch (e.code) {
            case "KeyW":
                this.holdedButtons.set(Button.Up, true);
                if (!e.repeat) {
                    this.firedButtons.set(Button.Up, true);
                }
                break;
            case "KeyS":
                this.holdedButtons.set(Button.Down, true);
                if (!e.repeat) {
                    this.firedButtons.set(Button.Down, true);
                }
                break;
            case "KeyA":
                this.holdedButtons.set(Button.Left, true);
                if (!e.repeat) {
                    this.firedButtons.set(Button.Left, true);
                }
                break;
            case "KeyD":
                this.holdedButtons.set(Button.Right, true);
                if (!e.repeat) {
                    this.firedButtons.set(Button.Right, true);
                }
                break;
            default:
                break;
        }
    }
    static onKeyUp(e) {
        switch (e.code) {
            case "KeyW":
                this.holdedButtons.set(Button.Up, false);
                this.firedButtons.set(Button.Up, false);
                break;
            case "KeyS":
                this.holdedButtons.set(Button.Down, false);
                break;
            case "KeyA":
                this.holdedButtons.set(Button.Left, false);
                break;
            case "KeyD":
                this.holdedButtons.set(Button.Right, false);
                break;
            default:
                break;
        }
    }
}
Application.holdedButtons = new Map([
    [Button.Up, false],
    [Button.Down, false],
    [Button.Left, false],
    [Button.Right, false]
]);
Application.firedButtons = new Map([
    [Button.Up, false],
    [Button.Down, false],
    [Button.Left, false],
    [Button.Right, false]
]);
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
document.addEventListener("DOMContentLoaded", function () {
    $glassCells = document.querySelectorAll(".glass .cell");
    $nextCells = document.querySelectorAll(".next .cell");
    $score = document.querySelector(".score .value");
    $state = document.querySelector(".state .value");
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
    static drawSymbol(symbol, start, display) {
        let cells = $glassCells;
        let size = 10;
        if (display === 1) {
            cells = $nextCells;
            size = 4;
        }
        const symbolMeta = symbols[symbol];
        for (let y = 0; y < symbolMeta.length; ++y) {
            for (let x = 0; x < symbolMeta[y].length; ++x) {
                const cell = cells[x + start.x + (y + start.y) * size];
                if (symbolMeta[y][x] === 1 && cell) {
                    cell.classList.add("active");
                }
            }
        }
    }
    static drawGlass(glass) {
        let cells = $glassCells;
        for (let y = 0; y < glass.length; ++y) {
            for (let x = 0; x < glass[y].length; ++x) {
                const cell = cells[x + y * Display.width];
                if (glass[y][x] === 1 && cell) {
                    cell.classList.add("active");
                }
            }
        }
    }
    static drawScore(value) {
        $score.textContent = value.toString();
    }
    static drawState(play) {
        $state.textContent = play ? "No" : "Yes";
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
        this.type = type;
        this.position = position;
    }
    update(delta) {
    }
    draw() {
        Display.drawSymbol(this.type, this.position, 0);
    }
}
class Game {
    constructor() {
        this.startTime = 0;
        this.play = false;
        this.speed = 1000;
        this.current = new Piece(pieceTypes.get(getRandomInt(0, 7)), new Point(3, 0));
        this.next = new Piece(pieceTypes.get(getRandomInt(0, 7)), new Point(3, 0));
        this.glass = new Array(Display.height)
            .fill(0).map(() => new Array(Display.width).fill(0));
        this.score = 0;
    }
    update(delta) {
        if (Application.getButtonDown(Button.Up)) {
            this.play = !this.play;
        }
        if (!this.play) {
            return;
        }
        this.current.update(delta);
        this.next.update(delta);
        if (Application.getButton(Button.Left)) {
            let collision = false;
            const symbolMeta = symbols[this.current.type];
            for (let y = 0; y < symbolMeta.length; ++y) {
                for (let x = 0; x < symbolMeta[y].length; ++x) {
                    if (symbolMeta[y][x] === 1 && this.current.position.x - 1 + x < 0) {
                        collision = true;
                        if (collision) {
                            break;
                        }
                    }
                }
                if (collision) {
                    break;
                }
            }
            if (!collision) {
                this.current.position.x -= 1;
            }
        }
        if (Application.getButton(Button.Right)) {
            let collision = false;
            const symbolMeta = symbols[this.current.type];
            for (let y = 0; y < symbolMeta.length; ++y) {
                for (let x = 0; x < symbolMeta[y].length; ++x) {
                    if (symbolMeta[y][x] === 1 && this.current.position.x + 1 + x > Display.width - 1) {
                        collision = true;
                        if (collision) {
                            break;
                        }
                    }
                }
                if (collision) {
                    break;
                }
            }
            if (!collision) {
                this.current.position.x += 1;
            }
        }
        if (Application.getButton(Button.Down)) {
            let collision = false;
            const symbolMeta = symbols[this.current.type];
            for (let y = 0; y < symbolMeta.length; ++y) {
                for (let x = 0; x < symbolMeta[y].length; ++x) {
                    if (symbolMeta[y][x] === 1 && this.current.position.y + 1 + y > Display.height - 1) {
                        collision = true;
                        if (collision) {
                            break;
                        }
                    }
                }
                if (collision) {
                    break;
                }
            }
            if (!collision) {
                this.current.position.y += 1;
            }
            else {
                this.freezePiece(this.current);
                this.removeLines();
                this.nextPiece();
                this.score += getRandomInt(10, 20);
            }
        }
        this.startTime += delta;
        if (this.startTime > this.speed) {
            let collision = false;
            const symbolMeta = symbols[this.current.type];
            for (let y = 0; y < symbolMeta.length; ++y) {
                for (let x = 0; x < symbolMeta[y].length; ++x) {
                    if (symbolMeta[y][x] === 1 && this.current.position.y + 1 + y > Display.height - 1) {
                        collision = true;
                        if (collision) {
                            break;
                        }
                    }
                }
                if (collision) {
                    break;
                }
            }
            if (!collision) {
                this.startTime -= this.speed;
                this.current.position.y += 1;
            }
            else {
                this.freezePiece(this.current);
                this.removeLines();
                this.nextPiece();
                this.score += getRandomInt(10, 20);
            }
        }
    }
    draw() {
        Display.clear();
        this.current.draw();
        //this.next.draw();
        Display.clearNext();
        Display.drawSymbol(this.next.type, new Point(0, 0), 1);
        Display.drawGlass(this.glass);
        Display.drawScore(this.score);
        Display.drawState(this.play);
    }
    start() {
        this.play = true;
    }
    nextPiece() {
        this.current = this.next;
        this.next = new Piece(pieceTypes.get(getRandomInt(0, 7)), new Point(3, 0));
    }
    freezePiece(piece) {
        const symbolMeta = symbols[this.current.type];
        for (let y = 0; y < symbolMeta.length; ++y) {
            for (let x = 0; x < symbolMeta[y].length; ++x) {
                if (symbolMeta[y][x] === 1) {
                    this.glass[piece.position.y + y][piece.position.x + x] = 1;
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
        if (count > 0) {
            this.score += count * 100;
        }
    }
}
