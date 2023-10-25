import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import DrawerContent from "./DrawerContent";

import { SafeAreaView, StyleSheet } from "react-native";
import { HomeRoutes } from "@/Navigator/Navigation";
import MainTab from "../MainTab/MainTab";
import BottomSheetNavigator from "@/Navigator/BottomSheetNavigator";

const Drawer = createDrawerNavigator<HomeRoutes>();

export const DrawerNavigator = () => (
  <Drawer.Navigator
    screenOptions={{
      headerShown: false,
    }}
    drawerContent={() => <DrawerContent />}
  >
    <Drawer.Screen name="MainTab" component={MainTab} />
  </Drawer.Navigator>
);

const styles = StyleSheet.create({
  container: { backgroundColor: "#000", flex: 1 },
});
