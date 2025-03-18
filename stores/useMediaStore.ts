import { create } from "zustand";
import { UploadProgress } from "@/types";

interface MediaStore {
  media: string[];
  uploadStatus: UploadProgress;
  addMedia: (media: string) => void;
  clearMedia: () => void;
  resetStatus: () => void;
  setUploadStatus: (status: UploadProgress) => void;
}

export const useMediaStore = create<MediaStore>((set) => ({
  media: [],
  uploadStatus: { status: "idle" },
  addMedia: (media) => set((state) => ({ media: [...state.media, media] })),
  clearMedia: () => set({ media: [] }),
  setUploadStatus: (status) => set({ uploadStatus: status }),
  resetStatus: () => set({ uploadStatus: { status: "idle" }, media: [] }),
}));
