import { StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";

import Settings from "@/components/settings/Settings";

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Settings />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
