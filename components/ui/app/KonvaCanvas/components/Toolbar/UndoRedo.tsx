import React from "react";
import ToolButton from "./ToolButton";
import { Redo, Undo } from "lucide-react";
import { useCanRedo, useCanUndo, useHistory } from "@/liveblocks.config";

const UndoRedo = () => {
  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();
  return (
    <div className="absolute right-2 bottom-2 bg-white rounded-sm shadow-sm p-2 flex flex-row">
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
  );
};

export default UndoRedo;
