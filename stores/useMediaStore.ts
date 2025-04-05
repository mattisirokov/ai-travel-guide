import { create } from "zustand";
import { UploadProgress } from "@/types";

interface MediaStore {
  media: string[];
  imageUrl: string;
  uploadStatus: UploadProgress;
  addMedia: (media: string) => void;
  addImageUrl: (imageUrl: string) => void;
  resetMediaFiles: () => void;
  setUploadStatus: (status: UploadProgress) => void;
}

export const useMediaStore = create<MediaStore>((set) => ({
  media: [],
  imageUrl: "",
  uploadStatus: { status: "idle" },
  addMedia: (media) => set((state) => ({ media: [...state.media, media] })),
  addImageUrl: (imageUrl) => set({ imageUrl }),
  resetMediaFiles: () => set({ media: [] }),
  setUploadStatus: (status) => set({ uploadStatus: status }),
}));
