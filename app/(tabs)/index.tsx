import { StyleSheet } from "react-native";
import { View } from "@/components/Themed";

import { useAuthStore } from "@/stores/useAuthStore";
import { useGuideStore } from "@/stores/useGuideStore";

import { UserHeader } from "@/components/home";
import {
  PageWrapper,
  EmptyMessage,
  UserEncouragement,
} from "@/components/uikit";
import ContentFeed from "@/components/home/ContentFeed";

export default function TabOneScreen() {
  const { userProfile } = useAuthStore();
  const { guides, loadingStatus, error } = useGuideStore();

  const userHasNoGuides = guides?.length === 0 || guides === null;
  const userHasOneGuide = guides?.length === 1;
  // const userHasNoGuides = true;

  if (!userProfile || !guides) return null;

  return (
    <PageWrapper>
      <UserHeader userProfile={userProfile} />
      <View style={styles.contentContainer}>
        {userHasNoGuides && <EmptyMessage />}
        {userHasOneGuide ? (
          <UserEncouragement firstGuide={guides[0]} />
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
    alignItems: "center",
    justifyContent: "center",
  },
});
