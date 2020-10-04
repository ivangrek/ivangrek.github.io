namespace Snake {
    let $sound: HTMLAudioElement;

    document.addEventListener("DOMContentLoaded", function() {
        $sound = <HTMLAudioElement>document.getElementById("audio");

        Display.initialize(".display");
        Application.run(new Game());
    });

    enum GameState {
        Idle,
        ScreenCleaning,
        Play,
        Over
    }

    class Game implements IGameObject {
        private state: GameState;
        private nextState: GameState;

        private snake: Point[];

        private head: Point;
        private neck: Point;
        private tail: Point;

        private moveTo: Point;

        private food: Point;
        private showFood: boolean;

        private score: number;
        private level: number;
        private lines: number;

        public components: Component[] = [];
        private cleaner: Components.Cleaner;
        private clock: Components.Clock;

        constructor() {
            this.state = GameState.Idle;
            this.nextState = GameState.Play;

            this.reset();

            this.cleaner = new Components.Cleaner(this);
            this.cleaner.enable = false;

            this.clock = new Components.Clock(this);
            this.clock.enable = true;

            this.components.push(this.cleaner);
            this.components.push(this.clock);
        }

        public update(delta: number) {
            switch(this.state) {
                case GameState.Idle:
                    if(Application.getButtonDown(Button.Start)) {
                        this.setState(GameState.ScreenCleaning);
                    }

                    break;
                case GameState.ScreenCleaning:
                    if(!this.cleaner.enable) {
                        this.setState(this.nextState);
                    }

                    break;
                case GameState.Play:
                    const moveTimer = Application.timer("move");

                    if(moveTimer.time) {
                        if(this.hasCollisions(this.moveTo)) {
                            this.setState(GameState.Over);
                        } else {
                            this.neck = this.head;
                            this.head = this.moveTo;

                            this.snake.push(this.head);

                            this.moveTo = new Point(this.head.x + this.head.x - this.neck.x,  this.head.y + this.head.y - this.neck.y);

                            if(this.head.x === this.food.x && this.head.y === this.food.y) {
                                $sound.currentTime = 0;
                                $sound.play();

                                this.calculateScores();
                                this.newFood();
                            } else {
                                this.snake.shift();
                            }
                        }
                    }

                    // Left
                    if(Application.getButton(Button.Left) && this.head.x - this.neck.x === 0) {
                        this.moveTo = new Point(this.head.x - 1, this.head.y);
                    }

                    // Right
                    if(Application.getButton(Button.Right) && this.head.x - this.neck.x === 0) {
                        this.moveTo = new Point(this.head.x + 1, this.head.y);
                    }

                    // Up
                    if(Application.getButton(Button.Up) && this.head.y - this.neck.y === 0) {
                        this.moveTo = new Point(this.head.x, this.head.y - 1);
                    }

                    // Down
                    if(Application.getButton(Button.Down) && this.head.y - this.neck.y === 0) {
                        this.moveTo = new Point(this.head.x, this.head.y + 1);
                    }

                    const foodTimer = Application.timer("food");

                    if(foodTimer.time) {
                        this.showFood = !this.showFood;
                    }

                    break;

                case GameState.Over:
                    if(Application.getButtonDown(Button.Start)) {
                        this.setState(GameState.ScreenCleaning);
                    }

                    const overTimer = Application.timer("over");

                    if(overTimer.time) {
                        this.setState(GameState.ScreenCleaning);
                    }

                    break;
            }
        }

        public draw() {
            switch(this.state) {
                case GameState.Idle:
                    this.clock.draw();

                    Display.drawInfo(this.score, this.level, this.lines, "Idle");
                    break;
                case GameState.ScreenCleaning:
                    this.cleaner.draw();

                    Display.drawInfo(this.score, this.level, this.lines, "Cleaning");
                    break;
                case GameState.Play:
                    Display.clear(0);

                    this.snake.forEach(point => {
                        Display.drawPixel(point, Color.Black, 0);
                    });

                    if(this.showFood) {
                        Display.drawPixel(this.food, Color.Black, 0);
                    } else {
                        Display.drawPixel(this.food, Color.White, 0);
                    }

                    Display.drawInfo(this.score, this.level, this.lines, "Play");

                    break;
                case GameState.Over:
                    Display.clear(0);

                    this.snake.forEach(point => {
                        Display.drawPixel(point, Color.Black, 0);
                    });

                    Display.drawInfo(this.score, this.level, this.lines, "Over");

                    break;
            }
        }

        public setState(state: GameState) {
            switch(this.state)
            {
                case GameState.Idle:
                    switch(state)
                    {
                        case GameState.ScreenCleaning:
                            this.state = state;
                            this.nextState = GameState.Play;

                            this.clock.enable = false;
                            this.cleaner.enable = true;

                            break;
                    }

                    break;
                case GameState.ScreenCleaning:
                    switch(state)
                    {
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
                    switch(state)
                    {
                        case GameState.Over:
                            this.state = state;

                            const overTimer = Application.timer("over");

                            overTimer.start(2000);

                            break;
                    }

                    break;
                case GameState.Over:
                    switch(state)
                    {
                        case GameState.ScreenCleaning:
                            this.state = state;
                            this.nextState = GameState.Idle;

                            this.cleaner.enable = true;

                            break;
                    }

                    break;
            }
        }

        private reset() {
            this.head = new Point(5, 8);
            this.neck = new Point(5, 7);
            this.tail = new Point(5, 6);

            this.moveTo = new Point(5, 9);

            this.snake = [
                this.tail,
                this.neck,
                this.head
            ];

            this.score = 0;
            this.level = 0;
            this.lines = 0;
        }

        private calculateScores() {
            this.score += 50 + Utils.random(0, 50) + 1;
            this.lines += 1;
            this.level += 0;
        }

        private newFood() {
            let availableFoodPositions = [];

            for (let y = 0; y < Display.height; ++y) {
                for (let x = 0; x < Display.width; ++x) {
                    const contains = this.snake.some(point => {
                        return point.x === x && point.y === y;
                    });

                    if(!contains) {
                        availableFoodPositions.push(new Point(x, y));
                    }
                }
            }

            this.food = availableFoodPositions[Utils.random(0, availableFoodPositions.length)];
            this.showFood = true;

            const foodTimer = Application.timer("food");

            foodTimer.start(200);
        }

        private hasCollisions(to: Point): boolean {
            if(to.x < 0) {
                return true;
            }

            if(to.x > Display.width - 1) {
                return true;
            }

            if(to.y < 0) {
                return true;
            }

            if(to.y > Display.height - 1) {
                return true;
            }

            for(let i = 0; i < this.snake.length; ++i) {
                const point = this.snake[i];

                if(point.x === this.moveTo.x && point.y === this.moveTo.y) {
                    return true;
                }
            }

            return false;
        }
    }
}