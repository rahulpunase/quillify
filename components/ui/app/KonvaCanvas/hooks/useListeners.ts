import { KonvaEventObject } from "konva/lib/Node";
import { useEffect } from "react";
import { KonvaNodeEvents } from "react-konva";

type FnToAttach = <T>(e: KonvaEventObject<T>) => void;

class Listeners {
  private listeners = new Map<keyof KonvaNodeEvents, Array<FnToAttach>>();

  getListeners() {
    return this.listeners;
  }

  addListeners(key: keyof KonvaNodeEvents, fn: FnToAttach) {
    const prevFns = this.listeners.get(key) ?? [];
    this.listeners.set(key, [...prevFns, fn]);
  }
}

const listener = new Listeners();

type Attach = <T>(
  key: keyof KonvaNodeEvents,
  fnToAttach: (e: KonvaEventObject<T>) => void
) => void;

const useListeners = (fn: (attach: Attach) => void) => {
  useEffect(() => {
    fn(listener.addListeners.bind(listener));
  }, []);

  return listener.getListeners();
};

export default useListeners;
