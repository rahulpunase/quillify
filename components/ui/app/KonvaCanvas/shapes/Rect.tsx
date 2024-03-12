'use client';

import useCanvasStore from '@/store/canvas';
import { KonvaEventObject } from 'konva/lib/Node';
import { RectConfig } from 'konva/lib/shapes/Rect';
import React, { useEffect, useRef, useState } from 'react';
import { Rect, Transformer } from 'react-konva';

type RectangleProps = {
  config: RectConfig;
};

const Rectangle = ({ config }: RectangleProps) => {
  const { setMousePointOnShape, setMode } = useCanvasStore();
  const { fill, height, width, x, y } = config;
  const [selected, setSelected] = useState(false);
  const rectRef = useRef();
  const tRef = useRef(null);

  useEffect(() => {
    if (!rectRef.current) return;
    if (!tRef.current) return;
    if (selected) {
      tRef.current.nodes([rectRef.current]);
      tRef.current.getLayer().batchDraw();
    }
  }, [rectRef, tRef, selected]);

  const onDragMove = () => {};
  const onTransformEnd = (e) => {
    console.log(e);
  };

  const onClickHandler = (e: KonvaEventObject<MouseEvent>) => {
    e.evt.stopPropagation();
    setSelected(!selected);
    setMode('selection');
  };

  const onTransformHandler = () => {
    setMode('selection');
  };

  const onDragStartedHandler = () => {
    setMode('selection');
  };

  return (
    <>
      <Rect
        name="rect"
        x={x}
        y={y}
        ref={rectRef}
        width={width}
        height={height}
        fill={config.fill}
        stroke={config.stroke}
        strokeWidth={config.strokeWidth ?? 2}
        onClick={onClickHandler}
        draggable
        onTransform={onTransformHandler}
        onDragMove={onDragMove}
        onDragStart={onDragStartedHandler}
        onTransformEnd={onTransformEnd}
        onTransformStart={() => console.log('started')}
        onPointerOver={() => setMousePointOnShape(true)}
        onPointerLeave={() => setMousePointOnShape(false)}
        onPointerDown={(e) => {
          console.log('shape', e);
        }}
      />
      <Transformer
        ref={tRef}
        flipEnabled={false}
        boundBoxFunc={(oldBox, newBox) => {
          if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
            return oldBox;
          }
          return newBox;
        }}
      />
    </>
  );
};

export default Rectangle;
