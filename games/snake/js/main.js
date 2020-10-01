var Snake;
(function (Snake) {
    let $glassCells;
    let $nextCells;
    let $score;
    let $level;
    let $lines;
    let $state;
    let $sound;
    document.addEventListener("DOMContentLoaded", function () {
        $glassCells = document.querySelectorAll(".glass .cell");
        $nextCells = document.querySelectorAll(".next .cell");
        $score = document.querySelector(".score .value");
        $level = document.querySelector(".level .value");
        $lines = document.querySelector(".lines .value");
        $state = document.querySelector(".state .value");
        $sound = document.getElementById("audio");
        Application.run(new Game());
    });
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
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); // [min, max)
    }
    class Point {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
    }
    let GameState;
    (function (GameState) {
        GameState[GameState["Idle"] = 0] = "Idle";
        GameState[GameState["ScreenCleaning"] = 1] = "ScreenCleaning";
        GameState[GameState["Play"] = 2] = "Play";
        GameState[GameState["Over"] = 3] = "Over";
    })(GameState || (GameState = {}));
    class Clock extends Component {
        constructor(gameObject) {
            super(gameObject);
            this.gameObject = gameObject;
            this.timer = Application.timer("clock");
            this.showDots = false;
            this.update = (delta) => {
                if (this.timer.time) {
                    this.bitmap = new Array(Display.height)
                        .fill(Color.White)
                        .map(() => new Array(Display.width).fill(Color.White));
                    this.addTime();
                    if (this.showDots = !this.showDots) {
                        this.addDots();
                    }
                }
            };
            this.draw = () => {
                for (let y = 0; y < this.bitmap.length; ++y) {
                    for (let x = 0; x < this.bitmap[y].length; ++x) {
                        Display.drawPixel(new Point(x, y), this.bitmap[y][x], 0);
                    }
                }
            };
            this.bitmap = new Array(Display.height)
                .fill(Color.White)
                .map(() => new Array(Display.width).fill(Color.White));
            this.timer.start(500);
        }
        addSymbol(symbol, start) {
            const symbolMeta = symbols[symbol];
            for (let y = 0; y < symbolMeta.length; ++y) {
                for (let x = 0; x < symbolMeta[y].length; ++x) {
                    if (symbolMeta[y][x] === 1) {
                        this.bitmap[y + start.y][x + start.x] = Color.Black;
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
                        this.bitmap[Math.abs(this.line - Display.height + 1) - Math.floor(this.line / Display.height)][x] = 2 - Math.floor(this.line / Display.height);
                    }
                    ++this.line;
                    if (this.line === Display.height * 2) {
                        this.bitmap = new Array(Display.height)
                            .fill(Color.Transparent)
                            .map(() => new Array(Display.width).fill(Color.Transparent));
                        this.line = 0;
                        this.enable = false;
                        this.gameObject.setState(this.nextGameState);
                    }
                }
            };
            this.draw = () => {
                for (let y = 0; y < this.bitmap.length; ++y) {
                    for (let x = 0; x < this.bitmap[y].length; ++x) {
                        Display.drawPixel(new Point(x, y), this.bitmap[y][x], 0);
                    }
                }
            };
            this.bitmap = new Array(Display.height)
                .fill(Color.Transparent)
                .map(() => new Array(Display.width).fill(Color.Transparent));
            this.timer.start(25);
        }
    }
    class Game {
        constructor() {
            this.components = [];
            this.state = GameState.Idle;
            this.reset();
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
                    if (Application.getButtonDown(Button.Start)) {
                        this.setState(GameState.ScreenCleaning);
                    }
                    break;
                case GameState.ScreenCleaning:
                    break;
                case GameState.Play:
                    const moveTimer = Application.timer("move");
                    if (moveTimer.time) {
                        if (this.hasCollisions(this.to)) {
                            this.setState(GameState.Over);
                        }
                        else {
                            this.neck = this.head;
                            this.head = this.to;
                            this.snake.push(this.head);
                            this.to = new Point(this.head.x + this.head.x - this.neck.x, this.head.y + this.head.y - this.neck.y);
                            if (this.head.x === this.food.x && this.head.y === this.food.y) {
                                $sound.currentTime = 0;
                                $sound.play();
                                this.calculateScores();
                                this.newFood();
                            }
                            else {
                                this.from = this.snake.shift();
                            }
                        }
                    }
                    // Left
                    if (Application.getButton(Button.Left) && this.head.x - this.neck.x === 0) {
                        this.to = new Point(this.head.x - 1, this.head.y);
                    }
                    // Right
                    if (Application.getButton(Button.Right) && this.head.x - this.neck.x === 0) {
                        this.to = new Point(this.head.x + 1, this.head.y);
                    }
                    // Up
                    if (Application.getButton(Button.Up) && this.head.y - this.neck.y === 0) {
                        this.to = new Point(this.head.x, this.head.y - 1);
                    }
                    // Down
                    if (Application.getButton(Button.Down) && this.head.y - this.neck.y === 0) {
                        this.to = new Point(this.head.x, this.head.y + 1);
                    }
                    const foodTimer = Application.timer("food");
                    if (foodTimer.time) {
                        this.showFood = !this.showFood;
                    }
                    break;
                case GameState.Over:
                    if (Application.getButtonDown(Button.Start)) {
                        this.setState(GameState.ScreenCleaning);
                    }
                    const overTimer = Application.timer("over");
                    if (overTimer.time) {
                        this.setState(GameState.ScreenCleaning);
                    }
                    break;
            }
        }
        draw() {
            switch (this.state) {
                case GameState.Idle:
                    // Display.clear();
                    // Display.drawGlass(this.glass);
                    this.clock.draw();
                    Display.drawInfo(this.score, this.level, this.lines, this.state);
                    break;
                case GameState.ScreenCleaning:
                    this.cleaner.draw();
                    Display.drawInfo(this.score, this.level, this.lines, this.state);
                    break;
                case GameState.Play:
                    Display.clear();
                    this.snake.forEach(point => {
                        Display.drawPixel(point, Color.Black, 0);
                    });
                    if (this.showFood) {
                        Display.drawPixel(this.food, Color.Black, 0);
                    }
                    else {
                        Display.drawPixel(this.food, Color.White, 0);
                    }
                    Display.drawInfo(this.score, this.level, this.lines, this.state);
                    break;
                case GameState.Over:
                    Display.clear();
                    this.snake.forEach(point => {
                        Display.drawPixel(point, Color.Black, 0);
                    });
                    Display.drawInfo(this.score, this.level, this.lines, this.state);
                    break;
            }
        }
        setState(state) {
            switch (this.state) {
                case GameState.Idle:
                    switch (state) {
                        case GameState.ScreenCleaning:
                            this.state = state;
                            this.clock.enable = false;
                            this.cleaner.enable = true;
                            this.cleaner.nextGameState = GameState.Play;
                            break;
                    }
                    break;
                case GameState.ScreenCleaning:
                    switch (state) {
                        case GameState.Play:
                            this.state = state;
                            this.reset();
                            this.newFood();
                            const moveTimer = Application.timer("move");
                            moveTimer.start(300);
                            break;
                        case GameState.Idle:
                            this.state = state;
                            this.clock.enable = true;
                            break;
                    }
                    break;
                case GameState.Play:
                    switch (state) {
                        case GameState.Over:
                            this.state = state;
                            const overTimer = Application.timer("over");
                            overTimer.start(3000);
                            break;
                    }
                    break;
                case GameState.Over:
                    switch (state) {
                        case GameState.ScreenCleaning:
                            this.state = state;
                            this.cleaner.enable = true;
                            this.cleaner.nextGameState = GameState.Idle;
                            break;
                    }
                    break;
            }
        }
        reset() {
            this.head = new Point(5, 8);
            this.neck = new Point(5, 7);
            this.tail = new Point(5, 6);
            this.to = new Point(5, 9);
            this.from = new Point(5, 5);
            this.snake = [
                this.tail,
                this.neck,
                this.head
            ];
            this.score = 0;
            this.level = 0;
            this.lines = 0;
        }
        calculateScores() {
            this.score += 50 + getRandomInt(0, 50) + 1;
            this.lines += 1;
            this.level += 0;
        }
        newFood() {
            let availableFoodPositions = [];
            for (let y = 0; y < Display.height; ++y) {
                for (let x = 0; x < Display.width; ++x) {
                    const contains = this.snake.some(point => {
                        return point.x === x && point.y === y;
                    });
                    if (!contains) {
                        availableFoodPositions.push(new Point(x, y));
                    }
                }
            }
            this.food = availableFoodPositions[getRandomInt(0, availableFoodPositions.length)];
            this.showFood = true;
            const foodTimer = Application.timer("food");
            foodTimer.start(200);
        }
        hasCollisions(to) {
            if (to.x < 0) {
                return true;
            }
            if (to.x > Display.width - 1) {
                return true;
            }
            if (to.y < 0) {
                return true;
            }
            if (to.y > Display.height - 1) {
                return true;
            }
            for (let i = 0; i < this.snake.length; ++i) {
                const point = this.snake[i];
                if (point.x === this.to.x && point.y === this.to.y) {
                    return true;
                }
            }
            return false;
        }
    }
    let Color;
    (function (Color) {
        Color[Color["Transparent"] = 0] = "Transparent";
        Color[Color["White"] = 1] = "White";
        Color[Color["Black"] = 2] = "Black";
    })(Color || (Color = {}));
    class Display {
        static clear() {
            $glassCells.forEach($cell => {
                $cell.classList.remove("active");
            });
        }
        static clearNext() {
            $nextCells.forEach($cell => {
                $cell.classList.remove("active");
            });
        }
        static drawPixel(point, color, display) {
            let $cells = $glassCells;
            let size = 10;
            if (display === 1) {
                $cells = $nextCells;
                size = 4;
            }
            const $cell = $cells[point.x + (point.y) * size];
            switch (color) {
                case Color.White:
                    $cell.classList.remove("active");
                    break;
                case Color.Black:
                    $cell.classList.add("active");
                    break;
            }
        }
        static drawSymbol(symbol, start, display) {
            const symbolMeta = symbols[symbol];
            for (let y = 0; y < symbolMeta.length; ++y) {
                for (let x = 0; x < symbolMeta[y].length; ++x) {
                    if (symbolMeta[y][x] === 1) {
                        Display.drawPixel(new Point(x + start.x, y + start.y), Color.Black, display);
                    }
                }
            }
        }
        static drawGlass(glass) {
            for (let y = 0; y < glass.length; ++y) {
                for (let x = 0; x < glass[y].length; ++x) {
                    if (glass[y][x] === 1) {
                        Display.drawPixel(new Point(x, y), Color.Black, 0);
                    }
                }
            }
        }
        static drawInfo(score, level, lines, state) {
            $score.textContent = score.toString();
            $level.textContent = level.toString();
            $lines.textContent = lines.toString();
            switch (state) {
                case GameState.Idle:
                    $state.textContent = "Idle";
                    break;
                case GameState.ScreenCleaning:
                    $state.textContent = "Screen";
                    break;
                case GameState.Play:
                    $state.textContent = "Play";
                    break;
                case GameState.Over:
                    $state.textContent = "Over";
                    break;
            }
        }
    }
    Display.width = 10;
    Display.height = 20;
})(Snake || (Snake = {}));
