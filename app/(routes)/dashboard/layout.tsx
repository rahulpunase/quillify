'use client';

import useSetOrganizationId from '@/lib/hooks/useSetOrganizationId';
import useModalStore from '@/store/modals';
import { useRouter } from 'next/navigation';

import CreateOrganizationPopup from './_components/CreateOrganizationPopup';
import CreateOrganizationView from './_components/CreateOrganizationView';
import DashboardSkeleton from './_components/DashboardSkeleton';
import Header from './_components/Header';
import OrganizationMembersPopup from './_components/OrganizationMembersPopup';
import SideBar from './_components/SideBar';

const DashboardLayout = ({ children }) => {
  const { modal, setOpenModal } = useModalStore();
  const router = useRouter();

  const organizations = useSetOrganizationId();

  const onOrgCreatedSuccessfully = (orgId: string) => {
    router.replace(`/dashboard?orgId=${orgId}`);
  };

  if (!organizations) {
    return <DashboardSkeleton />;
  }

  if (organizations.length === 0) {
    return (
      <>
        <CreateOrganizationView />
        {modal === 'create-organization' && (
          <CreateOrganizationPopup
            onOpenChange={() => setOpenModal('')}
            onOrgCreatedSuccessfully={onOrgCreatedSuccessfully}
          />
        )}
      </>
    );
  }

  return (
    <>
      <div className="flex w-full flex-row h-full">
        <SideBar />
        <div className="flex-1 flex flex-col">
          <Header />
          <div className="flex-grow bg-zinc-100 animate-in fade-in transition">{children}</div>
        </div>
      </div>

      {modal === 'create-organization' && (
        <CreateOrganizationPopup
          onOpenChange={() => setOpenModal('')}
          onOrgCreatedSuccessfully={onOrgCreatedSuccessfully}
        />
      )}

      {modal === 'organization-members' && <OrganizationMembersPopup />}
    </>
  );
};

export default DashboardLayout;
