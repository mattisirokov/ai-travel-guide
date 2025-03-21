import { useState } from "react";

import { useImageAnalysis } from "./useImageAnalysis";
import { useChatCompletion } from "./useChatCompletion";
import { useAuthStore } from "@/stores/useAuthStore";

import { saveGuideToDatabase } from "./supabaseService";

import { IMAGE_ANALYSIS_PROMPT } from "@/constants/prompts/imageAnalsysisPromt";
import { AUDIOGUIDE_PROMPT } from "@/constants/prompts/audioguidePrompt";

import { guideResponseSchema } from "@/constants/schemas/guideResponseSchema";
import { locationAnalysisSchema } from "@/constants/schemas/locationAnalysisSchema";

import { ContentStructure } from "@/types";

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
  const { userProfile } = useAuthStore();

  const { analyzeImage, isAnalyzing: isImageAnalyzing } = useImageAnalysis();

  const { generateChatCompletion, isGenerating: isGuideGenerating } =
    useChatCompletion();

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
      console.log("HERE IS THE USERS CURRENT LOCATION: ", latitude, longitude);

      const promptWithCoordinates = IMAGE_ANALYSIS_PROMPT.replace(
        "{latitude}",
        latitude.toString()
      ).replace("{longitude}", longitude.toString());

      const imageAnalysis = await analyzeImage(imageUrl, {
        prompt: promptWithCoordinates,
        temperature: 0.7,
        responseSchema: locationAnalysisSchema,
      });

      console.log("Image Analysis Result:", imageAnalysis);

      setStatus({ status: "generating" });
      const guideContent = await generateChatCompletion(
        [
          {
            role: "user",
            content: `Location Analysis: ${imageAnalysis}
            User's Current Coordinates: ${latitude}, ${longitude}
            
            Please create a detailed audio guide that:
            1. Accurately describes the location based on the image analysis
            2. Incorporates the specific coordinates to provide relevant historical and cultural context
            3. References the visible architectural features and their significance
            4. Includes interesting stories and anecdotes about the location
            5. Connects the past to the present day`,
          },
        ],
        {
          systemPrompt: AUDIOGUIDE_PROMPT,
          temperature: 1.2,
          max_tokens: 2000,
          responseSchema: guideResponseSchema,
        }
      );

      setStatus({ status: "saving" });
      if (!userProfile?.user_id) {
        throw new Error("User not authenticated");
      }

      const guide = await saveGuideToDatabase({
        content: guideContent as unknown as ContentStructure,
        user_id: userProfile.user_id,
        image_url: imageUrl,
        latitude: latitude,
        longitude: longitude,
      });

      if (!guide?.id) {
        setStatus({ status: "error", error: "Failed to create guide" });
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
