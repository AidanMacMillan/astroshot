import Player from "./engine/entities/player.js";
import Planet from "./engine/entities/planet.js";
import Camera from "./engine/entities/camera.js";
import Input from "./engine/input.js";
import Time from "./engine/time.js";

class Game {
    constructor() {
        this.canvas = document.getElementById("game");
        this.ctx = this.canvas.getContext("2d");

        this.width = this.canvas.width;
        this.height = this.canvas.height;

        this.input = new Input();
        this.time = new Time();

        this.entities = {};
        this.entities.planetA = new Planet(8,8,3,6);
        this.entities.planetB = new Planet(15,0,4,8);
        this.entities.planetC = new Planet(6,0,2,4);
        this.entities.player = new Player(0,0);
        this.entities.camera = new Camera(0,0,0,20);
    }
    
    start() {
        Object.values(this.entities).forEach(function(entity) {
            entity.start(this);
        }.bind(this));

        window.requestAnimationFrame(this.update.bind(this));
    }

    update(time) {
        this.time.step(time);

        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;
        this.width = this.canvas.width;
        this.height = this.canvas.height;

        this.input.update();
        Object.values(this.entities).forEach(function(entity) {
            entity.update(this);
        }.bind(this));

        Object.values(this.entities).forEach(function(entity) {
            entity.draw(this);
        }.bind(this));

        window.requestAnimationFrame(this.update.bind(this));
    } 
}

var game = new Game();
game.start();
console.log(game);