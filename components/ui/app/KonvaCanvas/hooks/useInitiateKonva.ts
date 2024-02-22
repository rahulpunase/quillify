import { useHistory, useMutation } from "@/liveblocks.config";
import { drawShape, getColor, pointerEventToCanvasPoint } from "../utils";
import { KonvaEventObject } from "konva/lib/Node";
import useCanvasStore from "@/store/canvas";
import { nanoid } from "nanoid";
import { LiveObject } from "@liveblocks/client";
import { Layer, Point, SelectedShapeType, Shape } from "../types";
import useListeners from "./useListeners";

const useInitiateKonva = () => {
  const { camera, lastColor } = useCanvasStore();
  const history = useHistory();
  const { selectedShape } = useCanvasStore();

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
      selectedOptionType: SelectedShapeType,
      position: Point
    ) => {
      const selectedLayerMap = storage.get("selectedLayerMap");
      const layers = storage.get("layers");
      const layerIds = storage.get("layerIds");

      if (!layerIds.length) {
        // create a new layer and the shape to it.
        layerIds.push("DEFAULT");
        selectedLayerMap.set("id", "DEFAULT");
        const shape = drawShape(
          selectedOptionType,
          position,
          getColor(0, 0, 0),
          getColor(0, 0, 0)
        );
        if (!shape) return;
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
      // setCanvasState({
      //   mode: CanvasSelectedMode.None,
      // });
    },
    [lastColor]
  );

  const onPointerUp = useMutation(
    ({}, e) => {
      const point = pointerEventToCanvasPoint(e.evt, camera);
      // if (state.mode === CanvasSelectedMode.Inserting) {
      //   insertLayer(state.toolSelectedType, point);
      // } else {
      //   setCanvasState({
      //     mode: CanvasSelectedMode.None,
      //   });
      // }
      // insertLayer(selectedShape, point);
      history.resume();
    },
    [camera, history]
  );

  useListeners((attach) => {
    attach("onPointerUp", (e: KonvaEventObject<PointerEvent>) => {
      // const point = pointerEventToCanvasPoint(e.evt, camera);
      // insertLayer(e);
      onPointerUp(e);
    });
    attach("onPointerMove", onPointerMove);
  });
};

export default useInitiateKonva;
