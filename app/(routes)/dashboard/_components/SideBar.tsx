"use client";
import Logo from "@/components/ui/app/Logo";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { PlusIcon, ShieldCheck, Star, Timer, Trash, User } from "lucide-react";
import React from "react";
import useOrganizationStore from "@/store/organization";
import { useRouter } from "next/navigation";
import useDashboardStore from "@/store/dashboard";
import { cn } from "@/lib/utils";
import useModalStore from "@/store/modals";
import { Id } from "@/convex/_generated/dataModel";
import { TooltipWrapper } from "@/components/ui/tooltip";
import useGetRole from "@/lib/hooks/useGetRole";
import useGetOrganizationMember from "@/lib/hooks/useGetOrganizationMembers";
import { Skeleton } from "@/components/ui/skeleton";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["500"],
  subsets: ["latin"],
});

const SideBar = () => {
  const { setOpenModal } = useModalStore();
  const { selectedOrgId, setSelectedOrgId } = useOrganizationStore();
  const { selectedBoardType, setSelectedBoardType } = useDashboardStore();

  const organizations = useQuery(api.organization.query.getAll);

  const role = useGetRole();

  const router = useRouter();

  const members = useGetOrganizationMember();

  return (
    <aside className="w-[300px] shrink-0 bg-zinc-50 h-full p-4 flex flex-col">
      <div className="flex flex-row items-center border-b pb-3">
        <div className="mr-3">
          <Logo width={60} />
        </div>
        <span className={cn("text-3xl font-bold", poppins.className)}>
          Quillify
        </span>
      </div>

      {!organizations && <Skeleton className="h-20 w-full mt-4" />}
      {organizations && (
        <div className="flex flex-col w-full items-start justify-between gap-x-4 p-2 border rounded-sm mt-4">
          <div className="flex flex-row w-full gap-x-3">
            <Select
              value={selectedOrgId}
              onValueChange={(id) => {
                router.replace(`/dashboard?orgId=${id}`);
                setSelectedOrgId(id);
              }}
            >
              <SelectTrigger className="w-full border-none shadow-none font-semibold">
                <SelectValue placeholder="Organization:" />
              </SelectTrigger>
              <SelectContent className="flex-1">
                {organizations?.map((item) => (
                  <SelectItem key={item._id} value={item._id}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              onClick={() => setOpenModal("create-organization")}
              variant="outline"
              className="px-3 rounded-sm py-2 mr-1"
            >
              <PlusIcon className="w-4 h-4 text-black" />
            </Button>
          </div>
          <div className="flex flex-row w-full mt-2">
            <div className="px-3 mt-2 text-zinc-500 text-xs flex items-center w-full">
              {!members && <Skeleton className="w-full h-4" />}
              {members && members.length && (
                <button
                  className="flex-1 flex justify-start"
                  onClick={() => setOpenModal("organization-members")}
                >
                  {members.length} user
                </button>
              )}
              {role && (
                <TooltipWrapper content={role === "ADMIN" ? "Admin" : "Member"}>
                  <div>
                    {role === "ADMIN" ? (
                      <ShieldCheck className="h-5 w-5" />
                    ) : (
                      <User className="h-5 w-5" />
                    )}
                  </div>
                </TooltipWrapper>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col py-4">
        <button
          className={cn(
            "flex flex-row items-center gap-2 hover:text-blue-800 py-2 text-zinc-500 text-normal text-sm",
            selectedBoardType === "recent" && "text-black"
          )}
          onClick={() => setSelectedBoardType("recent")}
        >
          <Timer className="w-4 h-4" /> Recent boards
        </button>
        <button
          className={cn(
            "flex flex-row items-center gap-2 hover:text-blue-800 py-2 text-zinc-500 text-sm",
            selectedBoardType === "starred" && "text-black"
          )}
          onClick={() => setSelectedBoardType("starred")}
        >
          <Star className="w-4 h-4" /> Starred boards
        </button>
        <div className="w-full h-[1px] my-3 bg-zinc-200"></div>
        <button
          className={cn(
            "flex flex-row items-center gap-2 hover:text-blue-800 py-2 text-zinc-500 text-sm",
            selectedBoardType === "starred" && "text-black"
          )}
          onClick={() => setSelectedBoardType("starred")}
        >
          <Trash className="w-4 h-4" /> Trash
        </button>
      </div>
    </aside>
  );
};

export default SideBar;
