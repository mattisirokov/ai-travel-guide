import { create } from "zustand";
import { Guide } from "@/types";

interface GuideStore {
  guides: Guide[];
  setGuides: (guides: Guide[]) => void;
}

const useGuideStore = create<GuideStore>((set) => ({
  guides: [],
  setGuides: (guides: Guide[]) => set({ guides }),
}));

export default useGuideStore;
