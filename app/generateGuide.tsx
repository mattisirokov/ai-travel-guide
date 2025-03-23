import { useEffect } from "react";
import { View, Text } from "@/components/Themed";

import { useGenerateAIGuide } from "@/services/useGenerateAIGuide";

export default function LoadingGuideScreen() {
  const { generateGuide } = useGenerateAIGuide();

  useEffect(() => {
    generateGuide();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>{"Something here depending on the status"}</Text>
    </View>
  );
}
