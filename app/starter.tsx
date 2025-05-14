import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { router } from "expo-router";

import { VideoBackground } from "@/components/uikit/VideoBackground";

import Colors from "../constants/Colors";

export default function OnBoardingScreen() {
  return (
    <VideoBackground source={require("../assets/videos/Background.mp4")}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Image
            alt="App Logo"
            resizeMode="contain"
            style={styles.headerImg}
            source={{ uri: "https://assets.withfra.me/SignIn.2.png" }}
          />

          <Text style={styles.title}>
            Welcome to <Text style={{ color: Colors.primary }}>Guidy</Text>
          </Text>

          <Text style={styles.subtitle}>Your personal travel companion</Text>
        </View>

        <Text style={styles.createAccountText}>Create a free account</Text>

        <TouchableOpacity
          style={[styles.button, styles.signupButton]}
          onPress={() => router.push("/signUp")}
        >
          <Text style={styles.signupButtonText}>Get Started</Text>
        </TouchableOpacity>

        <View style={styles.signInContainer}>
          <Text style={styles.alreadyText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => router.push("/login")}>
            <Text style={styles.signInText}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </VideoBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 48,
  },
  headerImg: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 31,
    fontWeight: "700",
    color: Colors.textWhite,
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "500",
    color: Colors.textWhite,
    textAlign: "center",
  },
  createAccountText: {
    fontSize: 24,
    fontWeight: "600",
    color: Colors.textWhite,
    marginBottom: 32,
    textAlign: "center",
  },
  button: {
    width: "100%",
    height: 56,
    borderRadius: 28,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  signupButton: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  signupButtonText: {
    color: Colors.textWhite,
    fontWeight: "600",
    fontSize: 18,
  },
  signInContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  alreadyText: {
    color: Colors.textWhite,
  },
  signInText: {
    marginLeft: 8,
    color: Colors.textWhite,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
});
