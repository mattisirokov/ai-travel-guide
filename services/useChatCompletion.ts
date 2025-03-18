import { useState } from "react";

import { createChatCompletion } from "./aiService";
import { ChatCompletionMessageParam } from "openai/resources";

interface ChatCompletionOptions {
  model?: string;
  max_tokens?: number;
  temperature?: number;
}

interface ChatCompletionError {
  message: string;
  code?: string;
  status?: number;
}

export const useChatCompletion = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedText, setGeneratedText] = useState("");
  const [error, setError] = useState<ChatCompletionError | null>(null);

  const generateChatCompletion = async (
    messages: ChatCompletionMessageParam[],
    options?: ChatCompletionOptions
  ) => {
    setIsGenerating(true);
    setError(null);

    try {
      const response = await createChatCompletion({
        messages,
        model: options?.model,
        max_tokens: options?.max_tokens,
        temperature: options?.temperature,
      });

      setGeneratedText(response);
      return response;
    } catch (err: any) {
      const errorMessage = {
        message: err.message || "Failed to generate completion",
        code: err.code,
        status: err.status,
      };
      setError(errorMessage);
      throw errorMessage;
    } finally {
      setIsGenerating(false);
    }
  };

  const reset = () => {
    setGeneratedText("");
    setError(null);
  };

  return {
    isGenerating,
    generatedText,
    error,
    generateChatCompletion,
    reset,
  };
};
