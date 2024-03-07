import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import useCanvasStore from '@/store/canvas';
import { Circle, CircleDot, MousePointer2, Pencil, Slash, Square, StickyNote, Type } from 'lucide-react';

import LayerTool from './LayerTool';
import ToolButton from './ToolButton';

const Top = () => {
  const { selectedShape, setSelectedShape, mode, setMode, isPointerDown } = useCanvasStore();

  return (
    <div className="absolute left-[50%] translate-x-[-50%] top-2 flex flex-row gap-x-4 justify-center animate-in slide-in-from-top-0 transition">
      <div className="bg-white rounded-sm shadow-sm p-2 flex flex-row gap-x-1">
        <ToolButton
          label="Select"
          isActive={mode === 'selection'}
          isDisabled={false}
          Icon={MousePointer2}
          onClick={() => setMode('selection')}
        />
        <ToolButton
          label="Text"
          isActive={selectedShape === 'Text'}
          isDisabled={false}
          Icon={Type}
          onClick={() => setSelectedShape('Text')}
        />
        <ToolButton
          label="Sticky Note"
          isActive={selectedShape === 'Path'}
          isDisabled={false}
          Icon={StickyNote}
          onClick={() => setSelectedShape('None')}
        />
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
          label="Line"
          isActive={selectedShape === 'Line'}
          isDisabled={false}
          Icon={Slash}
          onClick={() => setSelectedShape('Line')}
        />
        <ToolButton
          label="Pencil"
          isActive={selectedShape === 'Path'}
          isDisabled={false}
          Icon={Pencil}
          onClick={() => setSelectedShape('Path')}
        />
        <Separator orientation="vertical" className="mx-2" />
        <LayerTool />
      </div>

      {/* <div className="bg-white rounded-sm shadow-sm p-2 flex flex-col gap-y-3">
        <Input type="color" onChange={(e) => console.log(e)} />
      </div> */}
    </div>
  );
};

export default Top;
