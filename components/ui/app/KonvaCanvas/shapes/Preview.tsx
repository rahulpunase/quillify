import useCanvasStore from '@/store/canvas';
import { memo, useRef, useState } from 'react';
import { Layer, Rect } from 'react-konva';

import useListeners from '../hooks/useListeners';
import usePointer from '../hooks/usePointer';
import useStateWithRef from '../hooks/useStateWithRef';
import canvasCustomEvents from '../services/CanvasCustomEvents';
import { Point } from '../types';
import { calculateDelta, pointerEventToCanvasPoint } from '../utils';

const Preview = () => {
  const { selectedShape, pointerDownPoints } = useCanvasStore();

  const [delta, setDelta] = useState<Point>(null);

  useListeners((attach) => {
    attach<PointerEvent>('onPointerUp', (e) => {
      const { camera, pointerDownPoints } = useCanvasStore.getState();
      const currentPoints = pointerEventToCanvasPoint(e.evt, camera);
      const deltaPoints = calculateDelta(currentPoints, pointerDownPoints);
      if (!deltaPoints.x || !deltaPoints.y) return;
      canvasCustomEvents.dispatch('ADD_SHAPE', {
        endPoint: deltaPoints,
        startPoint: pointerDownPoints,
      });
      setDelta(null);
    });

    attach<PointerEvent>('onPointerMove', (e) => {
      const { camera, pointerDownPoints } = useCanvasStore.getState();
      if (!pointerDownPoints) return;
      const currentPoints = pointerEventToCanvasPoint(e.evt, camera);
      setDelta(calculateDelta(currentPoints, pointerDownPoints));
    });
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

          {/* {selectedShape === 'Text' && (
            <Rect
              x={startPoint.current.x}
              y={startPoint.current.y}
              height={delta.y}
              width={delta.x}
              strokeWidth={1}
              stroke="#135588"
            />
          )} */}
        </>
      )}
    </Layer>
  );
};

export default Preview;
