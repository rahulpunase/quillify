import useCanvasStore from "@/store/canvas";
import React, { memo } from "react";
import { Layer, Rect } from "react-konva";

const DISTANCE = 100;

const Background = memo(() => {
  const { dimension, camera } = useCanvasStore();

  const gridBox = [];
  const rowBoxes = Math.floor((dimension.width * 2) / DISTANCE);
  const columnBoxes = Math.floor((dimension.height * 2) / DISTANCE);

  const stepX = Math.round(camera.x / DISTANCE) + 4;
  const stepY = Math.round(camera.y / DISTANCE) + 4;

  for (let i = -stepY; i < columnBoxes - stepY; i++) {
    for (let j = -stepX; j < rowBoxes - stepX; j++) {
      gridBox.push(
        <Rect
          x={j * DISTANCE}
          y={i * DISTANCE}
          height={DISTANCE}
          width={DISTANCE}
          stroke="#bdbbbb"
          strokeWidth={2}
          cornerRadius={4}
        />
      );
    }
  }

  return <Layer id="background">{gridBox}</Layer>;
});

export default Background;
