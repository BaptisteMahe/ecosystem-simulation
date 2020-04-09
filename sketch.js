const flock = [];
const flockSize = 100;
let alignmentSlider, cohesionSlider, separationSlider;

function setup() {
    createCanvas(800, 640);
    alignmentSlider = createSlider(0, 5, 1, 0.1);
    cohesionSlider = createSlider(0, 5, 1, 0.1);
    separationSlider = createSlider(0, 5, 1, 0.1);
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