"use client";

import React, { PropsWithChildren } from "react";
import { RoomProvider } from "@/liveblocks.config";
import { ClientSideSuspense } from "@liveblocks/react";
import { LiveMap, LiveObject, LiveList } from "@liveblocks/client";
import { LayerId, Layer } from "@/components/ui/app/KonvaCanvas/types";

const Room: React.FC<PropsWithChildren & { roomId: string }> = ({
  children,
  roomId,
}) => {
  return (
    <RoomProvider
      id={roomId}
      initialPresence={{
        cursor: null,
        selection: [],
      }}
      initialStorage={() => {
        return {
          layers: new LiveMap<LayerId, LiveObject<Layer>>(),
          layerIds: new LiveList<LayerId>(),
          selectedLayerMap: new LiveObject(),
        };
      }}
    >
      <ClientSideSuspense
        fallback={<div className="flex w-full h-full">Loading</div>}
      >
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default Room;
