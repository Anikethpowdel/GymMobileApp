/** @format */

import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { FlatList } from "react-native";
import Item from "@/components/Item"; // Assuming this is your notification item component

interface NotificationData {
  id: number; // The ID of the notification
  content: string; // The content of the notification
  sent_at: string; // The timestamp of the notification
  message_read: number; // Whether the message has been read (0 for false, 1 for true)
}

const Notification: React.FC = () => {
  const [data, setData] = useState<NotificationData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch notifications data from the API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      try {
        const response = await fetch("http://10.2.5.204:3001/api/messages");
        if (!response.ok) {
          throw new Error("Failed to fetch notifications");
        }
        const result = await response.json();
        setData(result); // Set the fetched data
      } catch (error) {
        setError(error.message || "An unknown error occurred");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchData();
  }, []);

  // Handle marking a message as read by updating the message_read status
  const handleMessageRead = async (id: number) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));

    try {
      // Update message_read status to true for the given message ID
      const response = await fetch(
        `http://10.2.5.204:3001/api/messages/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message_read: 1 }), // Set message_read to 1 (true)
        }
      );

      if (!response.ok) {
        throw new Error("Failed to mark message as read");
      }

      console.log(`Message ${id} marked as read`);
    } catch (error) {
      console.error("Error updating message:", error);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#FFC600" />; // Loading indicator
  }

  if (error) {
    return <Text>Error: {error}</Text>; // Display error message
  }

  // Display a message if there is no data
  if (data.length === 0) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No notifications available</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Item
            id={item.id}
            content={item.content}
            sent_at={item.sent_at}
            handleMessageRead={() => handleMessageRead(item.id)}
          />
        )}
        keyExtractor={(item) => String(item.id)}
      />
    </SafeAreaView>
  );
};

export default Notification;
