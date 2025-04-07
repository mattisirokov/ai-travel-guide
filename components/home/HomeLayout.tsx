import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";

import { Text, View } from "@/components/Themed";

import { useAuthStore } from "@/stores/useAuthStore";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userProfile } = useAuthStore();

  return <SafeAreaView style={{ flex: 1 }}></SafeAreaView>;
}

const styles = StyleSheet.create({
  /** Content */
  content: {
    flex: 1,
    marginTop: 24,
  },
});
