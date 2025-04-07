import { TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

import { View, Text } from "@/components/Themed";
import { UserProfileIcon } from "../uikit";

import Colors from "@/constants/Colors";
import { UserProfile } from "@/types";

export function UserHeader({
  userProfile,
}: {
  userProfile: UserProfile | null;
}) {
  const router = useRouter();

  if (!userProfile) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ backgroundColor: "transparent" }}>
          <Text style={styles.headerBadge}>
            {new Date().toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              weekday: "long",
            })}
          </Text>

          <Text style={styles.headerTitle}>
            Hey {userProfile.first_name} 👋
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            router.push("/settings");
          }}
        >
          <UserProfileIcon
            userProfile={userProfile}
            backgroundColor={Colors.primaryLight}
            textColor={Colors.textWhite}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "transparent",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "transparent",
  },
  headerBadge: {
    fontSize: 15,
    fontWeight: "400",
    color: "#a3a3a3",
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "600",
    color: "#121212",
  },
  avatar: {
    position: "relative",
  },
  avatarImg: {
    width: 48,
    height: 48,
    borderRadius: 9999,
  },
  avatarNotification: {
    position: "absolute",
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: "#fff",
    top: 0,
    right: -2,
    width: 14,
    height: 14,
    backgroundColor: "#d1d5db",
  },
});
