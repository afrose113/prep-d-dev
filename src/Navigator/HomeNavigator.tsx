import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { Fragment } from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { HomeRoutes } from "./Navigation";
import { DrawerNavigator } from "@/Containers/Drawer/Drawer";
import Chefs from "@/Containers/Chefs";
import Dishes from "@/Containers/Dishes";
import Cuisines from "@/Containers/Cuisines";
import Cart from "@/Containers/Cart";
import Profile from "@/Containers/Profile";
import ChefProfile from "@/Containers/ChefProfile";
import Dish from "@/Containers/Dish";
import HelpCenter from "@/Containers/HelpCenter";
import { theme } from "@/Components/Theme";
import Settings from "@/Containers/Settings";
import About from "@/Containers/About";
import Addresses from "@/Containers/Addresses";
import TermsnConditions from "@/Containers/TermsnConditions";
import DataPolicy from "@/Containers/DataPolicy/DataPolicy";
import ReviewOrder from "@/Containers/ReviewOrder";
import Payment from "@/Containers/Payment";
import AddAddress from "@/Containers/AddAddress";
import Checkout from "@/Containers/Checkout";
import Explore from "@/Containers/Explore";
import Transactions from "@/Containers/Transactions";
import DishDescription from "@/Containers/DishDescription";
import PendingApprovals from "@/Containers/PendingApprovals";
import SavedDrafts from "@/Containers/SavedDrafts";
import Notifications from "@/Containers/Notifications";
import Chats from "@/Containers/Chats";
import UploadRecipe from "@/Containers/UploadRecipe";
import Search from "@/Containers/Search";

const Stack = createNativeStackNavigator<HomeRoutes>();
const LoginScreens = [
  { DrawerNavigator },
  { Chefs },
  { Dishes },
  { Cuisines },
  { Cart },
  { Profile },
  { ChefProfile },
  { Dish },
  { HelpCenter },
  { Settings },
  { About },
  { Addresses },
  { TermsnConditions },
  { DataPolicy },
  { ReviewOrder },
  { Payment },
  { AddAddress },
  { Checkout },
  { Explore },
  { Transactions },
  { DishDescription },
  { PendingApprovals },
  { SavedDrafts },
  { Notifications },
  { Chats },
  { UploadRecipe },
  { Search },
];

export type TScreens = keyof (typeof LoginScreens)[0];

const HomeNavigator = () => {
  return (
    <Fragment>
      <SafeAreaView style={styles.greenSafeAreaView} />
      <SafeAreaView style={styles.container}>
        <StatusBar animated={true} barStyle={"light-content"} />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {LoginScreens.map((item) => {
            const [name, component] = Object.entries(item)[0] as [
              TScreens,
              () => JSX.Element
            ];
            return (
              <Stack.Screen key={name} name={name} component={component} />
            );
          })}
        </Stack.Navigator>
      </SafeAreaView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary800,
  },
  greenSafeAreaView: { flex: 0, backgroundColor: theme.colors.primary },
});

export default HomeNavigator;
