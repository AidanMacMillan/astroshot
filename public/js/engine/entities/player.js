import Entity from "../entity.js";
import Planet from "./planet.js";

export default class Player extends Entity {
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.rotation = 0;
        this.vX = 0;
        this.vY = 0;
        this.moveSpeed = 5;
        this.stickForce = 1;
        this.jumpForce = 8;

        this.jetpackEnabled = false;
        this.jetpackForce = 0.12;

        this.planet = {};
        this.planet.dist = 0;
        this.planet.x = 0;
        this.planet.y = 0;

        this.grounded = false;
    }

    update(game) {
        this.physics(game);

        if(game.input.keys.left.pressed) {
            let angle = -this.moveSpeed/this.planet.dist*game.time.deltaTime;
            this.x = (this.x-this.planet.x) * Math.cos(angle) - (this.y-this.planet.y) * Math.sin(angle) + this.planet.x;
            this.y = (this.y-this.planet.y) * Math.cos(angle) + (this.x-this.planet.x) * Math.sin(angle) + this.planet.y;

            this.vX = this.vX * Math.cos(angle) - this.vY * Math.sin(angle);
            this.vY = this.vY * Math.cos(angle) + this.vX * Math.sin(angle);
        }

        if(game.input.keys.right.pressed) {
            let angle = this.moveSpeed/this.planet.dist*game.time.deltaTime;
            this.x = (this.x-this.planet.x) * Math.cos(angle) - (this.y-this.planet.y) * Math.sin(angle) + this.planet.x;
            this.y = (this.y-this.planet.y) * Math.cos(angle) + (this.x-this.planet.x) * Math.sin(angle) + this.planet.y;
        }

        if(this.grounded && game.input.keys.up.down) {
            this.vX = this.jumpForce * Math.cos(this.rotation - Math.PI/2);
            this.vY = this.jumpForce * Math.sin(this.rotation - Math.PI/2);
        }

        if(!this.grounded && game.input.keys.up.up) {
            this.jetpackEnabled = true;
        }

        if(this.grounded) {
            this.jetpackEnabled = false;
        }

        if(this.jetpackEnabled && game.input.keys.up.pressed) {
            this.vX += this.jetpackForce * Math.cos(this.rotation - Math.PI/2);
            this.vY += this.jetpackForce * Math.sin(this.rotation - Math.PI/2);
        }

        this.x += this.vX * game.time.deltaTime;
        this.y += this.vY * game.time.deltaTime;
    }

    physics(game) {
        let closest;
        let closestDist = Infinity; 

        Object.values(game.entities).forEach(function(entity) {
            if(entity instanceof Planet) {
                let dX = entity.x - this.x;
                let dY = entity.y - this.y;
                let distSqr = dX*dX + dY*dY;
                let dist = Math.sqrt(distSqr);

                if(dist-entity.radius < closestDist) {
                    closest = entity;
                    closestDist = dist-entity.radius;
                }
            }
        }.bind(this));

        if(closest) {
            let entity = closest;
            let dX = entity.x - this.x;
            let dY = entity.y - this.y;
            let distSqr = dX*dX + dY*dY;
            let dist = Math.sqrt(distSqr);

            this.planet.dist = dist;
            this.planet.x = entity.x;
            this.planet.y = entity.y;

            if(dX < 0) {
                if((Math.atan(dY/dX) + Math.PI/2) - this.rotation > Math.PI) {
                    this.rotation += Math.PI * 2;
                }

                if((Math.atan(dY/dX) + Math.PI/2) - this.rotation < -Math.PI) {
                    this.rotation -= Math.PI * 2;
                }
                
                this.rotation += ((Math.atan(dY/dX) + Math.PI/2) - this.rotation)*0.05;
            } else {
                if((Math.atan(dY/dX) - Math.PI/2) - this.rotation > Math.PI) {
                    this.rotation += Math.PI * 2;
                }

                if((Math.atan(dY/dX) - Math.PI/2) - this.rotation < -Math.PI) {
                    this.rotation -= Math.PI * 2;
                }
                
                this.rotation += ((Math.atan(dY/dX) - Math.PI/2) - this.rotation)*0.05;
            }

            if(dist < 0.5 + entity.radius) {
                this.x = entity.x + dX/dist * -(0.5 + entity.radius);
                this.y = entity.y + dY/dist * -(0.5 + entity.radius);
                this.vX = 0;
                this.vY = 0;
            } else {
                let force = entity.mass / dist * 0.1;

                this.vX += force * dX / dist;
                this.vY += force * dY / dist;
            }

            if(dist < 0.5 + entity.radius + 0.01) {
                this.grounded = true;
            } else {
                this.grounded = false;
            }
        }
    }

    draw(game) {
        let camera = game.entities.camera;
        let pos = camera.worldToScreen(this.x, this.y);

        game.ctx.beginPath();
        game.ctx.fillStyle = "rgb(255,255,255)";
        game.ctx.arc(game.width/2 + (pos.x)*camera.unit(),
                     game.height/2 + (pos.y)*camera.unit(),
                     camera.unit()/2, 0, 2 * Math.PI, false);
        game.ctx.fill();
    }
}