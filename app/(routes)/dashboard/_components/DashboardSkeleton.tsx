import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const DashboardSkeleton = () => {
  return (
    <div className="flex flex-row w-full h-full p-3 gap-x-8">
      <div className="w-[300px] shrink-0 flex flex-col">
        <div>
          <Skeleton className="w-full h-10" />
        </div>
        <div className="mt-6">
          <Skeleton className="w-full h-24" />
        </div>
        <div className="flex flex-col gap-y-4 mt-6">
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-full h-4 -scroll-mt-8" />
        </div>
      </div>
      <div className="flex flex-col flex-1">
        <div className="flex flex-row w-full items-center pr-6">
          <div className="w-[40%]">
            <Skeleton className=" h-10" />
          </div>
          <div className="flex-1 flex flex-row justify-end gap-x-4">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="rounded-full h-8 w-8" />
          </div>
        </div>

        <div className="flex flex-col w-full mt-6">
          <Skeleton className="h-8 w-[300px]" />
          <Skeleton className="h-4 w-[240px] mt-4" />
        </div>

        <div className="flex flex-row mt-10 gap-x-4">
          <Skeleton className="w-[230px] rounded-md h-[280px]" />
          <Skeleton className="w-[230px] rounded-md h-[280px]" />
          <Skeleton className="w-[230px] rounded-md h-[280px]" />
          <Skeleton className="w-[230px] rounded-md h-[280px]" />
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
