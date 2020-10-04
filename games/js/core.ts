enum Button {
    Start,
    Up,
    Down,
    Left,
    Right
}

interface IUpdateable {
    update: (delta: number) => void;
}

interface IDrawable {
    draw: () => void;
}

abstract class Component implements IUpdateable, IDrawable {
    constructor(gameObject: IGameObject) {
    }

    public enable: boolean;

    public update: (delta: number) => void;

    public draw: () => void;
}

interface IGameObject extends IUpdateable, IDrawable  {
    components: Component[];
}

class Input implements IUpdateable {
    private static KeyE: string = "KeyE";
    private static KeyW: string = "KeyW";
    private static KeyS: string = "KeyS";
    private static KeyA: string = "KeyA";
    private static KeyD: string = "KeyD";

    private holdedButtons: Map<Button, boolean> = new Map<Button, boolean>([
        [Button.Start, false],
        [Button.Up, false],
        [Button.Down, false],
        [Button.Left, false],
        [Button.Right, false]
    ]);

    private keyDownButtons: Map<Button, boolean> = new Map<Button, boolean>([
        [Button.Start, false],
        [Button.Up, false],
        [Button.Down, false],
        [Button.Left, false],
        [Button.Right, false]
    ]);

    private keyUpButtons: Map<Button, boolean> = new Map<Button, boolean>([
        [Button.Start, false],
        [Button.Up, false],
        [Button.Down, false],
        [Button.Left, false],
        [Button.Right, false]
    ]);

    constructor() {
        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e), false);
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e), false);
    }

    public update(delta: number) {
        this.keyDownButtons = new Map<Button, boolean>([
            [Button.Start, false],
            [Button.Up, false],
            [Button.Down, false],
            [Button.Left, false],
            [Button.Right, false]
        ]);

        this.keyUpButtons = new Map<Button, boolean>([
            [Button.Start, false],
            [Button.Up, false],
            [Button.Down, false],
            [Button.Left, false],
            [Button.Right, false]
        ]);
    }

    public getButton(button: Button): boolean {
        return this.holdedButtons.get(button);
    }

    public getButtonDown(button: Button): boolean {
        return this.keyDownButtons.get(button);
    }

    public getButtonUp(button: Button): boolean {
        return this.keyUpButtons.get(button);
    }

    private onKeyDown(e: KeyboardEvent) {
        switch(e.code)
        {
            case Input.KeyE:
                this.holdedButtons.set(Button.Start, true);

                if(!e.repeat) {
                    this.keyDownButtons.set(Button.Start, true);
                }

                break;
            case Input.KeyW:
                this.holdedButtons.set(Button.Up, true);

                if(!e.repeat) {
                    this.keyDownButtons.set(Button.Up, true);
                }

                break;
            case Input.KeyS:
                this.holdedButtons.set(Button.Down, true);

                if(!e.repeat) {
                    this.keyDownButtons.set(Button.Down, true);
                }

                break;
            case Input.KeyA:
                this.holdedButtons.set(Button.Left, true);

                if(!e.repeat) {
                    this.keyDownButtons.set(Button.Left, true);
                }

                break;
            case Input.KeyD:
                this.holdedButtons.set(Button.Right, true);

                if(!e.repeat) {
                    this.keyDownButtons.set(Button.Right, true);
                }

                break;
            default:
                break;
        }
    }

    private onKeyUp(e: KeyboardEvent) {
        switch(e.code)
        {
            case Input.KeyE:
                this.holdedButtons.set(Button.Start, false);
                this.keyDownButtons.set(Button.Start, false);
                this.keyUpButtons.set(Button.Start, true);

                break;
            case Input.KeyW:
                this.holdedButtons.set(Button.Up, false);
                this.keyDownButtons.set(Button.Up, false);
                this.keyUpButtons.set(Button.Up, true);

                break;
            case Input.KeyS:
                this.holdedButtons.set(Button.Down, false);
                this.keyDownButtons.set(Button.Down, false);
                this.keyUpButtons.set(Button.Down, true);

                break;
            case Input.KeyA:
                this.holdedButtons.set(Button.Left, false);
                this.keyDownButtons.set(Button.Left, false);
                this.keyUpButtons.set(Button.Left, true);

                break;
            case Input.KeyD:
                this.holdedButtons.set(Button.Right, false);
                this.keyDownButtons.set(Button.Right, false);
                this.keyUpButtons.set(Button.Right, true);

                break;
            default:
                break;
        }
    }
}

class Time implements IUpdateable {
    private timers: Map<string, any>;

    constructor() {
        this.timers = new Map<string, boolean>();
    }

    public update(delta: number) {
        this.timers.forEach(timer => {
            if(timer.timeout <= 0) {
                return;
            }

            timer.startTime += delta;

            if(timer.startTime > timer.timeout) {
                timer.time = true;

                timer.startTime -= timer.timeout;
            }
            else {
                timer.time = false;
            }
        });
    }

    public timer(name: string): any {
        if(this.timers.has(name)) {
            return this.timers.get(name);
        }

        let timer = {
            startTime: 0,
            timeout: -1,
            time: false,
            start: function(timeout: number) {
                timer.stop();
                timer.timeout = timeout;
            },
            stop: function() {
                timer.startTime = 0;
                timer.time = false;
                timer.timeout = -1;
            }
        };

        this.timers.set(name, timer);

        return timer;
    }
}

class Application {
    private static components: Array<IUpdateable> = new Array<IUpdateable>();
    private static childs: Array<IGameObject> = new Array<IGameObject>();

    private static input: Input = new Input();
    private static time: Time = new Time();

    public static run(root: IGameObject) {
        this.components.push(this.input);
        this.components.push(this.time);

        this.childs.push(root);

        let now = performance.now();

        const frame = (time: number) => {
            requestAnimationFrame(frame);

            const delta = Math.min(1000, time - now);

            // this.components.forEach(component => {
            //     component.update(delta);
            // });

            this.childs.forEach(child => {
                child.update(delta);

                child.components.forEach(component => {
                    if(component.enable) {
                        component.update(delta);
                    }
                });

                child.draw();
            });

            this.components.forEach(component => {
                component.update(delta);
            });

            now = time;
        }

        requestAnimationFrame(frame);
    }

    public static getButton(button: Button): boolean {
        return this.input.getButton(button);
    }

    public static getButtonDown(button: Button): boolean {
        return this.input
            .getButtonDown(button);
    }

    public static getButtonUp(button: Button): boolean {
        return this.input
            .getButtonUp(button);
    }

    public static timer(name: string): any {
        return this.time
            .timer(name);
    }
}

// Graphics

class Point {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

enum Color {
    Transparent,
    White,
    Black
}

abstract class Bitmap {
    public width: number;
    public height: number;
    public value: Color[];

    constructor(width: number, height: number, value: Color[]) {
        this.width = width;
        this.height = height;
        this.value = value;
    }
}

class Display {
    private static $mainCells:NodeListOf<Element>;
    private static $nextCells:NodeListOf<Element>;

    private static $score: Element;
    private static $level: Element;
    private static $lines: Element;

    private static $state: Element;

    public static width: number = 10;
    public static height: number = 20;

    public static initialize(displayCssClass: string) {
        const $display = document.querySelector(displayCssClass);

        this.$mainCells = $display.querySelectorAll(".glass .cell");
        this.$nextCells = $display.querySelectorAll(".next .cell");

        this.$score = $display.querySelector(".score .value");
        this.$level = $display.querySelector(".level .value");
        this.$lines = $display.querySelector(".lines .value");

        this.$state = $display.querySelector(".state .value");
    }

    public static clear(display: number) {
        let $cells = this.$mainCells;

        if(display === 1) {
            $cells = this.$nextCells;
        }

        $cells.forEach($cell => {
            $cell.classList.remove("active");
        });
    }

    public static drawPixel(point: Point, color: Color, display: number) {
        let $cells = this.$mainCells;
        let size = 10;

        if(display === 1) {
            $cells = this.$nextCells;
            size = 4;
        }

        const $cell = $cells[point.x + (point.y) * size];

        if($cell === undefined) {
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

    public static drawBitmap(bitmap: Bitmap, point: Point, display: number) {
        for(var y = 0; y < bitmap.height; ++y) {
            for(var x = 0; x < bitmap.width; ++x) {
                const color = bitmap.value[x + y * bitmap.width];

                this.drawPixel(new Point(point.x + x, point.y + y), color, display)
            }
        }
    }

    public static drawInfo(score: number, level: number, lines: number, state: string) {
        this.$score.textContent = score.toString();
        this.$level.textContent = level.toString();
        this.$lines.textContent = lines.toString();
        this.$state.textContent = state;
    }
}