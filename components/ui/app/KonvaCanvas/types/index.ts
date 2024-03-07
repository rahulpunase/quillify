import { CircleConfig } from 'konva/lib/shapes/Circle';
import { RectConfig } from 'konva/lib/shapes/Rect';
import { TextConfig } from 'konva/lib/shapes/Text';

export type ShapeId = string;
export type LayerId = string;

export type MetaShapeType = 'Rectangle' | 'Circle' | 'Text' | 'Path' | 'Line';

export type Camera = {
  x: number;
  y: number;
};

export type Color = string;

export type KnownShapeConfig<K extends MetaShapeType> = K extends 'Rectangle'
  ? RectConfig
  : K extends 'Circle'
    ? CircleConfig
    : K extends 'Text'
      ? TextConfig
      : never;

export type DefaultShape = {
  id: ShapeId;
};

export type Shape<K extends MetaShapeType> = DefaultShape & {
  type: K;
  config: KnownShapeConfig<K>;
};

export type UnknownShape = Shape<'Rectangle'> | Shape<'Circle'> | Shape<'Text'> | Shape<'Path'>;

export type Layer = {
  id: LayerId;
  isVisible: boolean;
  shapes: UnknownShape[];
};

export type Point = {
  x: number;
  y: number;
};

export type SelectedShapeType = MetaShapeType | 'None';

export type Modes = 'selection' | 'insertion' | 'deletion' | 'transformation';
