import { useState } from "react";

import { createChatCompletion } from "./aiService";

import { ChatCompletionMessageParam } from "openai/resources";

import { guideResponseSchema } from "@/constants/schemas/guideResponseSchema";

import { PROMTS } from "@/constants/prompts";

interface ChatCompletionError {
  message: string;
  code?: string;
  status?: number;
}

interface ContentBlock {
  title: string;
  description: string;
}

interface GuideGenerationParams {
  location: {
    latitude: number;
    longitude: number;
  };
  nearbyPlaces: any[];
  imageAnalysis: any;
}

interface GuideContent {
  content: {
    headline: string;
    titles: string[];
    contents: string[];
  };
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

interface GuideResponse {
  content: {
    headline: string;
    titles: string[];
    contents: string[];
  };
}

export const useGenerateGuideText = () => {
  const [status, setStatus] = useState<
    "idle" | "loading" | "complete" | "error"
  >("idle");
  const [result, setResult] = useState<GuideResponse | null>(null);
  const [error, setError] = useState<ChatCompletionError | null>(null);

  const generateGuide = async ({
    location,
    nearbyPlaces,
    imageAnalysis,
  }: GuideGenerationParams): Promise<GuideContent> => {
    setStatus("loading");
    setError(null);

    try {
      const audioGuideSystemPrompt =
        PROMTS.CREATE_AUDIO_GUIDE +
        `
        - Location: ${JSON.stringify(location)}
        - Nearby Points of Interest: ${JSON.stringify(nearbyPlaces)}
        - Image Analysis: ${JSON.stringify(imageAnalysis)}
      `;

      const messages: ChatCompletionMessageParam[] = [
        {
          role: "system",
          content: audioGuideSystemPrompt,
        },
      ];

      const response = await createChatCompletion({
        messages,
        responseSchema: guideResponseSchema,
        temperature: 0.7,
        max_tokens: 2000,
      });

      if (!response || !response.content) {
        throw new Error("Invalid response from API");
      }

      let parsedResponse: GuideResponse;
      try {
        parsedResponse = JSON.parse(response.content);
      } catch (parseError) {
        throw new Error("Failed to parse API response");
      }

      setResult(parsedResponse);
      setStatus("complete");

      return {
        content: parsedResponse.content,
        coordinates: location,
      };
    } catch (err: any) {
      console.error("Full error:", err);
      const errorMessage = {
        message: err.message || "Failed to generate guide",
        code: err.code,
        status: err.status,
      };
      setError(errorMessage);
      setStatus("error");
      throw errorMessage;
    }
  };

  const reset = () => {
    setResult(null);
    setError(null);
    setStatus("idle");
  };

  return {
    status,
    result,
    generateGuide,
    reset,
  };
};
