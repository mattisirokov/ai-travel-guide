import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  RefreshControl,
} from "react-native";

import { Text } from "../Themed";
import { router } from "expo-router";
import { Guide } from "@/types";

export default function ContentFeed({ guides }: { guides: Guide[] }) {
  const [refreshing, setRefreshing] = useState(false);

  if (!guides || guides.length === 0) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff", width: "100%" }}>
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No guides yet</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View style={{ flex: 1, width: "100%" }}>
      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => console.log("refreshing")}
          />
        }
      >
        <View style={styles.featured}>
          <TouchableOpacity
            onPress={() => {
              router.push({
                pathname: "/guide",
                params: { guideId: guides[0].id },
              });
            }}
            style={styles.featuredCard}
          >
            <View style={styles.featuredCardTag}>
              <Text style={styles.featuredCardTagText}>Featured</Text>
            </View>

            <Image
              alt="Featured Guide"
              resizeMode="cover"
              source={{ uri: guides[0].image_url }}
              style={styles.featuredCardImg}
            />

            <View style={styles.featuredCardRow}>
              <View style={styles.featuredCardRowItem}>
                <Text style={styles.featuredCardRowItemText}>
                  {new Date(guides[0].created_at).toLocaleDateString()}
                </Text>
              </View>
            </View>

            <View style={styles.featuredCardTitle}>
              <Text style={styles.featuredCardTitleText}>Location Guide</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.list}>
          {guides.slice(1).map((guide) => (
            <TouchableOpacity
              key={guide.id}
              onPress={() => {
                router.push({
                  pathname: "/guide",
                  params: { guideId: guide.id },
                });
              }}
              style={styles.listCard}
            >
              <View style={styles.listCardContent}>
                <View style={styles.listCardTitle}>
                  <Text style={styles.listCardTitleText}>Location Guide</Text>
                </View>

                <View style={styles.listCardRow}>
                  <View style={styles.listCardRowItem}>
                    <Text style={styles.listCardRowItemText}>
                      {new Date(guide.created_at).toLocaleDateString()}
                    </Text>
                  </View>
                </View>
              </View>

              <Image
                alt="Guide Image"
                resizeMode="cover"
                source={{ uri: guide.image_url }}
                style={styles.listCardImg}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyStateText: {
    fontSize: 16,
    color: "#939393",
  },
  featured: {
    marginBottom: 24,
  },
  featuredCard: {
    position: "relative",
    width: "100%",
    borderRadius: 12,
    backgroundColor: "#fff",
  },
  featuredCardTag: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 1,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  featuredCardTagText: {
    fontSize: 13,
    lineHeight: 24,
    fontWeight: "700",
    color: "#000",
    textTransform: "capitalize",
  },
  featuredCardImg: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderStyle: "solid",
  },
  featuredCardRow: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  featuredCardRowItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  featuredCardRowItemText: {
    fontSize: 14,
    color: "#939393",
  },
  featuredCardTitle: {
    marginTop: 12,
  },
  featuredCardTitleText: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: "700",
    color: "#000",
  },
  list: {
    marginTop: 16,
  },
  listCard: {
    flexDirection: "row",
    alignItems: "stretch",
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: "#fff",
    paddingTop: 8,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderColor: "#e0e0e0",
  },
  listCardContent: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    marginRight: 12,
  },
  listCardTitle: {
    marginBottom: 8,
  },
  listCardTitleText: {
    fontSize: 15,
    lineHeight: 19,
    fontWeight: "600",
    color: "#000",
  },
  listCardRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  listCardRowItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  listCardRowItemText: {
    fontSize: 12,
    color: "#939393",
  },
  listCardImg: {
    width: 80,
    height: 80,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderStyle: "solid",
  },
});
