import { Text, View } from "@/components/Themed";
import { StyleSheet } from "react-native";

import SelectMediaTile from "@/components/SelectMediaTile";

export default function CreateScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Upload media or take a picture!</Text>
        <Text style={styles.description}>
          Take a picture or upload an image from your library to get started!
          We'll generate a custom audio guide for you after!
        </Text>
      </View>

      <SelectMediaTile type="gallery" />
      <SelectMediaTile type="camera" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  content: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
  },
});
