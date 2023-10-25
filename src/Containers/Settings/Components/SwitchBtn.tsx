import { theme } from "@/Components/Theme";
import React, { useState } from "react";
import { StyleSheet, Switch } from "react-native";

const SwitchBtn = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  return (
    <Switch
      trackColor={{ false: theme.colors.primary, true: theme.colors.primary }}
      thumbColor={theme.colors.white}
      ios_backgroundColor="#3e3e3e"
      onValueChange={() => setIsEnabled((previousState) => !previousState)}
      value={isEnabled}
      style={styles.switch}
    />
  );
};

const styles = StyleSheet.create({
  switch: { transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] },
});

export default SwitchBtn;
