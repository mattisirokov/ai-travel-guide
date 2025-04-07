import React from "react";

import { StyleSheet, ScrollView } from "react-native";

import { Text, View } from "../Themed";
import { MainGuide } from "./MainGuide";

import { Guide } from "@/types";
import { ContentCard } from "./ContentCard";

export default function ContentFeed({ guides }: { guides: Guide[] }) {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.mainGuideContainer}>
        <MainGuide guide={guides[0]} />
      </View>
      <View style={styles.list}>
        <Text style={styles.listTitle}>Your other guides</Text>
        <View style={styles.listContent}>
          {guides.slice(1).map((guide) => (
            <ContentCard key={guide.id} guide={guide} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  content: {
    paddingHorizontal: 16,
  },
  mainGuideContainer: {
    marginTop: 12,
    marginBottom: 32,
  },
  list: {
    flex: 1,
  },
  listTitle: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 16,
    fontFamily: "Poppins",
  },
  listContent: {
    gap: 12,
  },
});
