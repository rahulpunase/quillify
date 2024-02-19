"use client";
import React, { useCallback } from "react";
import Info from "./Info";
import Participants from "./Participants";
import Toolbar from "./Toolbar";
import { useSelf, useMutation, useStorage } from "@/liveblocks.config";
import CursorPresence from "./CursorPresence";
import useCanvasStore, { Point, PossibleLayers } from "@/store/canvas";
import { pointerEventToCanvasPoint } from "@/lib/utils";
import { root } from "postcss";

type CanvasProps = {
  boardId: string;
};

const MAX_LAYERS = 60;

const Canvas = ({ boardId }: CanvasProps) => {
  const { camera, setCamera, lastColor, setLastColor } = useCanvasStore();

  const layerIds = useStorage((root) => root.layerIds);

  const insertLayer = useMutation(
    (
      { storage, setMyPresence },
      possibleLayers: PossibleLayers,
      position: Point
    ) => {
      const liveLayers = storage.get("layers");
      if (liveLayers.size >= MAX_LAYERS) {
        return;
      }

      const liveLayerIds = storage.get("layerIds");
    },
    []
  );

  const onPointerMove = useMutation(
    ({ setMyPresence }, e: React.PointerEvent) => {
      e.preventDefault();

      const current = pointerEventToCanvasPoint(e, camera);
      setMyPresence({
        cursor: current,
      });
    },
    []
  );

  const onPointerLeave = useMutation(({ setMyPresence }) => {
    setMyPresence({
      cursor: null,
    });
  }, []);

  const onWheel = useCallback((e: React.WheelEvent) => {
    setCamera({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY,
    });
  }, []);

  return (
    <div>
      <Info boardId={boardId} />
      <Participants />
      <Toolbar />
      <svg
        className="w-[100vw] h-[100vh]"
        onWheel={onWheel}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
        <g
          style={{
            transform: `translate(${camera.x}px, ${camera.y}px)`,
          }}
        >
          <CursorPresence />
        </g>
      </svg>
    </div>
  );
};

export default Canvas;
