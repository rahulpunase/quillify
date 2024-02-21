"use client";

import React, { Suspense } from "react";
import Room from "./_components/Room";
import dynamic from "next/dynamic";
import BoardSkeleton from "./_components/BoardSkeleton";

type BoardPageProps = {
  params: {
    boardId: string;
  };
};

const NoSSRCanvas = dynamic(
  () => import("../../../../components/ui/app/KonvaCanvas/AppCanvas"),
  {
    ssr: false,
    loading: () => (
      <div>
        <BoardSkeleton />
      </div>
    ),
  }
);

const BoardPage = ({ params }: BoardPageProps) => {
  return (
    <div className="h-full w-full relative touch-none">
      <Room roomId={params.boardId}>
        <NoSSRCanvas boardId={params.boardId} />
      </Room>
    </div>
  );
};

export default BoardPage;
