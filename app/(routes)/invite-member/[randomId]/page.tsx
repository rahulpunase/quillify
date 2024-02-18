"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const InviteMember = ({
  params: { randomId },
}: {
  params: {
    randomId: string;
  };
}) => {
  const params = useSearchParams();

  const orgId = params.get("orgId");

  const [inviteMessage, setInviteMessage] = useState("");

  useEffect(() => {
    const addInviteMember = async () => {
      const response = await fetch("/api/invite-member", {
        method: "post",
        body: JSON.stringify({
          orgId,
          randomId,
        }),
      });

      const data = await response.json();
      setInviteMessage(data.info.message);
    };
    if (orgId) {
      addInviteMember();
    }
  }, [orgId]);

  return (
    <div className="flex w-full h-full items-center justify-center">
      {inviteMessage}
    </div>
  );
};

export default InviteMember;
