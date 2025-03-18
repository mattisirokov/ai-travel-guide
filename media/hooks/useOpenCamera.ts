import * as ImagePicker from "expo-image-picker";
import { useCallback } from "react";

export const useOpenCamera = (
  onComplete: (fileUri: string) => Promise<void>
) => {
  const requestCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    return status === "granted";
  };

  const openCamera = useCallback(async () => {
    try {
      const hasPermissions = await requestCameraPermission();
      if (!hasPermissions) {
        console.error("Camera permission not granted");
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        await onComplete(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Failed to capture image:", error);
    }
  }, [onComplete]);

  return { openCamera };
};
