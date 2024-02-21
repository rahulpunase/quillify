"use client";

import React, { Suspense, useEffect, useRef, useState } from "react";
import { Stage, Layer, Text, Group } from "react-konva";
import useInitiateKonva from "./hooks/useInitiateKonva";
import Rectangle from "./shapes/Rect";
import Info from "./components/Info";
import Participants from "./components/Participants";
import Toolbar from "./components/Toolbar";
import { useStorage } from "@/liveblocks.config";
import ShapeViewer from "./shapes/ShapeViewer";
import Background from "./shapes/Background";
import "./canvas.css";
import { cn } from "@/lib/utils";
import { KonvaEventObject } from "konva/lib/Node";
import useCanvasStore from "@/store/canvas";

type AppCanvasProps = {
  boardId: string;
};

const AppCanvas = ({ boardId }: AppCanvasProps) => {
  const [onPointerMove, onPointerUp] = useInitiateKonva();
  const { dimension, setDimension, camera, setCamera } = useCanvasStore();

  const isSpacePressedRef = useRef(false);
  const [isSpacePressed, setIsSpacePressed] = useState(false);

  const [isPointerPressed, setIsPointerPressed] = useState(false);
  const isPointerPressedRef = useRef(false);

  const firstOnDownPoints = useRef({
    x: 0,
    y: 0,
  });

  const updatedCamera = useRef({
    x: 0,
    y: 0,
  });

  const stage = useRef();

  useEffect(() => {
    document.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.code === "Space") {
        setIsSpacePressed(true);
        isSpacePressedRef.current = true;
      }
    });
    document.addEventListener("keyup", (e: KeyboardEvent) => {
      if (e.code === "Space") {
        if (e.code === "Space") {
          setIsSpacePressed(false);
          isSpacePressedRef.current = false;
        }
      }
    });

    window.addEventListener("resize", function () {
      //TODO: Add throttling
      setDimension();
    });
  }, []);

  const onPointerDownHandler = (e: KonvaEventObject<PointerEvent>) => {
    setIsPointerPressed(true);
    isPointerPressedRef.current = true;

    if (isSpacePressedRef.current) {
      firstOnDownPoints.current = {
        x: e.evt.clientX,
        y: e.evt.clientY,
      };
    }
  };

  const onPointerMoveHandler = (e: KonvaEventObject<PointerEvent>) => {
    // onPointerMove(e);
    // if dragging across the canvas
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
  };

  const onPointerUpHandler = (e: KonvaEventObject<PointerEvent>) => {
    setIsPointerPressed(false);
    isPointerPressedRef.current = false;
    updatedCamera.current.x = camera.x;
    updatedCamera.current.y = camera.y;
    // onPointerUp(e);
    // console.log(camera.x);
    // if (isSpacePressedRef.current) {
    //   firstOnDownPoints.current = {
    //     x: camera.x,
    //     y: camera.y,
    //   };
    // }
  };

  const onWheelHandler = () => {};

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
        <Suspense>
          <ShapeViewer />
        </Suspense>
      </Stage>
      <Info boardId={boardId} />
      <Participants />
      <Toolbar />
    </div>
  );
};

export default AppCanvas;
