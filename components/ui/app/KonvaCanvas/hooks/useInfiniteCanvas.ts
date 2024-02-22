import { useEffect, useRef } from "react";
import useStateWithRef from "./useStateWithRef";
import useCanvasStore from "@/store/canvas";
import useListeners from "./useListeners";
import { KonvaEventObject } from "konva/lib/Node";

const useInfiniteCanvas = () => {
  const { setCamera, camera } = useCanvasStore();

  const [isSpacePressed, isSpacePressedRef, setIsSpacePressed] =
    useStateWithRef<boolean>(false);

  const [isPointerPressed, isPointerPressedRef, setIsPointerPressed] =
    useStateWithRef<boolean>(false);

  const updatedCamera = useRef({
    x: 0,
    y: 0,
  });

  const firstOnDownPoints = useRef({
    x: 0,
    y: 0,
  });

  useListeners((attach) => {
    attach<PointerEvent>("onPointerUp", () => {
      setIsPointerPressed(false);
      updatedCamera.current = {
        x: camera.x,
        y: camera.y,
      };
    });

    attach<PointerEvent>("onPointerDown", (e) => {
      setIsPointerPressed(true);
      if (isSpacePressedRef.current) {
        firstOnDownPoints.current = {
          x: e.evt.clientX,
          y: e.evt.clientY,
        };
        // setSelectedShape("None");
      }
    });

    attach<PointerEvent>("onPointerMove", (e) => {
      if (isSpacePressedRef.current && isPointerPressedRef.current) {
        const newX =
          updatedCamera.current.x + e.evt.clientX - firstOnDownPoints.current.x;
        const newY =
          updatedCamera.current.y + e.evt.clientY - firstOnDownPoints.current.y;

        setCamera({
          x: newX,
          y: newY,
        });
      }
    });
  });

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        setIsSpacePressed(true);
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        setIsSpacePressed(false);
      }
    };

    // const onResize = () => {
    //   setDimension();
    // };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);
    // window.addEventListener("resize", onResize);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", onKeyUp);
      // window.removeEventListener("resize", onResize);
    };
  }, []);

  return [isSpacePressed, isPointerPressed] as const;
};

export default useInfiniteCanvas;
