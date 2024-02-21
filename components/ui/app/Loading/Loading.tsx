"use client";
import React from "react";
import DashboardSkeleton from "@/app/(routes)/dashboard/_components/DashboardSkeleton";
import BoardSkeleton from "@/app/(routes)/board/[boardId]/_components/BoardSkeleton";
import { usePathname } from "next/navigation";

const Loading = () => {
  const pathName = usePathname();
  if (pathName.includes("/dashboard")) {
    return (
      <div className="w-full h-full flex ">
        <DashboardSkeleton />
      </div>
    );
  }

  if (pathName.includes("/board")) {
    return (
      <div className="w-full h-full flex">
        <BoardSkeleton />
      </div>
    );
  }
  return <div>Loading...</div>;
};

export default Loading;
