import { Guide } from "@/types";
import { View } from "../Themed";
import { StyleSheet, Image, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export function ContentCard({ guide }: { guide: Guide }) {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: "/guide",
      params: { guideId: guide.id, source: "home" },
    });
  };

  return (
    <Pressable onPress={handlePress}>
      <View style={styles.card}>
        <Image source={{ uri: guide.image_url }} style={styles.image} />

        <View style={styles.textContainer}>
          <Text style={styles.title}>{guide.content.title}</Text>
          <Text style={styles.description} numberOfLines={2}>
            Something here for a description
          </Text>
          <View style={styles.dateContainer}>
            <Ionicons name="calendar-outline" size={16} color="#666" />
            <Text style={styles.date}>
              {new Date(guide.created_at).toLocaleDateString()}
            </Text>
          </View>
        </View>

        <View style={styles.arrowContainer}>
          <Ionicons name="chevron-forward" size={24} color="#E67E22" />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    fontFamily: "Poppins",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
    fontFamily: "Poppins",
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  date: {
    fontSize: 14,
    color: "#666",
    fontFamily: "Poppins",
  },
  arrowContainer: {
    justifyContent: "center",
    paddingLeft: 8,
  },
});
