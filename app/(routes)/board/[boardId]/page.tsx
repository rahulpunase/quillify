'use client';

import dynamic from 'next/dynamic';
import React, { Suspense } from 'react';

import BoardSkeleton from './_components/BoardSkeleton';
import Room from './_components/Room';

type BoardPageProps = {
  params: {
    boardId: string;
  };
};

const NoSSRCanvas = dynamic(() => import('../../../../components/ui/app/KonvaCanvas/AppCanvas'), {
  ssr: false,
  loading: () => <BoardSkeleton />,
});

const BoardPage = ({ params }: BoardPageProps) => {
  return (
    <div className="h-full w-full relative touch-none bg-zinc-200">
      <Room roomId={params.boardId}>
        <NoSSRCanvas boardId={params.boardId} />
      </Room>
    </div>
  );
};

export default BoardPage;
