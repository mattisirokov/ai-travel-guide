import { Text, View } from "@/components/Themed";
import { useLocation } from "@/services/useLocation";
import { Button } from "react-native";

export function AskGeoLocationButton() {
  const { longitude, latitude, getUserLocation } = useLocation();

  return (
    <View>
      <Text>AskGeoLocationButton</Text>
      <Button title="Get Location" onPress={getUserLocation} />
      <Text>{JSON.stringify(longitude)}</Text>
      <Text>{JSON.stringify(latitude)}</Text>
    </View>
  );
}
