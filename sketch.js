const flock = [];
const flockSize = 200;

function setup() {
    createCanvas(800, 640);
    for (let i = 0; i < flockSize; i++) {
        flock.push(new Boid());
    }
}

function draw() {
    background(30);

    for (let boid of flock) {
        boid.edges();
        boid.flock(flock);
        boid.update();
        boid.show();
    }
}