import { create } from "zustand";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/config/supabase";
import { UserProfile, LoadingStatus } from "@/types";

interface AuthStore {
  session: Session | null;
  userProfile: UserProfile | null;
  loading: boolean;
  status: LoadingStatus;

  initialize: () => Promise<void>;
  fetchUserData: (userId: string) => Promise<UserProfile | null>;
  getSingleUserProfile: (userId: string) => Promise<UserProfile | null>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  session: null,
  userProfile: null,
  loading: true,
  status: "idle",

  initialize: async () => {
    set({ status: "fetching" });

    try {
      const { data, error } = await supabase.auth.getSession();

      if (error) throw error;

      const session = data.session;
      set({ session });

      if (session?.user) {
        const userData = await get().fetchUserData(session.user.id);
        if (userData) {
          set({
            userProfile: {
              user_id: session.user.id,
              first_name: userData.first_name,
              last_name: userData.last_name,
            },
          });
        }
      }

      set({ status: "complete" });
    } catch (error) {
      console.error("Error initializing auth store:", error);
      set({ status: "error" });
    } finally {
      set({ loading: false });
    }

    // Set up auth state change listener
    supabase.auth.onAuthStateChange(async (_event, session) => {
      set({ status: "fetching" });

      try {
        set({ session });
        if (session?.user) {
          const userData = await get().fetchUserData(session.user.id);
          if (userData) {
            set({
              userProfile: {
                user_id: session.user.id,
                first_name: userData.first_name,
                last_name: userData.last_name,
              },
            });
          }
        }
        set({ status: "complete" });
      } catch (error) {
        console.error("Error during auth state change:", error);
        set({ status: "error" });
      } finally {
        set({ loading: false });
      }
    });
  },

  fetchUserData: async (userId: string): Promise<UserProfile | null> => {
    const { data, error } = await supabase
      .from("Users")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
    return data;
  },

  getSingleUserProfile: async (userId: string): Promise<UserProfile | null> => {
    const { data: userProfile, error } = await supabase
      .from("Users")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }

    return userProfile;
  },

  signIn: async (email: string, password: string): Promise<void> => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
  },

  signOut: async (): Promise<void> => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    set({ session: null, userProfile: null });
  },
}));
