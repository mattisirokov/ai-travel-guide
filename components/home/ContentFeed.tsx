import React from "react";

import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";

const feed = [
  {
    img: "https://plus.unsplash.com/premium_photo-1661281316103-9aef5ad47c50?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
    title: "New Study Finds Link Between Exercise and Brain Function",
    author: "S. Lee",
    authorImg:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80",
    tag: "health",
    date: "Mar 24, 2023",
  },
  {
    img: "https://images.unsplash.com/photo-1519558260268-cde7e03a0152?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
    title: "Tech Giant Announces New Line of Smart Home Devices",
    author: "J. Smith",
    authorImg:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80",
    tag: "technology",
    date: "Mar 23, 2023",
  },
  {
    img: "https://images.unsplash.com/photo-1605367177286-f3d4789c47a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2342&q=80",
    title: "City Council Approves Plan to Expand Public Transportation",
    author: "E. Chen",
    authorImg:
      "https://images.unsplash.com/photo-1515621061946-eff1c2a352bd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1389&q=80",
    tag: "politics",
    date: "Mar 22, 2023",
  },
  {
    img: "https://images.unsplash.com/photo-1565615833231-e8c91a38a012?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
    title: "Researchers Discover Potential Treatment for Alzheimer's",
    author: "S. Lee",
    authorImg:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80",
    tag: "health",
    date: "Mar 21, 2023",
  },
  {
    img: "https://images.unsplash.com/photo-1593941707874-ef25b8b4a92b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2344&q=80",
    title: "New Startup Aims to Revolutionize Electric Car Market",
    author: "J. Smith",
    authorImg:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80",
    tag: "technology",
    date: "Mar 20, 2023",
  },
  {
    img: "https://plus.unsplash.com/premium_photo-1663050986883-a5bdd99a7fa5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2362&q=80",
    title: "Local Election Results Are In: Democrats Retain Majority",
    author: "E. Chen",
    authorImg:
      "https://images.unsplash.com/photo-1515621061946-eff1c2a352bd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1389&q=80",
    tag: "politics",
    date: "Mar 19, 2023",
  },
];

export default function ContentFeed() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff", width: "100%" }}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.featured}>
          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}
            style={styles.featuredCard}
          >
            <View style={styles.featuredCardTag}>
              <Text style={styles.featuredCardTagText}>{feed[0].tag}</Text>
            </View>

            <Image
              alt=""
              resizeMode="cover"
              source={{ uri: feed[0].img }}
              style={styles.featuredCardImg}
            />

            <View style={styles.featuredCardRow}>
              <View style={styles.featuredCardRowItem}>
                <Image
                  alt=""
                  source={{ uri: feed[0].authorImg }}
                  style={styles.featuredCardRowItemImg}
                />

                <Text style={styles.featuredCardRowItemText}>
                  {feed[0].author}
                </Text>
              </View>

              <View style={styles.featuredCardRowDivider}>
                <Text style={styles.featuredCardRowDividerText}>·</Text>
              </View>

              <View style={styles.featuredCardRowItem}>
                <Text style={styles.featuredCardRowItemText}>
                  {feed[0].date}
                </Text>
              </View>
            </View>

            <View style={styles.featuredCardTitle}>
              <Text style={styles.featuredCardTitleText}>{feed[0].title}</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* @ts-ignore */}
        <View style={styles.list}>
          {feed
            .slice(1)
            .map(({ img, title, author, authorImg, tag, date }, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  // handle onPress
                }}
                style={styles.listCard}
              >
                <View style={styles.listCardContent}>
                  <View style={styles.listCardTag}>
                    <Text style={styles.listCardTagText}>{tag}</Text>
                  </View>

                  <View style={styles.listCardTitle}>
                    <Text style={styles.listCardTitleText}>{title}</Text>
                  </View>

                  <View style={styles.listCardRow}>
                    <View style={styles.listCardRowItem}>
                      <Image
                        alt=""
                        source={{ uri: authorImg }}
                        style={styles.listCardRowItemImg}
                      />

                      <Text style={styles.listCardRowItemText}>{author}</Text>
                    </View>

                    <View style={styles.listCardRowDivider}>
                      <Text style={styles.listCardRowDividerText}>·</Text>
                    </View>

                    <View style={styles.listCardRowItem}>
                      <Text style={styles.listCardRowItemText}>{date}</Text>
                    </View>
                  </View>
                </View>

                <Image
                  alt=""
                  resizeMode="cover"
                  source={{ uri: img }}
                  style={styles.listCardImg}
                />
              </TouchableOpacity>
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingVertical: 8,
  },
  /** Header */
  header: {
    paddingHorizontal: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1d1d1d",
  },
  headerAction: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  /** Featured */
  featured: {
    marginBottom: 24,
  },
  featuredCard: {
    position: "relative",
    width: "100%",
    borderRadius: 12,
    backgroundColor: "#fff",
  },
  featuredCardTag: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 1,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  featuredCardTagText: {
    fontSize: 13,
    lineHeight: 24,
    fontWeight: "700",
    color: "#000",
    textTransform: "capitalize",
  },
  featuredCardImg: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderStyle: "solid",
  },
  featuredCardRow: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  featuredCardRowItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  featuredCardRowItemImg: {
    width: 24,
    height: 24,
    borderRadius: 9999,
    marginRight: 8,
  },
  featuredCardRowItemText: {
    fontSize: 14,
    color: "#939393",
  },
  featuredCardRowDivider: {
    marginHorizontal: 8,
  },
  featuredCardRowDividerText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#939393",
  },
  featuredCardTitle: {
    marginTop: 12,
  },
  featuredCardTitleText: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: "700",
    color: "#000",
  },
  listCard: {
    flexDirection: "row",
    alignItems: "stretch",
    borderRadius: 12,
    marginBottom: 10,
    backgroundColor: "#fff",
    paddingTop: 8,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderColor: "#e0e0e0",
  },
  listCardContent: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    marginRight: 12,
  },
  listCardTag: {
    marginBottom: 8,
  },
  listCardTagText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#939393",
    textTransform: "capitalize",
  },
  listCardTitle: {
    marginBottom: 8,
  },
  listCardTitleText: {
    fontSize: 15,
    lineHeight: 19,
    fontWeight: "600",
    color: "#000",
  },
  listCardRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  listCardRowItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  listCardRowItemImg: {
    width: 20,
    height: 20,
    borderRadius: 9999,
    marginRight: 6,
  },
  listCardRowItemText: {
    fontSize: 12,
    color: "#939393",
  },
  listCardRowDivider: {
    marginHorizontal: 6,
  },
  listCardRowDividerText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#939393",
  },
  listCardImg: {
    width: 80,
    height: 80,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderStyle: "solid",
  },
});
