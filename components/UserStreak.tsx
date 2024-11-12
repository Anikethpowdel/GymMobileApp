/** @format */

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { parseISO, differenceInCalendarDays } from "date-fns";
import { Card } from "react-native-paper";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

function UserStreak() {
  const [consecutiveDate, setConsecutiveDate] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    // Fetch data from the server
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://10.2.5.204:3001/api/checkins/checkin/${user?.id}/dates`
        ); // Replace with your API URL
        const data = await response.json(); // Parse the response as JSON
        // console.log(data);
        setConsecutiveDate(data); // Update state with the fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  // Calculate streaks
  let streak = 0;
  let maxStreak = 0;
  if (consecutiveDate && consecutiveDate.length > 0) {
    const dates = consecutiveDate
      ?.map((date) => {
        if (date?.checkin_date) {
          return parseISO(date.checkin_date);
        } else {
          return null;
        }
      })
      .filter((date) => date !== null);

    for (let i = 1; i < dates.length; i++) {
      const diff = differenceInCalendarDays(dates[i - 1], dates[i]);

      if (diff === 1) {
        streak++;
      } else {
        maxStreak = Math.max(maxStreak, streak);
        streak = 1;
      }
    }

    maxStreak = Math.max(maxStreak, streak);

    const today = new Date();
    const lastCheckin = dates[0];

    if (differenceInCalendarDays(today, lastCheckin) > 1) {
      streak = 0;
    }
  } else {
    streak = 0;
    maxStreak = 0;
  }
  return (
    <Card style={styles.streakContainer}>
      <Card.Title title="Current Streak" titleStyle={styles.streakTitle} />
      <Card.Content style={[styles.streakContent, styles.spacing]}>
        <Text style={styles.streak}>🔥</Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "flex-end",
          }}>
          <Text style={styles.streakText}>{`${streak}`}</Text>
          <Text style={{ lineHeight: 60, fontWeight: "600" }}>day</Text>
        </View>
      </Card.Content>
      <Card.Content style={styles.streakContent}>
        <Text
          style={{
            fontSize: 16,
            fontStyle: "italic",
            fontWeight: "semibold",
          }}>{`Longest Streak 🔥: ${maxStreak} day`}</Text>
      </Card.Content>
    </Card>
  );
}

export default UserStreak;

const styles = StyleSheet.create({
  streakContainer: {
    margin: 20,
    padding: 10,
  },
  streakContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  spacing: {
    marginBottom: 20,
  },
  streak: {
    fontSize: 100,
  },
  streakText: {
    fontSize: 100,
    fontWeight: "bold",
    color: "#FFC600",
  },
  streakTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
