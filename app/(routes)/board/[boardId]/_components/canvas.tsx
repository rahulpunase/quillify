"use client";
import React from "react";
import Info from "./Info";
import Participants from "./Participants";
import Toolbar from "./Toolbar";
import { useSelf } from "@/liveblocks.config";

type CanvasProps = {
  boardId: string;
};

const Canvas = ({ boardId }: CanvasProps) => {
  return (
    <div>
      <Info boardId={boardId} />
      <Participants />
      <Toolbar />
    </div>
  );
};

export default Canvas;
