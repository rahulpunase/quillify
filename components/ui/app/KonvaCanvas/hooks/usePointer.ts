import useCanvasStore from '@/store/canvas';
import { useRef, useState } from 'react';

import { Point } from '../types';
import { pointerEventToCanvasPoint } from '../utils';

const usePointer = () => {
  const [delta, setDelta] = useState<Point | null>(null);
  const startPoint = useRef<Point>({
    x: 0,
    y: 0,
  });

  const deltaRef = useRef<Point>({
    x: 0,
    y: 0,
  });

  const setStartPoint = (ev: PointerEvent | null) => {
    if (!ev) {
      startPoint.current = null;
      return;
    }
    const { camera } = useCanvasStore.getState();
    const point = pointerEventToCanvasPoint(ev, camera);
    startPoint.current = point;
    console.log(startPoint);
  };

  const setDeltaToPoints = (ev: PointerEvent | null) => {
    if (!ev) {
      setDelta(null);
      deltaRef.current = null;
      return;
    }
    const { camera, isPointerDown } = useCanvasStore.getState();
    if (isPointerDown && ev) {
      const points = pointerEventToCanvasPoint(ev, camera);
      const X = points.x - startPoint.current.x;
      const Y = points.y - startPoint.current.y;
      deltaRef.current = {
        x: X,
        y: Y,
      };
      setDelta({
        x: X,
        y: Y,
      });
    }
  };

  return [startPoint, delta, deltaRef, setStartPoint, setDeltaToPoints] as const;
};

export default usePointer;
