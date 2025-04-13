import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "@/components/Themed";

import { router } from "expo-router";

import Colors from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";

import { FontAwesome } from "@expo/vector-icons";

export function EmptyMessage() {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Feather name="plus" size={32} color={Colors.textSecondary} />
      </View>
      <Text style={styles.title}>You haven't created any guides yet</Text>
      <Text style={styles.subtitle}>
        Capture places around you to start building your personal audio journey
        — ready when you are.
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/(tabs)/create")}
      >
        <View style={styles.buttonContent}>
          <FontAwesome name="plus" size={24} color={Colors.textWhite} />
          <Text style={styles.buttonText}>Create first guide</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    width: "100%",
    height: "100%",
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.textSecondary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: Colors.textPrimary,
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 24,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 25,
    width: "100%",
    maxWidth: 300,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  buttonText: {
    color: Colors.textWhite,
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});
