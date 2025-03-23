const GOOGLE_PLACES_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY;
const PLACES_API_URL = "https://places.googleapis.com/v1/places:searchNearby";

interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Place {
  displayName: {
    text: string;
    languageCode: string;
  };
}

interface PlacesResponse {
  places: Place[];
}

export const useGetNearbyPointsOfInterest = (
  defaultCoordinates: Coordinates | null
) => {
  const fetchNearbyPlaces = async (coordinates?: Coordinates) => {
    try {
      // Use provided coordinates or fall back to default
      const useCoordinates = coordinates || defaultCoordinates;

      if (!useCoordinates) {
        throw new Error("No coordinates provided");
      }

      const request = {
        includedTypes: ["historical_place"],
        maxResultCount: 20,
        locationRestriction: {
          circle: {
            center: useCoordinates,
            radius: 500.0,
          },
        },
        rankPreference: "DISTANCE",
      };

      const response = await fetch(PLACES_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": GOOGLE_PLACES_API_KEY!,
          "X-Goog-FieldMask":
            "places.displayName,places.formattedAddress,places.types,places.primaryType,places.location,places.id",
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response body:", errorText);
        throw new Error(
          `HTTP error! status: ${response.status}, body: ${errorText}`
        );
      }

      const data = await response.json();

      if (!data.places || !Array.isArray(data.places)) {
        console.error("Unexpected API response structure:", data);
        return [];
      }

      return data.places.map((place: Place) => place.displayName.text);
    } catch (error) {
      console.error("Error fetching historical places:", error);
      throw error;
    }
  };

  return { fetchNearbyPlaces };
};
