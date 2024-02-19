import { Button } from "@/components/ui/button";
import { TooltipWrapper } from "@/components/ui/tooltip";
import { useHistory, useCanRedo, useCanUndo } from "@/liveblocks.config";
import useCanvasStore, { CanvasSelectedMode, Layer } from "@/store/canvas";
import {
  Circle,
  LucideIcon,
  MousePointer2,
  Pencil,
  Redo,
  Square,
  StickyNote,
  Type,
  Undo,
} from "lucide-react";
import React from "react";

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

const Toolbar = () => {
  const { state, setCanvasState } = useCanvasStore();
  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

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
            state.layerType === Layer.Text
          }
          isDisabled={false}
          Icon={Type}
          onClick={() =>
            setCanvasState({
              mode: CanvasSelectedMode.Inserting,
              layerType: Layer.Text,
            })
          }
        />
        <ToolButton
          label="Sticky Note"
          isActive={
            state.mode === CanvasSelectedMode.Inserting &&
            state.layerType === Layer.Note
          }
          isDisabled={false}
          Icon={StickyNote}
          onClick={() =>
            setCanvasState({
              mode: CanvasSelectedMode.Inserting,
              layerType: Layer.Note,
            })
          }
        />
        <ToolButton
          label="Square"
          isActive={
            state.mode === CanvasSelectedMode.Inserting &&
            state.layerType === Layer.Rectangle
          }
          isDisabled={false}
          Icon={Square}
          onClick={() =>
            setCanvasState({
              mode: CanvasSelectedMode.Inserting,
              layerType: Layer.Rectangle,
            })
          }
        />
        <ToolButton
          label="Circle"
          isActive={
            state.mode === CanvasSelectedMode.Inserting &&
            state.layerType === Layer.Ellipse
          }
          isDisabled={false}
          Icon={Circle}
          onClick={() =>
            setCanvasState({
              mode: CanvasSelectedMode.Inserting,
              layerType: Layer.Ellipse,
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
