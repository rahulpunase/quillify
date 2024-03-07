import { create } from 'zustand';

type OrganizationStore = {
  selectedOrgId: string;
  setSelectedOrgId: (id: string) => void;
};

const useOrganizationStore = create<OrganizationStore>()((set) => ({
  selectedOrgId: '',
  setSelectedOrgId: (id: string) => set(() => ({ selectedOrgId: id })),
}));

export default useOrganizationStore;
