import React from "react";

import { useOrganization, CreateOrganization } from "@clerk/nextjs";

const GettingStarted = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <CreateOrganization afterCreateOrganizationUrl="/dashboard" />
    </div>
  );
};

export default GettingStarted;
