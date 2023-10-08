import {AppRoutes} from '@/Navigator/Navigation';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {theme} from '@/Components/Theme';
import {ThemeProvider} from '@shopify/restyle';
import {useAppSelector} from '@/Store';
import AuthenticationNavigator from '@/Navigator/AuthenticatiomNavigator';

const Stack = createNativeStackNavigator<AppRoutes>();
const ApplicationNavigator = () => {
  const access_token = useAppSelector(state => state.local.access_token);
  return (
    <NavigationContainer>
      <ThemeProvider {...{theme}}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen
            name="Authentication"
            component={AuthenticationNavigator}
          />
          {/* <Stack.Screen name="HomeNavigator" component={HomeNavigator} /> */}
        </Stack.Navigator>
      </ThemeProvider>
    </NavigationContainer>
  );
};

export default ApplicationNavigator;
