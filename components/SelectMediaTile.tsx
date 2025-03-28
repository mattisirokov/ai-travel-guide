import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

import { router } from "expo-router";

import { useOpenCamera } from "@/media/hooks/useOpenCamera";
import { useSelectMediaFromLibrary } from "@/media/hooks/useSelectMediaFromLibrary";
import { useFileUpload } from "@/media/hooks/useFileUpload";
import { useMediaStore } from "@/stores/useMediaStore";

import Colors from "@/constants/Colors";

interface SelectMediaTileProps {
  type: "camera" | "gallery";
}

export default function SelectMediaTile({ type }: SelectMediaTileProps) {
  const { uploadFile } = useFileUpload();
  const { addMedia, setUploadStatus, uploadStatus, media } = useMediaStore();

  const handleMediaSelect = async (fileUri: string) => {
    try {
      const uploadResult = await uploadFile(fileUri);
      addMedia(uploadResult.url);
      setUploadStatus({
        status: "success",
      });
      router.push("/generateGuide");
    } catch (error) {
      console.error("Error uploading image:", error);
      setUploadStatus({
        status: "error",
        error:
          error instanceof Error ? error.message : "Failed to upload image",
      });
    }
  };

  const { selectImageFromGallery } =
    useSelectMediaFromLibrary(handleMediaSelect);

  const { openCamera } = useOpenCamera(handleMediaSelect);

  const onSelect = () => {
    if (type === "gallery") {
      selectImageFromGallery();
    } else {
      openCamera();
    }
  };

  return (
    <TouchableOpacity onPress={onSelect}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>
          {uploadStatus.status === "uploading"
            ? "Uploading..."
            : uploadStatus.status === "error"
            ? "Error: " + uploadStatus.error
            : type === "gallery"
            ? "Select from Gallery"
            : "Take a Photo"}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    minWidth: "100%",
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: Colors.primary,
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "500",
  },
});
