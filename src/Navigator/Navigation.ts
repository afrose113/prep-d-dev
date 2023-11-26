import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { CompositeNavigationProp, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
export interface AuthNavigationProps<
  RouteName extends keyof AuthenticationRoutes
> {
  navigation: CompositeNavigationProp<
    NativeStackNavigationProp<AuthenticationRoutes, RouteName>,
    BottomTabNavigationProp<AppRoutes, "HomeNavigator">
  >;
  route: RouteProp<AuthenticationRoutes, RouteName>;
}
export interface HomeNavigationProps<RouteName extends keyof HomeRoutes> {
  navigation: BottomTabNavigationProp<HomeRoutes, RouteName>;
  route: RouteProp<HomeRoutes, RouteName>;
}

export type AppRoutes = {
  Authentication: undefined;
  HomeNavigator: undefined;
};

export type AuthenticationRoutes = {
  Onboarding: undefined;
};

export type HomeRoutes = {
  Home: undefined;
  Orders: undefined;
  Favorites: undefined;
  MainTab: undefined;
  DrawerNavigator: undefined;
  Chefs: undefined;
  Dishes: undefined;
  Cuisines: undefined;
  Cart: undefined;
  Profile: undefined;
  ChefProfile: undefined;
  Dish: undefined;
  HelpCenter: undefined;
  Settings: undefined;
  About: undefined;
  Addresses: undefined;
  TermsnConditions: undefined;
  DataPolicy: undefined;
  ReviewOrder: undefined;
  Payment: undefined;
  AddAddress: undefined;
  Checkout: undefined;
  Login: undefined;
  Explore: undefined;
  HomeInfluencer: undefined;
  Earnings: undefined;
  Transactions: undefined;
  InfluencerProfile: undefined;
  DishDescription: undefined;
  PendingApprovals: undefined;
  SavedDrafts: undefined;
  Notifications: undefined;
  Chats: undefined;
  UploadRecipe: undefined;
  Search: undefined;
};
