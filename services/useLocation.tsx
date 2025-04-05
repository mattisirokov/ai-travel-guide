import * as Location from "expo-location";

import { useState } from "react";

export const useLocation = () => {
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const getUserLocation = async () => {
    try {
      setStatus("loading");
      let locationPermission =
        await Location.requestForegroundPermissionsAsync();

      if (!locationPermission) {
        setError("Location permission not granted");
        setStatus("error");
        return null;
      }

      if (locationPermission.status === "granted") {
        let location = await Location.getCurrentPositionAsync();
        setStatus("idle");
        console.log("USER LOCATION: ", location);
        return {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
      } else {
        setError("Location permission not granted");
        setStatus("error");
        return null;
      }
    } catch (error) {
      setError("Error getting location");
      setStatus("error");
      return null;
    }
  };

  return { getUserLocation, status, error };
};
