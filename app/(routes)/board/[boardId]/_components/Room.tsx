"use client";

import React, { PropsWithChildren } from "react";
import { RoomProvider } from "@/liveblocks.config";
import { ClientSideSuspense } from "@liveblocks/react";
import Loading from "./Loading";
import { LiveMap, LiveObject, LiveList } from "@liveblocks/client";
import { Layers } from "@/store/canvas";

const Room: React.FC<PropsWithChildren & { roomId: string }> = ({
  children,
  roomId,
}) => {
  return (
    <RoomProvider
      id={roomId}
      initialPresence={{
        cursor: null,
      }}
      initialStorage={{
        layers: new LiveMap<string, LiveObject<Layers>>(),
        layerIds: new LiveList(),
      }}
    >
      <ClientSideSuspense fallback={<Loading />}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default Room;
