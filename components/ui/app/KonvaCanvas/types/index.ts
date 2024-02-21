export type ShapeId = string;
export type LayerId = string;

export type MetaShapeType = "Rectangle" | "Circle" | "Text" | "Path";

export type Color = {
  r: number;
  g: number;
  b: number;
};

export type RectangleConfig = {
  x: number;
  y: number;
  height: number;
  width: number;
  isDragging: boolean;
  isDraggable: boolean;
  value?: string;
  fill: Color;
  stroke: Color;
};

export type CircleConfig = {
  x: number;
  y: number;
  height: number;
  width: number;
  isDragging: boolean;
  isDraggable: boolean;
  value?: string;
  fill: Color;
  stroke: Color;
};

export type TextConfig = {
  x: number;
  y: number;
  height: number;
  width: number;
  isDragging: boolean;
  isDraggable: boolean;
  value: string;
  fill: Color;
  stroke: Color;
};

export type KnownShapeConfig<K extends MetaShapeType> = K extends "Rectangle"
  ? RectangleConfig
  : K extends "Circle"
  ? CircleConfig
  : K extends "Text"
  ? TextConfig
  : never;

export type DefaultShape = {
  id: ShapeId;
};

export type Shape<K extends MetaShapeType> = DefaultShape & {
  type: K;
  config: KnownShapeConfig<K>;
};

export type UnknownShape =
  | Shape<"Rectangle">
  | Shape<"Circle">
  | Shape<"Text">
  | Shape<"Path">;

export type Layer = {
  id: LayerId;
  isVisible: boolean;
  shapes: UnknownShape[];
};
