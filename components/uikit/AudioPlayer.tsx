import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "@/components/Themed";
import FeatherIcon from "@expo/vector-icons/Feather";

import Colors from "@/constants/Colors";
import { ContentBlock } from "@/types";

interface AudioPlayerProps {
  guideContent: ContentBlock[];
}

export function AudioPlayer({ guideContent }: AudioPlayerProps) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity style={styles.playButton}>
          <FeatherIcon name="play" size={24} color="#fff" />
        </TouchableOpacity>

        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
          </View>
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>0:00</Text>
            <Text style={styles.timeText}>02:00</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#131316",
    overflow: "hidden",
    borderRadius: 15,
    padding: 16,
  },
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    backgroundColor: "transparent",
  },
  playButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  progressContainer: {
    flex: 1,
    gap: 8,
    backgroundColor: "transparent",
  },
  progressBar: {
    height: 4,
    backgroundColor: Colors.primaryLight,
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    width: "30%",
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
    color: "#9CA3AF",
    fontSize: 12,
  },
});
