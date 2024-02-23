import { Point } from "../types";

type Params = {
  ADD_SHAPE: {
    startPoint: Point;
    endPoint: Point;
  };
};

type CustomEvents = {
  ADD_SHAPE: CustomEvent<Params["ADD_SHAPE"]>;
};

class CanvasCustomEvents {
  private container: HTMLDivElement = null;

  init(div: HTMLDivElement) {
    this.container = div;
    return this;
  }

  addEventListener<K extends keyof CustomEvents>(
    key: K,
    fn: (evt: CustomEvents[K]) => void
  ) {
    this.container.addEventListener(key, fn);
  }

  dispatch<K extends keyof CustomEvents>(key: K, details: Params[K]) {
    const customEvent = new CustomEvent(key as string, {
      detail: details,
    });
    this.container.dispatchEvent(customEvent);
  }
}

export default new CanvasCustomEvents();
