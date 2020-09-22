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
let $level: Element;
let $sound: HTMLAudioElement ;

document.addEventListener("DOMContentLoaded", function() {
    $glassCells = document.querySelectorAll(".glass .cell");
    $nextCells = document.querySelectorAll(".next .cell");
    $score = document.querySelector(".score .value");
    $state = document.querySelector(".state .value");
    $level = document.querySelector(".state .level");
    $sound = <HTMLAudioElement>document.getElementById("audio");

    Promise.all([
        //Display.drawСountdown(),
        //Display.drawPieces()
    ])
        .then(() => Application.run(new Game()));
});

class Display {
    public static width: number = 10;
    public static height: number = 20;

    public static clear() {
        $glassCells.forEach(cell => {
            cell.classList.remove("active");
        });
    }

    public static clearNext() {
        $nextCells.forEach(cell => {
            cell.classList.remove("active");
        });
    }

    public static drawPixel(point: Point, display: number) {
        let cells = $glassCells;
        let size = 10;

        if(display === 1) {
            cells = $nextCells;
            size = 4;
        }

        const cell = cells[point.x + (point.y) * size];

        if(cell) {
            cell.classList.add("active");
        }
    }

    public static drawSymbol(symbol: string, start: Point, display: number) {
        const symbolMeta = symbols[symbol];

        for (let y = 0; y < symbolMeta.length; ++y) {
            for (let x = 0; x < symbolMeta[y].length; ++x) {
                if(symbolMeta[y][x] === 1) {
                    Display.drawPixel(new Point(x + start.x, y + start.y), display);
                }
            }
        }
    }

    public static drawGlass(glass: number[][]) {
        for (let y = 0; y < glass.length; ++y) {
            for (let x = 0; x < glass[y].length; ++x) {
                if(glass[y][x] === 1) {
                    Display.drawPixel(new Point(x, y), 0);
                }
            }
        }
    }

    public static drawScore(value: number) {
        $score.textContent = value.toString();
    }

    public static drawState(state: GameState, level: number) {
        switch(state)
        {
            case GameState.Play:
                $state.textContent = "Play";
                break;
            case GameState.Line:
                $state.textContent = "Line";
                break;
            case GameState.Over:
                $state.textContent = "Over";
                break;
        }

        $level.textContent = level.toString();
    }

    //----
    public static drawClock(): Promise<any> {
        let dots = true;

        return new Promise((resolve, reject) => {
            const process = setInterval(function() {
                Display.clear();
                Display.drawTime();

                if(dots) {
                    this.drawDots();
                }

                dots = !dots;
            }, 500);
        });
    }

    public static drawClock2() {
        Display.drawTime();

        const now = new Date();

        if(Math.floor(now.getMilliseconds() / 500) === 1) {
            this.drawDots();
        }
    }

    public static drawСountdown(): Promise<any> {
        let counter = 9;

        return new Promise((resolve, reject) => {
            const process = setInterval(function() {
                Display.clear();
                Display.drawSymbol("0", new Point(1 , 5), 0);
                Display.drawSymbol(counter.toString(), new Point(6 , 5), 0);

                if(counter === 0) {
                    clearInterval(process);
                    resolve();
                }

                --counter;
            }, 300);
        });
    }

    public static drawPieces(): Promise<any> {
        let counter = 6;

        return new Promise((resolve, reject) => {
            const process = setInterval(function() {
                Display.clearNext();
                Display.drawSymbol(pieceTypes.get(counter), new Point(0 , 0), 1);

                if(counter === 0) {
                    clearInterval(process);
                    resolve();
                }

                --counter;
            }, 300);
        });
    }

    public static drawDots() {
        Display.drawSymbol(".", new Point(2 , 9), 0);
        Display.drawSymbol(".", new Point(6 , 9), 0);
    }

    public static drawTime() {
        const now = new Date();
        const time = {
            hours: (now.getHours() < 10 ? "0" : "") + now.getHours(),
            minutes: (now.getMinutes() < 10 ? "0" : "") + now.getMinutes()
        };

        const hoursDigits = time.hours.split("");
        const minutesDigits = time.minutes.split("");

        Display.drawSymbol(hoursDigits[0], new Point(1 , 2), 0);
        Display.drawSymbol(hoursDigits[1], new Point(6 , 2), 0);
        Display.drawSymbol(minutesDigits[0], new Point(1 , 13), 0);
        Display.drawSymbol(minutesDigits[1], new Point(6 , 13), 0);
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
    private pieces: Map<PieceType, any> = new Map<PieceType, any>([
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

    public type: PieceType;
    public position: Point;

    private rotation: number;
    public blocks: number[][];

    constructor(type: PieceType, position: Point) {
        this.type = pieceTypes.get(getRandomInt(0, 7));//type;
        this.position = position;

        this.rotation = getRandomInt(0, 4);
        this.blocks = this.pieces.get(this.type)[this.rotation];
    }

    public update(delta: number) {
    }

    public draw() {
        for (let y = 0; y < this.blocks.length; ++y) {
            for (let x = 0; x < this.blocks[y].length; ++x) {
                if(this.blocks[y][x] === 1) {
                    Display.drawPixel(new Point(this.position.x + x, this.position.y + y), 0);
                }
            }
        }
    }

    public rotate() {
        this.rotation = (this.rotation + 1) % 4;
        this.blocks = this.pieces.get(this.type)[this.rotation];
    }

    public moveLeft() {
        --this.position.x;
    }

    public moveRight() {
        ++this.position.x;
    }

    public moveUp() {
        --this.position.y;
    }

    public moveDown() {
        ++this.position.y;
    }
}

enum GameState {
    Idle,
    Play,
    Line,
    Level,
    Over
}

class Game implements IGameObject {
    private state: GameState;

    private play:  boolean;
    private speed: number;
    private current: Piece;
    private next: Piece;
    private glass: number[][];
    private score: number;

    private dropTimer;

    constructor() {
        this.start();
    }

    public update(delta: number) {
        switch(this.state) {
            case GameState.Line:
                let lineTimer = Application.timer("line");

                if(lineTimer.time) {
                    this.removeNextBlockOnLines(this.lines);
                }
                break;
            case GameState.Play:
                this.current.update(delta);
                this.next.update(delta);

                if(Application.getButtonDown(Button.Up)) {
                    this.current.rotate();

                    if(this.hasCollisions()) {
                        this.current.rotate();
                        this.current.rotate();
                        this.current.rotate();
                    }
                }

                const moveTimer = Application.timer("move");

                // Left
                let moveLeft = false;

                if(Application.getButtonDown(Button.Left)) {
                    moveLeft = true;

                    moveTimer.start(100);
                }

                if(Application.getButton(Button.Left) && moveTimer.time) {
                    moveLeft = true;
                }

                if(moveLeft) {
                    this.current.moveLeft();

                    if(this.hasCollisions()) {
                        this.current.moveRight();
                    }
                }

                // Right
                let moveRight = false;

                if(Application.getButtonDown(Button.Right)) {
                    moveRight = true;

                    moveTimer.start(100);
                }

                if(Application.getButton(Button.Right) && moveTimer.time) {
                    moveRight = true;
                }

                if(moveRight) {
                    this.current.moveRight();

                    if(this.hasCollisions()) {
                        this.current.moveLeft();
                    }
                }

                // Drop
                const drop2Timer = Application.timer("drop2");

                if(Application.getButtonDown(Button.Down)) {
                    drop2Timer.start(50);
                }

                if(Application.getButton(Button.Down) && drop2Timer.time || this.dropTimer.time) {
                    this.current.moveDown();

                    if(this.hasCollisions()) {
                        $sound.currentTime = 0;
                        $sound.play();

                        this.current.moveUp();
                        this.freezePiece();

                        //const lines = this.removeLines();

                        this.lines = this.findLinesForRemove();

                        if(this.lines.length > 0) {
                            this.state = GameState.Line;

                            let lineTimer = Application.timer("line");

                            lineTimer.start(25);
                        } else {
                            this.addScore(0);
                            this.nextPiece();

                            if(this.hasCollisions()) {
                                this.state = GameState.Over;
                            }
                        }

                        // this.addScore(lines);

                        // this.nextPiece();

                        // if(this.hasCollisions()) {
                        //     this.play = false;
                        // }

                        drop2Timer.stop();
                    }
                }
                break;
            case GameState.Over:
                if(Application.getButtonDown(Button.Up)) {
                    this.start();
                }
                break;
        }
    }

    private lines: number[] = [];

    public draw() {
        switch(this.state) {
            case GameState.Idle:
                Display.clear();
                Display.drawClock2();
                break;
            case GameState.Line:
                Display.clear();
                Display.drawState(this.state, (1200 - this.speed) / 50 + 1);
                Display.drawGlass(this.glass);
                Display.drawScore(this.score);
                break;
            case GameState.Play:
                Display.clear();
                Display.drawState(this.state, (1200 - this.speed) / 50 + 1);

                this.current.draw();
                //this.next.draw();

                Display.clearNext();

                for (let y = 0; y < this.next.blocks.length; ++y) {
                    for (let x = 0; x < this.next.blocks[y].length; ++x) {
                        if(this.next.blocks[y][x] === 1) {
                            Display.drawPixel(new Point(x, y), 1);
                        }
                    }
                }

                Display.drawGlass(this.glass);

                Display.drawScore(this.score);
                //Display.drawState(this.play);
                break;
            case GameState.Over:
                Display.clear();
                Display.drawClock2();
                Display.drawState(this.state, (1200 - this.speed) / 50 + 1);
                break;
        }
    }

    public start() {
        this.state = GameState.Play;
        this.speed = 1200 - (10) * 50;

        this.dropTimer = Application.timer("drop");
        this.dropTimer.start(this.speed);

        this.nextPiece();

        this.glass = new Array(Display.height)
            .fill(0)
            .map(() => new Array(Display.width).fill(0));

        this.score = 0;
    }

    private hasCollisions(): boolean {
        for (let y = 0; y < this.current.blocks.length; ++y) {
            for (let x = 0; x < this.current.blocks[y].length; ++x) {
                if(this.current.blocks[y][x] === 1) {
                    if(this.current.position.x + x < 0) {
                        return true;
                    }

                    if(this.current.position.x + x > Display.width - 1) {
                        return true;
                    }

                    if(this.current.position.y + y > Display.height - 1) {
                        return true;
                    }

                    if(this.glass[this.current.position.y + y][this.current.position.x + x] === 1) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    private nextPiece() {
        this.current = this.next || new Piece(pieceTypes.get(getRandomInt(0, 7)), new Point(3, 0));
        this.next = new Piece(pieceTypes.get(getRandomInt(0, 7)), new Point(3, 0));
    }

    private freezePiece() {
        for (let y = 0; y < this.current.blocks.length; ++y) {
            for (let x = 0; x < this.current.blocks[y].length; ++x) {
                if(this.current.blocks[y][x] === 1) {
                    this.glass[this.current.position.y + y][this.current.position.x + x] = 1;
                }
            }
        }
    }

    private removeLines(): number {
        let count = 0;

        for (let y = 0; y < Display.height; ++y) {
            let line = true;

            for (let x = 0; x < Display.width; ++x) {
                line = line && this.glass[y][x] === 1;
            }

            if(line) {
                ++count;

                for (let yy = y; yy > 0; --yy) {
                    for (let xx = 0; xx < Display.width; ++xx) {
                        this.glass[yy][xx] = this.glass[yy - 1][xx]
                    }
                }

                for (let xx = 0; xx < Display.width; ++xx) {
                    this.glass[0][xx] = 0
                }
            }
        }

        return count;
    }

    private findLinesForRemove(): number[] {
        let lines: number[] = [];

        for (let y = 0; y < Display.height; ++y) {
            let line = true;

            for (let x = 0; x < Display.width; ++x) {
                line = line && this.glass[y][x] === 1;
            }

            if(line) {
                lines.push(y);
            }
        }

        return lines;
    }

    private removeNextBlockOnLines(lines: number[]) {
        let stop = true;

        lines.forEach(y => {
            for (let x = 0; x < Display.width; ++x) {
                if(this.glass[y][x] === 1) {
                    this.glass[y][x] = 0;

                    stop = false;
                    break;
                }
            }
        });

        if(stop) {
            this.collapseRemovedLines(lines);

            this.state = GameState.Play;
            this.addScore(lines.length);
            this.nextPiece();

            if(this.hasCollisions()) {
                this.state = GameState.Over;
            }
        }
    }

    private collapseRemovedLines(lines: number[]) {
        lines.forEach(y => {
            for (let yy = y; yy > 0; --yy) {
                for (let xx = 0; xx < Display.width; ++xx) {
                    this.glass[yy][xx] = this.glass[yy - 1][xx]
                }
            }

            for (let xx = 0; xx < Display.width; ++xx) {
                this.glass[0][xx] = 0
            }
        });
    }

    private addScore(lines: number) {
        this.score += lines * (lines + 1) * 50 + getRandomInt(0, 50) + 1;
    }
}