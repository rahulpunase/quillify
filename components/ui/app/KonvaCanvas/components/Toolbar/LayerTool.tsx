import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useMutation, useStorage } from '@/liveblocks.config';
import { LiveObject } from '@liveblocks/client';
import { Circle, CircleDot, Eye, EyeOff, Layers, Layers2, Trash } from 'lucide-react';
import { nanoid } from 'nanoid';
import React from 'react';

import { Layer, LayerId } from '../../types';

const LayerTool = () => {
  const selectedLayerMap = useStorage((root) => root.selectedLayerMap);
  const layerIds = useStorage((root) => root.layerIds ?? []);
  const layers = useStorage((root) => root.layers);

  const changeLayerVisibility = useMutation(({ storage }, layerId) => {
    const layers = storage.get('layers');
    const layer = layers.get(layerId);
    layer.update({
      isVisible: !layer.get('isVisible'),
    });
  }, []);

  const addNewLayer = useMutation(({ storage }) => {
    const layerId = nanoid();
    const layerIds = storage.get('layerIds');
    const layers = storage.get('layers');
    const selectedLayerMap = storage.get('selectedLayerMap');
    layerIds.push(layerId);
    layers.set(
      layerId,
      new LiveObject<Layer>({
        id: layerId,
        isVisible: true,
        shapes: [],
      }),
    );
    selectedLayerMap.set('id', layerId);
  }, []);

  const selectLayer = useMutation(({ storage }, layerId) => {
    const selectedLayerMap = storage.get('selectedLayerMap');
    selectedLayerMap.set('id', layerId);
  }, []);

  const getLayerFromLayerId = (layerId: LayerId) => layers.get(layerId);

  const SelectLayerButton = ({ isSelected, onSelect }) => {
    return (
      <button onClick={onSelect}>
        {isSelected ? <CircleDot className="size-4" /> : <Circle className="size-4" />}
      </button>
    );
  };

  const deleteLayer = useMutation(({ storage }, layerId) => {
    const layerIds = storage.get('layerIds');
    const indexToDelete = layerIds.findIndex((_layerId) => _layerId === layerId);
    layerIds.delete(indexToDelete);
  }, []);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <Layers2 className="size-3" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        sideOffset={20}
        dir="right"
        align="end"
        side="bottom"
        className="flex flex-col w-auto border-none"
      >
        <Button variant="tool" onClick={addNewLayer}>
          Add new layer
        </Button>
        {layerIds.map((layerId, index) => (
          <div
            className={cn(
              'flex flex-row items-center mt-4 gap-x-4 justify-between p-2 rounded-sm',
              selectedLayerMap.id === layerId && 'border border-blue-800',
            )}
            key={layerId}
          >
            <div className="flex flex-row gap-x-2 items-center rounded-sm">
              <SelectLayerButton isSelected={selectedLayerMap.id === layerId} onSelect={() => selectLayer(layerId)} />
              <Layers className="size-3" />
              <span className="text-xs">{index + 1}</span>
            </div>
            <div className="flex flex-row">
              <Button variant="ghost" className="p-2" onClick={() => changeLayerVisibility(layerId)}>
                {getLayerFromLayerId(layerId)?.isVisible ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
              </Button>
              <Button variant="ghost" className="p-2" onClick={() => deleteLayer(layerId)}>
                <Trash className="w-4 h-4 text-rose-600" />
              </Button>
            </div>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default LayerTool;
