import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import useGetOrgId from './useGetOrgId';

const useSetOrganizationId = () => {
  const organizations = useQuery(api.organization.query.getAll);
  const router = useRouter();

  const paramOrgId = useGetOrgId();

  useEffect(() => {
    const validOrganization = organizations?.find((org) => org._id === paramOrgId);

    if (validOrganization) {
      router.replace(`/dashboard?orgId=${validOrganization._id}`);
      return;
    }

    if (organizations?.length) {
      router.replace(`/dashboard?orgId=${organizations[0]._id}`);
      return;
    }
  }, [organizations, paramOrgId]);

  return organizations;
};

export default useSetOrganizationId;
