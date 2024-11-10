import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import {Drawer} from 'expo-router/drawer';
import { useColorScheme } from '@/hooks/useColorScheme';
import CustomDrawerContent from '@/components/CustomDrawer';
import React from 'react';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Default theme
const CustomDefaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#ECE9E9',
  }
}

// Custom Dark theme (with default dark background)
const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#45474B',  // Dark background for dark mode
  },
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'light' ? CustomDarkTheme : CustomDefaultTheme }>
      {/* Drawer Navigation */}
      <Drawer
        screenOptions={{
          drawerPosition: 'left',
          drawerType: 'front',
          headerShown: false,
        }}
        drawerContent={(props) => <CustomDrawerContent {...props}/>}
      >

         {/* Main Tab screen inside drawer 
        <Drawer.Screen
          name='(tabs)'
          options={{
            title: "HomeScreen",
            drawerLabel: "HomeScreen"
          }}
      /> */}

      </Drawer>
    </ThemeProvider>
  );
}
