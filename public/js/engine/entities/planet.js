import Entity from "../entity.js";

export default class Planet extends Entity {
    constructor(x, y, radius, mass) {
        super();
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.mass = mass;
    }

    draw(game) {
        let camera = game.entities.camera;
        let pos = camera.worldToScreen(this.x, this.y);

        game.ctx.beginPath();
        game.ctx.arc(game.width/2 + (pos.x)*camera.unit(),
                     game.height/2 + (pos.y)*camera.unit(),
                     this.radius*camera.unit(), 0, 2 * Math.PI, false);
        game.ctx.fill();
    }
}