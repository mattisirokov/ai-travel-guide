import { StyleSheet, TouchableOpacity, Image } from "react-native";
import { router } from "expo-router";

import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";

import { Text, View } from "../Themed";

import { Guide } from "@/types";
import Colors from "@/constants/Colors";

export function MainGuide({ guide }: { guide: Guide }) {
  return (
    <TouchableOpacity
      style={styles.featuredCard}
      onPress={() => {
        router.push({
          pathname: "/guide",
          params: { guideId: guide.id },
        });
      }}
    >
      <Image
        alt="Featured Guide"
        resizeMode="cover"
        source={{ uri: guide.image_url }}
        style={styles.featuredCardImg}
      />

      <LinearGradient
        colors={["rgba(0,0,0,1)", "transparent"]}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0.2 }}
        style={styles.gradient}
      />

      <View style={styles.featuredCardTag}>
        <Text style={styles.featuredCardTagText}>
          {new Date(guide.created_at).toLocaleDateString()}
        </Text>
      </View>
      <View style={styles.cardTitleContainer}>
        <Text style={styles.cardTitle}>La Mata, Spain</Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <FontAwesome
            name="map-marker"
            size={16}
            color={Colors.textWhite}
            style={{ opacity: 0.9 }}
          />
          <Text style={styles.cardSubtitle}>
            {guide.coordinates.latitude}, {guide.coordinates.longitude}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  featuredCard: {
    position: "relative",
    width: "100%",
    borderRadius: 24,
    backgroundColor: "transparent",
    marginBottom: 48,
    overflow: "hidden",
  },
  featuredCardImg: {
    width: "100%",
    height: 250,
    borderRadius: 24,
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "60%",
    borderRadius: 24,
  },
  featuredCardTag: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  cardTitleContainer: {
    position: "absolute",
    bottom: 16,
    left: 16,
  },
  cardTitle: {
    fontSize: 32,
    fontWeight: "600",
    color: Colors.textWhite,
    fontFamily: "Poppins",
  },
  cardSubtitle: {
    fontSize: 16,
    fontWeight: "400",
    color: Colors.textWhite,
    fontFamily: "Poppins",
  },
  featuredCardTagText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.textPrimary,
  },
});
