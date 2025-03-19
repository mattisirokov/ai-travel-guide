import { useEffect } from "react";
import { useAuthStore } from "./useAuthStore";
import { getUsersGuides } from "@/services/supabaseService";
import useGuideStore from "./useGuideStore";

export const useSyncUserGuides = () => {
  const { session, status } = useAuthStore();
  const { setGuides } = useGuideStore();

  useEffect(() => {
    const syncGuides = async () => {
      if (session?.user?.id && status === "complete") {
        try {
          const guides = await getUsersGuides(session.user.id);
          setGuides(guides);
          console.log("Guides synced successfully:", guides.length);
        } catch (error) {
          console.error("Failed to sync guides:", error);
        }
      }
    };

    syncGuides();
  }, [status]);
};

export default useSyncUserGuides;
