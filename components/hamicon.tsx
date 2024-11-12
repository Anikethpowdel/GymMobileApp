/** @format */

import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const CustomHeader = () => {
  const [data, setData] = useState<any>(null); // Assuming `data` is the list of unread messages or similar structure
  const [unread, setUnread] = useState<boolean>(false); // State to track unread messages
  const navigation = useNavigation();

  // Fetch unread messages directly inside the component
  const fetchMessages = async () => {
    try {
      const response = await fetch("http://10.2.5.204:3001/api/messages");
      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }
      const result = await response.json();
      if (result.length > 0) {
        setUnread(true); // Set unread state to true if there are messages
      }
      setData(result); // Set data if available
    } catch (error: any) {
      console.error("Fetch error:", error.message);
    }
  };

  useEffect(() => {
    fetchMessages(); // Trigger fetching when component mounts
  }, []);

  return (
    <View style={styles.header}>
      {/* Hamburger Menu Icon to open Drawer */}
      <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        style={styles.iconContainer}>
        <Ionicons name="menu" size={35} color="black" />
      </TouchableOpacity>

      {/* Notification Icon with Highlight if there are unread messages */}
      <TouchableOpacity
        onPress={() => {
          navigation.dispatch(
            DrawerActions.jumpTo("(tabs)", { screen: "notification" })
          );
          // Reset the highlight when navigating to notifications
        }}
        style={[styles.iconContainer, unread && styles.highlightedIcon]}>
        {/* Conditionally render icon based on the presence of unread messages */}
        {data ? (
          <Ionicons name="notifications-outline" size={30} color="black" />
        ) : (
          <Ionicons name="notifications-off-outline" size={30} color="black" />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginTop: 50,
    justifyContent: "space-between",
  },
  iconContainer: {
    marginHorizontal: 18,
  },
  highlightedIcon: {
    backgroundColor: "#FFC600", // Highlight color
    borderRadius: 20,
    padding: 5,
  },
});
