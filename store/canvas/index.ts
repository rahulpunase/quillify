import { create } from "zustand";

export type Color = {
  r: number;
  g: number;
  b: number;
};

export type Camera = {
  x: number;
  y: number;
};

export enum LayerType {
  Rectangle,
  Ellipse,
  Path,
  Text,
  Note,
}

export enum CanvasSelectedMode {
  None,
  Inserting,
  Resizing,
  Translating,
  Pressing,
  Selection,
  Pencil,
}

export type RectangleLayer = {
  type: LayerType.Rectangle;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Color;
  value?: string;
};

export type EllipseLayer = {
  type: LayerType.Ellipse;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Color;
  value?: string;
};

export type PathLayer = {
  type: LayerType.Ellipse;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Color;
  points: number[][];
  value?: string;
};

export type Point = {
  x: number;
  y: number;
};

export type Rect = {
  x: number;
  y: number;
  height: number;
  width: number;
};

export enum Side {
  Top = 1,
  Bottom = 2,
  Left = 4,
  Right = 8,
}

export type TextLayer = {
  type: LayerType.Text;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Color;
  value?: string;
};

export type NoteLayer = {
  type: LayerType.Note;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Color;
  value?: string;
};

export type PossibleLayers =
  | LayerType.Ellipse
  | LayerType.Rectangle
  | LayerType.Text
  | LayerType.Note;

type CanvasState =
  | {
      mode: CanvasSelectedMode.None;
    }
  | {
      mode: CanvasSelectedMode.Selection;
      origin: Point;
      current?: Point;
    }
  | {
      mode: CanvasSelectedMode.Translating;
      current: Point;
      layerType: PossibleLayers;
    }
  | {
      mode: CanvasSelectedMode.Pressing;
      origin: Point;
    }
  | {
      mode: CanvasSelectedMode.Resizing;
      initialBounds: Rect;
      corner: Side;
    }
  | {
      mode: CanvasSelectedMode.Inserting;
      layerType: PossibleLayers;
    }
  | {
      mode: CanvasSelectedMode.Pencil;
    };

type CanvasStore = {
  state: CanvasState;
  setCanvasState: (state: CanvasState) => void;

  camera: Camera;
  setCamera: (camera: Camera) => void;

  lastColor: Color;
  setLastColor: (color: Color) => void;
};

export type Layers =
  | RectangleLayer
  | EllipseLayer
  | PathLayer
  | TextLayer
  | NoteLayer;

const useCanvasStore = create<CanvasStore>()((set) => ({
  state: {
    mode: CanvasSelectedMode.None,
  },
  setCanvasState: (state: CanvasState) => {
    set(() => ({
      state: state,
    }));
  },

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
}));

export default useCanvasStore;
