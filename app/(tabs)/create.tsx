import { Text, View } from "@/components/Themed";
import { StyleSheet, Image, TouchableOpacity } from "react-native";

import { router } from "expo-router";

import SelectMediaTile from "@/components/SelectMediaTile";

import { useMediaStore } from "@/stores/useMediaStore";

export default function CreateScreen() {
  const { media, uploadStatus, resetStatus } = useMediaStore();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Upload media or take a picture!</Text>
        <Text style={styles.description}>
          Take a picture or upload an image from your library to get started!
          We'll generate a custom audio guide for you after!
        </Text>
      </View>

      <SelectMediaTile
        type="gallery"
        onMediaSelected={() => {
          router.back();
        }}
      />
      <SelectMediaTile
        type="camera"
        onMediaSelected={() => {
          router.back();
        }}
      />

      <View style={styles.mediaContainer}>
        {uploadStatus.status !== "idle" && (
          <View style={styles.statusContainer}>
            <Text style={styles.statusText}>Status: {uploadStatus.status}</Text>
            {uploadStatus.error && (
              <Text style={styles.errorText}>{uploadStatus.error}</Text>
            )}
            <TouchableOpacity onPress={resetStatus} style={styles.resetButton}>
              <Text style={styles.resetButtonText}>Reset Status</Text>
            </TouchableOpacity>
          </View>
        )}

        {media.length > 0 && (
          <View style={styles.imagesContainer}>
            {media.map((m) => (
              <Image key={m} source={{ uri: m }} style={styles.media} />
            ))}
          </View>
        )}
      </View>
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
  mediaContainer: {
    width: "100%",
    marginTop: 20,
  },
  statusContainer: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
    marginBottom: 15,
  },
  statusText: {
    fontSize: 16,
    color: "#333",
  },
  errorText: {
    color: "#FF3B30",
    marginTop: 5,
  },
  resetButton: {
    marginTop: 10,
    padding: 8,
    backgroundColor: "#007AFF",
    borderRadius: 6,
    alignItems: "center",
  },
  resetButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  imagesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  media: {
    width: 100,
    height: 100,
    borderRadius: 8,
    overflow: "hidden",
  },
});
