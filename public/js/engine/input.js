export default class Input {
    constructor() {
        this.keys = {};
        this.keys.left = new Key();
        this.keys.right = new Key();
        this.keys.up = new Key();
        this.keys.down = new Key();
        this.mouse = {};
        this.mouse.x = 0;
        this.mouse.y = 0;

        document.addEventListener("keydown", this.handleKeyDown.bind(this));
        document.addEventListener("keyup", this.handleKeyUp.bind(this));
        document.addEventListener("mousemove", this.handleMouseMove.bind(this));
    }

    update() {
        Object.values(this.keys).forEach(function(key) {
            key.update();
        });
    }

    handleMouseMove(e) {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
    }

    handleKeyDown(e) {
        switch(e.code) {
            case "ArrowLeft":
            case "KeyA":
                this.keys.left.keyDown();
                break;

            case "ArrowRight":
            case "KeyD":
                this.keys.right.keyDown();
                break;

            case "ArrowUp":
            case "KeyW":
                this.keys.up.keyDown();
            
            case "ArrowDown":
            case "KeyS":
                this.keys.down.keyDown();
        }
    }

    handleKeyUp(e) {
        switch(e.code) {
            case "ArrowLeft":
            case "KeyA":
                this.keys.left.keyUp();
                break;

            case "ArrowRight":
            case "KeyD":
                this.keys.right.keyUp();
                break;

            case "ArrowUp":
            case "KeyW":
                this.keys.up.keyUp();
            
            case "ArrowDown":
            case "KeyS":
                this.keys.down.keyUp();
        }
    }
}

export class Key {
    constructor() {
        this.down = false;
        this.pressed = false;
        this.up = false;
        this.updated = false;
    }

    update() {
        if(this.updated) {
            this.down = false;
            this.up = false;
        }
        this.updated = true;
    }

    keyDown() {
        if(!this.pressed) {
            this.updated = false;
            this.down = true;
            this.pressed = true;
        }
    }

    keyUp() {
        this.updated = false;
        this.pressed = false;
        this.up = true;
    }
}