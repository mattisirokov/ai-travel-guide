import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";

import { Text, View } from "@/components/Themed";
import FeatherIcon from "@expo/vector-icons/Feather";
import { router, useLocalSearchParams } from "expo-router";
import { getGuide } from "@/services/supabaseService";
import { Guide, ContentStructure } from "@/types";

export default function GuideScreen() {
  const { guideId } = useLocalSearchParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [guide, setGuide] = useState<Guide | null>(null);
  const [parsedContent, setParsedContent] = useState<ContentStructure | null>(
    null
  );

  useEffect(() => {
    const fetchGuide = async () => {
      try {
        const guide = await getGuide(guideId as string);
        setGuide(guide);

        // Parse the content string into an object
        const parsedContent = JSON.parse(guide.content as unknown as string);
        setParsedContent(parsedContent);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching guide:", err);
        setError(err instanceof Error ? err.message : "Failed to load guide");
        setLoading(false);
      }
    };

    fetchGuide();
  }, []);

  const handleBackPress = () => {
    router.push("/");
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!guide || !parsedContent) {
    return (
      <View style={styles.errorContainer}>
        <Text>{error || "Error loading guide"}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#F4EFF3" }}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.headerAction}>
          <FeatherIcon color="#1d1d1d" name="arrow-left" size={24} />
        </TouchableOpacity>
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.content}>
        <Image
          alt={parsedContent.title || "Guide Image"}
          source={{
            uri: guide.image_url,
          }}
          style={styles.hero}
        />

        <View style={styles.section}>
          <Text style={styles.title}>
            {parsedContent.title || "Untitled Guide"}
          </Text>
          <Text style={styles.introduction}>
            {parsedContent.introduction || "No introduction available."}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Historical Context</Text>
          <Text style={styles.sectionText}>
            {parsedContent.historicalContext ||
              "No historical context available."}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Architectural Details</Text>
          <Text style={styles.sectionText}>
            {parsedContent.architecturalDetails ||
              "No architectural details available."}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cultural Significance</Text>
          <Text style={styles.sectionText}>
            {parsedContent.culturalSignificance ||
              "No cultural significance information available."}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notable Features</Text>
          {parsedContent.notableFeatures &&
          parsedContent.notableFeatures.length > 0 ? (
            parsedContent.notableFeatures.map((feature, index) => (
              <Text key={index} style={styles.listItem}>
                • {feature}
              </Text>
            ))
          ) : (
            <Text style={styles.listItem}>No notable features listed.</Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Interesting Stories</Text>
          {parsedContent.interestingStories &&
          parsedContent.interestingStories.length > 0 ? (
            parsedContent.interestingStories.map((story, index) => (
              <Text key={index} style={styles.listItem}>
                • {story}
              </Text>
            ))
          ) : (
            <Text style={styles.listItem}>
              No interesting stories available.
            </Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Modern Context</Text>
          <Text style={styles.sectionText}>
            {parsedContent.modernContext ||
              "No modern context information available."}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Conclusion</Text>
          <Text style={styles.sectionText}>
            {parsedContent.conclusion || "No conclusion available."}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    paddingBottom: 120,
  },
  hero: {
    width: "100%",
    height: 220,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
  },
  headerAction: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 9999,
    backgroundColor: "#fff",
    marginHorizontal: 12,
  },
  section: {
    backgroundColor: "#fff",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#e7e7e7",
    marginBottom: 12,
  },
  title: {
    fontSize: 27,
    fontWeight: "700",
    color: "#1d1d1d",
    marginBottom: 12,
  },
  introduction: {
    fontSize: 16,
    lineHeight: 24,
    color: "#494949",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1d1d1d",
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#494949",
  },
  listItem: {
    fontSize: 16,
    lineHeight: 24,
    color: "#494949",
    marginBottom: 8,
  },
});
