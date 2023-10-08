import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {CompositeNavigationProp, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
export interface AuthNavigationProps<
  RouteName extends keyof AuthenticationRoutes,
> {
  navigation: CompositeNavigationProp<
    NativeStackNavigationProp<AuthenticationRoutes, RouteName>,
    BottomTabNavigationProp<AppRoutes, 'HomeNavigator'>
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

export type HomeRoutes = {};
