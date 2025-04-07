import { router, Stack } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { StatusBar } from "expo-status-bar";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import "react-native-reanimated";

import { useAuthStore } from "@/stores/useAuthStore";
import useGuideStore from "@/stores/useGuideStore";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Poppins: require("../assets/fonts/Poppins-Regular.ttf"),
    ...FontAwesome.font,
  });

  const { session, initialize: initializeAuth } = useAuthStore();
  const { initialize: initializeGuides } = useGuideStore();

  // Initialize auth store
  useEffect(() => {
    initializeAuth();
  }, []);

  // Initialize guides when session is available
  useEffect(() => {
    if (session?.user) {
      initializeGuides(session.user.id);
    }
  }, [session]);

  // Handle navigation after fonts are loaded

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();

      // Only navigate after the layout is mounted and loaded
      if (session) {
        router.replace("/(tabs)");
      } else {
        router.replace("/login");
      }
    }
  }, [loaded, session]);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="generateGuide" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="signUp" options={{ headerShown: false }} />
        <Stack.Screen name="guide" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
