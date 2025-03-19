import { Switch } from "react-native";

import Colors from "@/constants/Colors";

interface CustomSwitchProps {
  value: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
}

export default function CustomSwitch({
  value,
  onChange,
  disabled = false,
}: CustomSwitchProps) {
  return (
    <Switch
      disabled={disabled}
      value={value}
      style={{ transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }] }}
      onValueChange={onChange}
      trackColor={{ false: Colors.textTertiary, true: Colors.primary }}
    />
  );
}
