class Boid {
    constructor() {
        this.perception = {
            alignment: 100,
            cohesion: 30,
            separation: 20
        };
        this.color = 255;
        this.size = 8;

        this.position = createVector(random(width), random(height));
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(2, 4));
        this.acceleration = createVector();
        this.maxForce = 0.7;
        this.maxSpeed = 4;
    }

    edges() {
        if (this.position.x > width) {
            this.position.x = 0;
        } else if (this.position.x < 0) {
            this.position.x = width;
        }

        if (this.position.y > height) {
            this.position.y = 0;
        } else if (this.position.y < 0) {
            this.position.y = height;
        }
    }

    findNeighbors(boids, perceptionRadius) {
        let neighbor = [];
        for (let other of boids) {
            let distance = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            if (other != this && distance < perceptionRadius) {
                neighbor.push(other);
            }
        }
        return neighbor;
    }

    alignment(boids) {
        let steering = createVector();
        let neighbors = this.findNeighbors(boids, this.perception.alignment);
        for (let other of neighbors) {
            steering.add(other.velocity);
        }
        if (neighbors.length) {
            steering.div(neighbors.length);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }
        return steering;
    }

    cohesion(boids) {
        let steering = createVector();
        let neighbors = this.findNeighbors(boids, this.perception.cohesion);
        for (let other of neighbors) {
            steering.add(other.position);
        }
        if (neighbors.length) {
            steering.div(neighbors.length);
            steering.sub(this.position);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }
        return steering;
    }

    separation(boids) {
        let steering = createVector();
        let neighbors = this.findNeighbors(boids, this.perception.separation);
        for (let other of neighbors) {
            let diff = p5.Vector.sub(this.position, other.position);
            let distance = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            diff.div(distance);
            steering.add(diff);
        }
        if (neighbors.length) {
            steering.div(neighbors.length);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }
        return steering;
    }

    flock(boids) {
        let alignment = this.alignment(boids);
        let cohesion = this.cohesion(boids);
        let separation = this.separation(boids);

        this.acceleration.set(0, 0);
        this.acceleration.add(alignment);
        this.acceleration.add(cohesion);
        this.acceleration.add(separation);
    }

    update() {
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
    }

    show() {
        strokeWeight(this.size);
        stroke(this.color);
        point(this.position.x, this.position.y)
    }
}