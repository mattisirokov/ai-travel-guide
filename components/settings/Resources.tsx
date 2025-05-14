import { StyleSheet, TouchableOpacity } from "react-native";
import { View, Text } from "@/components/Themed";

import { router } from "expo-router";

import FeatherIcon from "@expo/vector-icons/Feather";
import React from "react";

export function Resources() {
  return (
    <>
      <Text style={styles.sectionTitle}>Resources</Text>

      <View style={styles.sectionBody}>
        <View style={[styles.rowWrapper, styles.rowFirst]}>
          <TouchableOpacity
            onPress={() => {
              router.push("/onBoarding");
            }}
            style={styles.row}
          >
            <Text style={styles.rowLabel}>Open onboarding flow</Text>

            <View style={styles.rowSpacer} />

            <FeatherIcon color="#bcbcbc" name="chevron-right" size={19} />
          </TouchableOpacity>
        </View>

        <View style={styles.rowWrapper}>
          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}
            style={styles.row}
          >
            <Text style={styles.rowLabel}>Report Bug</Text>

            <View style={styles.rowSpacer} />

            <FeatherIcon color="#bcbcbc" name="chevron-right" size={19} />
          </TouchableOpacity>
        </View>

        <View style={styles.rowWrapper}>
          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}
            style={styles.row}
          >
            <Text style={styles.rowLabel}>Rate in App Store</Text>

            <View style={styles.rowSpacer} />

            <FeatherIcon color="#bcbcbc" name="chevron-right" size={19} />
          </TouchableOpacity>
        </View>

        <View style={[styles.rowWrapper, styles.rowLast]}>
          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}
            style={styles.row}
          >
            <Text style={styles.rowLabel}>Terms and Privacy</Text>

            <View style={styles.rowSpacer} />

            <FeatherIcon color="#bcbcbc" name="chevron-right" size={19} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  /** Section */
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

  /** Row */
  row: {
    height: 44,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingRight: 12,
  },
  rowWrapper: {
    paddingLeft: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#f0f0f0",
  },
  rowFirst: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  rowLabel: {
    fontSize: 16,
    letterSpacing: 0.24,
    color: "#000",
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  rowValue: {
    fontSize: 16,
    fontWeight: "500",
    color: "#ababab",
    marginRight: 4,
  },
  rowLast: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  rowLabelLogout: {
    width: "100%",
    textAlign: "center",
    fontWeight: "600",
    color: "#dc2626",
  },
});
