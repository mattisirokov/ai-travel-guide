import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "@/components/Themed";
import FeatherIcon from "@expo/vector-icons/Feather";
import { Audio } from "expo-av";
import { useEffect, useState } from "react";
import { useTextToSpeech } from "@/services/useTextToSpeech";

import Colors from "@/constants/Colors";

interface AudioPlayerProps {
  text: string;
}

export function AudioPlayer({ text }: AudioPlayerProps) {
  const [sound, setSound] = useState<Audio.Sound>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const { audioUrl, isGenerating, generateSpeech, error } = useTextToSpeech();

  useEffect(() => {
    // Request audio permissions and set audio mode
    Audio.requestPermissionsAsync().then(({ granted }) => {
      if (!granted) {
        console.error("Audio permissions not granted");
      } else {
        console.log("Audio permissions granted");
        // Set audio mode to play even in silent mode
        Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          staysActiveInBackground: true,
          shouldDuckAndroid: true,
          playThroughEarpieceAndroid: false,
        });
      }
    });

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  useEffect(() => {
    if (audioUrl) {
      loadAudio();
    }
  }, [audioUrl]);

  const loadAudio = async () => {
    try {
      if (sound) {
        await sound.unloadAsync();
      }

      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: audioUrl! },
        {
          shouldPlay: true, // Auto-play when loaded
          volume: 1.0,
          isMuted: false,
          isLooping: false,
        },
        onPlaybackStatusUpdate
      );
      setSound(newSound);
      setIsPlaying(true);
    } catch (error) {
      console.error("Error loading audio:", error);
    }
  };

  const onPlaybackStatusUpdate = (status: any) => {
    if (status.isLoaded) {
      setCurrentTime(status.positionMillis);
      setDuration(status.durationMillis || 0);
      setIsPlaying(status.isPlaying);

      // If playback has finished, reset the position
      if (status.didJustFinish) {
        setCurrentTime(0);
        setIsPlaying(false);
      }
    }
  };

  const togglePlayback = async () => {
    if (isGenerating) {
      return;
    }

    if (!sound) {
      // Generate new audio
      await generateSpeech(text);
      return;
    }

    try {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        // If we're at the end, restart from the beginning
        if (currentTime >= duration) {
          await sound.setPositionAsync(0);
        }
        await sound.playAsync();
      }
    } catch (error) {
      console.error("Error toggling playback:", error);
    }
  };

  const skipForward = async () => {
    if (!sound) return;
    const newPosition = Math.min(currentTime + 15000, duration);
    await sound.setPositionAsync(newPosition);
    setCurrentTime(newPosition);
  };

  const skipBackward = async () => {
    if (!sound) return;
    const newPosition = Math.max(currentTime - 15000, 0);
    await sound.setPositionAsync(newPosition);
    setCurrentTime(newPosition);
  };

  const formatTime = (milliseconds: number) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Audio Guide</Text>
          <Text style={styles.subtitle}>AI Generated • Travel Guide</Text>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
            <Text style={styles.timeText}>{formatTime(duration)}</Text>
          </View>
        </View>

        <View style={styles.controlsContainer}>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={skipBackward}
            disabled={isGenerating || !sound}
          >
            <FeatherIcon name="skip-back" size={20} color={Colors.text} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.playButton, isGenerating && styles.disabledButton]}
            onPress={togglePlayback}
          >
            <FeatherIcon
              name={isGenerating ? "loader" : isPlaying ? "pause" : "play"}
              size={24}
              color={Colors.background}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.controlButton}
            onPress={skipForward}
            disabled={isGenerating || !sound}
          >
            <FeatherIcon name="skip-forward" size={20} color={Colors.text} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  content: {
    gap: 24,
    backgroundColor: "transparent",
  },
  titleContainer: {
    backgroundColor: "transparent",
    gap: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: "center",
  },
  progressContainer: {
    gap: 8,
    backgroundColor: "transparent",
  },
  progressBar: {
    height: 4,
    backgroundColor: "#E5E7EB",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: Colors.primary,
    borderRadius: 2,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "transparent",
  },
  timeText: {
    color: Colors.textSecondary,
    fontSize: 12,
  },
  controlsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 32,
    backgroundColor: "transparent",
  },
  controlButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  playButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  disabledButton: {
    opacity: 0.5,
  },
});
