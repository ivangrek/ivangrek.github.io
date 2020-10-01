var Button;
(function (Button) {
    Button[Button["Start"] = 0] = "Start";
    Button[Button["Up"] = 1] = "Up";
    Button[Button["Down"] = 2] = "Down";
    Button[Button["Left"] = 3] = "Left";
    Button[Button["Right"] = 4] = "Right";
})(Button || (Button = {}));
class Component {
    constructor(gameObject) {
    }
}
class Input {
    constructor() {
        this.holdedButtons = new Map([
            [Button.Start, false],
            [Button.Up, false],
            [Button.Down, false],
            [Button.Left, false],
            [Button.Right, false]
        ]);
        this.keyDownButtons = new Map([
            [Button.Start, false],
            [Button.Up, false],
            [Button.Down, false],
            [Button.Left, false],
            [Button.Right, false]
        ]);
        this.keyUpButtons = new Map([
            [Button.Start, false],
            [Button.Up, false],
            [Button.Down, false],
            [Button.Left, false],
            [Button.Right, false]
        ]);
        window.addEventListener("keydown", (e) => this.onKeyDown(e), false);
        window.addEventListener("keyup", (e) => this.onKeyUp(e), false);
    }
    update(delta) {
        this.keyDownButtons = new Map([
            [Button.Start, false],
            [Button.Up, false],
            [Button.Down, false],
            [Button.Left, false],
            [Button.Right, false]
        ]);
        this.keyUpButtons = new Map([
            [Button.Start, false],
            [Button.Up, false],
            [Button.Down, false],
            [Button.Left, false],
            [Button.Right, false]
        ]);
    }
    getButton(button) {
        return this.holdedButtons.get(button);
    }
    getButtonDown(button) {
        return this.keyDownButtons.get(button);
    }
    getButtonUp(button) {
        return this.keyUpButtons.get(button);
    }
    onKeyDown(e) {
        switch (e.code) {
            case Input.KeyE:
                this.holdedButtons.set(Button.Start, true);
                if (!e.repeat) {
                    this.keyDownButtons.set(Button.Start, true);
                }
                break;
            case Input.KeyW:
                this.holdedButtons.set(Button.Up, true);
                if (!e.repeat) {
                    this.keyDownButtons.set(Button.Up, true);
                }
                break;
            case Input.KeyS:
                this.holdedButtons.set(Button.Down, true);
                if (!e.repeat) {
                    this.keyDownButtons.set(Button.Down, true);
                }
                break;
            case Input.KeyA:
                this.holdedButtons.set(Button.Left, true);
                if (!e.repeat) {
                    this.keyDownButtons.set(Button.Left, true);
                }
                break;
            case Input.KeyD:
                this.holdedButtons.set(Button.Right, true);
                if (!e.repeat) {
                    this.keyDownButtons.set(Button.Right, true);
                }
                break;
            default:
                break;
        }
    }
    onKeyUp(e) {
        switch (e.code) {
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
Input.KeyE = "KeyE";
Input.KeyW = "KeyW";
Input.KeyS = "KeyS";
Input.KeyA = "KeyA";
Input.KeyD = "KeyD";
class Time {
    constructor() {
        this.timers = new Map();
    }
    update(delta) {
        this.timers.forEach(timer => {
            if (timer.timeout <= 0) {
                return;
            }
            timer.startTime += delta;
            if (timer.startTime > timer.timeout) {
                timer.time = true;
                timer.startTime -= timer.timeout;
            }
            else {
                timer.time = false;
            }
        });
    }
    timer(name) {
        if (this.timers.has(name)) {
            return this.timers.get(name);
        }
        let timer = {
            startTime: 0,
            timeout: -1,
            time: false,
            start: function (timeout) {
                timer.stop();
                timer.timeout = timeout;
            },
            stop: function () {
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
    static run(root) {
        this.components.push(this.input);
        this.components.push(this.time);
        this.childs.push(root);
        let now = performance.now();
        const frame = (time) => {
            requestAnimationFrame(frame);
            const delta = Math.min(1000, time - now);
            // this.components.forEach(component => {
            //     component.update(delta);
            // });
            this.childs.forEach(child => {
                child.update(delta);
                child.components.forEach(component => {
                    if (component.enable) {
                        component.update(delta);
                    }
                });
                child.draw();
            });
            this.components.forEach(component => {
                component.update(delta);
            });
            now = time;
        };
        requestAnimationFrame(frame);
    }
    static getButton(button) {
        return this.input.getButton(button);
    }
    static getButtonDown(button) {
        return this.input
            .getButtonDown(button);
    }
    static getButtonUp(button) {
        return this.input
            .getButtonUp(button);
    }
    static timer(name) {
        return this.time
            .timer(name);
    }
}
Application.components = new Array();
Application.childs = new Array();
Application.input = new Input();
Application.time = new Time();