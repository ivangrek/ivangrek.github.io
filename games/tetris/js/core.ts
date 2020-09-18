enum Button {
    Up,
    Down,
    Left,
    Right
}

interface IApplicationObject {
    update: (delta: number) => void;
    draw: () => void;
}

class Application {
    private static holdedButtons: Map<Button, boolean> = new Map<Button, boolean>([
        [Button.Up, false],
        [Button.Down, false],
        [Button.Left, false],
        [Button.Right, false]
    ]);

    private static firedButtons: Map<Button, boolean> = new Map<Button, boolean>([
        [Button.Up, false],
        [Button.Down, false],
        [Button.Left, false],
        [Button.Right, false]
    ]);
    
    public static run(root: IApplicationObject) {
        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e), false);
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e), false);

        let now: number = performance.now();

        const frame = (time: number) => {
            requestAnimationFrame(frame);

            const delta = Math.min(1000, time - now);

            root.update(delta);

            Display.clear();

            root.draw();

            now = time;

            this.firedButtons = new Map<Button, boolean>([
                [Button.Up, false],
                [Button.Down, false],
                [Button.Left, false],
                [Button.Right, false]
            ]);
        }

        requestAnimationFrame(frame);
    }

    public static getButton(button: Button): boolean {
        return this.holdedButtons.get(button);
    }

    public static getButtonDown(button: Button): boolean {
        return this.firedButtons.get(button);
    }

    private static onKeyDown(e: KeyboardEvent) {
        switch(e.code)
        {
            case "KeyW":
                this.holdedButtons.set(Button.Up, true);

                if(!e.repeat) {
                    this.firedButtons.set(Button.Up, true);
                }
                break;
            case "KeyS":
                this.holdedButtons.set(Button.Down, true);

                if(!e.repeat) {
                    this.firedButtons.set(Button.Down, true);
                }
                break;
            case "KeyA":
                this.holdedButtons.set(Button.Left, true);

                if(!e.repeat) {
                    this.firedButtons.set(Button.Left, true);
                }
                break;
            case "KeyD":
                this.holdedButtons.set(Button.Right, true);

                if(!e.repeat) {
                    this.firedButtons.set(Button.Right, true);
                }
                break;
            default:
                break;
        }
    }

    private static onKeyUp(e: KeyboardEvent) {
        switch(e.code)
        {
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