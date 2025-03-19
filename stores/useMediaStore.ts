import { create } from "zustand";
import { UploadProgress } from "@/types";

interface MediaStore {
  media: string[];
  uploadStatus: UploadProgress;
  addMedia: (media: string) => void;
  resetMediaFiles: () => void;
  setUploadStatus: (status: UploadProgress) => void;
}

export const useMediaStore = create<MediaStore>((set) => ({
  media: [],
  uploadStatus: { status: "idle" },
  addMedia: (media) => set((state) => ({ media: [...state.media, media] })),
  resetMediaFiles: () => set({ media: [] }),
  setUploadStatus: (status) => set({ uploadStatus: status }),
}));
