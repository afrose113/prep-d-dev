import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Platform, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { AuthenticationRoutes } from "./Navigation";
import Onboarding from "@/Containers/Onboarding";
import { theme } from "@/Components/Theme";

const Stack = createNativeStackNavigator<AuthenticationRoutes>();
const LoginScreens = [{ Onboarding }];

export type TScreens = keyof (typeof LoginScreens)[0];

const AuthenticationNavigator = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={true}
        barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}
      />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {LoginScreens.map((item) => {
          const [name, component] = Object.entries(item)[0] as [
            TScreens,
            () => JSX.Element
          ];
          return <Stack.Screen key={name} name={name} component={component} />;
        })}
      </Stack.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary800,
  },
});

export default AuthenticationNavigator;
