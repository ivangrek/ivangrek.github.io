enum Button {
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

interface IGameObject extends IUpdateable, IDrawable  {
}

class Input implements IUpdateable {
    private holdedButtons: Map<Button, boolean> = new Map<Button, boolean>([
        [Button.Up, false],
        [Button.Down, false],
        [Button.Left, false],
        [Button.Right, false]
    ]);

    private keyDownButtons: Map<Button, boolean> = new Map<Button, boolean>([
        [Button.Up, false],
        [Button.Down, false],
        [Button.Left, false],
        [Button.Right, false]
    ]);

    private keyUpButtons: Map<Button, boolean> = new Map<Button, boolean>([
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
            [Button.Up, false],
            [Button.Down, false],
            [Button.Left, false],
            [Button.Right, false]
        ]);

        this.keyUpButtons = new Map<Button, boolean>([
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
            case "KeyW":
                this.holdedButtons.set(Button.Up, true);

                if(!e.repeat) {
                    this.keyDownButtons.set(Button.Up, true);
                }
                break;
            case "KeyS":
                this.holdedButtons.set(Button.Down, true);

                if(!e.repeat) {
                    this.keyDownButtons.set(Button.Down, true);
                }
                break;
            case "KeyA":
                this.holdedButtons.set(Button.Left, true);

                if(!e.repeat) {
                    this.keyDownButtons.set(Button.Left, true);
                }
                break;
            case "KeyD":
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
            case "KeyW":
                this.holdedButtons.set(Button.Up, false);
                this.keyDownButtons.set(Button.Up, false);
                this.keyUpButtons.set(Button.Up, true);
                break;
            case "KeyS":
                this.holdedButtons.set(Button.Down, false);
                this.keyDownButtons.set(Button.Down, false);
                this.keyUpButtons.set(Button.Down, true);
                break;
            case "KeyA":
                this.holdedButtons.set(Button.Left, false);
                this.keyDownButtons.set(Button.Left, false);
                this.keyUpButtons.set(Button.Left, true);
                break;
            case "KeyD":
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

            Display.clear();

            this.childs.forEach(child => {
                child.update(delta);
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