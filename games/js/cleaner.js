var Components;
(function (Components) {
    class Cleaner extends Component {
        constructor(gameObject) {
            super(gameObject);
            this.gameObject = gameObject;
            this.line = 0;
            this.timer = Application.timer("cleaner");
            this.update = (delta) => {
                if (this.timer.time) {
                    for (let x = 0; x < Display.width; ++x) {
                        this.bitmap[Math.abs(this.line - Display.height + 1) - Math.floor(this.line / Display.height)][x] = 2 - Math.floor(this.line / Display.height);
                    }
                    ++this.line;
                    if (this.line === Display.height * 2) {
                        this.bitmap = new Array(Display.height)
                            .fill(Color.Transparent)
                            .map(() => new Array(Display.width).fill(Color.Transparent));
                        this.line = 0;
                        this.enable = false;
                    }
                }
            };
            this.draw = () => {
                for (let y = 0; y < this.bitmap.length; ++y) {
                    for (let x = 0; x < this.bitmap[y].length; ++x) {
                        Display.drawPixel(new Point(x, y), this.bitmap[y][x], 0);
                    }
                }
            };
            this.bitmap = new Array(Display.height)
                .fill(Color.Transparent)
                .map(() => new Array(Display.width).fill(Color.Transparent));
            this.timer.start(25);
        }
    }
    Components.Cleaner = Cleaner;
})(Components || (Components = {}));
