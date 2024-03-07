import { Button } from '@/components/ui/button';
import useGetOrgId from '@/lib/hooks/useGetOrgId';
import { ExternalLink, MoreHorizontal, PlusCircle, PlusIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const DocsLayout = () => {
  const selectedOrgId = useGetOrgId();

  return (
    <div className="flex flex-col py-4">
      <Link className="text-sm flex flex-row items-center justify-between" href={`/dashboard?orgId=${selectedOrgId}`}>
        Boards
        <span>
          <ExternalLink className="size-4" />
        </span>
      </Link>
      <div className="w-full h-[1px] my-3 bg-zinc-200"></div>

      <div className="flex flex-col mt-4">
        <div className="w-full flex flex-row items-center justify-between text-sm font-semibold">
          TeamSpace
          <div>
            <Button variant="ghost">
              <MoreHorizontal size="sm" className="size-4" />
            </Button>
            <Button size="sm" variant="secondary" className="rounded-sm">
              <PlusIcon className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocsLayout;
