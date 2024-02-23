import Logo from "@/components/ui/app/Logo";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { TooltipWrapper } from "@/components/ui/tooltip";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useQuery } from "convex/react";
import { Poppins } from "next/font/google";
import Link from "next/link";
import React from "react";
import { useSearchParams } from "next/navigation";

type InfoProps = {
  boardId: string;
};

const font = Poppins({
  weight: "600",
  subsets: ["latin"],
});

const Separator = () => <div className="text-zinc-400 px-1.5">|</div>;

const Info = ({ boardId }: InfoProps) => {
  const params = useSearchParams();
  const board = useQuery(api.boards.query.get, {
    id: boardId as Id<"boards">,
  });

  return (
    <div className="absolute top-2 left-2 p-1 shadow-md bg-white rounded-sm animate-in slide-in-from-top-0 transition">
      <div className="flex flex-row items-center">
        <TooltipWrapper content="Dashboard">
          <Button asChild variant="ghost">
            <Link href={`/dashboard?orgId=${params.get("orgId")}`}>
              <Logo
                href={`/dashboard?orgId=${params.get("orgId")}`}
                height={40}
                width={40}
              />
              <div className={cn(font.className, "ml-3")}>Board</div>
            </Link>
          </Button>
        </TooltipWrapper>
        <Separator />
        {board && board.name && (
          <Button
            asChild
            variant="ghost"
            className="cursor-pointer animate-in fade-in transition"
          >
            <div>{board.name}</div>
          </Button>
        )}
      </div>
    </div>
  );
};

Info.Skeleton = () => (
  <Skeleton className="absolute top-2 left-2 shadow-md w-[300px] h-6 bg-white rounded-sm">
    s
  </Skeleton>
);

export default Info;
