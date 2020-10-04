namespace Race {
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
        public position: Point;
        public image: Bitmap;

        constructor(position: Point) {
            this.position = position;
            this.image = new CarTexture();
        }
    }

    class Game implements IGameObject {
        private state: GameState;
        private nextState: GameState;

        private border: Color[];
        private car: Car;
        private enemies: Car[];

        private distance: number;
        private currentDistance: number;

        private moveTo: Point;

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
                    // Left
                    if(Application.getButtonDown(Button.Left) && this.car.position.x > 1) {
                        this.moveTo = new Point(this.car.position.x, this.car.position.y);
                        this.moveTo.x -= 3;
                    }

                    // Right
                    if(Application.getButtonDown(Button.Right) && this.car.position.x < 7) {
                        this.moveTo = new Point(this.car.position.x, this.car.position.y);
                        this.moveTo.x += 3;
                    }

                    const moveTimer = Application.timer("move");
                    const borderTimer = Application.timer("border");

                    // Up
                    if(Application.getButtonDown(Button.Up)) {
                        this.level = Math.min(20, this.level + 1);

                        moveTimer.start(1000 / (this.level + 1));
                        borderTimer.start(500 / (this.level + 1));
                    }

                    // Down
                    if(Application.getButtonDown(Button.Down)) {
                        this.level = Math.max(0, this.level - 1);

                        moveTimer.start(1000 / (this.level + 1));
                        borderTimer.start(500 / (this.level + 1));
                    }

                    if(borderTimer.time) {
                        this.border.unshift(this.border.pop());
                    }

                    if(moveTimer.time) {
                        this.enemies.forEach(enemy => {
                            enemy.position.y += 1;
                        });

                        this.enemies = this.enemies.filter(enemy => {
                            const ahead =  enemy.position.y < Display.height;

                            if(!ahead) {
                                this.calculateScores();
                            }

                            return ahead;
                        });

                        this.currentDistance += 1;

                        if(this.currentDistance === this.distance) {
                            var random = Utils.random(0, 3);
                            var xPositions = [ 1, 4, 7];

                            this.enemies.push(new Car(new Point(xPositions[random], -4)));
                            this.currentDistance = 0;
                        }
                    }

                    if(this.hasCollisions(this.moveTo)) {
                        $sound.currentTime = 0;
                        $sound.play();

                        this.car.position = new Point(this.car.position.x - Math.sign(this.car.position.x - this.moveTo.x), this.moveTo.y);

                        this.setState(GameState.Over);
                    } else {
                        this.car.position = new Point(this.moveTo.x, this.moveTo.y);
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

                    Display.drawInfo(this.score, this.level, this.lines, this.state.toString());
                    break;
                case GameState.ScreenCleaning:
                    this.cleaner.draw();

                    Display.drawInfo(this.score, this.level, this.lines, this.state.toString());
                    break;
                case GameState.Play:
                    Display.clear(0);

                    for(let y = 0; y < Display.height; ++y) {
                        Display.drawPixel(new Point(0, y), this.border[y], 0);
                    }

                    Display.drawBitmap(this.car.image, this.car.position, 0);

                    this.enemies.forEach(enemy => {
                        Display.drawBitmap(enemy.image, enemy.position, 0);
                    });

                    Display.drawInfo(this.score, this.level, this.lines, this.state.toString());

                    break;
                case GameState.Over:
                    Display.clear(0);

                    for(let y = 0; y < Display.height; ++y) {
                        Display.drawPixel(new Point(0, y), this.border[y], 0);
                    }

                    Display.drawBitmap(this.car.image, this.car.position, 0);

                    this.enemies.forEach(enemy => {
                        Display.drawBitmap(enemy.image, enemy.position, 0);
                    });

                    Display.drawInfo(this.score, this.level, this.lines, this.state.toString());

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
                    switch(state)
                    {
                        case GameState.Over:
                            this.state = state;

                            const overTimer = Application.timer("over");

                            overTimer.start(3000);

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

        private calculateScores() {
            this.score += this.level * 50 + Utils.random(0, 50) + 1;
            this.lines += 1;
            this.level += 0;
        }

        private hasCollisions(moveTo: Point): boolean {
            for(let i = 0; i < this.enemies.length; ++i) {
                const enemy = this.enemies[i];

                if(Math.abs(enemy.position.x - moveTo.x) < enemy.image.width
                    && Math.abs(enemy.position.y - moveTo.y) < enemy.image.height) {
                    return true;
                }
            }

            return false;
        }
    }
}