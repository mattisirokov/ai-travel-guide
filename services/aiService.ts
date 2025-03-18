import OpenAI from "openai";
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
  responseSchema?: {
    type: "json_object" | "text";
  };
}

export const createChatCompletion = async ({
  messages,
  model,
  max_tokens = 500,
  temperature = 0.7,
  responseSchema,
}: ChatCompletionParams): Promise<string> => {
  try {
    const completion = await openai.chat.completions.create({
      model: model || "gpt-4o-mini",
      messages,
      max_tokens,
      temperature,
      response_format: responseSchema,
    });

    return completion.choices[0].message.content || "";
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
