import { linearInterpolataion } from "./utils.js";

export class Road {
  constructor(x, width, laneCount = 3) {
    this.x = x;
    this.width = width;
    this.laneCount = laneCount;
    this.left = x - width / 2;
    this.right = x + width / 2;
    const infinity = 10000000;
    this.top = -infinity;
    this.bottom = infinity;
    const topLeft = { x: this.left, y: this.top };
    const topRight = { x: this.right, y: this.top };
    const bottomLeft = { x: this.left, y: this.bottom };
    const bottomRight = { x: this.right, y: this.bottom };
    this.borders = [
      { top: topLeft, bottom: bottomLeft },
      { top: topRight, bottom: bottomRight },
    ];
  }

  getLaneCenter(laneIndex) {
    const laneWidth = this.width / this.laneCount;
    return (
      this.left +
      laneWidth / 2 +
      Math.min(laneIndex, this.laneCount) * laneWidth
    );
  }
  draw(ctx) {
    ctx.lineWidth = 5;
    ctx.strokeStyle = "yellow";
    for (let i = 1; i <= this.laneCount - 1; i++) {
      const x = linearInterpolataion(this.left, this.right, i / this.laneCount);

      ctx.strokeStyle = "white";
      ctx.beginPath();
      ctx.setLineDash([20, 20]);
      ctx.moveTo(x, this.top);
      ctx.lineTo(x, this.bottom);
      ctx.stroke();
    }

    ctx.setLineDash([]);
    for (let i = 0; i < this.borders.length; i++) {
      const border = this.borders[i];
      ctx.strokeStyle = "yellow";
      ctx.beginPath();
      ctx.moveTo(border.top.x, border.top.y);
      ctx.lineTo(border.bottom.x, border.bottom.y);
      ctx.stroke();
    }
  }
}
