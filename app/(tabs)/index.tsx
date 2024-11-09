import 'react-native-gesture-handler';
import { Dimensions,Image, Text, StyleSheet, Platform, View, ViewStyle } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {Calendar} from 'react-native-calendars';
import React, { useState, useEffect } from 'react';
import DonutChart from '@/components/donutChart';
import ModifiedScrollView from '@/components/ModifiedScrollView';


const HomeScreen = () => {

  const [selected, setSelected] = useState('');
  const [dimesions, setDimensions] = useState(Dimensions.get('screen'));

  // Handle orientation change
  useEffect(()=>{
    const subscription = Dimensions.addEventListener ('change', ({screen})=>{
      setDimensions(screen);
    });
    return () => subscription?.remove();
  }, 
[]);

  
const getResponsiveStyles = (): {headerContent: ViewStyle} => {
  
  // Get the screen dimesion 
  const {width: screenwidth, height: screenHeight} = Dimensions.get('screen');
  
  // Calculate relative dimesion
  const horizontalPadding = screenwidth * 0.02;
  const marginHorizontal = screenwidth * 0.04;
  const marginVertical = screenwidth * 0.01;
  const marginTop = screenHeight * 0.03;

  return {
      headerContent: {
          padding: horizontalPadding,
          // flex: 1,
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          backgroundColor: '#FFF',
          borderRadius: 15,
          marginTop: marginTop,
          marginHorizontal: marginHorizontal,
          marginVertical: marginVertical,
  
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
    // <ParallaxScrollView
    <ModifiedScrollView
    backgroundColor='#ECE9E9'

      /* // Welcome Card */
      headerContent={
        <ThemedView style={responsiveStyles.headerContent}>
          <ThemedView style={styles.headerContainer}>
            <ThemedView style={styles.headerTextContainer}>
              <Text style= {styles.headerText}>Welcome, 
                <Text style= {styles.innerText}>Users</Text>
              </Text>
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
        
      {/* Gym Status */}
      <View style={styles.gymStatusContainer}>
            <ThemedText style={styles.sectionHeader}>Users Active</ThemedText>
            <ThemedView style ={styles.gymStatusSection}>
              {/* <ThemedText style={styles.statusText}>Users Active</ThemedText> */}
              <View style={styles.donutChartContainer}>
                <DonutChart value={30} size={120} strokeWidth={10} color="#4CAF50" />
              </View>
            </ThemedView>
          </View>
        
        {/* Gym Manager */}
          <View style={styles.gymManagerContainer}>
            <ThemedText style={styles.sectionHeader}>Gym Managers</ThemedText>
            <ThemedView style={styles.gymManagersSection}>
              <Text style={styles.statusText}>Jimpa Jamtsho, {'\u00A0\u00A0\u00A0\u00A0\u00A0'}
                <Text style={styles.statusText}>17425363</Text>
              </Text>
            </ThemedView>
          </View>
    </ModifiedScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({

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

  innerText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFC600'
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
    padding: 16, 
    backgroundColor: 'transparent'
  },

  calenderSection:{
    marginBottom: 20,
    backgroundColor: 'transparent'
  },

  calenderHeader:{
    // padding: 18,
    fontWeight: 'bold',
    marginBottom: 10, 
    color: '#000'
  },

  calender: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'gray',
  },

  gymManagerContainer: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
    width: '100%'
  },

  sectionHeader:{
    fontWeight: 'bold',
    marginBottom: 10, 
    color: '#000'
  },

  // Gym status section
  gymStatusContainer: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    padding:10,
    width: '100%',
  },

  gymManagersSection: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    padding: 10,
  },

  managerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    backgroundColor: 'transparent',
  },

  yellowDot: {
    width: 8,
    height: 8, 
    borderRadius: 4,
    backgroundColor: 'yellow',
    marginRight: 8
  },

  gymStatusSection: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center'
  },

  statusText: {
    color: '#000',
    marginBottom: 5,
    fontSize: 16, 
    padding: 7
  },

  activeUsersCount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'green',
    textAlign: 'center',
    marginTop: 10
  },

  donutChartContainer: {
    marginTop: 10,
  }

});
