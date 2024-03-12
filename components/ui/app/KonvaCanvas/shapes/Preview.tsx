import useCanvasStore from '@/store/canvas';
import { useState } from 'react';
import { Layer, Rect } from 'react-konva';

import useListeners from '../hooks/useListeners';
import canvasCustomEvents from '../services/CanvasCustomEvents';
import { Point } from '../types';
import { calculateDelta, pointerEventToCanvasPoint } from '../utils';

const Preview = () => {
  const { selectedShape, pointerDownPoints, setIsPointerDown } = useCanvasStore();

  const [delta, setDelta] = useState<Point>(null);

  const onPointerUp = (e) => {
    const { camera, pointerDownPoints, isPointerDown } = useCanvasStore.getState();
    if (!isPointerDown) return;
    const currentPoints = pointerEventToCanvasPoint(e.evt, camera);
    const deltaPoints = calculateDelta(currentPoints, pointerDownPoints);
    if (!deltaPoints.x || !deltaPoints.y) return;
    canvasCustomEvents.dispatch('ADD_SHAPE', {
      endPoint: deltaPoints,
      startPoint: pointerDownPoints,
    });
    setDelta(null);
    setIsPointerDown(false, null);
  };

  const onPointerMove = (e) => {
    const { camera, pointerDownPoints, isPointerDown } = useCanvasStore.getState();
    if (!isPointerDown) return;
    if (!pointerDownPoints) return;
    const currentPoints = pointerEventToCanvasPoint(e.evt, camera);
    setDelta(calculateDelta(currentPoints, pointerDownPoints));
  };

  useListeners((attach) => {
    attach<PointerEvent>('onPointerUp', onPointerUp);
    attach<PointerEvent>('onPointerMove', onPointerMove);
  });

  return (
    <Layer id="preview">
      {delta && pointerDownPoints && (
        <>
          {selectedShape === 'Rectangle' && (
            <Rect
              x={pointerDownPoints.x}
              y={pointerDownPoints.y}
              height={delta.y}
              width={delta.x}
              strokeWidth={2}
              stroke="#135588"
              dash={[4]}
            />
          )}
        </>
      )}
    </Layer>
  );
};

export default Preview;
