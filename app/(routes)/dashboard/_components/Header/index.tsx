"use client";
import React, { useState } from "react";
import Search from "./Search";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import InviteUserPopup from "./InviteUserPopup";
import useModalStore from "@/store/modals";
import { useQuery } from "convex/react";
import useGetRole from "@/lib/hooks/useGetRole";

const Header = () => {
  const { modal, setOpenModal } = useModalStore();
  const role = useGetRole();
  const isAdmin = role === "ADMIN";
  return (
    <>
      <div className="flex bg-zinc-50 w-full p-3 items-center justify-between pr-5">
        <div className="ml-2">
          <Search />
        </div>
        <div className="flex flex-row items-center gap-x-4">
          {isAdmin && (
            <Button
              variant="outline"
              onClick={() => setOpenModal("invite-members")}
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Invite users
            </Button>
          )}
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
      {modal === "invite-members" && <InviteUserPopup />}
    </>
  );
};

export default Header;
