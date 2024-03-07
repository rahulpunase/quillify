import useGetOrgId from '@/lib/hooks/useGetOrgId';
import { cn } from '@/lib/utils';
import useDashboardStore from '@/store/dashboard';
import { StarFilledIcon } from '@radix-ui/react-icons';
import { ExternalLink, Timer, Trash } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const BoardLayout = () => {
  const { selectedBoardType, setSelectedBoardType } = useDashboardStore();
  const selectedOrgId = useGetOrgId();

  return (
    <div className="flex flex-col py-4">
      <Link
        className="text-sm flex flex-row items-center justify-between"
        href={`/dashboard/docs?orgId=${selectedOrgId}`}
      >
        Documents
        <span>
          <ExternalLink className="size-4" />
        </span>
      </Link>
      <div className="w-full h-[1px] my-3 bg-zinc-200"></div>
      <button
        className={cn(
          'flex flex-row items-center gap-2 hover:text-blue-800 py-2 text-zinc-500 text-normal text-sm',
          selectedBoardType === 'recent' && 'text-black',
        )}
        onClick={() => setSelectedBoardType('recent')}
      >
        <Timer className="w-4 h-4" /> Recent boards
      </button>
      <button
        className={cn(
          'flex flex-row items-center gap-2 hover:text-blue-800 py-2 text-zinc-500 text-sm',
          selectedBoardType === 'starred' && 'text-black',
        )}
        onClick={() => setSelectedBoardType('starred')}
      >
        <StarFilledIcon className="w-4 h-4" /> Starred boards
      </button>
      <div className="w-full h-[1px] my-3 bg-zinc-200"></div>

      <button
        className={cn(
          'flex flex-row items-center gap-2 hover:text-blue-800 py-2 text-zinc-500 text-sm',
          selectedBoardType === 'starred' && 'text-black',
        )}
        onClick={() => setSelectedBoardType('starred')}
      >
        <Trash className="w-4 h-4" /> Trash
      </button>
    </div>
  );
};

export default BoardLayout;
