"use client";

import React, { useEffect, useRef, useState } from "react";
import { Rect, Transformer } from "react-konva";
import { useMutation } from "@/liveblocks.config";
import { RectangleConfig } from "../types";

type RectangleProps = {
  config: RectangleConfig;
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

  // const onDragMove = useMutation(({ storage }, e) => {
  //   const layers = storage.get("layers");
  //   const layer = layers.get(layerId);
  //   layer.update({
  //     ...layer,
  //     x: e.evt.clientX,
  //     y: e.evt.clientY,
  //   });
  // }, []);

  const onDragMove = () => {};
  return (
    <>
      <Rect
        x={x}
        y={y}
        ref={rectRef}
        width={width}
        height={height}
        fill="#000000"
        onClick={() => setSelected(!selected)}
        draggable
        onTransform={(e) => console.log("Transforming", e)}
        onDragMove={onDragMove}
      />
      <Transformer
        ref={tRef}
        flipEnabled={false}
        boundBoxFunc={(oldBox, newBox) => {
          // limit resize
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
