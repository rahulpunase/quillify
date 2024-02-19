"use client";
import { AlignJustify, Grid2X2 } from "lucide-react";
import React from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import useOrganizationStore from "@/store/organization";
import NewBoardButton from "../NewBoardButton";
import BoardCardList from "../BoardCardsList";
import useDashboardStore from "@/store/dashboard";
import { cn } from "@/lib/utils";
import { Id } from "@/convex/_generated/dataModel";

const BoardContainer = ({ view }: { view: "card" | "list" }) => {
  const { selectedOrgId } = useOrganizationStore();
  const { selectedBoardType, selectedView, setSelectedViewType, searchQuery } =
    useDashboardStore();

  const boards = useQuery(api.boards.query.getAll, {
    orgId: selectedOrgId as Id<"organizations">,
    filterByStarred: selectedBoardType === "starred",
    searchField: searchQuery,
  });

  return (
    <div className="p-8">
      <div>
        <div className="flex flex-row justify-between w-full items-center">
          <h1 className="text-4xl">
            {selectedBoardType === "starred"
              ? "Starred boards"
              : "Recent Boards"}
          </h1>
          <div>
            <div className="flex flex-row gap-x-4">
              <button
                className={cn(
                  "text-zinc-400 cursor-pointer hover:text-zinc-800",
                  selectedView === "card" && "text-zinc-800"
                )}
                onClick={() => setSelectedViewType("card")}
              >
                <Grid2X2 />
              </button>
              <button
                className={cn(
                  "text-zinc-400 cursor-pointer hover:text-zinc-800",
                  selectedView === "list" && "text-zinc-800"
                )}
                onClick={() => setSelectedViewType("list")}
              >
                <AlignJustify />
              </button>
            </div>
          </div>
        </div>
        {!boards?.length ? (
          <span className="text-xs text-zinc-500">No boards available</span>
        ) : (
          <span className="text-xs text-zinc-500">{boards.length} found</span>
        )}
      </div>
      {selectedView === "card" && (
        <div className="flex flex-row mt-8 flex-wrap gap-6 ">
          <NewBoardButton view={selectedView} />
          <BoardCardList boards={boards} />
        </div>
      )}
      {selectedView === "list" && (
        <div className="flex flex-col mt-8 gap-6">
          <div className="w-full flex flex-row border-b pb-3">
            <div className="w-[70%]">
              <NewBoardButton view={selectedView} />
            </div>
            <div className="flex-1 flex justify-center text-zinc-500">
              Owner
            </div>
            <div className="flex-1 flex justify-center text-zinc-500">
              Starred
            </div>
          </div>
          <BoardCardList boards={boards} />
        </div>
      )}
    </div>
  );
};

export default BoardContainer;
