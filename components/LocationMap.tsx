import { StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

interface LocationMapProps {
  latitude: number;
  longitude: number;
  title?: string;
}

export function LocationMap({ latitude, longitude, title }: LocationMapProps) {
  return (
    <MapView
      style={styles.map}
      provider={PROVIDER_GOOGLE}
      initialRegion={{
        latitude: Number(latitude),
        longitude: Number(longitude),
        latitudeDelta: 0.08,
        longitudeDelta: 0.08,
      }}
    >
      <Marker
        identifier={`marker-${latitude}-${longitude}`}
        coordinate={{
          latitude: Number(latitude),
          longitude: Number(longitude),
        }}
        title={title}
      />
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    overflow: "hidden",
  },
});
