"use client";

import React, { PropsWithChildren } from "react";
import { RoomProvider } from "@/liveblocks.config";
import { ClientSideSuspense } from "@liveblocks/react";
import Loading from "./Loading";

const Room: React.FC<PropsWithChildren & { roomId: string }> = ({
  children,
  roomId,
}) => {
  return (
    <RoomProvider id={roomId} initialPresence={{}}>
      <ClientSideSuspense fallback={<Loading />}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default Room;
