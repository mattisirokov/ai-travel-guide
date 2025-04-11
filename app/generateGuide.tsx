import { useEffect } from "react";
import { View, Text } from "@/components/Themed";
import { router } from "expo-router";

import { useGenerateAIGuide } from "@/services/useGenerateAIGuide";
import { useAuthStore } from "@/stores/useAuthStore";
import { useMediaStore } from "@/stores/useMediaStore";
import { saveGuideToDatabase } from "@/services/supabaseService";
import { ErrorMessage } from "@/components/uikit";
import { ContentBlock } from "@/types";

const REQUIRED_SECTIONS = [
  "Early History",
  "Architectural Significance",
  "Cultural Heritage",
  "Modern Development",
  "Fun Facts",
];

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
        const guideContent = await generateGuide();

        // Validate content structure
        if (!guideContent.content || !Array.isArray(guideContent.content)) {
          console.error("Invalid content structure:", guideContent);
          throw new Error(
            "Invalid content structure received from guide generation"
          );
        }

        // Validate section titles
        const sectionTitles = guideContent.content.map((block) => block.title);
        const missingSections = REQUIRED_SECTIONS.filter(
          (section) => !sectionTitles.includes(section)
        );

        if (missingSections.length > 0) {
          console.error("Missing required sections:", missingSections);
          throw new Error(
            `Missing required sections: ${missingSections.join(", ")}`
          );
        }

        // Ensure content is in the correct order
        const orderedContent: ContentBlock[] = REQUIRED_SECTIONS.map(
          (section) => {
            const block = guideContent.content.find(
              (block) => block.title === section
            );
            if (!block) {
              throw new Error(`Missing content block for section: ${section}`);
            }
            return block;
          }
        );

        // Save the guide to the database
        const savedGuide = await saveGuideToDatabase({
          title: guideContent.title,
          content: orderedContent,
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
