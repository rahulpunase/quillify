"use client";

import React, { Suspense, memo, useEffect, useRef } from "react";
import { Stage } from "react-konva";
import useInitiateKonva from "./hooks/useInitiateKonva";
import Info from "./components/Info";
import Participants from "./components/Participants";
import Toolbar from "./components/Toolbar";
import ShapeViewer from "./shapes/ShapeViewer";
import Background from "./shapes/Background";
import "./canvas.css";
import { cn } from "@/lib/utils";
import { KonvaEventObject } from "konva/lib/Node";
import useCanvasStore from "@/store/canvas";
import useListeners from "./hooks/useListeners";
import useInfiniteCanvas from "./hooks/useInfiniteCanvas";
import Preview from "./shapes/Preview";
import { useSelf, useUser } from "@/liveblocks.config";
import useUserStore from "@/store/user";

type AppCanvasProps = {
  boardId: string;
};

const AppCanvas = memo(({ boardId }: AppCanvasProps) => {
  const { dimension, camera } = useCanvasStore();
  const [isSpacePressed, isPointerPressed] = useInfiniteCanvas();
  const listeners = useListeners(() => null);

  useInitiateKonva();

  const stage = useRef();

  const onPointerDownHandler = (e: KonvaEventObject<PointerEvent>) => {
    listeners.get("onPointerDown")?.forEach((listener) => listener(e));
  };

  const onPointerMoveHandler = (e: KonvaEventObject<PointerEvent>) => {
    listeners.get("onPointerMove")?.forEach((listener) => listener(e));
  };

  const onPointerUpHandler = (e: KonvaEventObject<PointerEvent>) => {
    listeners.get("onPointerUp")?.forEach((listener) => listener(e));
  };

  const onWheelHandler = () => {};

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div
      className={cn(
        "w-[100vw] h-[100vh]",
        isSpacePressed && "cursor-grab",
        isPointerPressed && isSpacePressed && "cursor-grabbing"
      )}
    >
      <Stage
        width={dimension.width}
        height={dimension.height}
        onPointerMove={onPointerMoveHandler}
        onPointerUp={onPointerUpHandler}
        onPointerDown={onPointerDownHandler}
        onWheel={onWheelHandler}
        ref={stage}
        x={camera.x}
        y={camera.y}
      >
        <Background />
        <Preview />
        <Suspense>
          <ShapeViewer />
        </Suspense>
      </Stage>
      <Info boardId={boardId} />
      <Participants />
      <Toolbar />
    </div>
  );
});

export default AppCanvas;
