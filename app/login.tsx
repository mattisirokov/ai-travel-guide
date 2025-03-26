import React, { useState, useRef, useEffect } from "react";
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

import { Video, ResizeMode } from "expo-av";

import Colors from "../constants/Colors";
import { useAuthStore } from "../stores/useAuthStore";
import { router, useFocusEffect } from "expo-router";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const signIn = useAuthStore((state) => state.signIn);
  const videoRef = useRef<Video>(null);

  const playVideo = async () => {
    if (videoRef.current) {
      await videoRef.current.playAsync();
    }
  };

  useEffect(() => {
    playVideo();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      playVideo();
    }, [])
  );

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn(email, password);
      router.replace("/(tabs)");
    } catch (error: any) {
      Alert.alert(
        "Error",
        error.message || "Failed to sign in. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
      <Video
        ref={videoRef}
        style={styles.backgroundVideo}
        source={require("../assets/videos/Background.mp4")}
        resizeMode={ResizeMode.COVER}
        isMuted
        isLooping
        shouldPlay={true}
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <View style={styles.container}>
            <View style={styles.header}>
              <Image
                alt="App Logo"
                resizeMode="contain"
                style={styles.headerImg}
                source={{ uri: "https://assets.withfra.me/SignIn.2.png" }}
              />

              <Text style={styles.title}>
                Sign in to <Text style={{ color: Colors.primary }}>Guidy</Text>
              </Text>

              <Text style={styles.subtitle}>
                Start exploring the world with Gudiy
              </Text>
            </View>

            <View style={styles.form}>
              <View style={styles.input}>
                <Text style={styles.inputLabel}>Email address</Text>

                <TextInput
                  style={styles.inputControl}
                  placeholder="john@example.com"
                  placeholderTextColor="#6b7280"
                  value={email}
                  onChangeText={setEmail}
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
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={true}
                  textContentType="password"
                />
              </View>

              <View style={styles.formAction}>
                <TouchableOpacity onPress={handleSignIn} disabled={isLoading}>
                  <View style={[styles.btn, isLoading && styles.btnDisabled]}>
                    {isLoading ? (
                      <ActivityIndicator color="#fff" />
                    ) : (
                      <Text style={styles.btnText}>Sign in</Text>
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>

      <TouchableOpacity onPress={() => router.push("/signUp")}>
        <Text style={styles.formFooter}>
          Don't have an account?{" "}
          <Text style={{ textDecorationLine: "underline" }}>Sign up</Text>
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
  formLink: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.primary,
    textAlign: "center",
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
  inputError: {
    borderColor: Colors.error,
  },
  errorText: {
    color: Colors.error,
    fontSize: 12,
    marginTop: 4,
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
