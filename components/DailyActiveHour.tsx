/** @format */
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { parseISO, differenceInMinutes } from "date-fns";
import { Card } from "react-native-paper";
import CircularProgress from "react-native-circular-progress-indicator";
import { useState } from "react";
import { Text } from "react-native";

function DailyActiveHour() {
  const [dailyActiveHour, setDailyActiveHour] = useState([]);
  useEffect(() => {
    // Fetch data from the server
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://10.2.5.204:3001/api/checkins/checkin/26/today"
        ); // Replace with your API URL
        const data = await response.json(); // Parse the response as JSON
        setDailyActiveHour(data); // Update state with the fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Parse check-in and check-out times
  // Assuming dailyActiveHour is an array of objects with checkin_time and checkout_time
  const checkinTime = new Date(dailyActiveHour[0]?.checkin_time);
  const checkoutTime = new Date(dailyActiveHour[0]?.checkout_time);

  // Calculate the difference in minutes
  const activeMinutes = differenceInMinutes(checkoutTime, checkinTime);

  // Convert to hours and minutes format
  const hours = Math.floor(activeMinutes / 60);
  const minutes = activeMinutes % 60;

  const totalHours = 24; // Total hours in a day
  const percentage = (hours / totalHours) * 100;
  return (
    <Card style={styles.streakContainer}>
      <Card.Title
        title="Active Hour"
        subtitle="Today"
        titleStyle={styles.streakTitle}
        subtitleStyle={{ color: "#495E57" }}
      />
      <Card.Content style={styles.streakContent}>
        <CircularProgress
          value={percentage}
          radius={120}
          duration={2000}
          progressValueColor={"#000000"}
          activeStrokeColor={"#FFC600"}
          inActiveStrokeColor={"#495E57"}
          inActiveStrokeOpacity={0.5}
          activeStrokeWidth={15}
          inActiveStrokeWidth={20}
          title={`${hours}h ${minutes}m`}
          titleColor={"black"}
          showProgressValue={false}
          titleStyle={{ fontWeight: "bold", fontSize: 50 }}
        />
      </Card.Content>
    </Card>
  );
}

export default DailyActiveHour;

const styles = StyleSheet.create({
  streakContainer: {
    margin: 20,
    padding: 10,
  },
  streakContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  streak: {
    fontSize: 100,
  },
  streakText: {
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  streakTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
