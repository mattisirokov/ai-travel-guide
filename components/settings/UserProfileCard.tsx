import React from "react";

import { StyleSheet } from "react-native";
import { View, Text } from "@/components/Themed";

import { UserProfile } from "@/types";
import { UserProfileIcon } from "@/components/uikit";

export function UserProfileCard({
  userProfile = null,
}: {
  userProfile: UserProfile | null;
}) {
  if (!userProfile) {
    return null;
  }

  return (
    <View
      style={{
        paddingVertical: 12,
        backgroundColor: "white",
        borderRadius: 12,
      }}
    >
      <Text style={styles.sectionTitle}>Your profile</Text>
      <View style={styles.sectionBody}>
        <View style={styles.profile}>
          <UserProfileIcon userProfile={userProfile} />

          <View style={styles.profileBody}>
            <Text style={styles.profileName}>
              {userProfile.first_name} {userProfile.last_name}
            </Text>
          </View>
        </View>
      </View>
    </View>
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
});
