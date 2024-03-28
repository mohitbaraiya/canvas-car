import { Car } from "./car.js";
import { Road } from "./road.js";
const canvas = document.getElementById("canvas");
canvas.width = 300;
const ctx = canvas.getContext("2d");

const road = new Road(canvas.width / 2, canvas.width * 0.9);
const car = new Car(road.getLaneCenter(2), 150, 30, 50);

function animate() {
  car.update();
  canvas.height = window.innerHeight;
  road.draw(ctx);
  car.draw(ctx);
  requestAnimationFrame(animate);
}
animate();
