import { Text, View } from "@/components/Themed";
import { Button, StyleSheet } from "react-native";
import { router } from "expo-router";
import { useAuthStore } from "@/stores/useAuthStore";

export default function TabOneScreen() {
  const { session, user, signOut } = useAuthStore();

  const handleAuth = async () => {
    if (session) {
      try {
        await signOut();
      } catch (error) {
        console.error("Error signing out:", error);
      }
    } else {
      router.push("/login");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to AI Travel Guide</Text>
      {user && (
        <Text style={styles.subtitle}>
          Hello, {user.first_name} {user.last_name}
        </Text>
      )}
      <Button title={session ? "Sign Out" : "Login"} onPress={handleAuth} />
      <View style={styles.separator} />
    </View>
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
