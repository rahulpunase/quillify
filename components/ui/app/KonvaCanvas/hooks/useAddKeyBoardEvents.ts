import useCanvasStore from '@/store/canvas';
import { useEffect } from 'react';

const useAddKeyBoardEvents = () => {
  const { setUpKeys, setDownKeys } = useCanvasStore();
  useEffect(() => {
    const onKeyPressed = (e: KeyboardEvent) => {};

    const onKeydown = (e: KeyboardEvent) => {
      setDownKeys(e.code);
    };

    const onkeyup = (e: KeyboardEvent) => {
      setUpKeys(e.code);
    };

    document.addEventListener('keypress', onKeyPressed);
    document.addEventListener('keydown', onKeydown);
    document.addEventListener('keyup', onkeyup);

    return () => {
      document.removeEventListener('keypress', onKeyPressed);
      document.removeEventListener('keydown', onKeydown);
      document.removeEventListener('keyup', onkeyup);
    };
  }, []);
};

export default useAddKeyBoardEvents;
