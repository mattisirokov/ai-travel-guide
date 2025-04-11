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
  title: string;
  content: ContentBlock[];
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

interface GuideResponse {
  title: string;
  content: ContentBlock[];
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

      const response = (await createChatCompletion({
        messages,
        responseSchema: guideResponseSchema,
        temperature: 0.7,
        max_tokens: 500, // TODO: Let's change this back to 2000 when we're done with testing
      })) as unknown as GuideResponse;

      setResult(response);
      setStatus("complete");
      return {
        title: response.title,
        content: response.content,
        coordinates: location,
      };
    } catch (err: any) {
      const errorMessage = {
        message: err.message || "Failed to generate guide",
        code: err.code,
        status: err.status,
      };
      setError(errorMessage);
      throw errorMessage;
    } finally {
      setStatus("error");
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
