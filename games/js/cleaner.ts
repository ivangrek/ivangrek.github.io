namespace Components {
    class CleanerTexture extends Bitmap {
    }

    export class Cleaner extends Component {
        private line: number = 0;
        private timer = Application.timer("cleaner");

        public bitmap: Bitmap;

        constructor(gameObject: IGameObject) {
            super(gameObject);

            this.bitmap = new CleanerTexture(Display.width, Display.height, new Array(Display.width * Display.height).fill(Color.Transparent));
            this.timer.start(25);
        }

        public update(delta: number) {
            if(this.timer.time) {
                for(let x = 0; x < this.bitmap.width; ++x) {
                    const y = Math.abs(this.line - this.bitmap.height + 1) - Math.floor(this.line / this.bitmap.height);

                    this.bitmap.value[x + y * this.bitmap.width] = <Color>2 - Math.floor(this.line / this.bitmap.height);
                }

                ++this.line;

                if(this.line === this.bitmap.height * 2) {
                    this.bitmap = new CleanerTexture(Display.width, Display.height, new Array(Display.width * Display.height).fill(Color.Transparent));

                    this.line = 0;
                    this.enabled = false;
                }
            }
        }
    }
}