import { supabase } from "@/config/supabase";
import * as FileSystem from "expo-file-system";

import { useAuthStore } from "@/stores/useAuthStore";
import { useMediaStore } from "@/stores/useMediaStore";

import { UploadResult } from "@/types";

export const useFileUpload = () => {
  const { userProfile } = useAuthStore();
  const { setUploadStatus } = useMediaStore();

  const uploadFile = async (fileUri: string): Promise<UploadResult> => {
    if (!userProfile?.user_id) {
      throw new Error("User must be logged in to upload files");
    }

    try {
      setUploadStatus({ status: "uploading" });
      console.log("Uploading file...");

      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      if (!fileInfo.exists) {
        throw new Error("File does not exist");
      }

      const fileExtension = fileUri.split(".").pop()?.toLowerCase() || "jpg";

      const validExtensions = ["jpg", "jpeg", "png", "gif"];
      if (!validExtensions.includes(fileExtension)) {
        throw new Error(
          "Invalid file type. Only JPG, PNG and GIF files are allowed."
        );
      }

      const timestamp = new Date().getTime();
      const filename = `${userProfile.user_id}-${timestamp}.${fileExtension}`;

      const base64 = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      console.log("File read successfully");

      const { data, error } = await supabase.storage
        .from("locations")
        .upload(filename, decode(base64), {
          contentType: `image/${fileExtension}`,
          cacheControl: "3600",
          upsert: true,
        });

      if (error) {
        setUploadStatus({ status: "error", error: error.message });
        console.error("Error uploading file:", error);
        throw error;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("locations").getPublicUrl(filename);

      setUploadStatus({ status: "success" });
      console.log("Uploaded file:", publicUrl);

      return {
        path: data.path,
        url: publicUrl,
      };
    } catch (error) {
      setUploadStatus({
        status: "error",
        error: error instanceof Error ? error.message : "Upload failed",
      });
      console.error("Error uploading file:", error);
      throw error;
    }
  };

  return { uploadFile };
};

function decode(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}
