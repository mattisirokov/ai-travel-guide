import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

import { router } from "expo-router";

import { useOpenCamera } from "@/media/hooks/useOpenCamera";
import { useSelectMediaFromLibrary } from "@/media/hooks/useSelectMediaFromLibrary";
import { useFileUpload } from "@/media/hooks/useFileUpload";
import { useMediaStore } from "@/stores/useMediaStore";
import { useLocation } from "@/services/useLocation";

import Colors from "@/constants/Colors";

interface SelectMediaTileProps {
  type: "camera" | "gallery";
}

export default function SelectMediaTile({ type }: SelectMediaTileProps) {
  const { uploadFile } = useFileUpload();
  const { getUserLocation } = useLocation();
  const { addMedia, setUploadStatus } = useMediaStore();

  const handleMediaSelect = async (fileUri: string) => {
    try {
      const uploadResult = await uploadFile(fileUri);
      addMedia(uploadResult.url);
      router.push("/loadingGuide");
    } catch (error) {
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
    getUserLocation();

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
          {type === "gallery" ? "Select image from gallery" : "Open camera"}
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
