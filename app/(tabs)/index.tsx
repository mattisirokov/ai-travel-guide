import { StyleSheet } from "react-native";
import { View } from "@/components/Themed";

import HomeLayout from "@/components/home/HomeLayout";
import ContentFeed from "@/components/home/ContentFeed";

export default function TabOneScreen() {
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
