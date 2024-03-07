'use client';

import Logo from '@/components/ui/app/Logo';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { TooltipWrapper } from '@/components/ui/tooltip';
import { api } from '@/convex/_generated/api';
import useGetOrgId from '@/lib/hooks/useGetOrgId';
import useGetOrganizationMember from '@/lib/hooks/useGetOrganizationMembers';
import useGetRole from '@/lib/hooks/useGetRole';
import { cn } from '@/lib/utils';
import useModalStore from '@/store/modals';
import { useQuery } from 'convex/react';
import { PlusIcon, ShieldCheck, User } from 'lucide-react';
import { Poppins } from 'next/font/google';
import { usePathname, useRouter } from 'next/navigation';

import BoardLayout from './BoardLayout';
import DocsLayout from './DocsLayout';

const poppins = Poppins({
  weight: ['500'],
  subsets: ['latin'],
});

const SideBar = () => {
  const { setOpenModal } = useModalStore();
  const selectedOrgId = useGetOrgId();

  const organizations = useQuery(api.organization.query.getAll);

  const role = useGetRole();

  const router = useRouter();

  const members = useGetOrganizationMember();

  const pathname = usePathname();

  return (
    <aside className="w-[300px] shrink-0 bg-zinc-50 h-full p-4 flex flex-col">
      <div className="flex flex-row items-center border-b pb-3">
        <div className="mr-3">
          <Logo width={60} />
        </div>
        <span className={cn('text-3xl font-bold', poppins.className)}>Quillify</span>
      </div>

      {!organizations && <Skeleton className="h-20 w-full mt-4" />}
      {organizations.length && (
        <div className="flex flex-col w-full items-start justify-between gap-x-4 p-2 border rounded-sm mt-4">
          <div className="flex flex-row w-full gap-x-3">
            <Select
              value={selectedOrgId}
              onValueChange={(id) => {
                router.replace(`/dashboard?orgId=${id}`);
              }}
            >
              <SelectTrigger className="w-full border-none shadow-none font-semibold">
                <SelectValue placeholder="Organization:" />
              </SelectTrigger>
              <SelectContent className="flex-1">
                {organizations?.map((item) => (
                  <SelectItem key={item._id} value={item._id}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              onClick={() => setOpenModal('create-organization')}
              variant="outline"
              className="px-3 rounded-sm py-2 mr-1"
            >
              <PlusIcon className="w-4 h-4 text-black" />
            </Button>
          </div>
          <div className="flex flex-row w-full mt-2">
            <div className="px-3 mt-2 text-zinc-500 text-xs flex items-center w-full">
              {!members && <Skeleton className="w-full h-4" />}
              {members && members.length && (
                <button
                  className="flex-1 flex justify-start animate-in fade-in transition"
                  onClick={() => setOpenModal('organization-members')}
                >
                  {members.length} user
                </button>
              )}
              {role && (
                <TooltipWrapper content={role === 'ADMIN' ? 'Admin' : 'Member'}>
                  <div>{role === 'ADMIN' ? <ShieldCheck className="h-5 w-5" /> : <User className="h-5 w-5" />}</div>
                </TooltipWrapper>
              )}
            </div>
          </div>
        </div>
      )}
      {pathname === '/dashboard' && <BoardLayout />}
      {pathname === '/dashboard/docs' && <DocsLayout />}
    </aside>
  );
};

export default SideBar;
