import { Camera } from "@/store/canvas";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function debounce(cb: (query: string) => void, delay: number) {
  let timer: NodeJS.Timeout | number | null = null;
  return function (...args: unknown[]) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(cb, delay, ...args);
  };
}

const COLORS = ["#27005D", "#900C3F", "#865DFF", "#FFB84C", "#FC2947"];

export function connectionIdToColors(connectionId: number) {
  return COLORS[connectionId % COLORS.length];
}

export function pointerEventToCanvasPoint(
  e: React.PointerEvent,
  camera: Camera
) {
  return {
    x: Math.round(e.clientX) - camera.x,
    y: Math.round(e.clientY) - camera.y,
  };
}
