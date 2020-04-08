const flock = [];
const flockSize = 100;

function setup() {
    createCanvas(640, 640);
    for (let i = 0; i < flockSize; i++) {
        flock.push(new Boid());
    }
}

function draw() {
    background(30);

    for (let boid of flock) {
        boid.update();
        boid.show();
    }
}