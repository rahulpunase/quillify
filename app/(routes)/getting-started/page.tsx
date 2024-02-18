"use client";
import React from "react";

import Image from "next/image";
import CreateOrganization from "@/components/ui/app/CreateOrganization";
import { useRouter } from "next/navigation";

const GettingStarted = () => {
  const router = useRouter();

  return (
    <section className="w-full h-full flex justify-center items-center">
      <div className="flex flex-row">
        <div>
          <Image src="/team.svg" alt="team-effort" width={600} height={600} />
        </div>
        <div className="flex justify-center items-center ml-8">
          <CreateOrganization
            onSuccessfullyOrganizationCreated={(id) =>
              router.push(`/dashboard?orgId=${id}`)
            }
          />
        </div>
      </div>
    </section>
  );
};

export default GettingStarted;
