// app/_layout.tsx or your main navigation file
import CustomHeader from '@/components/hamicon';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { Tabs, useNavigation } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: true,
        tabBarStyle:styles.tabBarStyle,
        tabBarLabelStyle: styles.label,
        headerTitleStyle: styles.headerlabel,
      }}>

      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
          header: () => <CustomHeader/>
        }}
      />

      <Tabs.Screen 
        name="CheckInOutScreen" 
        options={{
          title: "Check In/Out",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'scan-circle-sharp' : 'scan'} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="Progress"
        options={{
          title: 'Progress',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'time' : 'time-outline'} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="tutorial"
        options={{
          title: 'Tutorials',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'arrow-forward-circle-sharp' : 'arrow-forward-circle-outline'} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name='notification'
        options={{
          title: 'Notification',
          headerLeft: () => (
            <View style={{paddingLeft: 10}}>
              <Ionicons name = "arrow-back" size={32} 
                onPress={()=>navigation.dispatch(DrawerActions.jumpTo('(tabs)', {screen:'index'}))}
                />
            </View>
          ),
          tabBarButton: () => null
        }}
      />

      <Tabs.Screen
        name='aboutUs'
        options={{
          title: 'About Us',
          headerLeft: () => (
            <View style= {{paddingLeft: 10}}>
              <Entypo name="home" size={24} color="black"
                onPress={() => navigation.dispatch(DrawerActions.jumpTo('(tabs)', {screen:'index'}))}
                />  
            </View>
          ),
          tabBarButton: () => null
        }}
      />

    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: '#FFC600',
    borderRadius: 15, 
    padding: 8,
  },
  label: {
    fontSize: 12
  },

  headerlabel: {
    fontSize: 25,
    fontWeight: 'bold'
  }
})
