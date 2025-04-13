import { useEffect, useState } from "react";
import { View, Text } from "@/components/Themed";
import { router } from "expo-router";

import { useGenerateAIGuide } from "@/services/useGenerateAIGuide";
import { useAuthStore } from "@/stores/useAuthStore";
import { useMediaStore } from "@/stores/useMediaStore";
import { saveGuideToDatabase } from "@/services/supabaseService";
import { ErrorMessage, LoadingOverlay } from "@/components/uikit";

export default function LoadingGuideScreen() {
  const { generateGuide, generationStep } = useGenerateAIGuide();
  const { userProfile } = useAuthStore();
  const { imageUrl } = useMediaStore();
  const [guideContent, setGuideContent] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const generateContent = async () => {
      if (!imageUrl) {
        console.error("No image URL provided");
        return;
      }

      try {
        const content = await generateGuide(imageUrl);
        console.log("Generated content:", content);
        setGuideContent(content);

        // Automatically save and navigate when generation is complete

        if (content && userProfile) {
          const savedGuide = await saveGuideToDatabase({
            content: content.content,
            image_url: imageUrl,
            coordinates: content.coordinates,
            user_id: userProfile.user_id,
            created_at: new Date().toISOString(),
          });

          router.push({
            pathname: "/guide",
            params: { guideId: savedGuide.id },
          });
        }
      } catch (error) {
        console.error("Guide generation error:", error);
        setError(
          error instanceof Error ? error.message : "Failed to generate guide"
        );
      }
    };

    generateContent();
  }, [imageUrl, userProfile]);

  const getStatusText = () => {
    switch (generationStep) {
      case "getting_location":
        return "Getting your location...";
      case "analyzing_location":
        return "Analyzing nearby points of interest...";
      case "analyzing_image":
        return "Analyzing your image...";
      case "generating_guide":
        return "Generating your travel guide...";
      case "complete":
        return "Guide generated successfully! Redirecting...";
      case "error":
        return "Something went wrong. Please try again.";
      default:
        return "Starting guide generation...";
    }
  };

  if (!imageUrl) {
    return <ErrorMessage message="No image URL provided. Please try again." />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 18, textAlign: "center", padding: 20 }}>
        {getStatusText()}
      </Text>
    </View>
  );
}
