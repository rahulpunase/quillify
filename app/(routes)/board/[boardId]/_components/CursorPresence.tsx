"use client";

import { useOther, useOthersConnectionIds } from "@/liveblocks.config";
import React, { memo } from "react";
import { MousePointer2 } from "lucide-react";
import { connectionIdToColors } from "@/lib/utils";

type Cursor = {
  connectionId: number;
};

const Cursor = memo(({ connectionId }: Cursor) => {
  const info = useOther(connectionId, (user) => user?.info);
  const cursor = useOther(connectionId, (user) => user.presence.cursor);
  if (!cursor) {
    return null;
  }

  const { x, y } = cursor;
  return (
    <foreignObject
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
      height={50}
      width={info.name.length * 10 + 24}
      className="relative"
    >
      <MousePointer2
        className="h-5 w-5"
        style={{
          fill: connectionIdToColors(connectionId),
          color: connectionIdToColors(connectionId),
        }}
      />
      <div
        className="text-xs absolute p-1 top-4 left-4 rounded-sm text-white"
        style={{
          background: connectionIdToColors(connectionId),
        }}
      >
        {info.name}
      </div>
    </foreignObject>
  );
});

const Cursors = () => {
  const connectionIds = useOthersConnectionIds();
  return connectionIds.map((id) => <Cursor key={id} connectionId={id} />);
};

const CursorPresence = memo(() => {
  return (
    <>
      <Cursors />
    </>
  );
});

CursorPresence.displayName = "CursorPresence";

export default CursorPresence;
