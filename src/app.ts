import { Map_t } from "./map";

class App {
  private counter: number;
  private max: number;
  private map: Map_t;

  constructor() {
    this.counter = 0;
    this.max = 10; // TODO: check it.

    this.map = new Map_t(10, 10);
  }

  run() {
    this.update();
  }

  private async update(): Promise<void> {
    while (this.counter < this.max) {
      this.map.draw();
      this.map.update();
      await this.sleep();
      this.counter++;
    }
  }

  private sleep(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
  }
}
export default new App();
