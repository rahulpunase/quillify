import {
  Camera,
  Color,
  MetaShapeType,
  Point,
  SelectedShapeType,
} from "@/components/ui/app/KonvaCanvas/types";
import { create } from "zustand";

type CanvasStore = {
  selectedShape: SelectedShapeType;
  setSelectedShape: (shape: SelectedShapeType) => void;

  camera: Camera;
  setCamera: (camera: Camera) => void;

  lastColor: Color;
  setLastColor: (color: Color) => void;

  dimension: Dimension;
  setDimension: () => void;

  dragStartPoint: Point;
  isDragging: boolean;
  onDragStart: (startPoint: Point) => void;
  onDragEnd: (endPoint: Point) => void;
};

export type Dimension = {
  height: number;
  width: number;
};

const useCanvasStore = create<CanvasStore>()((set) => ({
  selectedShape: "None",
  setSelectedShape: (shape: SelectedShapeType) =>
    set(() => ({
      selectedShape: shape,
    })),

  camera: { x: 0, y: 0 },
  setCamera: (camera: Camera) =>
    set(() => ({
      camera,
    })),

  lastColor: {
    r: 0,
    b: 0,
    g: 0,
  },
  setLastColor: (color: Color) =>
    set(() => ({
      lastColor: color,
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
}));

export default useCanvasStore;
