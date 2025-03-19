import { ResponseFormatJSONSchema } from "openai/resources";

export const locationAnalysisSchema: ResponseFormatJSONSchema = {
  type: "json_schema",
  json_schema: {
    name: "location_analysis",
    description: "Schema for analyzing a location from an image.",
    schema: {
      type: "object",
      properties: {
        locationName: {
          type: "string",
          description: "The name of the location shown in the image.",
        },
        keyFeatures: {
          type: "array",
          items: {
            type: "string",
          },
          description:
            "Key architectural or natural features visible in the image.",
        },
        historicalElements: {
          type: "array",
          items: {
            type: "string",
          },
          description: "Notable historical or cultural elements present.",
        },
        architecturalStyle: {
          type: "string",
          description:
            "The architectural style or time period of the location.",
        },
        confidence: {
          type: "number",
          description: "Confidence level in the identification (0-1).",
        },
      },
      required: [
        "locationName",
        "keyFeatures",
        "historicalElements",
        "architecturalStyle",
        "confidence",
      ],
    },
  },
};
