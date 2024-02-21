import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
} from "@/components/ui/popover";
import { TooltipWrapper } from "@/components/ui/tooltip";
import {
  useHistory,
  useCanRedo,
  useCanUndo,
  useStorage,
  useMutation,
} from "@/liveblocks.config";
import useCanvasStore, {
  CanvasSelectedMode,
  ToolSelectedType,
} from "@/store/canvas";
import {
  Circle,
  CircleDot,
  DeleteIcon,
  Eye,
  Layers,
  Layers2,
  LucideIcon,
  MousePointer2,
  Pencil,
  Redo,
  Square,
  StickyNote,
  Trash,
  Type,
  Undo,
} from "lucide-react";
import React from "react";
import { Layer, LayerId } from "../types";
import { nanoid } from "nanoid";
import { LiveObject } from "@liveblocks/client";
import { root } from "postcss";
import { cn } from "@/lib/utils";

type ToolButtons = {
  label: string;
  Icon: LucideIcon;
  onClick: () => void;
  isActive: boolean;
  isDisabled: boolean;
};

const ToolButton = ({
  label,
  Icon,
  onClick,
  isActive,
  isDisabled,
}: ToolButtons) => {
  return (
    <TooltipWrapper content={label}>
      <Button
        variant={isActive ? "tool" : "ghost"}
        size="icon"
        disabled={isDisabled}
        onClick={onClick}
      >
        <Icon className="h-5 w-5" />
      </Button>
    </TooltipWrapper>
  );
};

type ToolbarProps = {};

const SelectLayerButton = ({ isSelected, onSelect }) => {
  return (
    <button onClick={onSelect}>
      {isSelected ? (
        <CircleDot className="h-4 w-4" />
      ) : (
        <Circle className="h-4 w-4" />
      )}
    </button>
  );
};

const Toolbar = () => {
  const { state, setCanvasState } = useCanvasStore();
  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  const layerIds = useStorage((root) => root.layerIds);
  const selectedLayerMap = useStorage((root) => root.selectedLayerMap);

  const changeLayerVisibility = useMutation(({ storage }, layerId) => {
    const layers = storage.get("layers");
    const layer = layers.get(layerId);
    layer.update({
      isVisible: !layer.get("isVisible"),
    });
  }, []);

  const addNewLayer = useMutation(({ storage }) => {
    const layerId = nanoid();
    const layerIds = storage.get("layerIds");
    const layers = storage.get("layers");
    const selectedLayerMap = storage.get("selectedLayerMap");
    layerIds.push(layerId);
    layers.set(
      layerId,
      new LiveObject<Layer>({
        id: layerId,
        isVisible: true,
        shapes: [],
      })
    );
    selectedLayerMap.set("id", layerId);
  }, []);

  const selectLayer = useMutation(({ storage }, layerId) => {
    const selectedLayerMap = storage.get("selectedLayerMap");
    selectedLayerMap.set("id", layerId);
  }, []);

  const toggleLayerVisibility = (layerId: LayerId) =>
    changeLayerVisibility(layerId);

  return (
    <div className="absolute top-[50%] translate-y-[-50%] left-2 flex flex-col gap-y-4 justify-center">
      <div className="bg-white rounded-sm shadow-sm p-3 flex flex-col gap-y-3">
        <ToolButton
          label="Select"
          isActive={
            state.mode === CanvasSelectedMode.None ||
            state.mode === CanvasSelectedMode.Translating ||
            state.mode === CanvasSelectedMode.Selection ||
            state.mode === CanvasSelectedMode.Pressing ||
            state.mode === CanvasSelectedMode.Resizing
          }
          isDisabled={false}
          Icon={MousePointer2}
          onClick={() =>
            setCanvasState({
              mode: CanvasSelectedMode.None,
            })
          }
        />
        <ToolButton
          label="Text"
          isActive={
            state.mode === CanvasSelectedMode.Inserting &&
            state.toolSelectedType === ToolSelectedType.Text
          }
          isDisabled={false}
          Icon={Type}
          onClick={() =>
            setCanvasState({
              mode: CanvasSelectedMode.Inserting,
              toolSelectedType: ToolSelectedType.Text,
            })
          }
        />
        <ToolButton
          label="Sticky Note"
          isActive={
            state.mode === CanvasSelectedMode.Inserting &&
            state.toolSelectedType === ToolSelectedType.Note
          }
          isDisabled={false}
          Icon={StickyNote}
          onClick={() =>
            setCanvasState({
              mode: CanvasSelectedMode.Inserting,
              toolSelectedType: ToolSelectedType.Note,
            })
          }
        />
        <ToolButton
          label="Square"
          isActive={
            state.mode === CanvasSelectedMode.Inserting &&
            state.toolSelectedType === ToolSelectedType.Rectangle
          }
          isDisabled={false}
          Icon={Square}
          onClick={() =>
            setCanvasState({
              mode: CanvasSelectedMode.Inserting,
              toolSelectedType: ToolSelectedType.Rectangle,
            })
          }
        />
        <ToolButton
          label="Circle"
          isActive={
            state.mode === CanvasSelectedMode.Inserting &&
            state.toolSelectedType === ToolSelectedType.Ellipse
          }
          isDisabled={false}
          Icon={Circle}
          onClick={() =>
            setCanvasState({
              mode: CanvasSelectedMode.Inserting,
              toolSelectedType: ToolSelectedType.Ellipse,
            })
          }
        />
        <ToolButton
          label="Pencil"
          isActive={state.mode === CanvasSelectedMode.Pencil}
          isDisabled={false}
          Icon={Pencil}
          onClick={() =>
            setCanvasState({
              mode: CanvasSelectedMode.Pencil,
            })
          }
        />
      </div>
      <div className="bg-white rounded-sm shadow-sm p-3 flex flex-col gap-y-3">
        <Button variant="ghost" size="icon">
          <Popover>
            <PopoverTrigger asChild>
              <Layers2 />
            </PopoverTrigger>
            <PopoverContent
              dir="right"
              align="end"
              side="right"
              className="flex flex-col w-auto"
            >
              <Button variant="tool" onClick={addNewLayer}>
                Add new layer
              </Button>
              {layerIds.map((layerId, index) => (
                <div
                  className={cn(
                    "flex flex-row items-center mt-4 gap-x-4 justify-between p-2 rounded-sm",
                    selectedLayerMap.id === layerId && "border border-blue-800"
                  )}
                >
                  <div className="flex flex-row gap-x-2 items-center rounded-sm">
                    <SelectLayerButton
                      isSelected={selectedLayerMap.id === layerId}
                      onSelect={() => selectLayer(layerId)}
                    />
                    <Layers className="w-3 h-3" />
                    <span className="text-xs">{index + 1}</span>
                  </div>
                  <div className="flex flex-row">
                    <Button
                      variant="ghost"
                      className="p-2"
                      onClick={() => toggleLayerVisibility(layerId)}
                    >
                      <Eye className="w-4 h-4 " />
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
      <div className="bg-white rounded-sm shadow-sm p-3 flex flex-col">
        <ToolButton
          label="Undo"
          isActive={false}
          isDisabled={!canUndo}
          Icon={Undo}
          onClick={history.undo}
        />
        <ToolButton
          label="Redo"
          isActive={false}
          isDisabled={!canRedo}
          Icon={Redo}
          onClick={history.redo}
        />
      </div>
    </div>
  );
};

export default Toolbar;
