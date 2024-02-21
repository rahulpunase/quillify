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

export enum ToolSelectedType {
  Rectangle,
  Ellipse,
  Path,
  Text,
  Note,
}

export type AllToolsType =
  | ToolSelectedType.Rectangle
  | ToolSelectedType.Ellipse
  | ToolSelectedType.Note
  | ToolSelectedType.Path
  | ToolSelectedType.Text;

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
  type: ToolSelectedType.Rectangle;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Color;
  value?: string;
};

export type EllipseLayer = {
  type: ToolSelectedType.Ellipse;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Color;
  value?: string;
};

export type PathLayer = {
  type: ToolSelectedType.Path;
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
  type: ToolSelectedType.Text;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Color;
  value?: string;
};

export type NoteLayer = {
  type: ToolSelectedType.Note;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Color;
  value?: string;
};

export type PossibleTools =
  | ToolSelectedType.Ellipse
  | ToolSelectedType.Rectangle
  | ToolSelectedType.Text
  | ToolSelectedType.Note;

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
      toolSelectedType: PossibleTools;
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
      toolSelectedType: PossibleTools;
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

  dimension: Dimension;
  setDimension: () => void;
};

export type Layer = RectangleLayer | EllipseLayer | TextLayer | NoteLayer;

export type Dimension = {
  height: number;
  width: number;
};

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
}));

export default useCanvasStore;
