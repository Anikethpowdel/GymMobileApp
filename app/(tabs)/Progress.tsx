/** @format */
import React from "react";
import { View, Text } from "react-native";
import DailyActiveHour from "@/components/DailyActiveHour";
import UserStreak from "@/components/UserStreak";
import { ScrollView } from "react-native-gesture-handler";
export default function Progress() {
  return (
    <ScrollView>
      <UserStreak />
      <DailyActiveHour />
    </ScrollView>
  );
}
