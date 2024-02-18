import { create } from "zustand";

type ModalTypes =
  | ""
  | "create-organization"
  | "new-board"
  | "invite-members"
  | "organization-members";

type ModalStore = {
  modal: ModalTypes;
  setOpenModal: (type: ModalTypes) => void;
};

const useModalStore = create<ModalStore>()((set) => ({
  modal: "",
  setOpenModal: (type: ModalTypes) => set(() => ({ modal: type })),
}));

export default useModalStore;
