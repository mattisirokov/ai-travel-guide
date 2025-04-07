import { Tabs } from "expo-router";
import { View } from "@/components/Themed";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import Colors from "@/constants/Colors";

import { useClientOnlyValue } from "@/components/useClientOnlyValue";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
  size?: number;
  focused?: boolean;
}) {
  return (
    <View
      style={{
        alignItems: "center",
        backgroundColor: "transparent",
      }}
    >
      <FontAwesome
        size={28}
        style={{
          color: props.focused ? "white" : "rgba(255,255,255,0.5)",
        }}
        {...props}
      />
      {props.focused && (
        <View
          style={{
            position: "absolute",
            bottom: -10,
            width: 20,
            height: 3,
            backgroundColor: Colors.primary,
            borderRadius: 2,
            marginTop: 4,
          }}
        />
      )}
    </View>
  );
}

function HighlightedTabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return (
    <View
      style={{
        backgroundColor: "rgba(255,255,255,0.3)",
        padding: 12,
        height: 50,
        width: 50,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <FontAwesome size={24} style={{ color: Colors.textWhite }} {...props} />
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.text,
        headerStyle: {
          backgroundColor: Colors.navigationBackground,
        },
        headerTintColor: Colors.text,
        headerShadowVisible: false,
        tabBarStyle: {
          backgroundColor: Colors.navigationBackground,
          position: "absolute",
          bottom: 20,
          borderRadius: 40,
          height: 70,
          paddingTop: 10,
          marginHorizontal: 20,
        },
        headerShown: useClientOnlyValue(false, true),
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({
            color,
            focused,
          }: {
            color: string;
            focused: boolean;
          }) => <TabBarIcon name="home" color={color} focused={focused} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "Create",
          tabBarIcon: ({
            color,
            focused,
          }: {
            color: string;
            focused: boolean;
          }) => <HighlightedTabBarIcon name="plus" color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({
            color,
            focused,
          }: {
            color: string;
            focused: boolean;
          }) => <TabBarIcon name="cog" color={color} focused={focused} />,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
