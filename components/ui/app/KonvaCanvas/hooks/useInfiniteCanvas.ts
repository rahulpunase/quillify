import useCanvasStore from '@/store/canvas';
import { useEffect, useRef } from 'react';

import { isSpacePressed } from '../utils';
import useListeners from './useListeners';

const useInfiniteCanvas = () => {
  const { setCamera, setDimension, setSelectedShape, setMode } = useCanvasStore();

  const updatedCamera = useRef({
    x: 0,
    y: 0,
  });

  const firstOnDownPoints = useRef({
    x: 0,
    y: 0,
  });

  useListeners((attach) => {
    attach<PointerEvent>('onPointerUp', (...args) => {
      const { camera } = useCanvasStore.getState();
      updatedCamera.current = camera;
    });

    attach<PointerEvent>('onPointerDown', (e) => {
      const { downKeys } = useCanvasStore.getState();

      if (isSpacePressed(downKeys)) {
        firstOnDownPoints.current = {
          x: e.evt.clientX,
          y: e.evt.clientY,
        };
        setMode('selection');
      }
    });

    attach<PointerEvent>('onPointerMove', (e) => {
      const { downKeys, isPointerDown } = useCanvasStore.getState();
      if (isSpacePressed(downKeys) && isPointerDown) {
        const newX = updatedCamera.current.x + e.evt.clientX - firstOnDownPoints.current.x;
        const newY = updatedCamera.current.y + e.evt.clientY - firstOnDownPoints.current.y;

        setCamera({
          x: newX,
          y: newY,
        });
      }
    });
  });

  useEffect(() => {
    const onKeyUp = (e: KeyboardEvent) => {
      const { camera } = useCanvasStore.getState();
      updatedCamera.current = camera;
    };

    const onResize = () => {
      setDimension();
    };

    document.addEventListener('keyup', onKeyUp);
    window.addEventListener('resize', onResize);

    return () => {
      document.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('resize', onResize);
    };
  }, []);
};

export default useInfiniteCanvas;
