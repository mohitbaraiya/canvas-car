import { Controls } from "./controls.js";
import { Road } from "./road.js";
import { Sensor } from "./sensor.js";
import { polysIntersect } from "./utils.js";

export class Car {
  constructor(x, y, width, height, options = { maxSpeed: 5, type: "KEYS" }) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = 0;
    this.acceleration = 0.2;
    this.maxSpeed = options.maxSpeed || 5;
    this.friction = 0.05;
    this.angle = 0;
    this.polygon = [];
    this.damaged = false;
    this.polygon = this.#createPolygon();
    this.type = options.type;
    this.controls = new Controls(this.type);

    if (this.type === "KEYS") {
      this.sensor = new Sensor(this);
    }
  }

  // car draw method
  draw(ctx) {
    if (this.damaged) {
      ctx.fillStyle = "red";
    } else {
      ctx.fillStyle = "black";
    }
    ctx.beginPath();
    this.polygon[0].x;
    ctx.moveTo(this.polygon[0].x, this.polygon[0].y);
    for (let i = 1; i < this.polygon.length; i++) {
      ctx.lineTo(this.polygon[i].x, this.polygon[i].y);
    }
    ctx.fill();
    this.sensor && this.sensor.draw(ctx);
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
      // console.log(polysIntersect(this.polygon, roadBorders[i]));
      if (
        polysIntersect(this.polygon, [
          roadBorders[i].top,
          roadBorders[i].bottom,
        ])
      ) {
        return true;
      }
    }
    return false;
  }

  //   update the car
  update(roadBorders) {
    if (!this.damaged) {
      this.#move();
      this.polygon = this.#createPolygon();

      this.damaged = this.#assessedDamaged(roadBorders);
    }
    this.sensor && this.sensor.update(roadBorders);
  }
}
