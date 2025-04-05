import { useEffect } from "react";
import { View, Text } from "@/components/Themed";
import { router, useLocalSearchParams } from "expo-router";

import { useGenerateAIGuide } from "@/services/useGenerateAIGuide";
import { useAuthStore } from "@/stores/useAuthStore";
import { saveGuideToDatabase } from "@/services/supabaseService";

export default function LoadingGuideScreen() {
  const { generateGuide, generationStep } = useGenerateAIGuide();

  const { userProfile } = useAuthStore();
  const { imageUrl } = useLocalSearchParams<{ imageUrl: string }>();

  useEffect(() => {
    const generateAndNavigate = async () => {
      if (!imageUrl) {
        console.error("No image URL provided");
        return;
      }

      try {
        const guideContent = await generateGuide();

        // Save the guide to the database
        const savedGuide = await saveGuideToDatabase({
          content: guideContent.content,
          image_url: imageUrl,
          coordinates: guideContent.coordinates,
          user_id: userProfile?.user_id || "",
          created_at: new Date().toISOString(),
        });

        // Navigate to the guide page
        router.push({
          pathname: "/guide",
          params: { guideId: savedGuide.id },
        });
      } catch (error) {
        console.error("Guide generation error:", error);
      }
    };

    generateAndNavigate();
  }, [imageUrl]);

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
        return "Guide generated successfully!";
      case "error":
        return "Something went wrong. Please try again.";
      default:
        return "Starting guide generation...";
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 18, textAlign: "center", padding: 20 }}>
        {getStatusText()}
      </Text>
    </View>
  );
}
