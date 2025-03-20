import { create } from "zustand";
import { Guide, LoadingStatus } from "@/types";

interface GuideStore {
  loadingStatus: LoadingStatus;
  guides: Guide[] | null;
  error: string | null;
  setGuides: (guides: Guide[]) => void;
  setError: (error: string | null) => void;
  setLoadingStatus: (loadingStatus: LoadingStatus) => void;
}

const useGuideStore = create<GuideStore>((set) => ({
  loadingStatus: "idle",
  guides: null,
  error: null,
  setGuides: (guides: Guide[]) => set({ guides }),
  setError: (error: string | null) => set({ error }),
  setLoadingStatus: (loadingStatus: LoadingStatus) => set({ loadingStatus }),
}));

export default useGuideStore;
