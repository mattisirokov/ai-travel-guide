import * as Location from "expo-location";

import { useUserLocationStore } from "@/stores/useUserLocationStore";

export const useLocation = () => {
  const { setLocation, setError } = useUserLocationStore();

  const getUserLocation = async () => {
    let locationPermission = await Location.requestForegroundPermissionsAsync();

    if (!locationPermission) {
      setError("Location permission not granted");
      return;
    }

    if (locationPermission.status === "granted") {
      let location = await Location.getCurrentPositionAsync();
      setLocation(location.coords.longitude, location.coords.latitude);
    } else {
      setError("Loca  tion permission not granted");
      return;
    }
  };

  return { getUserLocation };
};
