import { useState } from "react";
import { createChatCompletion } from "./aiService";
import { ChatCompletionMessageParam } from "openai/resources";

interface ChatCompletionOptions {
  model?: "gpt-4" | "gpt-3.5-turbo";
  max_tokens?: number;
  temperature?: number;
}

interface ChatCompletionError {
  message: string;
  code?: string;
  status?: number;
}

export const useChatCompletion = (defaultOptions?: ChatCompletionOptions) => {
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
        model: options?.model || defaultOptions?.model || "gpt-3.5-turbo",
        max_tokens: options?.max_tokens || defaultOptions?.max_tokens,
        temperature: options?.temperature || defaultOptions?.temperature,
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
