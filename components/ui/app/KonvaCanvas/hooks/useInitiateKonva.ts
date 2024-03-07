import { useHistory, useMutation } from '@/liveblocks.config';
import useCanvasStore from '@/store/canvas';
import { LiveObject } from '@liveblocks/client';
import { KonvaEventObject } from 'konva/lib/Node';
import { useEffect, useRef } from 'react';

import canvasCustomEvents from '../services/CanvasCustomEvents';
import { drawShape, pointerEventToCanvasPoint } from '../utils';
import useListeners from './useListeners';

const useInitiateKonva = () => {
  const stage = useRef(null);
  const { camera } = useCanvasStore();
  const history = useHistory();

  const onPointerMove = useMutation(({ setMyPresence }, e: KonvaEventObject<PointerEvent>) => {
    e.evt.preventDefault();
    const current = pointerEventToCanvasPoint(e.evt, camera);

    setMyPresence({
      cursor: current,
    });
  }, []);

  useListeners((attach) => {
    attach('onPointerMove', onPointerMove);
  });

  const insertLayer = useMutation(({ storage, setMyPresence }, startPoint, endPoint) => {
    const selectedLayerMap = storage.get('selectedLayerMap');
    const layers = storage.get('layers');
    const layerIds = storage.get('layerIds');
    const canvasStore = useCanvasStore.getState();

    if (!layerIds.length) {
      // create a new layer and the shape to it.
      layerIds.push('DEFAULT');
      selectedLayerMap.set('id', 'DEFAULT');
      const shape = drawShape(
        canvasStore.selectedShape,
        startPoint,
        endPoint,
        canvasStore.fill,
        canvasStore.strokeColor,
      );
      if (!shape) return;
      layers.set(
        'DEFAULT',
        new LiveObject({
          id: 'DEFAULT',
          shapes: [shape],
          isVisible: true,
        }),
      );
      return;
    }

    const selectedLayerId = selectedLayerMap.get('id');
    const selectedLayer = layers.get(selectedLayerId);
    const shape = drawShape(canvasStore.selectedShape, startPoint, endPoint, canvasStore.fill, canvasStore.strokeColor);
    selectedLayer.update({
      shapes: [...selectedLayer.get('shapes'), ...[shape]],
    });
  }, []);

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
    [camera, history],
  );

  useEffect(() => {
    if (!stage.current) return;
    canvasCustomEvents.init(stage.current.attrs.container);
    canvasCustomEvents.addEventListener<'ADD_SHAPE'>('ADD_SHAPE', (evt) => {
      insertLayer(evt.detail.startPoint, evt.detail.endPoint);
    });
  }, [stage]);

  return stage;
};

export default useInitiateKonva;
