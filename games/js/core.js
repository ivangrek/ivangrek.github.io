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
// Graphics
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
var Color;
(function (Color) {
    Color[Color["Transparent"] = 0] = "Transparent";
    Color[Color["White"] = 1] = "White";
    Color[Color["Black"] = 2] = "Black";
})(Color || (Color = {}));
class Bitmap {
    constructor(width, height, value) {
        this.width = width;
        this.height = height;
        this.value = value;
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
    static drawInfo(score, level, lines, state) {
        this.$score.textContent = score.toString();
        this.$level.textContent = level.toString();
        this.$lines.textContent = lines.toString();
        this.$state.textContent = state;
    }
}
Display.width = 10;
Display.height = 20;
