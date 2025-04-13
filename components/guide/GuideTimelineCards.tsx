import { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { View, Text } from "@/components/Themed";
import Animated, {
  useAnimatedStyle,
  withTiming,
  withSpring,
  interpolate,
  useSharedValue,
} from "react-native-reanimated";
import Colors from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";

interface GuideTimelineCardsProps {
  titles: string[];
  contents: string[];
}

const AnimatedCard = ({
  title,
  content,
  isLast,
  isFirst,
}: {
  title: string;
  content: string;
  isLast: boolean;
  isFirst: boolean;
}) => {
  const [isExpanded, setIsExpanded] = useState(isFirst);
  const animation = useSharedValue(isFirst ? 1 : 0);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    animation.value = withSpring(isExpanded ? 0 : 1, {
      damping: 12,
      stiffness: 90,
    });
  };

  const chevronStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: `${interpolate(animation.value, [0, 1], [0, 180])}deg` },
      ],
    };
  });

  const contentStyle = useAnimatedStyle(() => {
    return {
      opacity: animation.value,
      maxHeight: interpolate(animation.value, [0, 1], [0, 500]),
      transform: [
        { translateY: interpolate(animation.value, [0, 1], [-20, 0]) },
      ],
    };
  });

  return (
    <View style={styles.timelineItem}>
      <View style={styles.timelineLeft}>
        <View style={styles.dot} />
        {!isLast && <View style={styles.line} />}
      </View>
      <View style={styles.cardContent}>
        <TouchableOpacity
          style={styles.titleContainer}
          onPress={toggleExpand}
          activeOpacity={0.7}
        >
          <Text style={styles.title}>{title}</Text>
          <Animated.View style={chevronStyle}>
            <Feather name="chevron-down" size={20} color={Colors.textPrimary} />
          </Animated.View>
        </TouchableOpacity>
        <Animated.View style={[styles.descriptionContainer, contentStyle]}>
          <Text style={styles.description}>{content}</Text>
        </Animated.View>
      </View>
    </View>
  );
};

export function GuideTimelineCards({
  titles,
  contents,
}: GuideTimelineCardsProps) {
  return (
    <View style={styles.container}>
      {titles.map((title, index) => (
        <AnimatedCard
          key={title}
          title={title}
          content={contents[index]}
          isLast={index === titles.length - 1}
          isFirst={index === 0}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
  },
  timelineItem: {
    flexDirection: "row",
    marginBottom: 20,
  },
  timelineLeft: {
    alignItems: "center",
    marginRight: 15,
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary,
    borderWidth: 3,
    borderColor: Colors.primaryLight,
  },
  line: {
    width: 2,
    flex: 1,
    backgroundColor: Colors.primaryLight,
    marginVertical: 4,
  },
  cardContent: {
    flex: 1,
    backgroundColor: Colors.primaryBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    overflow: "hidden",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textPrimary,
    flex: 1,
  },
  descriptionContainer: {
    overflow: "hidden",
  },
  description: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginTop: 12,
  },
});
