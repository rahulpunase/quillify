import { connectionIdToColors } from '@/lib/utils';
import { useOther, useOthersConnectionIds } from '@/liveblocks.config';
import { MousePointer2 } from 'lucide-react';
import React, { memo } from 'react';

type Cursor = {
  connectionId: number;
};

const Cursor = memo(({ connectionId }: Cursor) => {
  const info = useOther(connectionId, (user) => user?.info);
  const cursor = useOther(connectionId, (user) => user.presence.cursor);
  if (!cursor) {
    return null;
  }
  const color = connectionIdToColors(connectionId);
  return (
    <foreignObject
      style={{
        transform: `translate(${cursor.x}px, ${cursor.y}px)`,
      }}
      height={50}
      width={info.name.length * 10 + 24}
      className="relative"
    >
      <MousePointer2
        className="h-5 w-5"
        style={{
          fill: color,
          color,
        }}
      />
      <span className="absolute ml-4 p-1 text-white rounded-sm text-xs" style={{ background: color }}>
        {info.name}
      </span>
    </foreignObject>
  );
});

const Presence = () => {
  const connectionIds = useOthersConnectionIds();
  return (
    <svg id="presence" className="absolute left-0 top-0 z-30 pointer-events-none w-[100vw] h-[100vh]">
      {connectionIds.map((id) => (
        <Cursor key={id} connectionId={id} />
      ))}
    </svg>
  );
};

export default Presence;
