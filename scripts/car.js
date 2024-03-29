import { Controls } from "./controls.js";
import { Road } from "./road.js";
import { Sensor } from "./sensor.js";

export class Car {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.controls = new Controls(this.update);
    this.speed = 0;
    this.acceleration = 0.2;
    this.maxSpeed = 5;
    this.friction = 0.05;
    this.angle = 0;
    this.sensor = new Sensor(this);
    this.polygon = [];
    this.damaged = false;
  }

  // car draw method
  draw(ctx) {
    ctx.beginPath();

    this.polygon[0].x;
    ctx.moveTo(this.polygon[0].x, this.polygon[0].y);
    for (let i = 1; i < this.polygon.length; i++) {
      ctx.lineTo(this.polygon[i].x, this.polygon[i].y);
    }
    ctx.fill();
    this.sensor.draw(ctx);
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
  // create polygon
  #createPolygon() {
    let points = [];
    const radius = Math.hypot(this.width, this.height) / 2;
    const alpha = Math.atan2(this.width, this.height);
    points.push({
      x: this.x - Math.sin(this.angle - alpha) * radius,
      y: this.y - Math.cos(this.angle - alpha) * radius,
    });
    points.push({
      x: this.x - Math.sin(this.angle + alpha) * radius,
      y: this.y - Math.cos(this.angle + alpha) * radius,
    });
    points.push({
      x: this.x - Math.sin(Math.PI + this.angle - alpha) * radius,
      y: this.y - Math.cos(Math.PI + this.angle - alpha) * radius,
    });
    points.push({
      x: this.x - Math.sin(Math.PI + this.angle + alpha) * radius,
      y: this.y - Math.cos(Math.PI + this.angle + alpha) * radius,
    });

    return points;
  }
  #assessedDamaged(roadBorders) {
    for (let i = 0; i < roadBorders.length; i++) {
      if (polyIntersect(this.polygon, roadBorders[i])) {
        return true;
      }
    }
    return false;
  }

  //   update the car
  update(roadBorders) {
    this.#move();
    this.sensor.update(roadBorders);
    this.polygon = this.#createPolygon();
  }
}
