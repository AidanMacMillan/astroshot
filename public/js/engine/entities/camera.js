import Entity from "../entity.js";

export default class Camera extends Entity {
    constructor(x, y, rotation, zoom) {
        super();
        this.x = x;
        this.y = y;
        this.mouseOffset = 0;
        this.mouseOffset = 0;
        this.rotation = rotation;
        this.zoom = zoom;
    }

    update(game) {
        this.rotation = game.entities.player.rotation + Math.PI;

        let mouseOffset = this.mouseToScreen(game.input.mouse.x - game.width/2, game.input.mouse.y - game.height/2);

        this.x = game.entities.player.x + mouseOffset.x/250;
        this.y = game.entities.player.y + mouseOffset.y/250;
    }

    unit() {
        return game.height/this.zoom;
    }

    mouseToScreen(x, y) {
        let offsetX = this.x - x;
        let offsetY = this.y - y;

        let pos = {};
        pos.x = offsetX * Math.cos(this.rotation) - offsetY * Math.sin(this.rotation);
        pos.y = offsetY * Math.cos(this.rotation) + offsetX * Math.sin(this.rotation);
        return pos;
    }

    worldToScreen(x, y) {
        let offsetX = this.x - x;
        let offsetY = this.y - y;

        let pos = {};
        pos.x = offsetX * Math.cos(-this.rotation) - offsetY * Math.sin(-this.rotation);
        pos.y = offsetY * Math.cos(-this.rotation) + offsetX * Math.sin(-this.rotation);
        return pos;
    }
}