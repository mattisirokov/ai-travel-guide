import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";

import { Text, View } from "@/components/Themed";

import { useAuthStore } from "@/stores/useAuthStore";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userProfile } = useAuthStore();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.headerBadge}>
              {new Date().toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                weekday: "long",
              })}
            </Text>

            <Text style={styles.headerTitle}>
              Hey {userProfile?.first_name} 👋
            </Text>
          </View>

          <TouchableOpacity onPress={() => {}}>
            <View style={styles.avatar}>
              <Image
                alt=""
                source={{
                  uri: "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80",
                }}
                style={styles.avatarImg}
              />

              <View style={styles.avatarNotification} />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>{children}</View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  /** Header */
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  /** Avatar */
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
  /** Content */
  content: {
    flex: 1,
    marginTop: 24,
  },
});
