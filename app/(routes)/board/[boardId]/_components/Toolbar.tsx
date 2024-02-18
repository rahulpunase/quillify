import { Button } from "@/components/ui/button";
import { TooltipWrapper } from "@/components/ui/tooltip";
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
        variant="tool"
        size="icon"
        disabled={isDisabled}
        onClick={onClick}
      >
        <Icon className="h-5 w-5" />
      </Button>
    </TooltipWrapper>
  );
};

const Toolbar = () => {
  return (
    <div className="absolute top-[50%] translate-y-[-50%] left-2 flex flex-col gap-y-4 justify-center">
      <div className="bg-white rounded-sm shadow-sm p-3 flex flex-col gap-y-3">
        <ToolButton
          label="Select"
          isActive
          isDisabled={false}
          Icon={MousePointer2}
          onClick={() => {}}
        />
        <ToolButton
          label="Text"
          isActive
          isDisabled={false}
          Icon={Type}
          onClick={() => {}}
        />
        <ToolButton
          label="Sticky Note"
          isActive
          isDisabled={false}
          Icon={StickyNote}
          onClick={() => {}}
        />
        <ToolButton
          label="Square"
          isActive
          isDisabled={false}
          Icon={Square}
          onClick={() => {}}
        />
        <ToolButton
          label="Circle"
          isActive
          isDisabled={false}
          Icon={Circle}
          onClick={() => {}}
        />
        <ToolButton
          label="Pencil"
          isActive
          isDisabled={false}
          Icon={Pencil}
          onClick={() => {}}
        />
      </div>
      <div className="bg-white rounded-sm shadow-sm p-3 flex flex-col">
        <ToolButton
          label="Undo"
          isActive
          isDisabled
          Icon={Undo}
          onClick={() => {}}
        />
        <ToolButton
          label="Redo"
          isActive
          isDisabled
          Icon={Redo}
          onClick={() => {}}
        />
      </div>
    </div>
  );
};

export default Toolbar;
