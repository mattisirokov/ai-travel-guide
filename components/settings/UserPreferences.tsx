import React from "react";

import { TouchableOpacity, StyleSheet } from "react-native";

import { View, Text } from "@/components/Themed";

import FeatherIcon from "@expo/vector-icons/Feather";
import CustomSwitch from "@/components/uikit/CustomSwitch";

export function UserPreferences() {
  return (
    <>
      <Text style={styles.sectionTitle}>Preferences</Text>

      <View style={styles.sectionBody}>
        <View style={[styles.rowWrapper, styles.rowFirst]}>
          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}
            style={styles.row}
          >
            <Text style={styles.rowLabel}>Language</Text>

            <View style={styles.rowSpacer} />

            <Text style={styles.rowValue}>English</Text>

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
            <Text style={styles.rowLabel}>Location</Text>

            <View style={styles.rowSpacer} />

            <Text style={styles.rowValue}>Los Angeles, CA</Text>

            <FeatherIcon color="#bcbcbc" name="chevron-right" size={19} />
          </TouchableOpacity>
        </View>

        <View style={styles.rowWrapper}>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Email Notifications</Text>

            <View style={styles.rowSpacer} />

            <CustomSwitch
              value={true}
              onChange={(value) => {
                // handle onPress
              }}
            />
          </View>
        </View>

        <View style={[styles.rowWrapper, styles.rowLast]}>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Push Notifications</Text>

            <View style={styles.rowSpacer} />

            <CustomSwitch
              value={true}
              onChange={(value) => {
                // handle onPress
              }}
            />
          </View>
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
