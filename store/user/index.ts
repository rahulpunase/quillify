import { create } from "zustand";

type User = {
  firstName: string;
  lastName: string;
  pictureUrl: string;
  email: string;
  userId: string;
};

type UserStore = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const useUserStore = create<UserStore>()((set) => ({
  user: null,
  setUser: (user: User | null) => set(() => ({ user: user })),
}));

export default useUserStore;
