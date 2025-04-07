import { StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";

import { UserProfile } from "@/types";

export function UserProfileIcon({
  userProfile,
  backgroundColor = "#f0f0f0",
  textColor = "#292929",
}: {
  userProfile: UserProfile;
  backgroundColor?: string;
  textColor?: string;
}) {
  const styles = StyleSheet.create({
    profileAvatar: {
      width: 60,
      height: 60,
      borderRadius: 9999,
      marginRight: 12,
      backgroundColor: backgroundColor,
      alignItems: "center",
      justifyContent: "center",
    },
    profileAvatarText: {
      fontSize: 18,
      fontWeight: "600",
      color: textColor,
    },
  });

  return (
    <View style={styles.profileAvatar}>
      <Text style={styles.profileAvatarText}>
        {userProfile.first_name.charAt(0)}
        {userProfile.last_name.charAt(0)}
      </Text>
    </View>
  );
}
