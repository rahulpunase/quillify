import { useStorage } from '@/liveblocks.config';
import React, { memo } from 'react';
import { Layer } from 'react-konva';

import { LayerId, UnknownShape } from '../types';
import Rectangle from './Rect';
import Text from './Text';

const ShapeSelector = ({ shape }: { shape: UnknownShape }) => {
  if (shape.type === 'Rectangle') {
    return <Rectangle config={shape.config} />;
  }
  if (shape.type === 'Text') {
    return <Text config={shape.config} />;
  }
  return null;
};

const ShapeRenderer = ({ layerId }: { layerId: LayerId }) => {
  const layers = useStorage((root) => root.layers);
  if (!layers) return null;
  const layer = layers.get(layerId);
  if (!layer) return null;
  return layer.shapes.map((shape) => <ShapeSelector key={shape.id} shape={shape} />);
};

const LayerRenderer = memo(() => {
  const layerIds = useStorage((root) => root.layerIds ?? []);
  const layers = useStorage((root) => root.layers);

  return layerIds.map((layerId) => {
    const layer = layers.get(layerId);
    if (!layer) return null;
    return (
      <Layer id={layerId} key={layerId} visible={!!layer.isVisible}>
        <ShapeRenderer key={layerId} layerId={layerId as LayerId} />
      </Layer>
    );
  });
});

export default LayerRenderer;
