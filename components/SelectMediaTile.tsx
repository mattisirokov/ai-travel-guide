import { Button, View, StyleSheet } from "react-native";

import { router } from "expo-router";

import { useOpenCamera } from "@/media/hooks/useOpenCamera";
import { useSelectMediaFromLibrary } from "@/media/hooks/useSelectMediaFromLibrary";
import { useFileUpload } from "@/media/hooks/useFileUpload";
import { useMediaStore } from "@/stores/useMediaStore";
import { useLocation } from "@/services/useLocation";
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
    if (type === "gallery") {
      selectImageFromGallery();
    } else {
      openCamera();
    }
    getUserLocation();
  };

  return (
    <View style={styles.container}>
      <Button
        title={`Select Media from ${
          type.charAt(0).toUpperCase() + type.slice(1)
        }`}
        onPress={onSelect}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 10,
    flex: 0.25,
    borderWidth: 1,
    borderColor: "grey",
    marginBottom: 10,
    borderRadius: 10,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  image: {
    width: 200,
    height: 200,
  },
});
