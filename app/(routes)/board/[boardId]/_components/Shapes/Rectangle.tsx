import { RectangleLayer } from "@/store/canvas";
import React from "react";

type Rectangle = {
  id: string;
  layer: RectangleLayer;
};
const Rectangle = ({ id, layer }: Rectangle) => {
  const { x, y, height, width, fill } = layer;
  return (
    <rect
      className="drop-shadow-md"
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
      x={0}
      y={0}
      width={width}
      height={height}
      strokeWidth={1}
      fill="#000000"
      stroke="transparent"
    />
  );
};

export default Rectangle;
