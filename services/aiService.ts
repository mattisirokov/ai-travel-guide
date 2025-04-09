import OpenAI from "openai";

import { ResponseFormatJSONSchema } from "openai/resources";
import { ChatCompletionMessageParam } from "openai/resources";

const openai = new OpenAI({
  apiKey: process.env.EXPO_PUBLIC_OPEN_AI_API_KEY,
  maxRetries: 2,
});

interface ChatCompletionParams {
  messages: ChatCompletionMessageParam[];
  model?: string;
  max_tokens?: number;
  temperature?: number;
  responseSchema?: ResponseFormatJSONSchema;
  systemPrompt?: string;
}

interface ChatCompletionResponse {
  content: string;
}

export const createChatCompletion = async ({
  messages,
  model,
  max_tokens = 500,
  temperature = 0.7,
  responseSchema,
  systemPrompt,
}: ChatCompletionParams): Promise<ChatCompletionResponse> => {
  try {
    const finalMessages: ChatCompletionMessageParam[] = systemPrompt
      ? [
          {
            role: "system",
            content: systemPrompt,
          },
          ...messages,
        ]
      : messages;

    const completion = await openai.chat.completions.create({
      model: model || "gpt-4o-mini",
      messages: finalMessages,
      max_tokens,
      temperature,
      response_format: responseSchema,
    });

    console.log(
      "RESPONSE TO THE CHAT COMPLETION",
      completion.choices[0].message.content
    );
    return {
      content: completion.choices[0].message.content || "",
    };
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      console.error("OpenAI API Error:", {
        status: error.status,
        message: error.message,
        code: error.code,
      });
    }
    throw error;
  }
};

interface ImageAnalysisParams {
  image: string;
  prompt?: string;
  max_tokens?: number;
  temperature?: number;
  responseSchema?: ResponseFormatJSONSchema;
}

export const analyzeImages = async ({
  image,
  prompt = "What is in this image?",
  max_tokens = 500,
  temperature = 0.7,
  responseSchema,
}: ImageAnalysisParams): Promise<string> => {
  try {
    const messages: ChatCompletionMessageParam[] = [
      {
        role: "user",
        content: [
          { type: "text", text: prompt },
          {
            type: "image_url",
            image_url: {
              url: image,
            },
          },
        ],
      },
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages,
      max_tokens,
      temperature,
      response_format: responseSchema,
    });

    console.log(
      "RESPONSE TO THE IMAGE ANALYSIS",
      response.choices[0].message.content
    );
    return response.choices[0].message.content || "";
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      console.error("OpenAI Vision API Error:", {
        status: error.status,
        message: error.message,
        code: error.code,
      });
    }
    throw error;
  }
};
