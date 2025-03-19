import { useState } from "react";
import { analyzeImages } from "./aiService";

interface ImageAnalysisOptions {
  prompt?: string;
  max_tokens?: number;
  temperature?: number;
}

interface ImageAnalysisError {
  message: string;
  code?: string;
  status?: number;
}

export const useImageAnalysis = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [error, setError] = useState<ImageAnalysisError | null>(null);

  const analyzeImage = async (
    image: string,
    options?: ImageAnalysisOptions
  ) => {
    setIsAnalyzing(true);
    setError(null);

    try {
      const response = await analyzeImages({
        image,
        prompt: options?.prompt,
        max_tokens: options?.max_tokens,
        temperature: options?.temperature,
      });

      setAnalysisResult(response);
      return response;
    } catch (err: any) {
      const errorMessage = {
        message: err.message || "Failed to analyze image",
        code: err.code,
        status: err.status,
      };
      setError(errorMessage);
      throw errorMessage;
    } finally {
      setIsAnalyzing(false);
    }
  };

  const reset = () => {
    setAnalysisResult(null);
    setError(null);
  };

  return {
    isAnalyzing,
    analysisResult,
    error,
    analyzeImage,
    reset,
  };
};
