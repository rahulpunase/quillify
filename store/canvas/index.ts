import { Camera, Color, Point, SelectedShapeType } from '@/components/ui/app/KonvaCanvas/types';
import { create } from 'zustand';

type CanvasStore = {
  selectedShape: SelectedShapeType;
  setSelectedShape: (shape: SelectedShapeType) => void;

  camera: Camera;
  setCamera: (camera: Camera) => void;

  strokeColor: Color;
  fill: Color;
  setColor: (param: { strokeColor?: Color; fill?: Color }) => void;

  dimension: Dimension;
  setDimension: () => void;

  scale: number;
  setScale: (scale: number) => void;

  dragStartPoint: Point;
  isDragging: boolean;
  onDragStart: (startPoint: Point) => void;
  onDragEnd: (endPoint: Point) => void;

  downKeys: string[];
  setDownKeys: (key: string) => void;
  setUpKeys: (key: string) => void;
};

export type Dimension = {
  height: number;
  width: number;
};

const useCanvasStore = create<CanvasStore>()((set) => ({
  selectedShape: 'None',
  setSelectedShape: (shape: SelectedShapeType) =>
    set(() => ({
      selectedShape: shape,
    })),

  camera: { x: 0, y: 0 },
  setCamera: (camera: Camera) =>
    set(() => ({
      camera,
    })),

  dimension: {
    width: window.innerWidth,
    height: window.innerHeight,
  },
  setDimension: () =>
    set(() => ({
      dimension: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
    })),

  dragStartPoint: {
    x: 0,
    y: 0,
  },
  isDragging: false,
  onDragStart: (point) =>
    set(() => ({
      dragStartPoint: point,
    })),
  onDragEnd: (point) => set(() => ({})),

  scale: 1,
  setScale: (scale) =>
    set(() => ({
      scale,
    })),

  strokeColor: '#222222',
  fill: '#222222',
  setColor: ({ strokeColor, fill }) =>
    set(() => ({
      strokeColor: strokeColor ?? '#222222',
      fill: fill ?? '#222222',
    })),

  downKeys: [],
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
}));

export default useCanvasStore;
