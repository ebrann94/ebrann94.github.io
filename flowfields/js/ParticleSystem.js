class ParticleSystem {
  constructor(amt = 100, { particleColour } = {}) {
    this.amt = amt;
    this.particles = [];
    this.particleColour = particleColour || "#ffffff";
  }

  init() {
    for (let i = 0; i < this.amt; i++) {
      this.particles.push(new Particle({ colour: this.particleColour }));
    }
  }

  reset() {
    this.particles = [];
    this.init();
  }

  update(flowfield) {
    for (let i = 0; i < this.amt; i++) {
      const particle = this.particles[i];
      particle.follow(flowfield);
      particle.update();
      particle.draw();
    }
  }

  setColour(colour) {
    this.particleColour = colour;
  }
}
