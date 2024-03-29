import { getIntersection, linearInterpolataion } from "./utils.js";

export class Sensor {
  constructor(car, options = { raysCount: 5, raysLength: 500 }) {
    this.car = car;
    this.raysCount = options.raysCount || 5;
    this.raysLength = options.raysLength || 500;
    this.raysSpread = Math.PI / 2; // 45 deg
    this.rays = [];
    this.readings = [];
  }

  #castRays() {
    this.rays = [];
    for (let i = 0; i < this.raysCount; i++) {
      const rayAngle =
        linearInterpolataion(
          this.raysSpread / 2,
          -(this.raysSpread / 2),
          this.raysCount === 1 ? 0.5 : i / (this.raysCount - 1)
        ) + this.car.angle;
      const start = { x: this.car.x, y: this.car.y };
      const end = {
        x: this.car.x - Math.sin(rayAngle) * this.raysLength,
        y: this.car.y - Math.cos(rayAngle) * this.raysLength,
      };
      this.rays.push({ start: start, end: end });
    }
  }
  #getReadings(ray, roadBorders) {
    const touches = [];
    for (let j = 0; j < roadBorders.length; j++) {
      const border = roadBorders[j];

      const touch = getIntersection(
        ray.start,
        ray.end,
        border.top,
        border.bottom
      );
      if (touch) {
        touches.push(touch);
      }
    }
    if (touches.length === 0) {
      return null;
    } else {
      const offsets = touches.map((touch) => touch.offset);
      const nearestOffset = Math.min(...offsets);
      return touches.find((touch) => touch.offset === nearestOffset);
    }
  }
  update(roadBorders) {
    this.#castRays();
    this.readings = this.rays.map((ray) => this.#getReadings(ray, roadBorders));
  }

  draw(ctx) {
    for (let i = 0; i < this.rays.length; i++) {
      const ray = this.rays[i];

      let end = ray.end;
      if (this.readings[i]) {
        end = this.readings[i];
      }
      ctx.beginPath();
      ctx.strokeStyle = "yellow";
      ctx.lineWidth = 2;
      ctx.moveTo(ray.start.x, ray.start.y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();
      ctx.beginPath();
      ctx.strokeStyle = "red";
      ctx.lineWidth = 2;
      ctx.moveTo(end.x, end.y);
      ctx.lineTo(ray.end.x, ray.end.y);
      ctx.stroke();
    }
  }
}
