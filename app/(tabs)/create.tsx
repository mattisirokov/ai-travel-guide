import React from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Image,
  Dimensions,
} from "react-native";

import SelectMediaTile from "@/components/SelectMediaTile";

const { width, height } = Dimensions.get("window");

export default function CreateScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.background}
        source={{
          uri: "https://images.unsplash.com/photo-1567604804217-9be3addbd802?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80",
        }}
        resizeMode="cover"
      />
      <View style={[styles.background, styles.overflow]} />
      <View style={styles.content}>
        <Text style={styles.title}>
          It's time to expolore the world,{"\n"}one picture at a time
        </Text>
        <SelectMediaTile type="gallery" />
        <SelectMediaTile type="camera" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1b1d1b",
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    width: width,
    height: height,
  },
  overflow: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  content: {
    marginTop: "auto",
    alignItems: "flex-start",
    paddingHorizontal: 14,
  },
  title: {
    fontSize: 32,
    color: "#fff",
    marginBottom: 24,
    textAlign: "left",
  },
});
