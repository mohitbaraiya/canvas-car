import { Controls } from "./controls.js";

export class Car {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.controls = new Controls(this.update);
    this.speed = 0;
    this.acceleration = 0.2;
    this.maxSpeed = 3;
    this.friction = 0.05;
    this.angle = 0;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(-this.angle);
    /*
        first is x position
        second is y position
        third is width 
        fourth is height
        of rectangle
    */
    ctx.rect(-this.width / 2, -this.height / 2, this.width, this.height);
    ctx.fill();
    ctx.restore();
  }

  //   move the car
  #move() {
    // set speed  for forward direction
    if (this.controls.forward) {
      this.speed += this.acceleration;
    }

    // set speed for reverse direction
    if (this.controls.reverse) {
      this.speed -= this.acceleration;
    }

    // check for max forwards speed
    if (this.speed > this.maxSpeed) {
      this.speed = this.maxSpeed;
    }

    // check for max reverse speed
    if (this.speed < -this.maxSpeed / 2) {
      this.speed = -this.maxSpeed / 2;
    }

    // if speed is greater than 0 it reduce by friction
    if (this.speed > 0) {
      this.speed -= this.friction;
    }

    // if speed is less than 0 it reduce by friction
    if (this.speed < 0) {
      this.speed += this.friction;
    }

    if (Math.abs(this.speed) < this.friction) {
      this.speed = 0;
    }
    // move car by a speed in up direction

    // fix backward issue
    if (this.speed !== 0) {
      const flip = this.speed > 0 ? 1 : -1;

      // move horizontal car by a speed in
      if (this.controls.left * flip) {
        this.angle += 0.03;
      }
      if (this.controls.right * flip) {
        this.angle -= 0.03;
      }
    }

    this.x -= Math.sin(this.angle) * this.speed;
    this.y -= Math.cos(this.angle) * this.speed;
  }
  //   update the car
  update() {
    this.#move();
  }
}
