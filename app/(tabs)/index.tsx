import { StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";

import { router } from "expo-router";
import { useAuthStore } from "@/stores/useAuthStore";

import HomeLayout from "@/components/home/HomeLayout";

export default function TabOneScreen() {
  const { session, userProfile, signOut } = useAuthStore();

  return (
    <HomeLayout>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to AI Travel Guide</Text>
        <View style={styles.separator} />
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 24,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
