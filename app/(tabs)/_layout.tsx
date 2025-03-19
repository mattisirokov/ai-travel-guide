import { Tabs } from "expo-router";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { View } from "@/components/Themed";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import Colors from "@/constants/Colors";

import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
  size?: number;
}) {
  return <FontAwesome size={35} style={{ marginBottom: -10 }} {...props} />;
}

function HighlightedTabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return (
    <View
      style={{
        marginBottom: -3,
        backgroundColor: Colors.tabIconSelected,
        padding: 30,
        borderRadius: 10,
      }}
    >
      <FontAwesome size={28} style={{ color: "white" }} {...props} />
    </View>
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.tabIconSelected,
        headerStyle: {
          backgroundColor: Colors.navigationBackground,
        },
        headerTintColor: Colors.text,
        headerShadowVisible: false,
        tabBarStyle: {
          backgroundColor: Colors.navigationBackground,
        },
        headerShown: useClientOnlyValue(false, true),
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "Create",
          tabBarIcon: ({ color }) => (
            <HighlightedTabBarIcon name="plus" color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => <TabBarIcon name="cog" color={color} />,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
