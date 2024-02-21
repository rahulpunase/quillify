"use client";
import React, { useCallback } from "react";
import Info from "./Info";
import Participants from "./Participants";
import Toolbar from "./Toolbar";
import { useHistory, useMutation, useStorage } from "@/liveblocks.config";
import CursorPresence from "./CursorPresence";
import useCanvasStore, {
  CanvasSelectedMode,
  Layer,
  Point,
  ToolSelectedType,
} from "@/store/canvas";
import { pointerEventToCanvasPoint } from "@/lib/utils";
import { nanoid } from "nanoid";
import { LiveObject } from "@liveblocks/client";
import LayerPreview from "./LayerPreview";

type CanvasProps = {
  boardId: string;
};

const MAX_LAYERS = 60;

const Canvas = ({ boardId }: CanvasProps) => {
  const { camera, setCamera, lastColor, setLastColor, setCanvasState, state } =
    useCanvasStore();

  const layerIds = useStorage((root) => root.layerIds);

  const history = useHistory();

  const insertLayer = useMutation(
    (
      { storage, setMyPresence },
      toolSelectedType:
        | ToolSelectedType.Rectangle
        | ToolSelectedType.Ellipse
        | ToolSelectedType.Note
        | ToolSelectedType.Text,
      position: Point
    ) => {
      const liveLayers = storage.get("layers");
      if (liveLayers.size >= MAX_LAYERS) {
        return;
      }

      const liveLayerIds = storage.get("layerIds");
      const layerId = nanoid();
      const layer = new LiveObject<Layer>({
        type: toolSelectedType,
        x: position.x,
        y: position.y,
        height: 100,
        width: 100,
        fill: lastColor,
      });

      liveLayerIds.push(layerId);
      liveLayers.set(layerId, layer);
      setMyPresence({ selection: [layerId] }, { addToHistory: true });
      setCanvasState({
        mode: CanvasSelectedMode.None,
      });
    },
    [lastColor]
  );

  const onPointerUp = useMutation(
    ({}, e) => {
      const point = pointerEventToCanvasPoint(e, camera);
      if (state.mode === CanvasSelectedMode.Inserting) {
        insertLayer(state.toolSelectedType, point);
      } else {
        setCanvasState({
          mode: CanvasSelectedMode.None,
        });
      }
      history.resume();
    },
    [camera, state, history]
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
    // setCamera({
    //   x: camera.x - e.deltaX,
    //   y: camera.y - e.deltaY,
    // });
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
        onPointerUp={onPointerUp}
      >
        <g
          style={{
            transform: `translate(${camera.x}px, ${camera.y}px)`,
          }}
        >
          {layerIds.map((layerId) => (
            <LayerPreview id={layerId} key={layerId} />
          ))}
          <CursorPresence />
        </g>
      </svg>
    </div>
  );
};

export default Canvas;
