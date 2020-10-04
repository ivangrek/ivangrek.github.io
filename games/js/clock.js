var Components;
(function (Components) {
    var symbols = {
        "0": [
            [1, 1, 1],
            [1, 0, 1],
            [1, 0, 1],
            [1, 0, 1],
            [1, 1, 1]
        ],
        "1": [
            [0, 1, 0],
            [1, 1, 0],
            [0, 1, 0],
            [0, 1, 0],
            [1, 1, 1]
        ],
        "2": [
            [1, 1, 1],
            [0, 0, 1],
            [0, 1, 0],
            [1, 0, 0],
            [1, 1, 1]
        ],
        "3": [
            [1, 1, 1],
            [0, 0, 1],
            [0, 1, 1],
            [0, 0, 1],
            [1, 1, 1]
        ],
        "4": [
            [1, 0, 1],
            [1, 0, 1],
            [1, 1, 1],
            [0, 0, 1],
            [0, 0, 1]
        ],
        "5": [
            [1, 1, 1],
            [1, 0, 0],
            [1, 1, 1],
            [0, 0, 1],
            [1, 1, 1]
        ],
        "6": [
            [1, 1, 1],
            [1, 0, 0],
            [1, 1, 1],
            [1, 0, 1],
            [1, 1, 1]
        ],
        "7": [
            [1, 1, 1],
            [0, 0, 1],
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 0]
        ],
        "8": [
            [1, 1, 1],
            [1, 0, 1],
            [1, 1, 1],
            [1, 0, 1],
            [1, 1, 1]
        ],
        "9": [
            [1, 1, 1],
            [1, 0, 1],
            [1, 1, 1],
            [0, 0, 1],
            [1, 1, 1]
        ],
        ".": [
            [1, 1, 0],
            [1, 1, 0],
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]
    };
    class Clock extends Component {
        constructor(gameObject) {
            super(gameObject);
            this.gameObject = gameObject;
            this.timer = Application.timer("clock");
            this.showDots = false;
            this.update = (delta) => {
                if (this.timer.time) {
                    this.bitmap = new Array(Display.height)
                        .fill(Color.White)
                        .map(() => new Array(Display.width).fill(Color.White));
                    this.addTime();
                    if (this.showDots = !this.showDots) {
                        this.addDots();
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
                .fill(Color.White)
                .map(() => new Array(Display.width).fill(Color.White));
            this.timer.start(500);
        }
        addSymbol(symbol, start) {
            const symbolMeta = symbols[symbol];
            for (let y = 0; y < symbolMeta.length; ++y) {
                for (let x = 0; x < symbolMeta[y].length; ++x) {
                    if (symbolMeta[y][x] === 1) {
                        this.bitmap[y + start.y][x + start.x] = Color.Black;
                    }
                }
            }
        }
        addTime() {
            const now = new Date();
            const hours = (now.getHours() < 10 ? "0" : "") + now.getHours();
            const minutes = (now.getMinutes() < 10 ? "0" : "") + now.getMinutes();
            const hoursDigits = hours.split("");
            const minutesDigits = minutes.split("");
            this.addSymbol(hoursDigits[0], new Point(1, 2));
            this.addSymbol(hoursDigits[1], new Point(6, 2));
            this.addSymbol(minutesDigits[0], new Point(1, 13));
            this.addSymbol(minutesDigits[1], new Point(6, 13));
        }
        addDots() {
            this.addSymbol(".", new Point(2, 9));
            this.addSymbol(".", new Point(6, 9));
        }
    }
    Components.Clock = Clock;
})(Components || (Components = {}));
