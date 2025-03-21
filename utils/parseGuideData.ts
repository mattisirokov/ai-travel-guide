interface GuideContent {
  title: string;
  introduction: string;
  historicalContext: string;
  architecturalDetails: string;
  culturalSignificance: string;
  interestingStories: string[];
  notableFeatures: string[];
  modernContext: string;
  conclusion: string;
}

interface RawGuideData {
  content: string;
  created_at: string;
  id: number;
  image_url: string;
  latitude: string;
  longitude: string;
  user_id: string;
}

interface ParsedGuideData {
  content: GuideContent;
  created_at: string;
  id: number;
  image_url: string;
  latitude: number;
  longitude: number;
  user_id: string;
}

export function parseGuideData(rawData: RawGuideData): ParsedGuideData {
  try {
    const parsedContent = JSON.parse(rawData.content);

    return {
      ...rawData,
      content: parsedContent,
      latitude: parseFloat(rawData.latitude),
      longitude: parseFloat(rawData.longitude),
    };
  } catch (error) {
    console.error("Error parsing guide data:", error);
    throw new Error("Failed to parse guide data");
  }
}
