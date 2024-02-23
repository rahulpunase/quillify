import useCanvasStore from '@/store/canvas';
import { useEffect, useRef } from 'react';

import useListeners from './useListeners';
import useStateWithRef from './useStateWithRef';

const useInfiniteCanvas = () => {
  const { setCamera, setDimension, setSelectedShape, setDownKeys, setUpKeys } = useCanvasStore();

  const [isSpacePressed, isSpacePressedRef, setIsSpacePressed] = useStateWithRef<boolean>(false);

  const [isPointerPressed, isPointerPressedRef, setIsPointerPressed] = useStateWithRef<boolean>(false);

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
      setIsPointerPressed(false);
    });

    attach<PointerEvent>('onPointerDown', (e) => {
      setIsPointerPressed(true);
      if (isSpacePressedRef.current) {
        firstOnDownPoints.current = {
          x: e.evt.clientX,
          y: e.evt.clientY,
        };
        setSelectedShape('None');
      }
    });

    attach<PointerEvent>('onPointerMove', (e) => {
      const { downKeys } = useCanvasStore.getState();
      if (isSpacePressedRef.current && isPointerPressedRef.current) {
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
    const onKeyDown = (e: KeyboardEvent) => {
      setDownKeys(e.code);
      if (e.code === 'Space') {
        setIsSpacePressed(true);
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      setUpKeys(e.code);
      if (e.code === 'Space') {
        setIsSpacePressed(false);
      }
      const { camera } = useCanvasStore.getState();
      updatedCamera.current = camera;
    };

    const onResize = () => {
      setDimension();
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
    window.addEventListener('resize', onResize);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return [isSpacePressed, isPointerPressed] as const;
};

export default useInfiniteCanvas;
