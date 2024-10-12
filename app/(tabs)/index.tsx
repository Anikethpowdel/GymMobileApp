import { Dimensions,Image, Text, StyleSheet, Platform, View, ViewStyle } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {Calendar} from 'react-native-calendars';
import { useState, useEffect } from 'react';


// export default function HomeScreen() {
const HomeScreen = () => {

  const [selected, setSelected] = useState('');
  const [dimesions, setDimensions] = useState(Dimensions.get('screen'));

  // Handle orientation change
  useEffect(()=>{
    const subscription = Dimensions.addEventListener ('change', ({screen})=>{
      setDimensions(screen);
    });
    return () => subscription?.remove();
  }, []);

  
const getResponsiveStyles = (): {headerContent: ViewStyle} => {
  
  // Get the screen dimesion 
  const {width: screenwidth, height: screenHeight} = Dimensions.get('screen');
  
  // Calculate relative dimesion
  const horizontalPadding = screenwidth * 0.05;
  const marginHorizontal = screenwidth * 0.03;
  const marginTop = screenHeight * 0.1;

  return {
      headerContent: {
          padding: horizontalPadding,
          // flex: 1,
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          backgroundColor: '#FFF',
          borderRadius: 8,
          marginTop: marginTop,
          marginHorizontal: marginHorizontal,
  
          ...Platform.select({
              ios: {
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
              },
              android: {
                elevation: 2,
              }
          }),
          // Minimum and maximum constraints
          minHeight: screenHeight * 0.15, // Minimum height of 15% of screen height
          maxWidth: 600, // Maximum width for larger devices
          width: screenwidth - (marginHorizontal * 2), // Responsive width
        },
      };
  };  

  const responsiveStyles = getResponsiveStyles();

  return (
    <ParallaxScrollView
          
      // Welcome Card
      headerContent={
        <ThemedView style={responsiveStyles.headerContent}>
          <ThemedView style={styles.headerContainer}>
            <ThemedView style={styles.headerTextContainer}>
              <Text style= {styles.headerText}>Welcome, Users</Text>
                <ThemedText style= {styles.welcomeSubtitle}>02210201.cst@rub.edu.bt</ThemedText>
                <ThemedText style= {styles.welcomeSubtitle}>Information Technology</ThemedText>
            </ThemedView>
            <Image 
              source={{uri: 'https://via.placeholder.com/60'}}
              style={styles.avatarLarge}
              />
          </ThemedView>
        </ThemedView>
      }>

      {/* Calender */}
      <ThemedView style= {styles.content}>
        <ThemedView style= {styles.calenderSection}>
          <ThemedText style= {styles.calenderHeader}>Calander</ThemedText>
          <Calendar 
            style={styles.calender}
            onDayPress = {day => {
              setSelected(day.dateString);
            }}
            markedDates = {{
              [selected]: {selected: true, disableTouchEvent: true}
            }}
          />
        </ThemedView>  
      </ThemedView>

      {/* Gym Managers */}
      <ThemedView>
        <ThemedView>
          <ThemedText style= {styles.calenderHeader}>Gym Managers</ThemedText>
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },

  // Header Section
  headerContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
  },

  headerTextContainer: {
    backgroundColor: 'transparent',
    flex: 1
  },

  headerText: {
    fontSize: 24, 
    fontWeight: '600',
  },

  welcomeSubtitle: {
    fontSize: 14,
    color: '#666'
  },

  avatarLarge: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },

  // Calender 
  content: {
    flex: 1,
    padding: 16
  },

  calenderSection:{
    marginBottom: 20
  },

  calenderHeader:{
    // padding: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },

  calender: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'gray',
  }
});
