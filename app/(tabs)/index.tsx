import DonutChart from '@/components/donutChart';
import ModifiedScrollView from '@/components/ModifiedScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useEffect, useState } from 'react';
import { Dimensions, Image, Platform, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Calendar } from 'react-native-calendars';
import 'react-native-gesture-handler';
import { useAuth } from '../../contexts/AuthContext';
const HomeScreen = () => {
  const { user } = useAuth(); 
  const [selected, setSelected] = useState('');
  const [dimesions, setDimensions] = useState(Dimensions.get('screen'));
  const [gymManagers, setGymManagers] = useState([]);

  // Handle orientation change
  useEffect(()=>{
    const subscription = Dimensions.addEventListener ('change', ({screen})=>{
      setDimensions(screen);
    });
    return () => subscription?.remove();
  }, 
[]);

// Fetch the gym managers 
useEffect(()=>{
  const fetchManagers = async () => {
    try{
      const response = await fetch("http://10.2.4.251:3001/api/gymManagers");
      const data = await response.json();
      setGymManagers(data);
    }
    catch(error){
      console.log("Could not fetch the gym managers", error);
    }
  };
  fetchManagers();
},[]);

  
const getResponsiveStyles = (): {headerContent: ViewStyle} => {
  
  // Get the screen dimesion 
  const {width: screenwidth, height: screenHeight} = Dimensions.get('screen');
  
  // Calculate relative dimesion
  const horizontalPadding = screenwidth * 0.02;
  const marginHorizontal = screenwidth * 0.04;
  const marginVertical = screenwidth * 0.01;
  const marginTop = screenHeight * 0.01;

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
          minHeight: screenHeight * 0.13, // Minimum height of 15% of screen height
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
                <Text style= {styles.innerText}>{user?.name ?? 'Guest'}</Text>
              </Text>
                <ThemedText style= {styles.welcomeSubtitle}>{user?.email ?? 'No email available'}</ThemedText>
                
            </ThemedView>
            <Image 
              source={require('@/assets/images/profile.png')}
              style={styles.avatarLarge}
              />
          </ThemedView>
        </ThemedView>
      }>
        

      {/* Calender */}
      <ThemedView style= {styles.content}>
        <ThemedView style= {styles.calenderSection}>
          <ThemedText style= {styles.calenderHeader}>Calender</ThemedText>
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
                <DonutChart 
                  size={120} 
                  strokeWidth={10}  
                />
              </View>
            </ThemedView>
          </View>
        
        {/* Gym Manager */}
          <View style={styles.gymManagerContainer}>
            <ThemedText style={styles.sectionHeader}>Gym Managers</ThemedText>
            <ThemedView style={styles.gymManagersSection}>
              {gymManagers.map((manager, index)=> (
                <Text key= {index} style={styles.statusText}>
                  {manager.name}, {'\u00A0\u00A0\u00A0\u00A0\u00A0'}
                  <Text style={styles.statusText}>{manager.contact_number}</Text>
                </Text>
              ))}

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
    width: 80,
    height: 80,
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
