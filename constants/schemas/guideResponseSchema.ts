import { ResponseFormatJSONSchema } from "openai/resources";

export const guideResponseSchema: ResponseFormatJSONSchema = {
  type: "json_schema",
  json_schema: {
    name: "guide_response",
    description:
      "Schema for generating an engaging audio guide narration about a photographed location, organized into five specific thematic blocks.",
    schema: {
      type: "object",
      properties: {
        title: {
          type: "string",
          description:
            "The main title of the guide, typically the name of the location or landmark.",
        },
        content: {
          type: "array",
          description:
            "An array of exactly five content blocks, each containing a title and description about different aspects of the location.",
          items: {
            type: "object",
            properties: {
              title: {
                type: "string",
                enum: [
                  "Early History",
                  "Architectural Significance",
                  "Cultural Heritage",
                  "Modern Development",
                  "Fun Facts",
                ],
                description:
                  "The title of the content block. Must be one of: Early History, Architectural Significance, Cultural Heritage, Modern Development, or Fun Facts.",
              },
              description: {
                type: "string",
                description:
                  "A detailed description of the topic, suitable for an audio guide narration. Should be engaging and informative, approximately 2-3 paragraphs long.",
              },
            },
            required: ["title", "description"],
            additionalProperties: false,
          },
          minItems: 5,
          maxItems: 5,
          uniqueItems: true,
        },
      },
      required: ["title", "content"],
      additionalProperties: false,
    },
  },
};
