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

    var pieceTypes: Map<number, PieceType> = new Map<number, PieceType>([
        [ 0, PieceType.I ],
        [ 1, PieceType.L ],
        [ 2, PieceType.J ],
        [ 3, PieceType.S ],
        [ 4, PieceType.Z ],
        [ 5, PieceType.O ],
        [ 6, PieceType.T ]
    ]);

    class Piece {
        private pieces: Map<PieceType, any> = new Map<PieceType, any>([
            [
                PieceType.I, [
                    [
                        [0, 0, 1, 0],
                        [0, 0, 1, 0],
                        [0, 0, 1, 0],
                        [0, 0, 1, 0]
                    ],
                    [
                        [0, 0, 0, 0],
                        [1, 1, 1, 1],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0]
                    ],
                    [
                        [0, 0, 1, 0],
                        [0, 0, 1, 0],
                        [0, 0, 1, 0],
                        [0, 0, 1, 0]
                    ],
                    [
                        [0, 0, 0, 0],
                        [1, 1, 1, 1],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0]
                    ]
                ]
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
                ]
            ],
            [
                PieceType.J, [
                    [
                        [0, 0, 1, 0],
                        [0, 0, 1, 0],
                        [0, 1, 1, 0],
                        [0, 0, 0, 0]
                    ],
                    [
                        [0, 1, 0, 0],
                        [0, 1, 1, 1],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0]
                    ],
                    [
                        [0, 0, 1, 1],
                        [0, 0, 1, 0],
                        [0, 0, 1, 0],
                        [0, 0, 0, 0]
                    ],
                    [
                        [0, 0, 0, 0],
                        [0, 1, 1, 1],
                        [0, 0, 0, 1],
                        [0, 0, 0, 0]
                    ]
                ]
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
                        [0, 1, 0, 0],
                        [0, 1, 1, 0],
                        [0, 0, 1, 0],
                        [0, 0, 0, 0]
                    ],
                    [
                        [0, 0, 0, 0],
                        [0, 1, 1, 0],
                        [1, 1, 0, 0],
                        [0, 0, 0, 0]
                    ],
                    [
                        [0, 1, 0, 0],
                        [0, 1, 1, 0],
                        [0, 0, 1, 0],
                        [0, 0, 0, 0]
                    ]
                ]
            ],
            [
                PieceType.Z, [
                    [
                        [0, 0, 0, 0],
                        [0, 1, 1, 0],
                        [0, 0, 1, 1],
                        [0, 0, 0, 0]
                    ],
                    [
                        [0, 0, 1, 0],
                        [0, 1, 1, 0],
                        [0, 1, 0, 0],
                        [0, 0, 0, 0]
                    ],
                    [
                        [0, 0, 0, 0],
                        [0, 1, 1, 0],
                        [0, 0, 1, 1],
                        [0, 0, 0, 0]
                    ],
                    [
                        [0, 0, 1, 0],
                        [0, 1, 1, 0],
                        [0, 1, 0, 0],
                        [0, 0, 0, 0]
                    ]
                ]
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
                ]
            ],
            [
                PieceType.T, [
                    [
                        [0, 0, 0, 0],
                        [0, 1, 1, 1],
                        [0, 0, 1, 0],
                        [0, 0, 0, 0]
                    ],
                    [
                        [0, 0, 1, 0],
                        [0, 1, 1, 0],
                        [0, 0, 1, 0],
                        [0, 0, 0, 0]
                    ],
                    [
                        [0, 0, 1, 0],
                        [0, 1, 1, 1],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0]
                    ],
                    [
                        [0, 0, 1, 0],
                        [0, 0, 1, 1],
                        [0, 0, 1, 0],
                        [0, 0, 0, 0]
                    ]
                ]
            ],
        ]);

        public type: PieceType;
        public position: Point;

        private rotation: number;
        public blocks: number[][];

        constructor(type: PieceType, position: Point) {
            this.type = pieceTypes.get(Utils.random(0, 7));//type;
            this.position = position;

            this.rotation = Utils.random(0, 4);
            this.blocks = this.pieces.get(this.type)[this.rotation];
        }

        public update(delta: number) {
        }

        public draw() {
            for (let y = 0; y < this.blocks.length; ++y) {
                for (let x = 0; x < this.blocks[y].length; ++x) {
                    if(this.blocks[y][x] === 1) {
                        Display.drawPixel(new Point(this.position.x + x, this.position.y + y), Color.Black, 0);
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

                    Display.drawInfo(this.score, this.level, this.lines, this.state.toString());
                    break;
                case GameState.ScreenCleaning:
                    Display.clear(1);

                    this.cleaner.draw();

                    Display.drawInfo(this.score, this.level, this.lines, this.state.toString());
                    break;
                case GameState.Play:
                    Display.clear(0);

                    this.current.draw();
                    //this.next.draw();

                    Display.clear(1);

                    for (let y = 0; y < this.next.blocks.length; ++y) {
                        for (let x = 0; x < this.next.blocks[y].length; ++x) {
                            if(this.next.blocks[y][x] === 1) {
                                Display.drawPixel(new Point(x, y), Color.Black, 1);
                            }
                        }
                    }

                    this.drawGlass(this.glass);

                    Display.drawInfo(this.score, this.level, this.lines, this.state.toString());

                    break;
                case GameState.LinesCleaning:
                    Display.clear(0);

                    this.drawGlass(this.glass);

                    Display.drawInfo(this.score, this.level, this.lines, this.state.toString());

                    break;
                case GameState.Over:
                    Display.clear(0);

                    this.drawGlass(this.glass);

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

                            overTimer.start(3000);

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
            this.current = this.next || new Piece(pieceTypes.get(Utils.random(0, 7)), new Point(3, 0));
            this.next = new Piece(pieceTypes.get(Utils.random(0, 7)), new Point(3, 0));
        }

        private appendPiece() {
            for (let y = 0; y < this.current.blocks.length; ++y) {
                for (let x = 0; x < this.current.blocks[y].length; ++x) {
                    if(this.current.blocks[y][x] === 1) {
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