import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useQuery } from 'convex/react';

import useGetOrgId from './useGetOrgId';

const useGetRole = () => {
  const selectedOrgId = useGetOrgId();
  return useQuery(api.members.query.getRole, {
    orgId: selectedOrgId as Id<'organizations'>,
  });
};

export default useGetRole;
