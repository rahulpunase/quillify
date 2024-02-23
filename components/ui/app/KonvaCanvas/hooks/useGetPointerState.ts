import React, { useRef, useState } from "react";
import useStateWithRef from "./useStateWithRef";
import useListeners from "./useListeners";
import { Point } from "../types";
import { pointerEventToCanvasPoint } from "../utils";
import useCanvasStore from "@/store/canvas";
import canvasCustomEvents from "../services/CanvasCustomEvents";

const useGetPointerState = () => {
  const [isPointerDown, isPointerDownRef, setIsPointerDown] =
    useStateWithRef(false);

  const [dragPoints, dragPointRef, setDragPoints] =
    useStateWithRef<Point>(null);

  const [startPoint, startPointRef, setStartPoint] =
    useStateWithRef<Point | null>(null);

  const dragStarted = !!startPoint;

  useListeners((attach) => {
    attach("onPointerUp", (e) => {
      // canvasCustomEvents.
      if (useCanvasStore.getState().selectedShape !== "None") {
        canvasCustomEvents.dispatch<"ADD_SHAPE">("ADD_SHAPE", {
          startPoint: startPointRef.current,
          endPoint: dragPointRef.current,
        });
      }
      setIsPointerDown(false);
      setStartPoint(null);
      setDragPoints(null);
    });

    attach<PointerEvent>("onPointerDown", (e) => {
      setIsPointerDown(true);
      const camera = useCanvasStore.getState().camera;
      const startPoint = pointerEventToCanvasPoint(e.evt, camera);
      setStartPoint({
        x: startPoint.x,
        y: startPoint.y,
      });
    });

    attach<PointerEvent>("onPointerMove", (e) => {
      if (isPointerDownRef.current) {
        // dragging
        const camera = useCanvasStore.getState().camera;
        const points = pointerEventToCanvasPoint(e.evt, camera);
        setDragPoints({
          x: points.x - startPointRef.current.x,
          y: points.y - startPointRef.current.y,
        });
      }
    });
  });

  return [isPointerDown, dragStarted, startPointRef, dragPoints] as const;
};

export default useGetPointerState;
