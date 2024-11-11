import { useEffect, useState } from 'react';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';

const DonutChart = ({size = 100, strokeWidth = 10 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const totalCapacity = 60;
  const [activeUsers, setActiveUsers] = useState(0);
  const [error, setError] = useState("");
  const [availableSlots, setAvailableSlots] = useState(totalCapacity);

  // fetch active users from the api 
  useEffect(()=> {
    const fetchActiveUsers = async () => {
      try {
        const today = new Date().toISOString().split('T')[0];
        const response = await fetch(`http://10.2.4.251:3001/api/checkins/checkin?date=${today}`);

        if(!response.ok){
          throw new Error('Network Error');
        }

        const data = await response.json();
        setActiveUsers(data.length);
      }
      catch (error) {
        setError("Failed to load data");
      }
    };

    fetchActiveUsers();
  }, []);

  const progress = (activeUsers / totalCapacity) * circumference;

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <Defs>
          <LinearGradient id="donutGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor="#65C511" />
            <Stop offset="100%" stopColor="#FFEE32" />
          </LinearGradient>
        </Defs>
        <Circle
          stroke="#E0E0E0"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <Circle
          stroke="url(#donutGradient)"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
          rotation={-90}
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
      <View style={styles.textContainer}>
        <Text style={styles.valueText}>
          {activeUsers}/{totalCapacity}
        </Text>
        {/* <Text style={styles.available}>
          {totalCapacity-activeUsers} spots available 
        </Text> */}
      </View>

      <View style={styles.availableContainer}>
        <Text style={styles.available}>
          {totalCapacity-activeUsers} spots available 
        </Text>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: '30%',
  },
  valueText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#65C511',
  },
  availableContainer: {
    marginTop: 20
  },
  available: {
    fontSize: 16,
  }
});

export default DonutChart;