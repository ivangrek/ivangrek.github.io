var Components;
(function (Components) {
    class CleanerTexture extends Bitmap {
    }
    class Cleaner extends Component {
        constructor(gameObject) {
            super(gameObject);
            this.line = 0;
            this.timer = Application.timer("cleaner");
            this.bitmap = new CleanerTexture(Display.width, Display.height, new Array(Display.width * Display.height).fill(Color.Transparent));
            this.timer.start(25);
        }
        update(delta) {
            if (this.timer.time) {
                for (let x = 0; x < this.bitmap.width; ++x) {
                    const y = Math.abs(this.line - this.bitmap.height + 1) - Math.floor(this.line / this.bitmap.height);
                    this.bitmap.value[x + y * this.bitmap.width] = 2 - Math.floor(this.line / this.bitmap.height);
                }
                ++this.line;
                if (this.line === this.bitmap.height * 2) {
                    this.bitmap = new CleanerTexture(Display.width, Display.height, new Array(Display.width * Display.height).fill(Color.Transparent));
                    this.line = 0;
                    this.enabled = false;
                }
            }
        }
    }
    Components.Cleaner = Cleaner;
})(Components || (Components = {}));
