import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface PageWrapperProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export function PageWrapper({ children, style }: PageWrapperProps) {
  return (
    <SafeAreaView style={[styles.container, style]} edges={["top"]}>
      <View style={styles.content}>{children}</View>
      <View style={styles.navigationSpacer} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  navigationSpacer: {
    height: 90, // Height of navigation bar (70) + bottom margin (20)
  },
});
