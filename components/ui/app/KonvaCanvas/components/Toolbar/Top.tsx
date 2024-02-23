import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverArrow, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useMutation, useStorage } from '@/liveblocks.config';
import useCanvasStore from '@/store/canvas';
import { LiveObject } from '@liveblocks/client';
import { Circle, CircleDot, Eye, EyeOff, Layers, Layers2, Pencil, Square, Trash, Type } from 'lucide-react';
import { nanoid } from 'nanoid';

import { Layer, LayerId } from '../../types';
import ToolButton from './ToolButton';

const SelectLayerButton = ({ isSelected, onSelect }) => {
  return (
    <button onClick={onSelect}>
      {isSelected ? <CircleDot className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
    </button>
  );
};

const Top = () => {
  const { selectedShape, setSelectedShape, downKeys } = useCanvasStore();

  const layerIds = useStorage((root) => root.layerIds ?? []);
  const layers = useStorage((root) => root.layers);
  const selectedLayerMap = useStorage((root) => root.selectedLayerMap);

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

  return (
    <div className="absolute left-[50%] translate-x-[-50%] top-2 flex flex-row gap-x-4 justify-center animate-in slide-in-from-top-0 transition">
      {downKeys}
      <div className="bg-white rounded-sm shadow-sm p-2 flex flex-row gap-y-3">
        {/* <ToolButton
          label="Select"
          isActive={false}
          isDisabled={false}
          Icon={MousePointer2}
          onClick={() =>
            setCanvasState({
              mode: CanvasSelectedMode.None,
            })
          }
        /> */}
        <ToolButton
          label="Text"
          isActive={selectedShape === 'Text'}
          isDisabled={false}
          Icon={Type}
          onClick={() => setSelectedShape('Text')}
        />
        {/* <ToolButton
          label="Sticky Note"
          isActive={
            state.mode === CanvasSelectedMode.Inserting &&
            state.toolSelectedType === ToolSelectedType.Note
          }
          isDisabled={false}
          Icon={StickyNote}
          onClick={() =>
            setSelectedShape("")
          }
        /> */}
        <ToolButton
          label="Square"
          isActive={selectedShape === 'Rectangle'}
          isDisabled={false}
          Icon={Square}
          onClick={() => setSelectedShape('Rectangle')}
        />
        <ToolButton
          label="Circle"
          isActive={selectedShape === 'Circle'}
          isDisabled={false}
          Icon={Circle}
          onClick={() => setSelectedShape('Circle')}
        />
        <ToolButton
          label="Pencil"
          isActive={selectedShape === 'Path'}
          isDisabled={false}
          Icon={Pencil}
          onClick={() => setSelectedShape('Path')}
        />
      </div>
      <div className="bg-white rounded-sm shadow-sm p-2 flex flex-col gap-y-3">
        <Button variant="ghost" size="icon">
          <Popover>
            <PopoverTrigger asChild>
              <Layers2 className="size-3" />
            </PopoverTrigger>
            <PopoverContent dir="right" align="end" side="right" className="flex flex-col w-auto">
              <Button variant="tool" onClick={addNewLayer}>
                Add new layer
              </Button>
              {layerIds.map((layerId, index) => (
                <div
                  className={cn(
                    'flex flex-row items-center mt-4 gap-x-4 justify-between p-2 rounded-sm',
                    selectedLayerMap.id === layerId && 'border border-blue-800',
                  )}
                >
                  <div className="flex flex-row gap-x-2 items-center rounded-sm">
                    <SelectLayerButton
                      isSelected={selectedLayerMap.id === layerId}
                      onSelect={() => selectLayer(layerId)}
                    />
                    <Layers className="size-3" />
                    <span className="text-xs">{index + 1}</span>
                  </div>
                  <div className="flex flex-row">
                    <Button variant="ghost" className="p-2" onClick={() => changeLayerVisibility(layerId)}>
                      {getLayerFromLayerId(layerId).isVisible ? (
                        <Eye className="size-4" />
                      ) : (
                        <EyeOff className="size-4" />
                      )}
                    </Button>
                    <Button variant="ghost" className="p-2">
                      <Trash className="w-4 h-4 text-rose-600" />
                    </Button>
                  </div>
                </div>
              ))}
              <PopoverArrow />
            </PopoverContent>
          </Popover>
        </Button>
      </div>
      <div className="bg-white rounded-sm shadow-sm p-2 flex flex-col gap-y-3">
        <Input type="color" onChange={(e) => console.log(e)} />
      </div>
    </div>
  );
};

export default Top;
