class FlowField {
  constructor() {
    this.scl = 10;
    this.field = [];
    this.intensity = 5;
  }

  init() {
    this.cols = Math.floor(width / this.scl);
    this.rows = Math.floor(height / this.scl);

    this.field = new Array(this.cols);
    for (let i = 0; i < this.cols; i++) {
      this.field[i] = new Array(this.rows);
    }

    noiseSeed(random(10000));

    const incr = this.intensity / 100;

    let xoff = 0;
    for (let i = 0; i < this.cols; i++) {
      let yoff = 0;
      for (let j = 0; j < this.rows; j++) {
        // let angle = noise(xoff, yoff) * TWO_PI;
        let noiseVal = noise(xoff, yoff);
        let angle = noiseVal * TWO_PI;
        const v = p5.Vector.fromAngle(angle);
        // v.setMag();
        this.field[i][j] = v;
        yoff += incr;
      }
      xoff += incr;
    }
  }

  lookup(position) {
    let column = constrain(floor(position.x / this.scl), 0, this.cols - 1);
    let row = constrain(floor(position.y / this.scl), 0, this.rows - 1);

    return this.field[column][row].copy();
  }

  draw() {
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        stroke(255);
        push();
        translate(i * this.scl, j * this.scl);
        const v = this.field[i][j];
        rotate(v.heading());
        line(0, 0, this.scl, 0);

        pop();
      }
    }
  }

  setIntensity(intensity) {
    this.intensity = intensity;
  }
}
