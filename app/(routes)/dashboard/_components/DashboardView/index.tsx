"use client";

import useOrganizationStore from "@/store/organization";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import SideBar from "../SideBar";
import Header from "../Header";
import BoardContainer from "../BoardContainer";
import { Button } from "@/components/ui/button";
import CreateOrganizationPopup from "../CreateOrganizationPopup";
import useModalStore from "@/store/modals";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import OrganizationMembersPopup from "../OrganizationMembersPopup";
import CreateOrganizationView from "./CreateOrganizationView";
import DashboardSkeleton from "../DashboardSkeleton";

const DashboardView = () => {
  const { modal, setOpenModal } = useModalStore();

  const organizations = useQuery(api.organization.query.getAll);

  const params = useSearchParams();

  const router = useRouter();

  const paramOrgId = params.get("orgId");

  const { selectedOrgId, setSelectedOrgId } = useOrganizationStore();

  const onOrgCreatedSuccessfully = (orgId: string) => {
    setSelectedOrgId(orgId);
    router.replace(`/dashboard?orgId=${orgId}`);
  };

  useEffect(() => {
    const validOrganization = organizations?.find(
      (org) => org._id === paramOrgId
    );

    if (validOrganization && !selectedOrgId) {
      setSelectedOrgId(validOrganization._id);
      router.replace(`/dashboard?orgId=${validOrganization._id}`);
      return;
    }

    if (organizations?.length && !selectedOrgId) {
      setSelectedOrgId(organizations[0]._id);
      router.replace(`/dashboard?orgId=${organizations[0]._id}`);
      return;
    }
  }, [organizations, selectedOrgId, paramOrgId]);

  if (!organizations) {
    return <DashboardSkeleton />;
  }

  if (organizations.length === 0) {
    return (
      <>
        <CreateOrganizationView />
        {modal === "create-organization" && (
          <CreateOrganizationPopup
            onOpenChange={() => setOpenModal("")}
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
          <div className="flex-grow bg-zinc-100">
            <BoardContainer view="card" />
          </div>
        </div>
      </div>

      {modal === "create-organization" && (
        <CreateOrganizationPopup
          onOpenChange={() => setOpenModal("")}
          onOrgCreatedSuccessfully={onOrgCreatedSuccessfully}
        />
      )}

      {modal === "organization-members" && <OrganizationMembersPopup />}
    </>
  );
};

export default DashboardView;
