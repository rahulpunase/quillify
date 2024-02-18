import React from "react";
import { useOthers, useSelf } from "@/liveblocks.config";
import { TooltipWrapper } from "@/components/ui/tooltip";
import { User } from "@liveblocks/client";
import Image from "next/image";
import { connectionIdToColors } from "@/lib/utils";

type UserAvatar = {
  name?: string;
  picture?: string;
  borderColor?: string;
};

const UserAvatar = ({ name, picture, borderColor }: UserAvatar) => {
  return (
    <TooltipWrapper content={name || "Teammate"}>
      <div
        className="h-[30px] w-[30px] rounded-full border-2 relative overflow-hidden"
        style={{
          borderColor: borderColor,
        }}
      >
        <Image src={picture} alt={name} fill />
      </div>
    </TooltipWrapper>
  );
};

const Participants = () => {
  const currentUser = useSelf();

  const users = useOthers();

  return (
    <div className="absolute top-2 right-2 p-3 shadow-md bg-white rounded-sm flex flex-row gap-x-3">
      <div>
        {users.map(({ id, info, connectionId }) => (
          <UserAvatar
            key={id}
            name={info.name}
            picture={info.picture}
            borderColor={connectionIdToColors(connectionId)}
          />
        ))}
      </div>
      {currentUser && (
        <UserAvatar
          name={currentUser.info.name + " (You)"}
          picture={currentUser.info.picture}
          borderColor={connectionIdToColors(currentUser.connectionId)}
        />
      )}
    </div>
  );
};

export default Participants;
