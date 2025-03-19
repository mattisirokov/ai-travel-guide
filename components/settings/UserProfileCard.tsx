import React from "react";

import { StyleSheet } from "react-native";
import { View, Text } from "@/components/Themed";

import { UserProfile } from "@/types";

export function UserProfileCard({
  userProfile = null,
}: {
  userProfile: UserProfile | null;
}) {
  if (!userProfile) {
    return null;
  }

  return (
    <>
      <Text style={styles.sectionTitle}>Your profile</Text>
      <View style={styles.sectionBody}>
        <View style={styles.profile}>
          <View style={styles.profileAvatar}>
            <Text style={styles.profileAvatarText}>
              {userProfile.first_name.charAt(0)}
              {userProfile.last_name.charAt(0)}
            </Text>
          </View>

          <View style={styles.profileBody}>
            <Text style={styles.profileName}>
              {userProfile.first_name} {userProfile.last_name}
            </Text>

            <Text style={styles.profileHandle}>
              {userProfile.first_name}@example.com
            </Text>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingVertical: 12,
  },
  sectionTitle: {
    margin: 8,
    marginLeft: 12,
    fontSize: 13,
    letterSpacing: 0.33,
    fontWeight: "500",
    color: "#a69f9f",
    textTransform: "uppercase",
  },
  sectionBody: {
    borderRadius: 12,
    shadowColor: "#000",
    marginBottom: 12,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  profile: {
    padding: 12,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 9999,
    marginRight: 12,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
  },
  profileBody: {
    marginRight: "auto",
  },
  profileName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#292929",
  },
  profileHandle: {
    marginTop: 2,
    fontSize: 16,
    fontWeight: "400",
    color: "#858585",
  },
  profileAvatarText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#292929",
  },
});
