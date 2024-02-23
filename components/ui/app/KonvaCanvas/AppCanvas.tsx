'use client';

import { cn } from '@/lib/utils';
import useCanvasStore from '@/store/canvas';
import { KonvaEventObject } from 'konva/lib/Node';
import React, { Suspense } from 'react';
import { Stage } from 'react-konva';

import Info from './components/Info';
import Participants from './components/Participants';
import Toolbar from './components/Toolbar';
import useInfiniteCanvas from './hooks/useInfiniteCanvas';
import useInitiateKonva from './hooks/useInitiateKonva';
import useListeners from './hooks/useListeners';
import Background from './shapes/Background';
import Preview from './shapes/Preview';
import ShapeViewer from './shapes/ShapeViewer';

type AppCanvasProps = {
  boardId: string;
};

const AppCanvas = ({ boardId }: AppCanvasProps) => {
  const { dimension, camera, scale } = useCanvasStore();
  const [isSpacePressed, isPointerPressed] = useInfiniteCanvas();
  const listeners = useListeners(() => null);
  const stage = useInitiateKonva();

  const onPointerDownHandler = (e: KonvaEventObject<PointerEvent>) => {
    listeners.get('onPointerDown')?.forEach((listener) => listener(e));
  };

  const onPointerMoveHandler = (e: KonvaEventObject<PointerEvent>) => {
    listeners.get('onPointerMove')?.forEach((listener) => listener(e));
  };

  const onPointerUpHandler = (e: KonvaEventObject<PointerEvent>) => {
    listeners.get('onPointerUp')?.forEach((listener) => listener(e));
  };

  // const onWheelHandler = (ev: KonvaEventObject<WheelEvent>) => {
  //   setScale(scale * 0.04);
  // };

  return (
    <div
      className={cn(
        'w-[100vw] h-[100vh]',
        isSpacePressed && 'cursor-grab',
        isPointerPressed && isSpacePressed && 'cursor-grabbing',
      )}
    >
      <Stage
        width={dimension.width}
        height={dimension.height}
        onPointerMove={onPointerMoveHandler}
        onPointerUp={onPointerUpHandler}
        onPointerDown={onPointerDownHandler}
        // onWheel={onWheelHandler}
        ref={stage}
        x={camera.x}
        y={camera.y}
        // onClick={() => {
        //   setScale(2);
        // }}
        scale={{
          x: scale,
          y: scale,
        }}
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
};

export default AppCanvas;
