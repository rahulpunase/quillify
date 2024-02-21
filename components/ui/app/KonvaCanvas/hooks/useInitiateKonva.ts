import { useHistory, useMutation } from "@/liveblocks.config";
import { pointerEventToCanvasPoint } from "../utils";
import { KonvaEventObject } from "konva/lib/Node";
import useCanvasStore, {
  CanvasSelectedMode,
  Point,
  ToolSelectedType,
} from "@/store/canvas";
import { nanoid } from "nanoid";
import { LiveObject } from "@liveblocks/client";
import { Layer, Shape } from "../types";

const useInitiateKonva = () => {
  const { state, camera, lastColor, setCanvasState } = useCanvasStore();
  const history = useHistory();

  const onPointerMove = useMutation(
    ({ setMyPresence }, e: KonvaEventObject<PointerEvent>) => {
      e.evt.preventDefault();
      const current = pointerEventToCanvasPoint(
        e.evt as unknown as React.PointerEvent,
        camera
      );

      setMyPresence({
        cursor: current,
      });
    },
    []
  );

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
      const selectedLayerMap = storage.get("selectedLayerMap");
      const layers = storage.get("layers");
      const layerIds = storage.get("layerIds");

      if (!layerIds.length) {
        // create a new layer and the shape to it.
        layerIds.push("DEFAULT");
        selectedLayerMap.set("id", "DEFAULT");
        const shapeId = nanoid();
        const shape: Shape<"Rectangle"> = {
          id: shapeId,
          type: "Rectangle",
          config: {
            x: position.x,
            y: position.y,
            fill: {
              r: 0,
              b: 0,
              g: 0,
            },
            height: 100,
            width: 100,
            isDraggable: true,
            isDragging: false,
            stroke: {
              r: 0,
              b: 0,
              g: 0,
            },
          },
        };
        layers.set(
          "DEFAULT",
          new LiveObject({
            id: "DEFAULT",
            shapes: [shape],
            isVisible: true,
          })
        );

        return;
      }

      // const liveLayers = storage.get("layers");
      // if (liveLayers.size >= 100)
      //   return;
      // }

      // setMyPresence({ selection: [selectedLayerId] }, { addToHistory: true });
      setCanvasState({
        mode: CanvasSelectedMode.None,
      });
    },
    [lastColor]
  );

  const onPointerUp = useMutation(
    ({}, e) => {
      const point = pointerEventToCanvasPoint(e.evt, camera);
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

  return [onPointerMove, onPointerUp] as const;
};

export default useInitiateKonva;
