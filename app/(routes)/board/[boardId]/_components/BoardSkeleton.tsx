import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const BoardSkeleton = () => (
  <div>
    <Skeleton className="absolute h-12 w-[300px] bg-white rounded-sm shadow-sm left-2 top-2" />
    <Skeleton className="absolute h-12 w-[200px] bg-white rounded-sm shadow-sm right-2 top-2" />
    <Skeleton className="absolute w-[60px] h-[400px] bg-white rounded-sm shadow-sm left-2 top-[50%] translate-y-[-50%]" />
  </div>
);

export default BoardSkeleton;
