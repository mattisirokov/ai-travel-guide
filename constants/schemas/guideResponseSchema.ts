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
        content: {
          type: "object",
          description: "The main content structure for the guide",
          properties: {
            headline: {
              type: "string",
              description: "The main headline or title for the entire guide",
            },
            titles: {
              type: "array",
              description:
                "An array of exactly five titles, each corresponding to a different aspect of the location.",
              items: {
                type: "string",
                enum: [
                  "Early History",
                  "Architectural Significance",
                  "Cultural Heritage",
                  "Modern Development",
                  "Fun Facts",
                ],
              },
              minItems: 5,
              maxItems: 5,
              uniqueItems: true,
            },
            contents: {
              type: "array",
              description:
                "An array of exactly five content descriptions, each corresponding to the titles array. Each description should be engaging and informative, approximately 2-3 paragraphs long.",
              items: {
                type: "string",
              },
              minItems: 5,
              maxItems: 5,
            },
          },
          required: ["headline", "titles", "contents"],
          additionalProperties: false,
        },
      },
      required: ["content"],
      additionalProperties: false,
    },
  },
};
