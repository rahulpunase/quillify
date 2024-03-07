import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useQuery } from 'convex/react';

import useGetOrgId from './useGetOrgId';

const useGetOrganizationMember = () => {
  const selectedOrgId = useGetOrgId();
  return useQuery(api.members.query.getAllMembersFromOrg, {
    orgId: selectedOrgId as Id<'organizations'>,
  });
};

export default useGetOrganizationMember;
