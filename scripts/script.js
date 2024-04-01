import { Car } from "./car.js";
import { Road } from "./road.js";
const canvas = document.getElementById("canvas");
canvas.width = 300;
const ctx = canvas.getContext("2d");
const road = new Road(canvas.width / 2, canvas.width * 0.9);
const car = new Car(road.getLaneCenter(1), 150, 30, 50, { type: "KEYS" });
const traffic = [
  new Car(road.getLaneCenter(1), -150, 30, 50, { type: "DUMMY", maxSpeed: 3 }),
];
function animate() {
  canvas.height = window.innerHeight;

  ctx.save();
  ctx.translate(0, -car.y + canvas.height * 0.8);
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].update(road.borders, []);
  }
  car.update(road.borders, traffic);
  road.draw(ctx);
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].draw(ctx);
  }
  car.draw(ctx);
  ctx.restore();
  requestAnimationFrame(animate);
}
animate();
