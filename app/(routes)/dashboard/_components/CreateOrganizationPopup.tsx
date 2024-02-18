import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import CreateOrganization from "@/components/ui/app/CreateOrganization";

const CreateOrganizationPopup = ({
  onOpenChange,
  onOrgCreatedSuccessfully,
}: {
  onOpenChange?: (bool: boolean) => void;
  onOrgCreatedSuccessfully: (orgId: string) => void;
}) => {
  return (
    <Dialog open onOpenChange={onOpenChange}>
      <DialogContent className="bg-transparent border-none shadow-none">
        <CreateOrganization
          onSuccessfullyOrganizationCreated={(orgId) => {
            onOpenChange?.(false);
            onOrgCreatedSuccessfully(orgId);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreateOrganizationPopup;
