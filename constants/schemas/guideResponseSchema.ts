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
        title: {
          type: "string",
          description: "The name of the location being described",
        },
        introduction: {
          type: "string",
          description:
            "An engaging welcome that captures the essence of the location and sets the scene",
        },
        historicalContext: {
          type: "string",
          description:
            "The historical background and evolution of the location over time",
        },
        architecturalDetails: {
          type: "string",
          description:
            "Detailed description of the architectural features and their significance",
        },
        culturalSignificance: {
          type: "string",
          description:
            "The cultural importance and impact of this location on the community and history",
        },
        interestingStories: {
          type: "array",
          items: {
            type: "string",
          },
          description:
            "Collection of fascinating anecdotes and stories related to the location",
        },
        notableFeatures: {
          type: "array",
          items: {
            type: "string",
          },
          description:
            "Key features and points of interest that visitors should notice",
        },
        modernContext: {
          type: "string",
          description:
            "How the location fits into the present day and its current significance",
        },
        conclusion: {
          type: "string",
          description:
            "A memorable closing that ties together the key aspects of the location",
        },
      },
      required: [
        "title",
        "introduction",
        "historicalContext",
        "architecturalDetails",
        "culturalSignificance",
        "interestingStories",
        "notableFeatures",
        "modernContext",
        "conclusion",
      ],
    },
  },
};
