/** @format */

import React from "react";
import { Text, StyleSheet, StatusBar, View } from "react-native";
import { Avatar, Button, Card } from "react-native-paper";
import { format } from "date-fns";
interface ItemProps {
  id: number; // The ID of the notification
  content: string; // The content of the notification
  sent_at: string; // The timestamp when the notification was sent
  handleMessageRead: (id: number) => void; // Function to handle marking the message as read
}

const Item: React.FC<ItemProps> = ({
  id,
  content,
  sent_at,
  handleMessageRead,
}) => {
  const formattedDate = format(new Date(sent_at), "yyyy/MM/dd");
  const formattedTime = format(new Date(sent_at), "hh:mm a");
  return (
    <Card style={styles.item}>
      {/* Display the formatted time with AM/PM */}
      <View style={styles.date}>
        <Text style={styles.time}>{formattedDate}</Text>
        <Text style={styles.time}>{formattedTime}</Text>
      </View>

      <Card.Content style={styles.content}>
        <Avatar.Icon
          size={50}
          icon="account"
          color="white"
          style={{ backgroundColor: "#FFC600" }} // Custom background color (yellow in this case)
        />
        <Text style={styles.notificationMessage}>{content}</Text>
      </Card.Content>
      <Card.Actions>
        <Button style={{ padding: 0 }} onPress={() => handleMessageRead(id)}>
          Mark as Read
        </Button>
      </Card.Actions>
    </Card>
  );
};

export default Item;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 5,
    paddingVertical: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  content: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
    textAlign: "left",
  },
  notificationMessage: {
    marginEnd: 20,
    paddingEnd: 20,
    fontSize: 16,
  },
  action: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  time: {
    color: "#FFC600",
    textAlign: "right",
    marginHorizontal: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  date: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
