'use client';

import { cn } from '@/lib/utils';
import useCanvasStore from '@/store/canvas';
import { KonvaEventObject } from 'konva/lib/Node';
import React, { Suspense } from 'react';
import { Stage } from 'react-konva';

import CanvasContextMenu from './components/CanvasContextMenu';
import Info from './components/Info';
import Participants from './components/Participants';
import Toolbar from './components/Toolbar';
import useAddKeyBoardEvents from './hooks/useAddKeyBoardEvents';
import useAddMouseEvents from './hooks/useAddMouseEvents';
import useInfiniteCanvas from './hooks/useInfiniteCanvas';
import useInitiateKonva from './hooks/useInitiateKonva';
import useListeners from './hooks/useListeners';
import Background from './shapes/Background';
import Presence from './shapes/Presence';
import Preview from './shapes/Preview';
import ShapeViewer from './shapes/ShapeViewer';
import { isSpacePressed } from './utils';

type AppCanvasProps = {
  boardId: string;
};

const AppCanvas = ({ boardId }: AppCanvasProps) => {
  const { dimension, camera, scale, downKeys, isPointerDown, mousePointOnShape } = useCanvasStore();
  useInfiniteCanvas();
  const listeners = useListeners(() => null);
  const stage = useInitiateKonva();
  useAddKeyBoardEvents();
  useAddMouseEvents();

  const onPointerDownHandler = (e: KonvaEventObject<PointerEvent>) => {
    if (e.target.attrs.name === 'background') {
      listeners.get('onPointerDown')?.forEach((listener) => listener.call(listener, e));
    }
  };

  const onPointerMoveHandler = (e: KonvaEventObject<PointerEvent>) => {
    listeners.get('onPointerMove')?.forEach((listener) => listener.call(listener, e));
  };

  const onPointerUpHandler = (e: KonvaEventObject<PointerEvent>) => {
    listeners.get('onPointerUp')?.forEach((listener) => listener.call(listener, e));
  };

  const onPointerCandleHandler = (e: KonvaEventObject<PointerEvent>) => {
    listeners.get('onPointerCancel')?.forEach((listener) => listener.call(listener, e));
  };

  const isSpacePressedDown = isSpacePressed(downKeys);

  return (
    <div
      className={cn(
        'w-[100vw] h-[100vh]',
        isSpacePressedDown && 'cursor-grab',
        isPointerDown && isSpacePressedDown && 'cursor-grabbing',
        mousePointOnShape && 'cursor-move',
      )}
    >
      <Presence />
      {/* <div className="w-[100vw] absolute left-0 top-0 h-[100vh] " /> */}

      <CanvasContextMenu>
        <Stage
          width={dimension.width}
          height={dimension.height}
          onPointerMove={onPointerMoveHandler}
          onPointerUp={onPointerUpHandler}
          onPointerDown={onPointerDownHandler}
          onPointerCancel={onPointerCandleHandler}
          onContextMenu={(e) => {
            // e.evt.preventDefault();
          }}
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
      </CanvasContextMenu>
      <Info boardId={boardId} />
      <Participants />
      <Toolbar />
    </div>
  );
};

export default AppCanvas;
