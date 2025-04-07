import { StyleSheet } from "react-native";
import { View } from "@/components/Themed";

import HomeLayout from "@/components/home/HomeLayout";
import ContentFeed from "@/components/home/ContentFeed";
import { PageWrapper } from "@/components/uikit";

export default function TabOneScreen() {
  return (
    <PageWrapper>
      <HomeLayout>
        <View style={styles.container}>{/* <ContentFeed /> */}</View>
      </HomeLayout>
    </PageWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
