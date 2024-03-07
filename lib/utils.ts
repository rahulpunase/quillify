import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

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

const COLORS = ['#27005D', '#900C3F', '#865DFF', '#FFB84C', '#FC2947'];

export function connectionIdToColors(connectionId: number) {
  return COLORS[connectionId % COLORS.length];
}
