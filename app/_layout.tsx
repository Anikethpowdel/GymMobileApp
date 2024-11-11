import CustomDrawerContent from '@/components/CustomDrawer';
import { useColorScheme } from '@/hooks/useColorScheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot, useRouter } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import 'react-native-reanimated';
import { AuthProvider, useAuth } from '../contexts/AuthContext';

// Prevent the splash screen from auto-hiding before asset loading is complete
SplashScreen.preventAutoHideAsync();

// Define themes
const CustomDefaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#ECE9E9',
  },
};

const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#45474B',
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
    <AuthProvider>
      <ThemeProvider value={colorScheme === 'dark' ? CustomDarkTheme : CustomDefaultTheme}>
        <AuthNavigator />
      </ThemeProvider>
    </AuthProvider>
  );
}

// Custom Drawer Layout component to ensure compatibility with expo-router
function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        drawerPosition: 'left',
        drawerType: 'front',
        headerShown: false,
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Slot /> {/* Render dynamic routes directly */}
    </Drawer>
  );
}

function AuthNavigator() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && !loading) {
      if (isAuthenticated) {
        router.replace('/(tabs)'); // Navigate to authenticated screens
      } else {
        router.replace('/login'); // Navigate to login screen
      }
    }
  }, [isMounted, loading, isAuthenticated, router]);

  if (loading || !isMounted) {
    return <LoadingScreen />;
  }

  // Render DrawerLayout for authenticated users; otherwise, render Slot for login screen
  return isAuthenticated ? <DrawerLayout /> : <Slot />;
}

// Loading component to show while checking authentication
function LoadingScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#E8C206FF" />
    </View>
);
}