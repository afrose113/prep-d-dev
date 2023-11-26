import { AppRoutes } from "@/Navigator/Navigation";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { theme } from "@/Components/Theme";
import { ThemeProvider } from "@shopify/restyle";
import { useAppSelector } from "@/Store";
import AuthenticationNavigator from "@/Navigator/AuthenticatiomNavigator";
import HomeNavigator from "./HomeNavigator";
import { supabase } from "@/Lib/InitSupabase";

const Stack = createNativeStackNavigator<AppRoutes>();
const ApplicationNavigator = () => {
  const { access_token, refresh_token } = useAppSelector(
    (state) => state.local
  );
  useEffect(() => {
    const getSession = async () => {
      supabase.auth.setSession({
        access_token: access_token as string,
        refresh_token: refresh_token as string,
      });
    };
    getSession();
  }, [access_token, refresh_token]);
  return (
    <NavigationContainer>
      <ThemeProvider {...{ theme }}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!access_token && (
            <Stack.Screen
              name="Authentication"
              component={AuthenticationNavigator}
            />
          )}
          <Stack.Screen name="HomeNavigator" component={HomeNavigator} />
        </Stack.Navigator>
      </ThemeProvider>
    </NavigationContainer>
  );
};

export default ApplicationNavigator;
