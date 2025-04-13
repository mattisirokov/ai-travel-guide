import { useState } from "react";
import { useLocation } from "./useLocation";
import { useGetNearbyPointsOfInterest } from "./useGetNearbyPointsOfInterest";
import { useImageAnalysis } from "./useImageAnalysis";
import { useGenerateGuideText } from "./useGenerateGuideText";
import { Guide } from "@/types";

type GenerationStep =
  | "idle"
  | "getting_location"
  | "analyzing_location"
  | "analyzing_image"
  | "generating_guide"
  | "complete"
  | "error";

export const useGenerateAIGuide = () => {
  const [generationStep, setGenerationStep] = useState<GenerationStep>("idle");

  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [locationAnalysisResults, setLocationAnalysisResults] = useState<any[]>(
    []
  );
  const [imageAnalysisResults, setImageAnalysisResults] = useState<any[]>([]);

  const {
    getUserLocation,
    status: userLocationStatus,
    error: locationError,
  } = useLocation();

  const nearbyPlacesService = useGetNearbyPointsOfInterest(
    userLocation || null
  );

  const { analyzeImage, isAnalyzing, analysisResult, error } =
    useImageAnalysis();

  const { generateGuide: generateGuideContent } = useGenerateGuideText();

  const generateGuide = async (
    imageUrl: string
  ): Promise<Omit<Guide, "id">> => {
    let nearbyPlaces: any[] = [];
    let locationImageAnalysis: any = null;

    try {
      // Step 1: Get user location

      setGenerationStep("getting_location");
      const location = await getUserLocation();

      if (!location) {
        throw new Error("No location data available");
      }

      setUserLocation(location);

      if (userLocationStatus === "error" || locationError) {
        throw new Error(locationError || "Failed to get user location");
      }

      // Step 2: Get nearby points of interest using the location we just got

      setGenerationStep("analyzing_location");

      try {
        nearbyPlaces = await nearbyPlacesService.fetchNearbyPlaces(location);

        if (!nearbyPlaces || nearbyPlaces.length === 0) {
          setLocationAnalysisResults([]);
        } else {
          setLocationAnalysisResults(nearbyPlaces);
        }
      } catch (error) {
        console.error("Nearby places error:", error);
        setLocationAnalysisResults([]);
        throw new Error("Failed to get nearby points of interest");
      }

      // Step 3: Analyze the image and return some tags

      setGenerationStep("analyzing_image");

      try {
        locationImageAnalysis = await analyzeImage(imageUrl);
        setImageAnalysisResults(locationImageAnalysis as any);
      } catch (error) {
        console.error("Image analysis error:", error);
        setImageAnalysisResults([]);
        throw new Error("Failed to analyze image");
      }

      // Step 4: Generate the audio guide content

      setGenerationStep("generating_guide");

      try {
        const guideContent = await generateGuideContent({
          location,
          nearbyPlaces,
          imageAnalysis: locationImageAnalysis,
        });

        const guide: Omit<Guide, "id"> = {
          content: guideContent.content,
          image_url: imageUrl,
          coordinates: location,
          user_id: "",
          created_at: new Date().toISOString(),
        };

        setGenerationStep("complete");
        return guide;
      } catch (error) {
        console.error("Error generating guide:", error);
        throw new Error("Failed to generate guide content");
      }
    } catch (error) {
      setGenerationStep("error");
      const errorMessage =
        error instanceof Error ? error.message : "Failed to generate guide";
      throw new Error(errorMessage);
    }
  };

  return {
    generateGuide,
    generationStep,
    userLocation,
    locationAnalysisResults,
    imageAnalysisResults,
  };
};
