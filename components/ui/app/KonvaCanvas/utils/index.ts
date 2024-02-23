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

export function pointerEventToCanvasPoint(e: PointerEvent, camera: Camera) {
  return {
    x: Math.round(e.clientX) - camera.x,
    y: Math.round(e.clientY) - camera.y,
  };
}

export function drawShape(
  selectedShapeType: SelectedShapeType,
  startPoint: Point,
  endPoint: Point,
  fill: Color,
  stroke: Color
): UnknownShape {
  if (selectedShapeType === "Rectangle") {
    return drawRectangle(startPoint, endPoint, fill, stroke);
  }

  if (selectedShapeType === "Circle") {
  }

  return null;
}

export function drawRectangle(
  startPoint: Point,
  endPoint: Point,
  fill: Color,
  stroke: Color
): Shape<"Rectangle"> {
  const shapeId = nanoid();
  const shape: Shape<"Rectangle"> = {
    id: shapeId,
    type: "Rectangle",
    config: {
      x: startPoint.x,
      y: startPoint.y,
      fill: fill,
      height: endPoint.y,
      width: endPoint.x,
      isDraggable: true,
      isDragging: false,
      stroke: stroke,
      roundedCorners: 4,
    },
  };
  return shape;
}

export function drawCircle(position) {}
