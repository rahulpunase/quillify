import React, { memo, useState } from "react";
import { Layer, Rect } from "react-konva";
import useCanvasStore, { Dimension } from "@/store/canvas";

import useGetPointerState from "../hooks/useGetPointerState";

const Preview = memo(() => {
  const { selectedShape } = useCanvasStore();

  const [dimension, setDimension] = useState<Dimension>({
    height: 100,
    width: 100,
  });

  const [isPointerDown, dragStarted, startPointRef, dragPoints] =
    useGetPointerState();

  return (
    <Layer id="preview">
      {dragPoints && startPointRef.current && (
        <>
          {selectedShape === "Rectangle" && (
            <Rect
              x={startPointRef.current.x}
              y={startPointRef.current.y}
              height={dragPoints.y}
              width={dragPoints.x}
              strokeWidth={2}
              stroke="#135588"
              dash={[4]}
            />
          )}
        </>
      )}
    </Layer>
  );
});

export default Preview;
