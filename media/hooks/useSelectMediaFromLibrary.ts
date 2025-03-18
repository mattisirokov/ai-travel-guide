import * as ImagePicker from "expo-image-picker";
import { useCallback } from "react";

export const useSelectMediaFromLibrary = (
  onComplete: (fileUri: string) => Promise<void>
) => {
  const requestMediaLibraryPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    return status === "granted";
  };

  const selectImageFromGallery = useCallback(async () => {
    try {
      const hasPermissions = await requestMediaLibraryPermission();
      if (!hasPermissions) {
        console.error("Media library permission not granted");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        await onComplete(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Failed to select image:", error);
    }
  }, [onComplete]);

  return { selectImageFromGallery };
};
