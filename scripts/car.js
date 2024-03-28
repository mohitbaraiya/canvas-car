import { Controls } from "./controls.js";

export class Car {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.controls = new Controls(this.update);
  }

  draw(ctx) {
    ctx.beginPath();
    /*
        first is x position
        second is y position
        third is width 
        fourth is height
        of rectangle
    */
    console.log(JSON.stringify(this.controls));
    ctx.rect(
      this.x - this.width / 2,
      this.y - this.height / 2,
      this.width,
      this.height
    );
    ctx.fill();
  }

  //   update the car
  update() {
    if (this.controls.forward) {
      this.y -= 2;
    }
    if (this.controls.reverse) {
      this.y += 2;
    }
  }
}
