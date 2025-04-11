import { ResponseFormatJSONSchema } from "openai/resources";

export const guideResponseSchema: ResponseFormatJSONSchema = {
  type: "json_schema",
  json_schema: {
    name: "guide_response",
    description:
      "Schema for generating an engaging audio guide narration about a photographed location, including a title and organized into thematic blocks.",
    schema: {
      type: "object",
      properties: {
        title: {
          type: "string",
          description: "The name of the location being described in the guide",
        },
        content: {
          type: "array",
          description:
            "An array of content blocks, each containing a title and description about different aspects of the location.",
          items: {
            type: "object",
            properties: {
              title: {
                type: "string",
                description:
                  "The title of the content block (e.g., 'Early History', 'Fun Facts', 'Modern Times')",
              },
              description: {
                type: "string",
                description:
                  "A detailed description of the topic, suitable for an audio guide narration",
              },
            },
            required: ["title", "description"],
          },
        },
      },
      required: ["title", "content"],
    },
  },
};
