var Shooter;
(function (Shooter) {
    let $sound;
    document.addEventListener("DOMContentLoaded", function () {
        $sound = document.getElementById("audio");
        Display.initialize(".display");
        Application.run(new Game());
    });
    class ShipTexture extends Bitmap {
        constructor() {
            var value = [
                Color.Transparent, Color.Black, Color.Transparent,
                Color.Black, Color.Black, Color.Black
            ];
            super(3, 2, value);
        }
    }
    class ShipController extends Component {
        constructor(gameObject) {
            super(gameObject);
        }
        update(delta) {
            const gameObject = this.gameObject;
            const moveTimer = Application.timer("move");
            // Left
            let moveLeft = false;
            if (Application.getButtonDown(Button.Left)) {
                moveLeft = true;
                moveTimer.start(100);
            }
            if (Application.getButton(Button.Left) && moveTimer.time) {
                moveLeft = true;
            }
            if (moveLeft && gameObject.position.x >= 0) {
                gameObject.position.x -= 1;
            }
            // Right
            let moveRight = false;
            if (Application.getButtonDown(Button.Right)) {
                moveRight = true;
                moveTimer.start(100);
            }
            if (Application.getButton(Button.Right) && moveTimer.time) {
                moveRight = true;
            }
            if (moveRight && gameObject.position.x + gameObject.image.width <= Display.width) {
                gameObject.position.x += 1;
            }
            // Up
            const shootTimer = Application.timer("shoot");
            let canShoot = false;
            if (Application.getButtonDown(Button.Up)) {
                canShoot = true;
                shootTimer.start(100);
            }
            if (Application.getButton(Button.Up) && shootTimer.time) {
                canShoot = true;
            }
            if (canShoot) {
                gameObject.bullets.push(new Bullet(new Point(gameObject.position.x + 1, gameObject.position.y)));
            }
        }
    }
    class Ship {
        constructor(position) {
            this.components = [];
            this.controller = new ShipController(this);
            this.components.push(this.controller);
            this.position = position;
            this.image = new ShipTexture();
            this.bullets = [];
        }
        update(delta) {
            this.components.forEach(component => {
                if (component.enabled) {
                    component.update(delta);
                }
            });
            this.bullets.forEach(bullet => {
                bullet.update(delta);
            });
            this.bullets = this.bullets.filter(bullet => {
                return bullet.position.y >= 0;
            });
        }
        ;
        draw() {
            Display.drawBitmap(this.image, this.position, 0);
            this.bullets.forEach(enemy => {
                Display.drawBitmap(enemy.image, enemy.position, 0);
            });
        }
        ;
    }
    class BulletTexture extends Bitmap {
        constructor() {
            var value = [
                Color.Black
            ];
            super(1, 1, value);
        }
    }
    class BulletBehavior extends Component {
        constructor(gameObject) {
            super(gameObject);
        }
        update(delta) {
            const gameObject = this.gameObject;
            gameObject.position.y -= 1;
        }
    }
    class Bullet {
        constructor(position) {
            this.components = [];
            this.behavior = new BulletBehavior(this);
            this.components.push(this.behavior);
            this.position = position;
            this.image = new BulletTexture();
        }
        update(delta) {
            this.components.forEach(component => {
                if (component.enabled) {
                    component.update(delta);
                }
            });
        }
        ;
        draw() {
            Display.drawBitmap(this.image, this.position, 0);
        }
        ;
    }
    class EnemyTexture extends Bitmap {
        constructor() {
            var value = [
                Color.Black
            ];
            super(1, 1, value);
        }
    }
    class Enemy {
        constructor(position) {
            this.components = [];
            this.position = position;
            this.image = new EnemyTexture();
        }
        update(delta) {
            this.components.forEach(component => {
                if (component.enabled) {
                    component.update(delta);
                }
            });
        }
        ;
        draw() {
            Display.drawBitmap(this.image, this.position, 0);
        }
        ;
    }
    // Game
    let GameState;
    (function (GameState) {
        GameState[GameState["Idle"] = 0] = "Idle";
        GameState[GameState["ScreenCleaning"] = 1] = "ScreenCleaning";
        GameState[GameState["Play"] = 2] = "Play";
        GameState[GameState["Over"] = 3] = "Over";
    })(GameState || (GameState = {}));
    class Game {
        constructor() {
            this.childs = [];
            this.components = [];
            this.cleaner = new Components.Cleaner(this);
            this.cleaner.enabled = false;
            this.components.push(this.cleaner);
            this.clock = new Components.Clock(this);
            this.clock.enabled = true;
            this.components.push(this.clock);
            this.state = GameState.Idle;
            this.nextState = GameState.Play;
            this.reset();
        }
        update(delta) {
            switch (this.state) {
                case GameState.Idle:
                    if (Application.getButtonDown(Button.Start)) {
                        this.setState(GameState.ScreenCleaning);
                    }
                    break;
                case GameState.ScreenCleaning:
                    if (!this.cleaner.enabled) {
                        this.setState(this.nextState);
                    }
                    break;
                case GameState.Play:
                    this.ship.update(delta);
                    const waveTimer = Application.timer("wave");
                    if (waveTimer.time) {
                        for (let x = 0; x < Display.width; ++x) {
                            let rand = Utils.random(0, 2);
                            if (rand === 1) {
                                this.enemies.push(new Enemy(new Point(x, -1)));
                            }
                        }
                        this.enemies.forEach(enemy => {
                            enemy.position.y += 1;
                        });
                        waveTimer.start(1200 - this.level * 50);
                    }
                    if (this.hasCollisions()) {
                        this.setState(GameState.Over);
                    }
                    else {
                        this.enemies.forEach((enemy, indexEnemy, aEnemies) => {
                            this.ship.bullets.forEach((bullet, indexBullet, aBullets) => {
                                if (bullet.position.x === enemy.position.x && bullet.position.y === enemy.position.y) {
                                    aEnemies.splice(indexEnemy, 1);
                                    aBullets.splice(indexBullet, 1);
                                    $sound.currentTime = 0;
                                    $sound.play();
                                    this.calculateScores();
                                }
                            });
                        });
                    }
                    break;
                case GameState.Over:
                    if (Application.getButtonDown(Button.Start)) {
                        this.setState(GameState.ScreenCleaning);
                    }
                    const overTimer = Application.timer("over");
                    if (overTimer.time) {
                        this.setState(GameState.ScreenCleaning);
                    }
                    break;
            }
        }
        draw() {
            switch (this.state) {
                case GameState.Idle:
                    Display.drawBitmap(this.clock.bitmap, new Point(0, 0), 0);
                    Display.drawInfo(this.score, this.level, this.lines, "Idle");
                    break;
                case GameState.ScreenCleaning:
                    Display.drawBitmap(this.cleaner.bitmap, new Point(0, 0), 0);
                    Display.drawInfo(this.score, this.level, this.lines, "Cleaning");
                    break;
                case GameState.Play:
                    Display.clear(0);
                    this.ship.draw();
                    this.enemies.forEach(enemy => {
                        enemy.draw();
                    });
                    Display.drawInfo(this.score, this.level, this.lines, "Play");
                    break;
                case GameState.Over:
                    Display.clear(0);
                    this.ship.draw();
                    this.enemies.forEach(enemy => {
                        enemy.draw();
                    });
                    Display.drawInfo(this.score, this.level, this.lines, "Over");
                    break;
            }
        }
        setState(state) {
            switch (this.state) {
                case GameState.Idle:
                    switch (state) {
                        case GameState.ScreenCleaning:
                            this.state = state;
                            this.nextState = GameState.Play;
                            this.clock.enabled = false;
                            this.cleaner.enabled = true;
                            break;
                    }
                    break;
                case GameState.ScreenCleaning:
                    switch (state) {
                        case GameState.Play:
                            this.state = state;
                            this.reset();
                            const waveTimer = Application.timer("wave");
                            waveTimer.start(1200 - this.level * 50);
                            break;
                        case GameState.Idle:
                            this.state = state;
                            this.clock.enabled = true;
                            break;
                    }
                    break;
                case GameState.Play:
                    switch (state) {
                        case GameState.Over:
                            this.state = state;
                            const overTimer = Application.timer("over");
                            overTimer.start(2000);
                            break;
                    }
                    break;
                case GameState.Over:
                    switch (state) {
                        case GameState.ScreenCleaning:
                            this.state = state;
                            this.nextState = GameState.Idle;
                            this.cleaner.enabled = true;
                            break;
                    }
                    break;
            }
        }
        reset() {
            this.ship = new Ship(new Point(4, 18));
            this.enemies = [];
            this.score = 0;
            this.level = 0;
            this.lines = 0;
        }
        calculateScores() {
            this.score += this.level * 50 + Utils.random(0, 50) + 1;
            this.lines += 1;
            this.level = Math.min(20, Math.floor(this.lines / 20));
        }
        hasCollisions() {
            for (let i = 0; i < this.enemies.length; ++i) {
                const enemy = this.enemies[i];
                if (enemy.position.y === Display.height - 2) {
                    return true;
                }
            }
            return false;
        }
    }
})(Shooter || (Shooter = {}));
