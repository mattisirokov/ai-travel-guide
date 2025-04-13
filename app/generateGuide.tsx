import { useEffect } from "react";
import { View, Text } from "@/components/Themed";
import { router } from "expo-router";

import { useGenerateAIGuide } from "@/services/useGenerateAIGuide";
import { useAuthStore } from "@/stores/useAuthStore";
import { useMediaStore } from "@/stores/useMediaStore";
import { saveGuideToDatabase } from "@/services/supabaseService";
import { ErrorMessage } from "@/components/uikit";

export default function LoadingGuideScreen() {
  const { generateGuide, generationStep } = useGenerateAIGuide();
  const { userProfile } = useAuthStore();
  const { imageUrl } = useMediaStore();

  useEffect(() => {
    const generateAndNavigate = async () => {
      if (!imageUrl) {
        console.error("No image URL provided");
        return;
      }

      try {
        const guideContent = await generateGuide(imageUrl);

        // Save the guide to the database

        const savedGuide = await saveGuideToDatabase({
          title: guideContent.title,
          content: guideContent.content,
          image_url: imageUrl,
          coordinates: guideContent.coordinates,
          user_id: userProfile?.user_id || "",
          created_at: new Date().toISOString(),
        });

        // After saving the guide, navigate to the guide page for the user to view

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

  if (!imageUrl) {
    return <ErrorMessage message="No image URL provided. Please try again." />;
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 18, textAlign: "center", padding: 20 }}>
        {getStatusText()}
      </Text>
    </View>
  );
}
