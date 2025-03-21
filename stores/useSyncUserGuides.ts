import { useEffect } from "react";
import { useAuthStore } from "./useAuthStore";
import useGuideStore from "./useGuideStore";
import { getUsersGuides } from "@/services/supabaseService";

export const useSyncUserGuides = () => {
  const { userProfile, status: authStoreStatus } = useAuthStore();
  const { setGuides, setLoadingStatus, setError } = useGuideStore();

  const hasUserProfileAndAuthStoreSynced =
    userProfile?.user_id && authStoreStatus === "complete";

  const syncGuides = async () => {
    if (!userProfile) return;

    try {
      setLoadingStatus("fetching");
      setError(null);
      const guides = await getUsersGuides(userProfile.user_id);
      setGuides(guides);
      setLoadingStatus("complete");
      console.log("Guides synced successfully:", guides.length);
      console.log("WITH USER ID:", userProfile.user_id);
    } catch (error) {
      console.error("Failed to sync guides:", error);
      setError(
        error instanceof Error ? error.message : "Failed to sync guides"
      );
      setLoadingStatus("error");
    }
  };

  useEffect(() => {
    if (hasUserProfileAndAuthStoreSynced) {
      syncGuides();
    }
  }, [hasUserProfileAndAuthStoreSynced]);

  return syncGuides;
};

export default useSyncUserGuides;
