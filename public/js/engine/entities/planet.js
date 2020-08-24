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
        var grd = game.ctx.createRadialGradient(game.width/2 + (pos.x)*camera.unit(), game.height/2 + (pos.y)*camera.unit(), this.radius*camera.unit(), 
                                                game.width/2 + (pos.x)*camera.unit(), game.height/2 + (pos.y)*camera.unit(), this.radius*camera.unit()+camera.unit()*2);
        grd.addColorStop(0, "rgba(255,255,255,0.02)");
        grd.addColorStop(1, "rgba(255,255,255,0)");

        game.ctx.fillStyle = grd;
        game.ctx.arc(game.width/2 + (pos.x)*camera.unit(),
                     game.height/2 + (pos.y)*camera.unit(),
                     this.radius*camera.unit()+camera.unit()*2, 0, 2 * Math.PI, false);
        game.ctx.fill();

        game.ctx.beginPath();
        game.ctx.fillStyle = "rgb(255,255,255)";
        game.ctx.arc(game.width/2 + (pos.x)*camera.unit(),
                     game.height/2 + (pos.y)*camera.unit(),
                     this.radius*camera.unit(), 0, 2 * Math.PI, false);
        game.ctx.fill();

        game.ctx.beginPath();
        game.ctx.fillStyle = "rgb(248,248,248)";
        game.ctx.arc(game.width/2 + (pos.x)*camera.unit(),
                     game.height/2 + (pos.y)*camera.unit(),
                     this.radius*camera.unit()-camera.unit()/4, 0, 2 * Math.PI, false);
        game.ctx.fill();
    }
}