import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

interface SelectMediaTileProps {
  type: "camera" | "gallery";
  onSelect: () => void;
}

export default function SelectMediaTile({
  type,
  onSelect,
}: SelectMediaTileProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onSelect}>
      <Text style={styles.buttonText}>
        {type === "gallery" ? "Upload From Gallery" : "Camera"}
      </Text>
      <Feather
        name={type === "gallery" ? "upload" : "camera"}
        size={24}
        color="white"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    minHeight: 64,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
    marginRight: 12,
  },
});
