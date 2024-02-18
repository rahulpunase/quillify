import { create } from "zustand";

type BoardType = "recent" | "starred";
export type DashboardView = "card" | "list";

type DashboardStore = {
  selectedBoardType: BoardType;
  setSelectedBoardType: (type: BoardType) => void;

  selectedView: DashboardView;
  setSelectedViewType: (view: DashboardView) => void;

  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

const useDashboardStore = create<DashboardStore>()((set) => ({
  selectedBoardType: "recent",
  setSelectedBoardType: (type: BoardType) =>
    set(() => ({ selectedBoardType: type })),

  selectedView: "card",
  setSelectedViewType: (view: DashboardView) =>
    set(() => ({
      selectedView: view,
    })),

  searchQuery: "",
  setSearchQuery: (query: string) =>
    set(() => ({
      searchQuery: query,
    })),
}));

export default useDashboardStore;
