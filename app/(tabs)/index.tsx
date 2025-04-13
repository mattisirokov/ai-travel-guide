import React from "react";

import { StyleSheet } from "react-native";
import { View } from "@/components/Themed";

import { useAuthStore } from "@/stores/useAuthStore";
import { useGuideStore } from "@/stores/useGuideStore";

import { MainGuide, UserHeader } from "@/components/home";
import {
  PageWrapper,
  EmptyMessage,
  UserEncouragement,
} from "@/components/uikit";
import ContentFeed from "@/components/home/ContentFeed";

export default function TabOneScreen() {
  const { userProfile } = useAuthStore();
  const { guides } = useGuideStore();

  const userHasNoGuides = guides?.length === 0 || guides === null;
  const userHasOneGuide = guides?.length === 1;

  if (!userProfile || !guides) return null;

  return (
    <PageWrapper>
      <UserHeader userProfile={userProfile} />
      <View style={styles.contentContainer}>
        {userHasNoGuides ? (
          <EmptyMessage />
        ) : userHasOneGuide ? (
          <>
            <MainGuide guide={guides[0]} />
            <UserEncouragement />
          </>
        ) : (
          <ContentFeed guides={guides} />
        )}
      </View>
    </PageWrapper>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
});
