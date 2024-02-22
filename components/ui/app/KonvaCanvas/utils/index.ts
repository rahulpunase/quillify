import {
  Camera,
  Color,
  Point,
  SelectedShapeType,
  Shape,
  UnknownShape,
} from "../types";
import { nanoid } from "nanoid";

export const DEFAULT_LAYER_ID = "DEFAULT";

export function getColor(r: number, g: number, b: number): Color {
  return {
    r,
    g,
    b,
  };
}

export function pointerEventToCanvasPoint(e: PointerEvent, camera: Camera) {
  return {
    x: Math.round(e.clientX) - camera.x,
    y: Math.round(e.clientY) - camera.y,
  };
}

export function drawShape(
  selectedShapeType: SelectedShapeType,
  position: Point,
  fill: Color,
  stroke: Color
): UnknownShape {
  if (selectedShapeType === "Rectangle") {
    return drawRectangle(position, fill, stroke);
  }

  if (selectedShapeType === "Circle") {
  }

  return null;
}

export function drawRectangle(
  position,
  fill: Color,
  stroke: Color
): Shape<"Rectangle"> {
  const shapeId = nanoid();
  const shape: Shape<"Rectangle"> = {
    id: shapeId,
    type: "Rectangle",
    config: {
      x: position.x,
      y: position.y,
      fill: fill,
      height: 100,
      width: 100,
      isDraggable: true,
      isDragging: false,
      stroke: stroke,
    },
  };
  return shape;
}

export function drawCircle(position) {}
