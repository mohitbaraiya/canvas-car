export class Controls {
  forward = false;
  reverse = false;
  right = false;
  left = false;
  constructor(type) {
    this.forward = false;
    this.reverse = false;
    this.right = false;
    this.left = false;
    switch (type) {
      case "KEYS":
        this.#keyboardListener();
        break;
      case "DUMMY":
        this.forward = true;
        break;
    }
  }

  #keyboardListener() {
    document.addEventListener("keydown", (e) => {
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
