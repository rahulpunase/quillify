import React from "react";
import Room from "./_components/Room";
import Canvas from "./_components/Canvas";

type BoardPageProps = {
  params: {
    boardId: string;
  };
};

const BoardPage = ({ params }: BoardPageProps) => {
  return (
    <div className="h-full w-full relative bg-neutral-100 touch-none">
      <Room roomId={params.boardId}>
        <Canvas boardId={params.boardId} />
      </Room>
    </div>
  );
};

export default BoardPage;