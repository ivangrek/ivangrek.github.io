namespace Tetris {
    let $sound: HTMLAudioElement;

    document.addEventListener("DOMContentLoaded", function() {
        $sound = <HTMLAudioElement>document.getElementById("audio");

        Display.initialize(".display");
        Application.run(new Game());
    });

    enum PieceType {
        I,
        L,
        J,
        S,
        Z,
        O,
        T
    }

    class PieceITopTexture extends Bitmap {
        constructor() {
            var value = [
                Color.Transparent, Color.Transparent, Color.Black, Color.Transparent,
                Color.Transparent, Color.Transparent, Color.Black, Color.Transparent,
                Color.Transparent, Color.Transparent, Color.Black, Color.Transparent,
                Color.Transparent, Color.Transparent, Color.Black, Color.Transparent
            ];

            super(4, 4, value);
        }
    }

    class PieceIRightTexture extends Bitmap {
        constructor() {
            var value = [
                Color.Transparent, Color.Transparent, Color.Transparent, Color.Transparent,
                Color.Black, Color.Black, Color.Black, Color.Black,
                Color.Transparent, Color.Transparent, Color.Transparent, Color.Transparent,
                Color.Transparent, Color.Transparent, Color.Transparent, Color.Transparent
            ];

            super(4, 4, value);
        }
    }

    class PieceLTopTexture extends Bitmap {
        constructor() {
            var value = [
                Color.Transparent, Color.Black, Color.Transparent, Color.Transparent,
                Color.Transparent, Color.Black, Color.Transparent, Color.Transparent,
                Color.Transparent, Color.Black, Color.Black, Color.Transparent,
                Color.Transparent, Color.Transparent, Color.Transparent, Color.Transparent
            ];

            super(4, 4, value);
        }
    }

    class PieceLRightTexture extends Bitmap {
        constructor() {
            var value = [
                Color.Transparent, Color.Transparent, Color.Transparent, Color.Transparent,
                Color.Black, Color.Black, Color.Black, Color.Transparent,
                Color.Black, Color.Transparent, Color.Transparent, Color.Transparent,
                Color.Transparent, Color.Transparent, Color.Transparent, Color.Transparent
            ];

            super(4, 4, value);
        }
    }

    class PieceLBottomTexture extends Bitmap {
        constructor() {
            var value = [
                Color.Black, Color.Black, Color.Transparent, Color.Transparent,
                Color.Transparent, Color.Black, Color.Transparent, Color.Transparent,
                Color.Transparent, Color.Black, Color.Transparent, Color.Transparent,
                Color.Transparent, Color.Transparent, Color.Transparent, Color.Transparent
            ];

            super(4, 4, value);
        }
    }

    class PieceLLeftTexture extends Bitmap {
        constructor() {
            var value = [
                Color.Transparent, Color.Transparent, Color.Black, Color.Transparent,
                Color.Black, Color.Black, Color.Black, Color.Transparent,
                Color.Transparent, Color.Transparent, Color.Transparent, Color.Transparent,
                Color.Transparent, Color.Transparent, Color.Transparent, Color.Transparent
            ];

            super(4, 4, value);
        }
    }

    class PieceJTopTexture extends Bitmap {
        constructor() {
            var value = [
                Color.Transparent, Color.Transparent, Color.Black, Color.Transparent,
                Color.Transparent, Color.Transparent, Color.Black, Color.Transparent,
                Color.Transparent, Color.Black, Color.Black, Color.Transparent,
                Color.Transparent, Color.Transparent, Color.Transparent, Color.Transparent
            ];

            super(4, 4, value);
        }
    }

    class PieceJRightTexture extends Bitmap {
        constructor() {
            var value = [
                Color.Transparent, Color.Black, Color.Transparent, Color.Transparent,
                Color.Transparent, Color.Black, Color.Black, Color.Black,
                Color.Transparent, Color.Transparent, Color.Transparent, Color.Transparent,
                Color.Transparent, Color.Transparent, Color.Transparent, Color.Transparent
            ];

            super(4, 4, value);
        }
    }

    class PieceJBottomTexture extends Bitmap {
        constructor() {
            var value = [
                Color.Transparent, Color.Transparent, Color.Black, Color.Black,
                Color.Transparent, Color.Transparent, Color.Black, Color.Transparent,
                Color.Transparent, Color.Transparent, Color.Black, Color.Transparent,
                Color.Transparent, Color.Transparent, Color.Transparent, Color.Transparent
            ];

            super(4, 4, value);
        }
    }

    class PieceJLeftTexture extends Bitmap {
        constructor() {
            var value = [
                Color.Transparent, Color.Transparent, Color.Transparent, Color.Transparent,
                Color.Transparent, Color.Black, Color.Black, Color.Black,
                Color.Transparent, Color.Transparent, Color.Transparent, Color.Black,
                Color.Transparent, Color.Transparent, Color.Transparent, Color.Transparent
            ];

            super(4, 4, value);
        }
    }

    class PieceSTopTexture extends Bitmap {
        constructor() {
            var value = [
                Color.Transparent, Color.Black, Color.Transparent, Color.Transparent,
                Color.Transparent, Color.Black, Color.Black, Color.Transparent,
                Color.Transparent, Color.Transparent, Color.Black, Color.Transparent,
                Color.Transparent, Color.Transparent, Color.Transparent, Color.Transparent
            ];

            super(4, 4, value);
        }
    }

    class PieceSRightTexture extends Bitmap {
        constructor() {
            var value = [
                Color.Transparent, Color.Transparent, Color.Transparent, Color.Transparent,
                Color.Transparent, Color.Black, Color.Black, Color.Transparent,
                Color.Black, Color.Black, Color.Transparent, Color.Transparent,
                Color.Transparent, Color.Transparent, Color.Transparent, Color.Transparent
            ];

            super(4, 4, value);
        }
    }

    class PieceZTopTexture extends Bitmap {
        constructor() {
            var value = [
                Color.Transparent, Color.Transparent, Color.Black, Color.Transparent,
                Color.Transparent, Color.Black, Color.Black, Color.Transparent,
                Color.Transparent, Color.Black, Color.Transparent, Color.Transparent,
                Color.Transparent, Color.Transparent, Color.Transparent, Color.Transparent
            ];

            super(4, 4, value);
        }
    }

    class PieceZRightTexture extends Bitmap {
        constructor() {
            var value = [
                Color.Transparent, Color.Transparent, Color.Transparent, Color.Transparent,
                Color.Black, Color.Black, Color.Transparent, Color.Transparent,
                Color.Transparent, Color.Black, Color.Black, Color.Transparent,
                Color.Transparent, Color.Transparent, Color.Transparent, Color.Transparent
            ];

            super(4, 4, value);
        }
    }

    class PieceOTopTexture extends Bitmap {
        constructor() {
            var value = [
                Color.Transparent, Color.Transparent, Color.Transparent, Color.Transparent,
                Color.Transparent, Color.Black, Color.Black, Color.Transparent,
                Color.Transparent, Color.Black, Color.Black, Color.Transparent,
                Color.Transparent, Color.Transparent, Color.Transparent, Color.Transparent
            ];

            super(4, 4, value);
        }
    }

    class PieceTTopTexture extends Bitmap {
        constructor() {
            var value = [
                Color.Transparent, Color.Transparent, Color.Black, Color.Transparent,
                Color.Transparent, Color.Black, Color.Black, Color.Black,
                Color.Transparent, Color.Transparent, Color.Transparent, Color.Transparent,
                Color.Transparent, Color.Transparent, Color.Transparent, Color.Transparent
            ];

            super(4, 4, value);
        }
    }

    class PieceTRightTexture extends Bitmap {
        constructor() {
            var value = [
                Color.Transparent, Color.Transparent, Color.Black, Color.Transparent,
                Color.Transparent, Color.Transparent, Color.Black, Color.Black,
                Color.Transparent, Color.Transparent, Color.Black, Color.Transparent,
                Color.Transparent, Color.Transparent, Color.Transparent, Color.Transparent
            ];

            super(4, 4, value);
        }
    }

    class PieceTBottomTexture extends Bitmap {
        constructor() {
            var value = [
                Color.Transparent, Color.Transparent, Color.Transparent, Color.Transparent,
                Color.Transparent, Color.Black, Color.Black, Color.Black,
                Color.Transparent, Color.Transparent, Color.Black, Color.Transparent,
                Color.Transparent, Color.Transparent, Color.Transparent, Color.Transparent
            ];

            super(4, 4, value);
        }
    }

    class PieceTLeftTexture extends Bitmap {
        constructor() {
            var value = [
                Color.Transparent, Color.Transparent, Color.Black, Color.Transparent,
                Color.Transparent, Color.Black, Color.Black, Color.Transparent,
                Color.Transparent, Color.Transparent, Color.Black, Color.Transparent,
                Color.Transparent, Color.Transparent, Color.Transparent, Color.Transparent
            ];

            super(4, 4, value);
        }
    }

    class Piece {
        private images: Map<PieceType, Bitmap[]> = new Map<PieceType, Bitmap[]>([
            [
                PieceType.I, [
                    new PieceITopTexture(),
                    new PieceIRightTexture(),
                    new PieceITopTexture(),
                    new PieceIRightTexture(),
                ]
            ],
            [
                PieceType.L, [
                    new PieceLTopTexture(),
                    new PieceLRightTexture(),
                    new PieceLBottomTexture(),
                    new PieceLLeftTexture()
                ]
            ],
            [
                PieceType.J, [
                    new PieceJTopTexture(),
                    new PieceJRightTexture(),
                    new PieceJBottomTexture(),
                    new PieceJLeftTexture()
                ]
            ],
            [
                PieceType.S, [
                    new PieceSTopTexture(),
                    new PieceSRightTexture(),
                    new PieceSTopTexture(),
                    new PieceSRightTexture(),
                ]
            ],
            [
                PieceType.Z, [
                    new PieceZTopTexture(),
                    new PieceZRightTexture(),
                    new PieceZTopTexture(),
                    new PieceZRightTexture(),
                ]
            ],
            [
                PieceType.O, [
                    new PieceOTopTexture(),
                    new PieceOTopTexture(),
                    new PieceOTopTexture(),
                    new PieceOTopTexture()
                ]
            ],
            [
                PieceType.T, [
                    new PieceTTopTexture(),
                    new PieceTRightTexture(),
                    new PieceTBottomTexture(),
                    new PieceTLeftTexture()
                ]
            ]
        ]);

        public type: PieceType;
        public position: Point;

        private rotation: number;
        public image: Bitmap;

        constructor(type: PieceType, position: Point) {
            this.type = type;
            this.position = position;

            this.rotation = Utils.random(0, 4);
            this.image = this.images.get(this.type)[this.rotation];
        }

        public update(delta: number) {
        }

        public draw() {
            Display.drawBitmap(this.image, this.position, 0);
        }

        public rotate() {
            this.rotation = (this.rotation + 1) % 4;
            this.image = this.images.get(this.type)[this.rotation];
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
        ScreenCleaning,
        Play,
        LinesCleaning,
        Over
    }

    class Game implements IGameObject {
        private state: GameState;
        private nextState: GameState;

        private current: Piece;
        private next: Piece;

        public glass: number[][];
        private completeLines: number[] = [];

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

                    // Fall
                    const fallTimer = Application.timer("fall");
                    const quickFallTimer = Application.timer("quickFall");

                    if(Application.getButtonDown(Button.Down)) {
                        quickFallTimer.start(50);
                    }

                    if(fallTimer.time || Application.getButton(Button.Down) && quickFallTimer.time) {
                        this.current.moveDown();

                        if(this.hasCollisions()) {
                            $sound.currentTime = 0;
                            $sound.play();

                            this.current.moveUp();
                            this.appendPiece();

                            this.completeLines = this.findCompleteLines();

                            if(this.completeLines.length > 0) {
                                this.setState(GameState.LinesCleaning);
                            } else {
                                this.setState(GameState.Play);
                            }
                        }
                    }
                    break;
                case GameState.LinesCleaning:
                    let lineTimer = Application.timer("line");

                    if(lineTimer.time) {
                        const stop = this.removeNextBlockOnLines(this.completeLines);

                        if(stop) {
                            this.collapseRemovedLines(this.completeLines);

                            this.setState(GameState.Play);
                        }
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
                    Display.clear(1);

                    this.cleaner.draw();

                    Display.drawInfo(this.score, this.level, this.lines, "Cleaning");
                    break;
                case GameState.Play:
                    Display.clear(0);

                    this.current.draw();
                    //this.next.draw();

                    Display.clear(1);
                    Display.drawBitmap(this.next.image, this.next.position, 1);

                    this.drawGlass(this.glass);

                    Display.drawInfo(this.score, this.level, this.lines, "Play");

                    break;
                case GameState.LinesCleaning:
                    Display.clear(0);

                    this.drawGlass(this.glass);

                    Display.drawInfo(this.score, this.level, this.lines, "Lines");

                    break;
                case GameState.Over:
                    Display.clear(0);

                    this.drawGlass(this.glass);

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
                            this.newRound();

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
                        case GameState.Play:
                            this.state = state;

                            this.calculateScores();
                            this.newRound();

                            break;
                        case GameState.LinesCleaning:
                            this.state = state;

                            const lineTimer = Application.timer("line");

                            lineTimer.start(20);

                            break;
                        case GameState.Over:
                            this.state = state;

                            const overTimer = Application.timer("over");

                            overTimer.start(2000);

                            break;
                    }

                    break;
                case GameState.LinesCleaning:
                    switch(state)
                    {
                        case GameState.Play:
                            this.state = state;

                            this.calculateScores();
                            this.newRound();

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
            this.glass = new Array(Display.height)
                .fill(0)
                .map(() => new Array(Display.width).fill(0));

            this.score = 0;
            this.level = 0;
            this.lines = 0;
        }

        private calculateScores() {
            this.score += this.completeLines.length * (this.completeLines.length + 1) * 50 + Utils.random(0, 50) + 1;
            this.lines += this.completeLines.length;
            this.level =  Math.floor(this.lines / 20);
        }

        private newRound() {
            const fallTimer = Application.timer("fall");

            fallTimer.start(1000 / (this.level + 1));

            const quickFallTimer = Application.timer("quickFall");

            quickFallTimer.stop();

            this.nextPiece();

            if(this.hasCollisions()) {
                this.appendPiece();
                this.setState(GameState.Over);
            }
        }

        private hasCollisions(): boolean {
            for (let y = 0; y < this.current.image.height; ++y) {
                for (let x = 0; x < this.current.image.width; ++x) {
                    if(this.current.image.value[x + y * this.current.image.width] === Color.Black) {
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
            this.current = this.next || new Piece(<PieceType>Utils.random(0, 7), new Point(3, 0));
            this.next = new Piece(<PieceType>Utils.random(0, 7), new Point(3, 0));
        }

        private appendPiece() {
            for (let y = 0; y < this.current.image.height; ++y) {
                for (let x = 0; x < this.current.image.width; ++x) {
                    if(this.current.image.value[x + this.current.image.width * y] === Color.Black) {
                        this.glass[this.current.position.y + y][this.current.position.x + x] = 1;
                    }
                }
            }
        }

        private findCompleteLines(): number[] {
            let lines: number[] = [];

            for (let y = 0; y < Display.height; ++y) {
                let complete = true;

                for (let x = 0; x < Display.width; ++x) {
                    if(this.glass[y][x] === 0) {
                        complete = false;
                        break;
                    }
                }

                if(complete) {
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

            return stop;
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

        private drawGlass(glass: number[][]) {
            for (let y = 0; y < glass.length; ++y) {
                for (let x = 0; x < glass[y].length; ++x) {
                    if(glass[y][x] === 1) {
                        Display.drawPixel(new Point(x, y), Color.Black, 0);
                    }
                }
            }
        }
    }
}