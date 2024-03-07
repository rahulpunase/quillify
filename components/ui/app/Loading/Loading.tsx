'use client';

import BoardSkeleton from '@/app/(routes)/board/[boardId]/_components/BoardSkeleton';
import DashboardSkeleton from '@/app/(routes)/dashboard/_components/DashboardSkeleton';
import { usePathname } from 'next/navigation';
import React from 'react';

const Loading = () => {
  const pathName = usePathname();
  if (pathName.includes('/dashboard')) {
    return (
      <div className="w-full h-full flex ">
        <DashboardSkeleton />
      </div>
    );
  }

  if (pathName.includes('/board')) {
    return <BoardSkeleton />;
  }
  return <div>Loading...</div>;
};

export default Loading;
