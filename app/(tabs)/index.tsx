import React from "react";
import { StyleSheet, View } from "react-native";
import { UserHeader } from "@/components/home";
import { PageWrapper, EmptyMessage } from "@/components/uikit";
import { useAuthStore } from "@/stores/useAuthStore";
import useGuideStore from "@/stores/useGuideStore";

export default function TabOneScreen() {
  const { userProfile } = useAuthStore();
  const { guides, loadingStatus, error } = useGuideStore();

  const userHasNoGuides = guides?.length === 0 || guides === null;
  // const userHasNoGuides = true;

  if (!userProfile) return null;

  return (
    <PageWrapper>
      <UserHeader userProfile={userProfile} />
      <View style={styles.contentContainer}>
        {userHasNoGuides && <EmptyMessage />}
      </View>
    </PageWrapper>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
