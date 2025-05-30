import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";

import { Text, View } from "@/components/Themed";
import FeatherIcon from "@expo/vector-icons/Feather";
import { router, useLocalSearchParams } from "expo-router";
import { getGuide } from "@/services/supabaseService";
import { Guide } from "@/types";

import { AudioPlayer } from "@/components/uikit";
import { LocationMap } from "@/components";
import { LoadingOverlay, ErrorMessage } from "@/components/uikit";
import { GuideTimelineCards } from "@/components/guide";

export default function GuideScreen() {
  const { guideId, source } = useLocalSearchParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [guide, setGuide] = useState<Guide | null>(null);

  useEffect(() => {
    const fetchGuide = async () => {
      try {
        const guide = await getGuide(guideId as string);

        setGuide(guide);
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
    if (source === "home") {
      router.back();
    } else {
      router.push("/(tabs)");
    }
  };

  if (loading) {
    return (
      <LoadingOverlay
        message="Loading guide..."
        subMessage="Your guide is loading, please wait..."
      />
    );
  }

  if (!guide) {
    return <ErrorMessage message={error || "Error loading guide"} />;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Hero Section */}
        <View style={styles.heroContainer}>
          <Image source={{ uri: guide?.image_url }} style={styles.heroImage} />
          <View style={styles.heroOverlay}>
            <TouchableOpacity
              onPress={handleBackPress}
              style={styles.backButton}
              hitSlop={20}
            >
              <FeatherIcon color="#fff" name="chevron-left" size={24} />
            </TouchableOpacity>
            <View style={styles.locationInfo}>
              <Text style={styles.locationTitle}>{guide.content.headline}</Text>
              <View style={styles.coordinatesContainer}>
                <FeatherIcon
                  color="#fff"
                  name="map-pin"
                  size={16}
                  style={styles.coordinatesIcon}
                />
                <Text style={styles.locationSubtitle}>
                  {guide.coordinates.latitude.toFixed(3)}°,{" "}
                  {guide.coordinates.longitude.toFixed(3)}°
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Map Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Map Location</Text>
          <LocationMap coordinates={guide.coordinates} />
        </View>

        {/* Audio Section */}
        <View style={styles.section}>
          <AudioPlayer
            text={guide.content.contents.map((content) => content).join("\n")}
          />
        </View>

        {/* Description Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Description & Historical Highlights
          </Text>

          <View style={{ flex: 1, marginTop: 16 }}>
            <GuideTimelineCards
              titles={guide.content.titles}
              contents={guide.content.contents}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
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
    paddingBottom: 40,
  },
  heroContainer: {
    position: "relative",
    height: 300,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    overflow: "hidden",
    marginHorizontal: 16,
    marginTop: 16,
  },
  heroImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    alignSelf: "center",
  },
  heroOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12,
    marginTop: 12,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 12,
    borderColor: "rgba(255,255,255,0.5)",
    borderWidth: 1,
  },
  section: {
    padding: 20,
    backgroundColor: "#fff",
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "Poppins",
    fontWeight: "600",
    color: "#000",
    marginBottom: 12,
    textTransform: "uppercase",
  },
  description: {
    fontSize: 15,
    fontFamily: "Poppins",
    lineHeight: 22,
    color: "#333",
    fontWeight: "400",
  },
  locationInfo: {
    position: "absolute",
    bottom: 32,
    left: 24,
    backgroundColor: "transparent",
  },
  locationTitle: {
    fontSize: 30,
    fontFamily: "Poppins",
    fontWeight: "800",
    marginBottom: 8,
    color: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  coordinatesContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  coordinatesIcon: {
    marginRight: 6,
  },
  locationSubtitle: {
    fontSize: 16,
    fontFamily: "Poppins",
    color: "#fff",
    opacity: 0.9,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
});
