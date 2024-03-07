import { Text } from 'konva/lib/shapes/Text';
import { nanoid } from 'nanoid';

import { Camera, Color, Point, SelectedShapeType, Shape, UnknownShape } from '../types';

export const DEFAULT_LAYER_ID = 'DEFAULT';

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
  stroke: Color,
): UnknownShape {
  if (selectedShapeType === 'Rectangle') {
    return drawRectangle(startPoint, endPoint, fill, stroke);
  }

  if (selectedShapeType === 'Text') {
    return drawText(startPoint, endPoint, fill, stroke);
  }

  if (selectedShapeType === 'Circle') {
  }

  return null;
}

export function drawRectangle(startPoint: Point, endPoint: Point, fill: Color, stroke: Color): Shape<'Rectangle'> {
  const shapeId = nanoid();
  const shape: Shape<'Rectangle'> = {
    id: shapeId,
    type: 'Rectangle',
    config: {
      x: startPoint.x,
      y: startPoint.y,
      fill: fill,
      height: endPoint.y,
      width: endPoint.x,
      isDraggable: true,
      isDragging: false,
      stroke: stroke,
      cornerRadius: 4,
    },
  };
  return shape;
}

export function drawText(startPoint: Point, endPoint: Point, fill: Color, stroke: Color): Shape<'Text'> {
  const shapeId = nanoid();
  const shape: Shape<'Text'> = {
    id: shapeId,
    type: 'Text',
    config: {
      x: startPoint.x,
      y: startPoint.y,
      fill: fill,
      height: endPoint.y,
      width: endPoint.x,
      isDraggable: true,
      isDragging: false,
      stroke: stroke,
      cornerRadius: 4,
      text: 'Type here',
      fontSize: 12,
    },
  };
  return shape;
}

export function isSpacePressed(downKeys: string[]) {
  return downKeys.includes('Space');
}

export function calculateDelta(currentPoints: Point, pointerDownPoints: Point) {
  return {
    x: currentPoints.x - pointerDownPoints.x,
    y: currentPoints.y - pointerDownPoints.y,
  };
}

export function drawCircle(position) {}
