import { create } from "zustand";
import { Guide, LoadingStatus } from "@/types";
import { getUsersGuides } from "@/services/supabaseService";
import { supabase } from "@/config/supabase";

interface GuideStore {
  loadingStatus: LoadingStatus;
  guides: Guide[] | null;
  error: string | null;
  initialize: (userId: string) => Promise<void>;
  setGuides: (guides: Guide[]) => void;
  setError: (error: string | null) => void;
  setLoadingStatus: (loadingStatus: LoadingStatus) => void;
}

const useGuideStore = create<GuideStore>((set) => ({
  loadingStatus: "idle",
  guides: null,
  error: null,

  initialize: async (userId: string) => {
    if (!userId) return;

    try {
      set({ loadingStatus: "fetching", error: null });
      const guides = await getUsersGuides(userId);
      set({ guides, loadingStatus: "complete" });
      console.log("Guides synced successfully:", guides.length);
    } catch (error) {
      console.error("Failed to sync guides:", error);
      set({
        error: error instanceof Error ? error.message : "Failed to sync guides",
        loadingStatus: "error",
      });
    }
  },

  setGuides: (guides: Guide[]) => set({ guides }),
  setError: (error: string | null) => set({ error }),
  setLoadingStatus: (loadingStatus: LoadingStatus) => set({ loadingStatus }),
}));

export default useGuideStore;
