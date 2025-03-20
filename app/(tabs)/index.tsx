import { StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";

import { router } from "expo-router";
import { useAuthStore } from "@/stores/useAuthStore";

import HomeLayout from "@/components/home/HomeLayout";
import ContentFeed from "@/components/home/ContentFeed";
import useGuideStore from "@/stores/useGuideStore";

export default function TabOneScreen() {
  const { session, userProfile, signOut } = useAuthStore();
  const { guides } = useGuideStore();

  return (
    <HomeLayout>
      <View style={styles.container}>
        <ContentFeed />
      </View>
    </HomeLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
