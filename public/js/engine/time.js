export default class Time {
    constructor() {
        this.time = 0;
        this.deltaTime = 0;
    }

    step(time) {
        this.deltaTime = (time - this.time)/1000;
        this.time = time;
    }
}