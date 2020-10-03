var Race;
(function (Race) {
    let $sound;
    document.addEventListener("DOMContentLoaded", function () {
        $sound = document.getElementById("audio");
        Display.initialize(".display");
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
    class CarTexture extends Bitmap {
        constructor() {
            var value = [
                Color.Transparent, Color.Black, Color.Transparent,
                Color.Black, Color.Black, Color.Black,
                Color.Transparent, Color.Black, Color.Transparent,
                Color.Black, Color.Transparent, Color.Black
            ];
            super(3, 4, value);
        }
    }
    class Car {
        constructor(position) {
            this.position = position;
            this.image = new CarTexture();
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
                    // Left
                    if (Application.getButtonDown(Button.Left) && this.car.position.x > 1) {
                        this.moveTo = new Point(this.car.position.x, this.car.position.y);
                        this.moveTo.x -= 3;
                    }
                    // Right
                    if (Application.getButtonDown(Button.Right) && this.car.position.x < 7) {
                        this.moveTo = new Point(this.car.position.x, this.car.position.y);
                        this.moveTo.x += 3;
                    }
                    const moveTimer = Application.timer("move");
                    const borderTimer = Application.timer("border");
                    // Up
                    if (Application.getButtonDown(Button.Up)) {
                        this.level = Math.min(20, this.level + 1);
                        moveTimer.start(1000 / (this.level + 1));
                        borderTimer.start(500 / (this.level + 1));
                    }
                    // Down
                    if (Application.getButtonDown(Button.Down)) {
                        this.level = Math.max(0, this.level - 1);
                        moveTimer.start(1000 / (this.level + 1));
                        borderTimer.start(500 / (this.level + 1));
                    }
                    if (borderTimer.time) {
                        this.border.unshift(this.border.pop());
                    }
                    if (moveTimer.time) {
                        this.enemies.forEach(enemy => {
                            enemy.position.y += 1;
                        });
                        this.enemies = this.enemies.filter(enemy => {
                            const ahead = enemy.position.y < Display.height;
                            if (!ahead) {
                                this.calculateScores();
                            }
                            return ahead;
                        });
                        this.currentDistance += 1;
                        if (this.currentDistance === this.distance) {
                            var random = getRandomInt(0, 3);
                            var xPositions = [1, 4, 7];
                            this.enemies.push(new Car(new Point(xPositions[random], -4)));
                            this.currentDistance = 0;
                        }
                    }
                    if (this.hasCollisions(this.moveTo)) {
                        $sound.currentTime = 0;
                        $sound.play();
                        this.car.position = new Point(this.car.position.x - Math.sign(this.car.position.x - this.moveTo.x), this.moveTo.y);
                        this.setState(GameState.Over);
                    }
                    else {
                        this.car.position = new Point(this.moveTo.x, this.moveTo.y);
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
                    this.clock.draw();
                    Display.drawInfo(this.score, this.level, this.lines, this.state);
                    break;
                case GameState.ScreenCleaning:
                    this.cleaner.draw();
                    Display.drawInfo(this.score, this.level, this.lines, this.state);
                    break;
                case GameState.Play:
                    Display.clear(0);
                    for (let y = 0; y < Display.height; ++y) {
                        Display.drawPixel(new Point(0, y), this.border[y], 0);
                    }
                    Display.drawBitmap(this.car.image, this.car.position, 0);
                    this.enemies.forEach(enemy => {
                        Display.drawBitmap(enemy.image, enemy.position, 0);
                    });
                    Display.drawInfo(this.score, this.level, this.lines, this.state);
                    break;
                case GameState.Over:
                    Display.clear(0);
                    for (let y = 0; y < Display.height; ++y) {
                        Display.drawPixel(new Point(0, y), this.border[y], 0);
                    }
                    Display.drawBitmap(this.car.image, this.car.position, 0);
                    this.enemies.forEach(enemy => {
                        Display.drawBitmap(enemy.image, enemy.position, 0);
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
                            const moveTimer = Application.timer("move");
                            moveTimer.start(1000 / (this.level + 1));
                            const borderTimer = Application.timer("border");
                            borderTimer.start(500 / (this.level + 1));
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
            this.border = [
                Color.Black, Color.Black, Color.White, Color.Black, Color.Black, Color.Black, Color.White, Color.Black, Color.Black, Color.White,
                Color.Black, Color.Black, Color.White, Color.Black, Color.Black, Color.Black, Color.White, Color.Black, Color.Black, Color.White
            ];
            this.car = new Car(new Point(4, 15));
            this.enemies = [];
            this.distance = 10;
            this.currentDistance = 0;
            this.moveTo = this.car.position;
            this.score = 0;
            this.level = 0;
            this.lines = 0;
        }
        calculateScores() {
            this.score += this.level * 50 + getRandomInt(0, 50) + 1;
            this.lines += 1;
            this.level += 0;
        }
        hasCollisions(moveTo) {
            for (let i = 0; i < this.enemies.length; ++i) {
                const enemy = this.enemies[i];
                if (Math.abs(enemy.position.x - moveTo.x) < enemy.image.width
                    && Math.abs(enemy.position.y - moveTo.y) < enemy.image.height) {
                    return true;
                }
            }
            return false;
        }
    }
    class Display {
        static initialize(displayCssClass) {
            const $display = document.querySelector(displayCssClass);
            this.$mainCells = $display.querySelectorAll(".glass .cell");
            this.$nextCells = $display.querySelectorAll(".next .cell");
            this.$score = $display.querySelector(".score .value");
            this.$level = $display.querySelector(".level .value");
            this.$lines = $display.querySelector(".lines .value");
            this.$state = $display.querySelector(".state .value");
        }
        static clear(display) {
            let $cells = this.$mainCells;
            if (display === 1) {
                $cells = this.$nextCells;
            }
            $cells.forEach($cell => {
                $cell.classList.remove("active");
            });
        }
        static drawPixel(point, color, display) {
            let $cells = this.$mainCells;
            let size = 10;
            if (display === 1) {
                $cells = this.$nextCells;
                size = 4;
            }
            const $cell = $cells[point.x + (point.y) * size];
            if ($cell === undefined) {
                return;
            }
            switch (color) {
                case Color.White:
                    $cell.classList.remove("active");
                    break;
                case Color.Black:
                    $cell.classList.add("active");
                    break;
            }
        }
        static drawBitmap(bitmap, point, display) {
            for (var y = 0; y < bitmap.height; ++y) {
                for (var x = 0; x < bitmap.width; ++x) {
                    const color = bitmap.value[x + y * bitmap.width];
                    this.drawPixel(new Point(point.x + x, point.y + y), color, display);
                }
            }
        }
        static drawSymbol(symbol, start, display) {
            const symbolMeta = symbols[symbol];
            for (let y = 0; y < symbolMeta.length; ++y) {
                for (let x = 0; x < symbolMeta[y].length; ++x) {
                    if (symbolMeta[y][x] === 1) {
                        this.drawPixel(new Point(x + start.x, y + start.y), Color.Black, display);
                    }
                }
            }
        }
        static drawGlass(glass) {
            for (let y = 0; y < glass.length; ++y) {
                for (let x = 0; x < glass[y].length; ++x) {
                    if (glass[y][x] === 1) {
                        this.drawPixel(new Point(x, y), Color.Black, 0);
                    }
                }
            }
        }
        static drawInfo(score, level, lines, state) {
            this.$score.textContent = score.toString();
            this.$level.textContent = level.toString();
            this.$lines.textContent = lines.toString();
            switch (state) {
                case GameState.Idle:
                    this.$state.textContent = "Idle";
                    break;
                case GameState.ScreenCleaning:
                    this.$state.textContent = "Screen";
                    break;
                case GameState.Play:
                    this.$state.textContent = "Play";
                    break;
                case GameState.Over:
                    this.$state.textContent = "Over";
                    break;
            }
        }
    }
    Display.width = 10;
    Display.height = 20;
})(Race || (Race = {}));
