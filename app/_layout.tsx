import { useColorScheme } from '@/hooks/useColorScheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Slot, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { AuthProvider, useAuth } from '../contexts/AuthContext';

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

  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === 'dark' ? CustomDarkTheme : CustomDefaultTheme}>
        <AuthNavigator />
      </ThemeProvider>
    </AuthProvider>
  );
}

function AuthNavigator() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated) {
        router.replace('/(tabs)'); // Redirect to the authenticated screens
      } else {
        router.replace('/login'); // Redirect to the login screen
      }
    }
  }, [isAuthenticated, loading]);

  // Return Slot component, which will be replaced by the appropriate screen based on routing
  return loading ? <LoadingScreen /> : <Slot />;
}

// Loading component to show while checking authentication
function LoadingScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#E8C206FF" />
    </View>
  );
}
