export class Controls {
  forward = false;
  reverse = false;
  right = false;
  left = false;
  constructor() {
    this.forward = false;
    this.reverse = false;
    this.right = false;
    this.left = false;
    this.#keyboardListener();
  }

  #keyboardListener() {
    document.addEventListener("keydown", (e) => {
      console.log(this);
      switch (e.key) {
        case "ArrowUp":
          this.forward = true;
          break;
        case "ArrowDown":
          this.reverse = true;
          break;
        case "ArrowLeft":
          this.left = true;
          break;
        case "ArrowRight":
          this.right = true;
          break;
      }
    });
    document.addEventListener("keyup", (e) => {
      switch (e.key) {
        case "ArrowUp":
          this.forward = false;
          break;
        case "ArrowDown":
          this.reverse = false;
          break;
        case "ArrowLeft":
          this.left = false;
          break;
        case "ArrowRight":
          this.right = false;
          break;
      }
    });
  }
}
