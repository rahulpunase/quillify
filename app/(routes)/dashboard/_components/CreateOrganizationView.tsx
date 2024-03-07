import { Button } from "@/components/ui/button";
import useModalStore from "@/store/modals";
import Image from "next/image";
import React from "react";

const CreateOrganizationView = () => {
  const { modal, setOpenModal } = useModalStore();

  return (
    <div className="flex w-full justify-center flex-col items-center h-full pb-16">
      <div className="h-[600px] w-[400px] relative">
        <Image src="/organizations.svg" fill alt="Organizations" />
      </div>
      <div className="mb-4">
        You do not have any organization. Please create one to continue
      </div>
      <Button onClick={() => setOpenModal("create-organization")}>
        Create organization
      </Button>
    </div>
  );
};

export default CreateOrganizationView;
