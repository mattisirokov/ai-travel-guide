import { Session } from "@supabase/supabase-js";

export type AuthContext = {
  session: Session | null;
  userProfile: UserProfile | null;
  getSingleUserProfile: (userId: string) => Promise<UserProfile | null>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
  status: LoadingStatus;
};

export type LoadingStatus = "idle" | "fetching" | "complete" | "error";

export type GenerationStatus =
  | "idle"
  | "analyzing"
  | "generating"
  | "complete"
  | "error";

export type UploadStatus = "idle" | "uploading" | "success" | "error";

export interface UserProfile {
  user_id: string;
  first_name: string;
  last_name: string;
}

export interface UploadProgress {
  status: UploadStatus;
  error?: string;
}

export interface UploadResult {
  path: string;
  url: string;
}

export interface Guide {
  id: number;
  user_id: string;
  created_at: string;
  image_url: string;
  content: {
    headline: string;
    titles: string[];
    contents: string[];
  };
  coordinates: {
    latitude: number;
    longitude: number;
  };
}
