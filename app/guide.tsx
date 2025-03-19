import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { View, Text } from "@/components/Themed";
import { useLocalSearchParams } from "expo-router";
import { getGuide } from "@/services/supabaseService";

export default function GuideScreen() {
  const { guideId } = useLocalSearchParams();
  const [guideContent, setGuideContent] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGuide = async () => {
      try {
        // Assuming you have a function to fetch guide by ID from Supabase
        const guide = await getGuide(guideId as string);
        setGuideContent(guide.content);
      } catch (error) {
        console.error("Error fetching guide:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGuide();
  }, [guideId]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading guide...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <View
        style={{
          padding: 16,
          flex: 1,
          height: "100%",
        }}
      >
        <Text>{guideContent}</Text>
      </View>
    </ScrollView>
  );
}
