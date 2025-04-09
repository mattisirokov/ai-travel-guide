import { useState } from "react";
import { createSpeech } from "./aiService";
import * as FileSystem from "expo-file-system";

interface TextToSpeechOptions {
  voice?: string;
  model?: string;
  instructions?: string;
}

interface TextToSpeechError {
  message: string;
  code?: string;
  status?: number;
}

export const useTextToSpeech = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<TextToSpeechError | null>(null);

  const generateSpeech = async (
    text: string,
    options?: TextToSpeechOptions
  ) => {
    setIsGenerating(true);
    setError(null);

    try {
      // Clean up previous audio URL if it exists
      if (audioUrl) {
        await FileSystem.deleteAsync(audioUrl);
        setAudioUrl(null);
      }

      const audioData = await createSpeech({
        input: text,
        voice: options?.voice || "alloy",
        model: options?.model || "gpt-4o-mini-tts",
        instructions: options?.instructions,
      });

      const fileUri = `${FileSystem.cacheDirectory}audio_${Date.now()}.mp3`;

      // Convert ArrayBuffer to base64 using a more efficient method
      const uint8Array = new Uint8Array(audioData);
      let binary = "";
      for (let i = 0; i < uint8Array.byteLength; i++) {
        binary += String.fromCharCode(uint8Array[i]);
      }
      const base64 = btoa(binary);

      // Write the base64 string to file
      await FileSystem.writeAsStringAsync(fileUri, base64, {
        encoding: FileSystem.EncodingType.Base64,
      });

      setAudioUrl(fileUri);
      return fileUri;
    } catch (err: any) {
      console.error("Error in generateSpeech:", err);
      const errorMessage = {
        message: err.message || "Failed to generate speech",
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
    if (audioUrl) {
      FileSystem.deleteAsync(audioUrl);
    }
    setAudioUrl(null);
    setError(null);
  };

  return {
    isGenerating,
    audioUrl,
    error,
    generateSpeech,
    reset,
  };
};
