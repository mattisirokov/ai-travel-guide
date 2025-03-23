import { useLocation } from "./useLocation";
import { useMediaStore } from "@/stores/useMediaStore";
import { useGuideGenerationStore } from "@/stores/useGuideGenerationStore";
import { useGetNearbyPointsOfInterest } from "./useGetNearbyPointsOfInterest";

export const useGenerateAIGuide = () => {
  const {
    locationAnalysisStatus,
    userLocation,
    setUserLocation,
    setLocationAnalyisResults,
    setLocationAnalysisStatus,
  } = useGuideGenerationStore();

  const {
    getUserLocation,
    status: userLocationStatus,
    error: locationError,
  } = useLocation();

  const nearbyPlacesService = useGetNearbyPointsOfInterest(
    userLocation || null
  );

  const { media } = useMediaStore();

  const generateGuide = async () => {
    try {
      // Step 1: Get user location

      const location = await getUserLocation();

      if (!location) {
        throw new Error("No location data available");
      }

      console.log("USERS LOCATION: ", location);

      if (userLocationStatus === "error" || locationError) {
        throw new Error(locationError || "Failed to get user location");
      }

      // Step 2: Get nearby points of interest using the location we just got

      setLocationAnalysisStatus("fetching");

      try {
        const nearbyPlaces = await nearbyPlacesService.fetchNearbyPlaces(
          location
        );

        if (!nearbyPlaces || nearbyPlaces.length === 0) {
          console.log("No nearby places found");
          setLocationAnalyisResults([]);
        } else {
          setLocationAnalyisResults(nearbyPlaces);
        }

        setLocationAnalysisStatus("complete");
        console.log("NEARBY PLACES: ", nearbyPlaces);
      } catch (error) {
        console.error("Nearby places error:", error);
        setLocationAnalysisStatus("error");
        setLocationAnalyisResults([]);
        throw new Error("Failed to get nearby points of interest");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to generate guide";
      throw new Error(errorMessage);
    }
  };

  return {
    generateGuide,
    isProcessingLocation:
      userLocationStatus === "loading" || locationAnalysisStatus === "fetching",
    locationError:
      locationError ||
      (locationAnalysisStatus === "error"
        ? "Failed to analyze location"
        : null),
  };
};
