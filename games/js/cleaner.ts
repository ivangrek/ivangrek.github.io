namespace Components {
    export class Cleaner extends Component {
        private bitmap: Color[][];
        private line: number = 0;
        private timer = Application.timer("cleaner");

        constructor(private gameObject: IGameObject) {
            super(gameObject);

            this.bitmap = new Array(Display.height)
                .fill(Color.Transparent)
                .map(() => new Array(Display.width).fill(Color.Transparent));

            this.timer.start(25);
        }

        public update = (delta: number) => {
            if(this.timer.time) {
                for(let x = 0; x < Display.width; ++x) {
                    this.bitmap[Math.abs(this.line - Display.height + 1) - Math.floor(this.line / Display.height)][x] = <Color>2 - Math.floor(this.line / Display.height);
                }

                ++this.line;

                if(this.line === Display.height * 2) {
                    this.bitmap = new Array(Display.height)
                        .fill(Color.Transparent)
                        .map(() => new Array(Display.width).fill(Color.Transparent));

                    this.line = 0;
                    this.enable = false;
                }
            }
        };

        public draw = () => {
            for (let y = 0; y < this.bitmap.length; ++y) {
                for (let x = 0; x < this.bitmap[y].length; ++x) {
                    Display.drawPixel(new Point(x, y), this.bitmap[y][x], 0);
                }
            }
        };
    }
}