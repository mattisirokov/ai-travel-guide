import { create } from "zustand";
import { GenerationStatus, LoadingStatus } from "@/types";

interface GuideGenerationStore {
  userLocation: {
    latitude: number;
    longitude: number;
  } | null;
  locationAnalysisStatus: LoadingStatus;
  locationAnalyisResults: string[];
  imageAnalysisStatus: GenerationStatus;
  imageAnalysisResults: string[];
  guideGenerationStatus: GenerationStatus;
  guideId: string | null;

  setUserLocation: (location: { latitude: number; longitude: number }) => void;
  setLocationAnalysisStatus: (status: LoadingStatus) => void;
  setLocationAnalyisResults: (results: string[]) => void;
  setImageAnalysisStatus: (status: GenerationStatus) => void;
  setImageAnalysisResults: (results: string[]) => void;
  setGuideGenerationStatus: (status: GenerationStatus) => void;
  setGuideId: (guideId: string) => void;
}

export const useGuideGenerationStore = create<GuideGenerationStore>((set) => ({
  userLocation: null,
  locationAnalysisStatus: "idle",
  locationAnalyisResults: [],
  imageAnalysisStatus: "idle",
  imageAnalysisResults: [],
  guideGenerationStatus: "idle",
  guideId: null,

  setUserLocation: (location) => set({ userLocation: location }),
  setLocationAnalysisStatus: (status) =>
    set({ locationAnalysisStatus: status }),
  setLocationAnalyisResults: (results) =>
    set({ locationAnalyisResults: results }),
  setImageAnalysisStatus: (status) => set({ imageAnalysisStatus: status }),
  setImageAnalysisResults: (results) => set({ imageAnalysisResults: results }),
  setGuideGenerationStatus: (status) => set({ guideGenerationStatus: status }),
  setGuideId: (guideId: string) => set({ guideId }),
}));
