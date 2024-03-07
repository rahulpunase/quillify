import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const BoardSkeleton = () => (
  <div className="w-full h-full flex bg-zinc-200">
    <Skeleton className="absolute h-12 w-[300px] bg-white rounded-md shadow-sm left-2 top-2" />
    <Skeleton className="absolute h-12 w-[200px] bg-white rounded-md shadow-sm right-2 top-2" />
    <Skeleton className="absolute w-[400px] h-12 bg-white rounded-md shadow-sm top-2 left-[50%] translate-x-[-50%]" />
  </div>
);

export default BoardSkeleton;
