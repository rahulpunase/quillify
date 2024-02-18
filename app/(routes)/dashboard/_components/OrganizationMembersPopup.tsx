import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import useGetOrganizationMember from "@/lib/hooks/useGetOrganizationMembers";
import useGetRole from "@/lib/hooks/useGetRole";
import useModalStore from "@/store/modals";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import React from "react";

const OrganizationMembersPopup = () => {
  const members = useGetOrganizationMember();
  const { setOpenModal } = useModalStore();
  return (
    <Dialog open onOpenChange={() => setOpenModal("")}>
      <DialogContent>
        <DialogHeader>Members</DialogHeader>
        <div className="flex flex-col gap-y-4">
          {members.map((member) => (
            <div
              className="flex flex-row items-center justify-between"
              key={member.userId}
            >
              <div className="flex flex-row items-center">
                <div>
                  <Image
                    width="50"
                    height="50"
                    src={member.pictureUrl}
                    alt={member.firstName}
                    className="rounded-full"
                  />
                </div>
                <div className="flex flex-col ml-4">
                  <div>
                    {member.firstName} {member.lastName}
                  </div>
                  <div className="text-xs text-zinc-400">{member.email}</div>
                </div>
              </div>
              <div className="text-xs flex flex-row items-center">
                <div>{member.role}</div>
                <div className="ml-4">
                  <MoreHorizontal />
                </div>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrganizationMembersPopup;
