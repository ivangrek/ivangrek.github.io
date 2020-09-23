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
    ]
};
var PieceType;
(function (PieceType) {
    PieceType[PieceType["I"] = 0] = "I";
    PieceType[PieceType["L"] = 1] = "L";
    PieceType[PieceType["J"] = 2] = "J";
    PieceType[PieceType["S"] = 3] = "S";
    PieceType[PieceType["Z"] = 4] = "Z";
    PieceType[PieceType["O"] = 5] = "O";
    PieceType[PieceType["T"] = 6] = "T";
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
let $level;
let $sound;
document.addEventListener("DOMContentLoaded", function () {
    $glassCells = document.querySelectorAll(".glass .cell");
    $nextCells = document.querySelectorAll(".next .cell");
    $score = document.querySelector(".score .value");
    $state = document.querySelector(".state .value");
    $level = document.querySelector(".state .level");
    $sound = document.getElementById("audio");
    Promise.all([
    // Display.drawСountdown(),
    // Display.drawPieces()
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
    static drawState(state, level) {
        switch (state) {
            case GameState.Idle:
                $state.textContent = "Time";
                break;
            case GameState.Play:
                $state.textContent = "Play";
                break;
            case GameState.LinesCleaning:
                $state.textContent = "Clearing";
                break;
            case GameState.Over:
                $state.textContent = "Over";
                break;
        }
        $level.textContent = level.toString();
    }
    //----
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
                const type = pieceTypes.get(counter);
                const piece = new Piece(type, new Point(0, 0));
                for (let y = 0; y < piece.blocks.length; ++y) {
                    for (let x = 0; x < piece.blocks[y].length; ++x) {
                        if (piece.blocks[y][x] === 1) {
                            Display.drawPixel(new Point(piece.position.x + x, piece.position.y + y), 1);
                        }
                    }
                }
                if (counter === 0) {
                    clearInterval(process);
                    resolve();
                }
                --counter;
            }, 300);
        });
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
var GameState;
(function (GameState) {
    GameState[GameState["Idle"] = 0] = "Idle";
    GameState[GameState["ScreenCleaning"] = 1] = "ScreenCleaning";
    GameState[GameState["Play"] = 2] = "Play";
    GameState[GameState["LinesCleaning"] = 3] = "LinesCleaning";
    GameState[GameState["Level"] = 4] = "Level";
    GameState[GameState["Over"] = 5] = "Over";
})(GameState || (GameState = {}));
class Clock extends Component {
    constructor(gameObject) {
        super(gameObject);
        this.gameObject = gameObject;
        this.timer = Application.timer("clock");
        this.showDots = false;
        this.update = (delta) => {
            if (this.timer.time) {
                this.gameObject.glass = new Array(Display.height)
                    .fill(0)
                    .map(() => new Array(Display.width).fill(0));
                this.addTime();
                if (this.showDots = !this.showDots) {
                    this.addDots();
                }
            }
        };
        this.timer.start(500);
    }
    addSymbol(symbol, start) {
        const symbolMeta = symbols[symbol];
        for (let y = 0; y < symbolMeta.length; ++y) {
            for (let x = 0; x < symbolMeta[y].length; ++x) {
                if (symbolMeta[y][x] === 1) {
                    this.gameObject.glass[y + start.y][x + start.x] = 1;
                }
            }
        }
    }
    addTime() {
        const now = new Date();
        const hours = (now.getHours() < 10 ? "0" : "") + now.getHours();
        const minutes = (now.getMinutes() < 10 ? "0" : "") + now.getMinutes();
        const hoursDigits = hours.split("");
        const minutesDigits = minutes.split("");
        this.addSymbol(hoursDigits[0], new Point(1, 2));
        this.addSymbol(hoursDigits[1], new Point(6, 2));
        this.addSymbol(minutesDigits[0], new Point(1, 13));
        this.addSymbol(minutesDigits[1], new Point(6, 13));
    }
    addDots() {
        this.addSymbol(".", new Point(2, 9));
        this.addSymbol(".", new Point(6, 9));
    }
}
class Cleaner extends Component {
    constructor(gameObject) {
        super(gameObject);
        this.gameObject = gameObject;
        this.line = 0;
        this.timer = Application.timer("cleaner");
        this.update = (delta) => {
            if (this.timer.time) {
                for (let x = 0; x < Display.width; ++x) {
                    this.gameObject.glass[Math.abs(this.line - Display.height + 1) - Math.floor(this.line / Display.height)][x] = 1 - Math.floor(this.line / Display.height);
                }
                ++this.line;
                if (this.line === Display.height * 2) {
                    this.line = 0;
                    this.enable = false;
                    this.gameObject.setState(this.nextGameState);
                }
            }
        };
        this.timer.start(25);
    }
}
class Game {
    constructor() {
        this.completeLines = [];
        this.components = [];
        this.state = GameState.Idle;
        this.glass = new Array(Display.height)
            .fill(0)
            .map(() => new Array(Display.width).fill(0));
        this.cleaner = new Cleaner(this);
        this.cleaner.enable = false;
        this.clock = new Clock(this);
        this.clock.enable = true;
        this.components.push(this.cleaner);
        this.components.push(this.clock);
    }
    update(delta) {
        switch (this.state) {
            case GameState.Idle:
                if (Application.getButtonDown(Button.Up)) {
                    this.setState(GameState.ScreenCleaning);
                }
                break;
            case GameState.ScreenCleaning:
                break;
            case GameState.Play:
                this.current.update(delta);
                this.next.update(delta);
                if (Application.getButtonDown(Button.Up)) {
                    this.current.rotate();
                    if (this.hasCollisions()) {
                        this.current.rotate();
                        this.current.rotate();
                        this.current.rotate();
                    }
                }
                const moveTimer = Application.timer("move");
                // Left
                let moveLeft = false;
                if (Application.getButtonDown(Button.Left)) {
                    moveLeft = true;
                    moveTimer.start(100);
                }
                if (Application.getButton(Button.Left) && moveTimer.time) {
                    moveLeft = true;
                }
                if (moveLeft) {
                    this.current.moveLeft();
                    if (this.hasCollisions()) {
                        this.current.moveRight();
                    }
                }
                // Right
                let moveRight = false;
                if (Application.getButtonDown(Button.Right)) {
                    moveRight = true;
                    moveTimer.start(100);
                }
                if (Application.getButton(Button.Right) && moveTimer.time) {
                    moveRight = true;
                }
                if (moveRight) {
                    this.current.moveRight();
                    if (this.hasCollisions()) {
                        this.current.moveLeft();
                    }
                }
                // Drop
                const fallTimer = Application.timer("fall");
                const quickFallTimer = Application.timer("quickFall");
                if (Application.getButtonDown(Button.Down)) {
                    quickFallTimer.start(50);
                }
                if (fallTimer.time || Application.getButton(Button.Down) && quickFallTimer.time) {
                    this.current.moveDown();
                    if (this.hasCollisions()) {
                        $sound.currentTime = 0;
                        $sound.play();
                        this.current.moveUp();
                        this.appendPiece();
                        this.completeLines = this.findCompleteLines();
                        if (this.completeLines.length > 0) {
                            this.setState(GameState.LinesCleaning);
                        }
                        else {
                            this.addScore();
                            this.nextPiece();
                            if (this.hasCollisions()) {
                                this.setState(GameState.ScreenCleaning);
                            }
                        }
                    }
                }
                break;
            case GameState.LinesCleaning:
                let lineTimer = Application.timer("line");
                if (lineTimer.time) {
                    const stop = this.removeNextBlockOnLines(this.completeLines);
                    if (stop) {
                        this.collapseRemovedLines(this.completeLines);
                        this.addScore();
                        this.nextPiece();
                        if (this.hasCollisions()) {
                            this.setState(GameState.Over);
                        }
                        else {
                            this.setState(GameState.Play);
                        }
                    }
                }
                break;
            case GameState.Over:
                this.setState(GameState.Idle);
                break;
        }
    }
    draw() {
        switch (this.state) {
            case GameState.Idle:
                Display.clear();
                Display.drawGlass(this.glass);
                break;
            case GameState.ScreenCleaning:
                Display.clear();
                Display.drawGlass(this.glass);
                break;
            case GameState.Play:
                Display.clear();
                Display.drawState(this.state, (1200 - this.speed) / 50 + 1);
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
                break;
            case GameState.LinesCleaning:
                Display.clear();
                Display.drawState(this.state, (1200 - this.speed) / 50 + 1);
                Display.drawGlass(this.glass);
                Display.drawScore(this.score);
                break;
            case GameState.Over:
                Display.clear();
                Display.drawGlass(this.glass);
                Display.drawState(this.state, (1200 - this.speed) / 50 + 1);
                break;
        }
    }
    setState(state) {
        switch (this.state) {
            case GameState.Idle:
                switch (state) {
                    case GameState.ScreenCleaning:
                        this.clock.enable = false;
                        this.cleaner.enable = true;
                        this.cleaner.nextGameState = GameState.Play;
                        break;
                }
                break;
            case GameState.ScreenCleaning:
                switch (state) {
                    case GameState.Play:
                        this.start();
                        break;
                    case GameState.Over:
                        this.clock.enable = true;
                        break;
                }
                break;
            case GameState.Play:
                switch (state) {
                    case GameState.ScreenCleaning:
                        this.cleaner.enable = true;
                        this.cleaner.nextGameState = GameState.Over;
                        break;
                    case GameState.LinesCleaning:
                        let lineTimer = Application.timer("line");
                        lineTimer.start(20);
                        break;
                }
                break;
            case GameState.Over:
                switch (state) {
                    case GameState.Idle:
                        this.clock.enable = true;
                        break;
                }
                break;
        }
        this.state = state;
    }
    start() {
        this.speed = 1200 - (10) * 50;
        this.nextPiece();
        this.glass = new Array(Display.height)
            .fill(0)
            .map(() => new Array(Display.width).fill(0));
        this.score = 0;
        const fallTimer = Application.timer("fall");
        fallTimer.start(this.speed);
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
        this.current = this.next || new Piece(pieceTypes.get(getRandomInt(0, 7)), new Point(3, 0));
        this.next = new Piece(pieceTypes.get(getRandomInt(0, 7)), new Point(3, 0));
    }
    appendPiece() {
        for (let y = 0; y < this.current.blocks.length; ++y) {
            for (let x = 0; x < this.current.blocks[y].length; ++x) {
                if (this.current.blocks[y][x] === 1) {
                    this.glass[this.current.position.y + y][this.current.position.x + x] = 1;
                }
            }
        }
    }
    findCompleteLines() {
        let lines = [];
        for (let y = 0; y < Display.height; ++y) {
            let complete = true;
            for (let x = 0; x < Display.width; ++x) {
                if (this.glass[y][x] === 0) {
                    complete = false;
                    break;
                }
            }
            if (complete) {
                lines.push(y);
            }
        }
        return lines;
    }
    removeNextBlockOnLines(lines) {
        let stop = true;
        lines.forEach(y => {
            for (let x = 0; x < Display.width; ++x) {
                if (this.glass[y][x] === 1) {
                    this.glass[y][x] = 0;
                    stop = false;
                    break;
                }
            }
        });
        return stop;
    }
    collapseRemovedLines(lines) {
        lines.forEach(y => {
            for (let yy = y; yy > 0; --yy) {
                for (let xx = 0; xx < Display.width; ++xx) {
                    this.glass[yy][xx] = this.glass[yy - 1][xx];
                }
            }
            for (let xx = 0; xx < Display.width; ++xx) {
                this.glass[0][xx] = 0;
            }
        });
    }
    addScore() {
        this.score += this.completeLines.length * (this.completeLines.length + 1) * 50 + getRandomInt(0, 50) + 1;
    }
}
