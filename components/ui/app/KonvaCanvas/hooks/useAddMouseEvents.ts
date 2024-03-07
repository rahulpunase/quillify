import useCanvasStore from '@/store/canvas';

import { pointerEventToCanvasPoint } from '../utils';
import useListeners from './useListeners';

const useAddMouseEvents = () => {
  const { setIsPointerDown } = useCanvasStore();
  useListeners((attach) => {
    attach<PointerEvent>('onPointerDown', (e) => {
      const { camera } = useCanvasStore.getState();
      const points = pointerEventToCanvasPoint(e.evt, camera);
      setIsPointerDown(true, points);
    });

    attach<PointerEvent>('onPointerUp', (e) => {
      const { camera } = useCanvasStore.getState();
      const points = pointerEventToCanvasPoint(e.evt, camera);
      setIsPointerDown(false, null);
    });

    attach('onPointerCancel', () => {
      setIsPointerDown(false, null);
    });
  });
};

export default useAddMouseEvents;
