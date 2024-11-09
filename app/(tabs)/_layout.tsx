import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet} from 'react-native';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import CustomHeader from '@/components/hamicon';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: true,
        tabBarStyle:styles.tabBarStyle,
        tabBarLabelStyle: styles.label,
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
        name='check_in_out'
        options={{
          title: "Check In/Out",
          tabBarIcon: ({color, focused}) => (
            <TabBarIcon name={focused ? 'scan-circle-sharp' : 'scan'} color = {color}/>
          ),
        }}/>


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
            <TabBarIcon name={focused ?  'arrow-forward-circle-sharp' : 'arrow-forward-circle-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
     backgroundColor: '#FFC600',
     borderRadius: 15, 
     padding: 8
  },

  label: {
    fontSize: 12
  }
})