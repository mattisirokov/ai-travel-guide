import { useState } from "react";

import { useImageAnalysis } from "./useImageAnalysis";
import { useChatCompletion } from "./useChatCompletion";
import { useAuthStore } from "@/stores/useAuthStore";

import { createGuide } from "./supabaseService";

interface GenerateGuideParams {
  imageUrl: string;
  latitude: number;
  longitude: number;
}

interface GuideGenerationStatus {
  status: "idle" | "analyzing" | "generating" | "saving" | "complete" | "error";
  error?: string;
  guideId?: string;
}

export const useGenerateAIGuide = () => {
  const { analyzeImage, isAnalyzing: isImageAnalyzing } = useImageAnalysis();
  const { generateChatCompletion, isGenerating: isGuideGenerating } =
    useChatCompletion();
  const { userProfile } = useAuthStore();
  const [status, setStatus] = useState<GuideGenerationStatus>({
    status: "idle",
  });

  const generateGuide = async ({
    imageUrl,
    latitude,
    longitude,
  }: GenerateGuideParams) => {
    try {
      setStatus({ status: "analyzing" });
      const imageAnalysis = await analyzeImage(imageUrl, {
        prompt:
          "Describe this location and suggest activities. Focus on the type of place, notable features, and potential activities.",
        temperature: 0.7,
      });

      setStatus({ status: "generating" });
      const guideContent = await generateChatCompletion(
        [
          {
            role: "user",
            content: `Create a detailed travel guide based on this location analysis: ${imageAnalysis}. 
            The location coordinates are: ${latitude}, ${longitude}. Please try to understand the location and the context of the image based on the coordiantes.
            Please provide a structured guide with sections for:
            1. Overview
            2. Key Attractions
            3. Activities
            4. Tips and Recommendations
            5. Best Time to Visit`,
          },
        ],
        {
          systemPrompt: `You are a professional travel guide writer. Create engaging, informative, and practical travel guides.
          Focus on providing actionable advice and insider tips.`,
          temperature: 0.7,
          max_tokens: 1000,
        }
      );

      setStatus({ status: "saving" });
      if (!userProfile?.user_id) {
        throw new Error("User not authenticated");
      }

      const guide = await createGuide({
        content: guideContent,
        user_id: userProfile.user_id,
        image_url: imageUrl,
        latitude: latitude,
        longitude: longitude,
      });

      if (!guide?.id) {
        throw new Error("Failed to create guide");
      }

      setStatus({ status: "complete", guideId: guide.id });
      return guide.id;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to generate guide";
      setStatus({ status: "error", error: errorMessage });
      throw error;
    }
  };

  const reset = () => {
    setStatus({ status: "idle" });
  };

  return {
    generateGuide,
    status,
    isProcessing:
      isImageAnalyzing || isGuideGenerating || status.status === "saving",
    reset,
  };
};
