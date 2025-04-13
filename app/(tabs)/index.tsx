import { StyleSheet } from "react-native";
import { View } from "@/components/Themed";

import { useAuthStore } from "@/stores/useAuthStore";
import { useGuideStore } from "@/stores/useGuideStore";

import { UserHeader } from "@/components/home";
import { PageWrapper, EmptyMessage } from "@/components/uikit";
import ContentFeed from "@/components/home/ContentFeed";

export default function TabOneScreen() {
  const { userProfile } = useAuthStore();
  const { guides } = useGuideStore();

  const userHasNoGuides = guides?.length === 0 || guides === null;

  if (!userProfile || !guides) return null;

  return (
    <PageWrapper>
      <UserHeader userProfile={userProfile} />
      <View style={styles.contentContainer}>
        {/* {userHasNoGuides ? <EmptyMessage /> : <ContentFeed guides={guides} />} */}
        <EmptyMessage />
      </View>
    </PageWrapper>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
});
