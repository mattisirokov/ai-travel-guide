import { useEffect } from "react";
import { useAuthStore } from "./useAuthStore";
import useGuideStore from "./useGuideStore";

import { getUsersGuides } from "@/services/supabaseService";

export const useSyncUserGuides = () => {
  const { userProfile, status: authStoreStatus } = useAuthStore();
  const { setGuides, setLoadingStatus, setError } = useGuideStore();

  const hasSession = userProfile?.id;

  useEffect(() => {
    const syncGuides = async () => {
      if (hasSession && authStoreStatus === "complete") {
        try {
          setLoadingStatus("fetching");
          setError(null);
          const guides = await getUsersGuides(userProfile.id);
          setGuides(guides);
          setLoadingStatus("complete");
          console.log("Guides synced successfully:", guides.length);
        } catch (error) {
          console.error("Failed to sync guides:", error);
          setError(
            error instanceof Error ? error.message : "Failed to sync guides"
          );
          setLoadingStatus("error");
        }
      }
    };

    syncGuides();
  }, [authStoreStatus]);
};

export default useSyncUserGuides;
