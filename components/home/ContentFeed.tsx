import React, { useState } from "react";
import { parseGuideData } from "@/utils/parseGuideData";

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
import useGuideStore from "@/stores/useGuideStore";
import { useSyncUserGuides } from "@/stores/useSyncUserGuides";

export default function ContentFeed() {
  const { guides, loadingStatus, error } = useGuideStore();
  const [refreshing, setRefreshing] = useState(false);
  const syncGuides = useSyncUserGuides();

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      await syncGuides();
    } finally {
      setRefreshing(false);
    }
  }, [syncGuides]);

  if (!guides || guides.length === 0) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff", width: "100%" }}>
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No guides yet</Text>
        </View>
      </SafeAreaView>
    );
  }

  const parsedGuides = guides.map((guide) => parseGuideData(guide as any));

  return (
    <View style={{ flex: 1, width: "100%" }}>
      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.featured}>
          <TouchableOpacity
            onPress={() => {
              router.push({
                pathname: "/guide",
                params: { guideId: parsedGuides[0].id },
              });
            }}
            style={styles.featuredCard}
          >
            <View style={styles.featuredCardTag}>
              <Text style={styles.featuredCardTagText}>Featured</Text>
            </View>

            <Image
              alt={parsedGuides[0].content.title}
              resizeMode="cover"
              source={{ uri: parsedGuides[0].image_url }}
              style={styles.featuredCardImg}
            />

            <View style={styles.featuredCardRow}>
              <View style={styles.featuredCardRowItem}>
                <Text style={styles.featuredCardRowItemText}>
                  {new Date(parsedGuides[0].created_at).toLocaleDateString()}
                </Text>
              </View>
            </View>

            <View style={styles.featuredCardTitle}>
              <Text style={styles.featuredCardTitleText}>
                {parsedGuides[0].content.title}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* @ts-ignore */}
        <View style={styles.list}>
          {parsedGuides.slice(1).map((guide) => (
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
                  <Text style={styles.listCardTitleText}>
                    {guide.content.title}
                  </Text>
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
                alt={guide.content.title}
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
  /** Featured */
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  headerAction: {
    padding: 8,
  },
});
