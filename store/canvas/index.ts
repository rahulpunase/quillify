import { Camera, Color, Modes, Point, SelectedShapeType } from '@/components/ui/app/KonvaCanvas/types';
import { create } from 'zustand';

type CanvasStore = {
  selectedShape: SelectedShapeType;
  camera: Camera;
  strokeColor: Color;
  fill: Color;
  dimension: Dimension;
  scale: number;
  downKeys: string[];
  isPointerDown: boolean;
  mousePointOnShape: boolean;
  mode: Modes;
  pointerDownPoints: Point | null;

  setSelectedShape: (shape: SelectedShapeType) => void;
  setCamera: (camera: Camera) => void;
  setColor: (param: { strokeColor?: Color; fill?: Color }) => void;
  setDimension: () => void;
  setScale: (scale: number) => void;
  setDownKeys: (key: string) => void;
  setUpKeys: (key: string) => void;
  setIsPointerDown: (bool: boolean, pointerDownPoints: Point) => void;
  setMousePointOnShape: (bool: boolean) => void;
  setMode: (mode: Modes) => void;
};

export type Dimension = {
  height: number;
  width: number;
};

const useCanvasStore = create<CanvasStore>()((set) => ({
  selectedShape: 'None',
  camera: { x: 0, y: 0 },
  dimension: {
    width: window.innerWidth,
    height: window.innerHeight,
  },
  dragStartPoint: {
    x: 0,
    y: 0,
  },
  scale: 1,
  strokeColor: '#222222',
  fill: '#535050',
  downKeys: [],
  mousePointOnShape: false,
  isPointerDown: false,
  mode: 'selection',
  pointerDownPoints: null,
  pointerUpPoints: null,

  setSelectedShape: (shape: SelectedShapeType) =>
    set(() => ({
      selectedShape: shape,
      mode: 'insertion',
    })),

  setCamera: (camera: Camera) =>
    set(() => ({
      camera,
    })),

  setDimension: () =>
    set(() => ({
      dimension: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
    })),

  setScale: (scale) =>
    set(() => ({
      scale,
    })),

  setColor: ({ strokeColor, fill }) =>
    set(() => ({
      strokeColor: strokeColor ?? '#222222',
      fill: fill ?? '#535050',
    })),

  setDownKeys: (key: string) =>
    set(({ downKeys }) => {
      const allKeys = [...downKeys];
      const alreadyAvailableKeyIndex = allKeys.findIndex((_key) => _key === key);
      if (alreadyAvailableKeyIndex > -1) {
        return {
          downKeys: allKeys,
        };
      }
      allKeys.push(key);
      return {
        downKeys: allKeys,
      };
    }),

  setUpKeys: (key: string) =>
    set(({ downKeys }) => {
      const allKeys = [...downKeys];
      const alreadyAvailableKeyIndex = allKeys.findIndex((_key) => _key === key);
      if (alreadyAvailableKeyIndex > -1) {
        allKeys.splice(alreadyAvailableKeyIndex, 1);
        return {
          downKeys: allKeys,
        };
      }
      return {
        downKeys: allKeys,
      };
    }),

  setIsPointerDown: (bool, pointerDownPoints) =>
    set(() => ({
      isPointerDown: bool,
      pointerDownPoints,
    })),

  setMousePointOnShape: (bool: boolean) =>
    set(() => ({
      mousePointOnShape: bool,
    })),

  setMode: (mode: Modes) =>
    set(() => ({
      mode,
      selectedShape: 'None',
    })),
}));

export default useCanvasStore;
