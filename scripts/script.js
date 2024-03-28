import { Car } from "./car.js";
const canvas = document.getElementById("canvas");
canvas.height = window.innerHeight;
canvas.width = 300;
const ctx = canvas.getContext("2d");

const car = new Car(150, 150, 30, 50);

function animate() {
  car.update();
  car.draw(ctx);
  requestAnimationFrame(animate);
}
animate();
