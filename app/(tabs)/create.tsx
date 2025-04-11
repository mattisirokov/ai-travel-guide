import { StyleSheet, View, Text } from "react-native";
import { router } from "expo-router";

import {
  VideoBackground,
  LoadingOverlay,
  PageWrapper,
} from "@/components/uikit";

import SelectMediaTile from "@/components/SelectMediaTile";

import { useOpenCamera } from "@/media/hooks/useOpenCamera";
import { useSelectMediaFromLibrary } from "@/media/hooks/useSelectMediaFromLibrary";
import { useFileUpload } from "@/media/hooks/useFileUpload";
import { useMediaStore } from "@/stores/useMediaStore";

import Colors from "@/constants/Colors";

const VIDEO_BACKGROUND = require("@/assets/videos/Background.mp4");

export default function CreateScreen() {
  const { uploadFile } = useFileUpload();
  const { uploadStatus, addImageUrl } = useMediaStore();

  const handleMediaSelect = async (fileUri: string) => {
    try {
      const uploadResult = await uploadFile(fileUri);
      addImageUrl(uploadResult.url);
      router.push("/generateGuide");
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const { selectImageFromGallery } =
    useSelectMediaFromLibrary(handleMediaSelect);

  const { openCamera } = useOpenCamera(handleMediaSelect);

  return (
    <VideoBackground source={VIDEO_BACKGROUND}>
      <PageWrapper>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            Its time to explore the{"\n"}world one picture at a{"\n"}time
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <SelectMediaTile type="camera" onSelect={openCamera} />
          <SelectMediaTile type="gallery" onSelect={selectImageFromGallery} />
        </View>
        {uploadStatus.status === "uploading" && <LoadingOverlay />}
        {uploadStatus.status === "error" && (
          <LoadingOverlay
            message="Error"
            subMessage={uploadStatus.error || "Failed to upload image"}
          />
        )}
      </PageWrapper>
    </VideoBackground>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    paddingHorizontal: 20,
    paddingTop: 65,
  },
  title: {
    fontSize: 40,
    color: Colors.textWhite,
  },
  buttonContainer: {
    marginTop: "auto",
    paddingHorizontal: 20,
  },
});
