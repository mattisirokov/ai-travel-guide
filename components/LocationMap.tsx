import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

interface LocationMapProps {
  title?: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export function LocationMap({ coordinates, title }: LocationMapProps) {
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        latitudeDelta: 0.08,
        longitudeDelta: 0.08,
      }}
    >
      <Marker
        identifier={`marker-${coordinates.latitude}-${coordinates.longitude}`}
        coordinate={{
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
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
