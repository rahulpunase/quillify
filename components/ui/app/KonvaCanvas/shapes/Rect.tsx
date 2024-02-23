'use client';

import { RectConfig } from 'konva/lib/shapes/Rect';
import React, { useEffect, useRef, useState } from 'react';
import { Rect, Transformer } from 'react-konva';

type RectangleProps = {
  config: RectConfig;
};

const Rectangle = ({ config }: RectangleProps) => {
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

  return (
    <>
      <Rect
        x={x}
        y={y}
        ref={rectRef}
        width={width}
        height={height}
        fill={config.fill}
        stroke={config.stroke}
        onClick={() => setSelected(!selected)}
        draggable
        onTransform={(e) => console.log('Transforming', e)}
        onDragMove={onDragMove}
        onTransformEnd={onTransformEnd}
        // cornerRadius={6}
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
