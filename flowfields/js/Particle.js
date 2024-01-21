class Particle {
  constructor({ colour } = {}) {
    this.pos = createVector(random(width), random(height));
    this.velocity = createVector();
    // this.velocity = p5.Vector.random2D();
    this.acc = createVector();
    this.maxspeed = 1;
    // this.colour = color(random(0, 128), 0, random(128, 255), 128);
    this.colour = colour ? color(colour) : color(255, 128, 0, 40);
    this.colour.setAlpha(40);
  }

  follow(field) {
    const force = field.lookup(this.pos);
    this.applyForce(force);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.velocity.add(this.acc);
    this.velocity.limit(this.maxspeed);
    this.pos.add(this.velocity);
    this.acc.mult(0);
  }

  draw() {
    // fill(0, 0, 255);
    stroke(this.colour);
    // circle(this.pos.x, this.pos.y, 4);
    point(this.pos.x, this.pos.y);
  }
}
