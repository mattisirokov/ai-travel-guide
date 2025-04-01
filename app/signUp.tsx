import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  Alert,
} from "react-native";

import { VideoView, useVideoPlayer } from "expo-video";
import { useEvent } from "expo";
import { router, useFocusEffect } from "expo-router";

import Colors from "../constants/Colors";
import { useAuthStore } from "../stores/useAuthStore";

export default function SignUpScreen() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const signUp = useAuthStore((state) => state.signUp);

  const player = useVideoPlayer(
    require("../assets/videos/Background.mp4"),
    (player) => {
      player.loop = true;
      player.muted = true;
    }
  );

  // Listen to status changes to ensure video plays when ready
  const { status } = useEvent(player, "statusChange", {
    status: player.status,
  });

  useEffect(() => {
    if (status === "readyToPlay") {
      player.play();
    }
  }, [status]);

  useFocusEffect(
    React.useCallback(() => {
      if (status === "readyToPlay") {
        player.play();
      }
    }, [status])
  );

  const handleSignUp = async () => {
    setIsLoading(true);
    try {
      await signUp(form.email, form.password, {
        first_name: form.firstName,
        last_name: form.lastName,
      });
      router.replace("/(tabs)");
    } catch (error: any) {
      Alert.alert(
        "Error",
        error.message || "Failed to sign up. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
      <VideoView
        style={styles.backgroundVideo}
        player={player}
        contentFit="cover"
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <View style={styles.container}>
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => router.back()}
                style={styles.backButton}
              >
                <Text style={styles.backButtonText}>←</Text>
              </TouchableOpacity>

              <Image
                alt="App Logo"
                resizeMode="contain"
                style={styles.headerImg}
                source={{ uri: "https://assets.withfra.me/SignIn.2.png" }}
              />

              <Text style={styles.title}>
                Create your <Text style={{ color: Colors.primary }}>Guidy</Text>{" "}
                account
              </Text>

              <Text style={styles.subtitle}>
                Start exploring the world with Guidy
              </Text>
            </View>

            <View style={styles.form}>
              <View style={styles.input}>
                <Text style={styles.inputLabel}>First Name</Text>
                <TextInput
                  style={styles.inputControl}
                  placeholder="John"
                  placeholderTextColor="#6b7280"
                  value={form.firstName}
                  onChangeText={(firstName) => setForm({ ...form, firstName })}
                  autoCapitalize="words"
                  clearButtonMode="while-editing"
                  textContentType="givenName"
                />
              </View>

              <View style={styles.input}>
                <Text style={styles.inputLabel}>Last Name</Text>
                <TextInput
                  style={styles.inputControl}
                  placeholder="Doe"
                  placeholderTextColor="#6b7280"
                  value={form.lastName}
                  onChangeText={(lastName) => setForm({ ...form, lastName })}
                  autoCapitalize="words"
                  clearButtonMode="while-editing"
                  textContentType="familyName"
                />
              </View>

              <View style={styles.input}>
                <Text style={styles.inputLabel}>Email address</Text>
                <TextInput
                  style={styles.inputControl}
                  placeholder="john@example.com"
                  placeholderTextColor="#6b7280"
                  value={form.email}
                  onChangeText={(email) => setForm({ ...form, email })}
                  autoCapitalize="none"
                  autoCorrect={false}
                  clearButtonMode="while-editing"
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  autoComplete="email"
                  importantForAutofill="yes"
                />
              </View>

              <View style={styles.input}>
                <Text style={styles.inputLabel}>Password</Text>
                <TextInput
                  style={styles.inputControl}
                  placeholder="********"
                  placeholderTextColor="#6b7280"
                  value={form.password}
                  onChangeText={(password) => setForm({ ...form, password })}
                  secureTextEntry={true}
                  textContentType="newPassword"
                />
              </View>

              <View style={styles.formAction}>
                <TouchableOpacity onPress={handleSignUp} disabled={isLoading}>
                  <View style={[styles.btn, isLoading && styles.btnDisabled]}>
                    {isLoading ? (
                      <ActivityIndicator color="#fff" />
                    ) : (
                      <Text style={styles.btnText}>Sign up</Text>
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>

      <TouchableOpacity onPress={() => router.push("/login")}>
        <Text style={styles.formFooter}>
          Already have an account?{" "}
          <Text style={{ textDecorationLine: "underline" }}>Sign in</Text>
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    opacity: 0.65,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  container: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    padding: 24,
  },
  title: {
    fontSize: 31,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#fff",
  },
  /** Header */
  header: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 36,
  },
  headerImg: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginBottom: 36,
  },
  backButton: {
    position: "absolute",
    left: 0,
    top: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  backButtonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  /** Form */
  form: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  formAction: {
    marginTop: 4,
    marginBottom: 16,
  },
  formFooter: {
    paddingVertical: 24,
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
    letterSpacing: 0.15,
  },
  /** Input */
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 8,
  },
  inputControl: {
    height: 50,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
    borderWidth: 1,
    borderColor: "#C9D3DB",
    borderStyle: "solid",
  },
  /** Button */
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  btnDisabled: {
    opacity: 0.7,
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "600",
    color: "#fff",
  },
});
