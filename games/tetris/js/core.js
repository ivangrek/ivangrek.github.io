var Button;
(function (Button) {
    Button[Button["Up"] = 0] = "Up";
    Button[Button["Down"] = 1] = "Down";
    Button[Button["Left"] = 2] = "Left";
    Button[Button["Right"] = 3] = "Right";
})(Button || (Button = {}));
class Application {
    static run(root) {
        window.addEventListener("keydown", (e) => this.onKeyDown(e), false);
        window.addEventListener("keyup", (e) => this.onKeyUp(e), false);
        let now = performance.now();
        const frame = (time) => {
            requestAnimationFrame(frame);
            const delta = Math.min(1000, time - now);
            root.update(delta);
            Display.clear();
            root.draw();
            now = time;
            this.firedButtons = new Map([
                [Button.Up, false],
                [Button.Down, false],
                [Button.Left, false],
                [Button.Right, false]
            ]);
        };
        requestAnimationFrame(frame);
    }
    static getButton(button) {
        return this.holdedButtons.get(button);
    }
    static getButtonDown(button) {
        return this.firedButtons.get(button);
    }
    static onKeyDown(e) {
        switch (e.code) {
            case "KeyW":
                this.holdedButtons.set(Button.Up, true);
                if (!e.repeat) {
                    this.firedButtons.set(Button.Up, true);
                }
                break;
            case "KeyS":
                this.holdedButtons.set(Button.Down, true);
                if (!e.repeat) {
                    this.firedButtons.set(Button.Down, true);
                }
                break;
            case "KeyA":
                this.holdedButtons.set(Button.Left, true);
                if (!e.repeat) {
                    this.firedButtons.set(Button.Left, true);
                }
                break;
            case "KeyD":
                this.holdedButtons.set(Button.Right, true);
                if (!e.repeat) {
                    this.firedButtons.set(Button.Right, true);
                }
                break;
            default:
                break;
        }
    }
    static onKeyUp(e) {
        switch (e.code) {
            case "KeyW":
                this.holdedButtons.set(Button.Up, false);
                this.firedButtons.set(Button.Up, false);
                break;
            case "KeyS":
                this.holdedButtons.set(Button.Down, false);
                break;
            case "KeyA":
                this.holdedButtons.set(Button.Left, false);
                break;
            case "KeyD":
                this.holdedButtons.set(Button.Right, false);
                break;
            default:
                break;
        }
    }
}
Application.holdedButtons = new Map([
    [Button.Up, false],
    [Button.Down, false],
    [Button.Left, false],
    [Button.Right, false]
]);
Application.firedButtons = new Map([
    [Button.Up, false],
    [Button.Down, false],
    [Button.Left, false],
    [Button.Right, false]
]);
