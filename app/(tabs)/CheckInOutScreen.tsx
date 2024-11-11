import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { Audio } from 'expo-av';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import soundFile from '../../assets/images/sound.mp3';
import { useAuth } from '../../contexts/AuthContext';

const CheckInOutScreen: React.FC = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState<boolean>(false);
  const [checkedIn, setCheckedIn] = useState<boolean>(false);
  const [dateTime, setDateTime] = useState<string | null>(null);
  const isFocused = useIsFocused();
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const { user } = useAuth();
 const router = useRouter();

  useEffect(() => {
    (async () => {
      const { status: cameraStatus } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(cameraStatus === 'granted');

      const { status: galleryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (galleryStatus !== 'granted') {
        Alert.alert('Permission required', 'Permission for media access is required to use this feature');
      }
    })();
  }, [isFocused]);

  const loadSound = async () => {
    const { sound } = await Audio.Sound.createAsync(soundFile);
    setSound(sound);
  };

  useEffect(() => {
    loadSound();
    return () => {
      sound?.unloadAsync();
    };
  }, []);

  if (hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const handleBarCodeScanned = async ({ data }: { data: string }) => {
    if (!scanned) {
      setScanned(true);
      await sound?.replayAsync();  // Play sound upon scanning the QR code
      
      try {
        // Fetch the current date and time from the endpoint in the QR code
        const response = await axios.get(data);  // Assumes `data` is the endpoint URL
        const currentTime = response.data.currentDateTime;  // Adjusted to match returned field
  
        if (currentTime) {
          setDateTime(currentTime);  // Set fetched time for display
          Alert.alert("Success", "Check-in time retrieved successfully!");
        } else {
          throw new Error("Invalid response format");
        }
      } catch (error) {
        Alert.alert("Error", "Unable to fetch check-in data");
        setScanned(false);  // Allow re-scan in case of error
      }
    }
  };
  

  const handleCheckIn = async () => {
    if (!user?.id) {
      Alert.alert("User Not Logged In", "Please log in to check in.");
      return; // Exit early if user ID is not available
    }
  
    try {
      const response = await axios.post('http://10.2.4.251:3001/api/checkins/checkin', {
        user_id: user.id, // Ensure user.id is valid here
        checkInTime: dateTime,
      });
  
      if (response.status === 201) {
        setCheckedIn(true);
        Alert.alert("Check-In Successful", "You have successfully checked in.");
        await sound?.replayAsync();
      }
    } catch (error: any) {
      console.error("Check-In Error:", error?.response?.data || error.message);
      Alert.alert("Check-In Failed", "Please try again.");
    }
  };
  
  const handleCheckOut = async () => {
    try {
      const response = await axios.put(`http://10.2.4.251:3001/api/checkins/checkout`, {
        user_id: user?.id,
        checkout_time: new Date().toISOString(),
      });

      if (response.status === 200) {
        setCheckedIn(false);
        setDateTime(null);
        setScanned(false);
        Alert.alert("Check-Out Successful", "You have successfully checked out."); 
        router.push('/') ;// Success message on check-out
      }
    } catch (error) {
      Alert.alert("Check-Out Failed", "Please try again.");
    }
};


  return (
    <View style={styles.container}>
      <Text style={styles.instructionText}>
        Scan QR code to <Text style={styles.checkInText}>{checkedIn ? "Check Out" : "Check In"}</Text>
      </Text>

      <View style={styles.cameraContainer}>
        {isFocused && (
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
            style={StyleSheet.absoluteFillObject}
          />
        )}
      </View>

      {dateTime && (
  <Text style={styles.dateTimeText}>
    CheckIn Time: {new Date(dateTime).toLocaleString("en-US", { 
      hour: "2-digit", 
      minute: "2-digit", 
      second: "2-digit", 
      hour12: true // Change to false for 24-hour format
    })}
  </Text>
)}


      <TouchableOpacity
        style={checkedIn ? styles.checkOutButton : styles.checkInButton}
        onPress={checkedIn ? handleCheckOut : handleCheckIn}
      >
        <Text style={styles.buttonText}>{checkedIn ? "Check Out" : "Check In"}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CheckInOutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 70,
    backgroundColor: '#F8F8F8',
    alignItems: 'center',
  },
  instructionText: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 20,
    textAlign: 'center',
  },
  checkInText: {
    color: '#FFC600',
    fontWeight: 'bold',
  },
  cameraContainer: {
    width: '100%',
    height: 450,
    borderRadius: 15,
    backgroundColor: '#FFF',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    marginBottom: 20,
  },
  dateTimeText: {
    fontSize: 16,
    marginVertical: 10,
  },
  checkInButton: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FFC600',
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  checkOutButton: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FF5733',
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
  },
});
