import { useEffect } from "react";

import { router } from "expo-router";

import { View, Text } from "@/components/Themed";

import { useMediaStore } from "@/stores/useMediaStore";
import { useUserLocationStore } from "@/stores/useUserLocationStore";
import { useGenerateAIGuide } from "@/services/useGenerateAIGuide";

export default function LoadingGuideScreen() {
  const { media, resetMediaFiles } = useMediaStore();
  const { latitude, longitude } = useUserLocationStore();
  const { generateGuide, status, isProcessing } = useGenerateAIGuide();

  useEffect(() => {
    const generateAndSaveGuide = async () => {
      try {
        if (!media.length) {
          throw new Error("No images provided");
        }

        if (!latitude || !longitude) {
          throw new Error("Location not found");
        }

        const guideId = await generateGuide({
          imageUrl: media[0],
          latitude,
          longitude,
        });

        if (guideId) {
          router.push({
            pathname: "/guide",
            params: { guideId },
          });
        }
      } catch (error) {
        console.error("Error generating guide:", error);
      }
    };

    generateAndSaveGuide();
    resetMediaFiles();
  }, []);

  const getStatusMessage = () => {
    switch (status.status) {
      case "analyzing":
        return "Analyzing your location...";
      case "generating":
        return "Creating your personalized guide...";
      case "saving":
        return "Saving your guide...";
      case "error":
        return `Error: ${status.error}`;
      case "complete":
        return "Guide created successfully!";
      default:
        return "Preparing to generate your guide...";
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>{getStatusMessage()}</Text>
    </View>
  );
}
