import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "../Themed";

import { router } from "expo-router";

import { FontAwesome } from "@expo/vector-icons";

import Colors from "@/constants/Colors";
import { Guide } from "@/types";

export function UserEncouragement() {
  return (
    <View style={styles.container}>
      <View style={styles.messageContainer}>
        <Text style={styles.title}>Great start with your first guide!</Text>
        <Text style={styles.subtitle}>
          Keep building your collection by adding more places to your audio
          journey. Each guide makes your collection more valuable.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            router.push("/(tabs)/create");
          }}
        >
          <View style={styles.buttonContent}>
            <FontAwesome name="plus" size={24} color={Colors.textWhite} />
            <Text style={styles.buttonText}>Create Another Guide</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "white",
    marginTop: 20,
    borderRadius: 16,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    padding: 20,
  },
  messageContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "transparent",
  },
  title: {
    fontSize: 32,
    fontWeight: "600",
    color: Colors.textPrimary,
    textAlign: "center",
    marginBottom: 16,
    fontFamily: "Poppins",
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
    borderRadius: 32,
    width: "100%",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  buttonText: {
    color: Colors.textWhite,
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});
