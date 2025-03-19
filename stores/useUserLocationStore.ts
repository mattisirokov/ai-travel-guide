import { create } from "zustand";

interface UserLocationStore {
  latitude: number;
  longitude: number;
  error: string | null;
  setLocation: (latitude: number, longitude: number) => void;
  setError: (error: string) => void;
}

export const useUserLocationStore = create<UserLocationStore>((set) => ({
  latitude: 0,
  longitude: 0,
  error: null,
  setLocation: (latitude: number, longitude: number) =>
    set({ latitude, longitude }),
  setError: (error: string) => set({ error }),
}));
