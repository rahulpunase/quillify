import { useSearchParams } from 'next/navigation';

const useGetOrgId = () => {
  const params = useSearchParams();
  return params.get('orgId');
};

export default useGetOrgId;
