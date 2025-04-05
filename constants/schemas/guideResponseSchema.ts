import { ResponseFormatJSONSchema } from "openai/resources";

export const guideResponseSchema: ResponseFormatJSONSchema = {
  type: "json_schema",
  json_schema: {
    name: "guide_response",
    description:
      "Schema for generating an engaging audio guide narration about a photographed location.",
    schema: {
      type: "object",
      properties: {
        content: {
          type: "string",
          description:
            "A complete, engaging narrative about the location that includes its history, significance, and interesting features. The content should flow naturally and be suitable for an audio guide.",
        },
      },
      required: ["content"],
    },
  },
};
