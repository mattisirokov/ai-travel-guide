import { useState } from "react";
import * as Location from "expo-location";

export const useLocation = () => {
  const [longitude, setLongitude] = useState<number | null>(null);
  const [latitude, setLatitude] = useState<number | null>(null);

  const [error, setError] = useState<string | null>(null);

  const getUserLocation = async () => {
    let locationPermission = await Location.requestForegroundPermissionsAsync();

    if (!locationPermission) {
      setError("Location permission not granted");
      return;
    }

    if (locationPermission.status === "granted") {
      let location = await Location.getCurrentPositionAsync();
      setLongitude(location.coords.longitude);
      setLatitude(location.coords.latitude);
    } else {
      setError("Location permission not granted");
      return;
    }
  };

  return { getUserLocation, longitude, latitude, error };
};
