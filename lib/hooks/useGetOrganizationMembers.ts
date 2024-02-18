import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import useOrganizationStore from "@/store/organization";
import { useQuery } from "convex/react";

const useGetOrganizationMember = () => {
  const { selectedOrgId } = useOrganizationStore();
  return useQuery(api.members.query.getAllMembersFromOrg, {
    orgId: selectedOrgId as Id<"organizations">,
  });
};

export default useGetOrganizationMember;
