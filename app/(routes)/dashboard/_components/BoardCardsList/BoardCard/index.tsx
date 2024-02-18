import React from "react";
import { Board } from "..";
import { MoreHorizontal, Star } from "lucide-react";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";
import Link from "next/link";
import useOrganizationStore from "@/store/organization";
import { toast } from "sonner";
import { DashboardView } from "@/store/dashboard";
import DropDownMenuForCard from "./DropDownMenuForCard";
import { format } from "date-fns";
import useUserStore from "@/store/user";

type BoardCardType = {
  view: DashboardView;
  board: Board;
  createdBy: any;
};

const BoardCard = ({ board, view, createdBy }: BoardCardType) => {
  const deleteBoard = useMutation(api.boards.mutation.deleteBoard);
  const starBoard = useMutation(api.boards.mutation.starBoard);
  const { user } = useUserStore();
  const { selectedOrgId } = useOrganizationStore();

  const isCreatedByYou = user?.userId === createdBy.userId;

  const onStarHandlerClick = async (event) => {
    event.preventDefault();
    const here = await starBoard({
      id: board._id,
    });
    toast.info(here ? "Board starred!" : "Board removed from starred");
  };

  const dateFormatted = format(board._creationTime, "MMM dd");

  const RenderCreatedBy = () => {
    if (isCreatedByYou) {
      return "ME";
    }
    return (
      <Link href="/profile">
        {createdBy.firstName} - {createdBy.role}
      </Link>
    );
  };

  if (view === "card") {
    return (
      <Link href={`/board/${board._id}/?orgId=${selectedOrgId}`}>
        <div className="w-[230px] group rounded-md h-[280px] hover:shadow-lg p-3 transition border bg-zinc-50 flex flex-col justify-between cursor-pointer relative">
          <DropDownMenuForCard
            deleteBoard={() =>
              deleteBoard({
                id: board._id,
              })
            }
            isCreatedByYou={isCreatedByYou}
          >
            <div className="hidden absolute right-2 top-2 group-hover:flex">
              <button>
                <MoreHorizontal className="text-light text-zinc-600" />
              </button>
            </div>
          </DropDownMenuForCard>
          <div className="flex-1"></div>
          <div className="h-[40px] pt-1 w-full flex flex-row justify-between items-start">
            <div className="flex flex-col">
              <div className="font-light max-w-[90%] overflow-hidden text-ellipsis whitespace-nowrap">
                {board.name}
              </div>
              <div className="text-xs font-light text-zinc-500">
                Created at: {dateFormatted}{" "}
              </div>
            </div>
            <button
              className="flex h-full items-center"
              onClick={onStarHandlerClick}
            >
              <Star
                className={cn(
                  "w-4 h-4",
                  board.isStarred ? "fill-blue-600" : "fill-zinc-200",
                  board.isStarred ? "text-blue-600" : "text-zinc-200"
                )}
              />
            </button>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/board/${board._id}/?orgId=${selectedOrgId}`}>
      <div className="flex flex-row w-full">
        <div className="w-[70%]">
          <div></div>
          <div>
            <div>{board.name}</div>
            <div className="text-xs font-light text-zinc-500">
              Created at: {dateFormatted}
            </div>
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <RenderCreatedBy />
        </div>
        <div className="flex-1 flex justify-center flex-row gap-x-4 items-center">
          <button
            className="flex h-full items-center"
            onClick={onStarHandlerClick}
          >
            <Star
              className={cn(
                "w-4 h-4",
                board.isStarred ? "fill-blue-600" : "fill-zinc-200",
                board.isStarred ? "text-blue-600" : "text-zinc-200"
              )}
            />
          </button>
          <div>
            <DropDownMenuForCard
              deleteBoard={() =>
                deleteBoard({
                  id: board._id,
                })
              }
              isCreatedByYou={isCreatedByYou}
            >
              <div className="group-hover:flex text-zinc-400">
                <button>
                  <MoreHorizontal />
                </button>
              </div>
            </DropDownMenuForCard>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BoardCard;
