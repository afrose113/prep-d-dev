import React from "react";
import { Platform, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { theme } from "@/Components/Theme";
import { createBottomSheetNavigator } from "@th3rdwave/react-navigation-bottom-sheet";
import Login from "@/Containers/Login";
import { HomeRoutes } from "@/Navigator/Navigation";

const BottomSheet = createBottomSheetNavigator<HomeRoutes>();
const BottomScreens = [{ Login }];

export type TScreens = keyof (typeof BottomScreens)[0];

const BottomSheetNavigator = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={true}
        barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}
      />
      <BottomSheet.Navigator>
        {BottomScreens.map((item) => {
          const [name, component] = Object.entries(item)[0] as [
            TScreens,
            () => JSX.Element
          ];
          return (
            <BottomSheet.Screen key={name} name={name} component={component} />
          );
        })}
      </BottomSheet.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary800,
  },
});

export default BottomSheetNavigator;
