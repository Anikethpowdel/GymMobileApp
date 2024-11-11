/** @format */

import React, { useRef, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Video } from "expo-av";

const Tutorial = () => {
  const videoRef = useRef(null);
  const [shouldPlay, setShouldPlay] = useState(false); // State to control play/pause
  const background = require("@/assets/images/tutorial.mp4");

  // Function to handle play/pause button press
  const togglePlay = () => {
    setShouldPlay((prev) => !prev); // Toggle play state
  };

  return (
    <View style={styles.container}>
      {/* Video Player on Left */}
      <View style={styles.videoContainer}>
        <Video
          ref={videoRef}
          source={background}
          style={styles.backgroundVideo}
          useNativeControls={true} // Controls for video playback
          shouldPlay={shouldPlay} // Whether the video should autoplay or not
          isLooping={false} // Don't loop the video by default
        />
      </View>

      {/* Text Description on Right */}
      <View style={styles.textContainer}>
        <Text style={styles.text}>Gym Tutorial</Text>
        <TouchableOpacity style={styles.button} onPress={togglePlay}>
          <Text style={styles.buttonText}>{shouldPlay ? "Pause" : "Play"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row", // Arrange children (video and text) in a row
    justifyContent: "flex-start", // Align items to the start
    alignItems: "center", // Align items vertically at the center
    margin: 20,
    height: 250, // Set a fixed height similar to a card
    borderRadius: 10, // Optional: border radius to match card-like appearance
    backgroundColor: "#fff", // Optional: background color for card effect
    shadowColor: "#000", // Optional: shadow for card effect
    shadowOffset: { width: 0, height: 4 }, // Optional: shadow depth
    shadowOpacity: 0.1, // Optional: shadow opacity
    shadowRadius: 4, // Optional: shadow radius
    elevation: 5, // Optional: for Android shadow effect
  },
  videoContainer: {
    flex: 0.4, // Video takes 40% of the width
    marginRight: 20, // Add space between video and text
    height: "100%", // Make video container take full height of the parent
  },
  backgroundVideo: {
    width: "100%",
    height: "100%",
    borderRadius: 10, // Optional: border radius for video
  },
  textContainer: {
    flex: 0.6, // Text takes 60% of the width
    justifyContent: "center", // Center content vertically
    height: "100%", // Ensure text container takes full height of the parent
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#FFC600",
    padding: 10,
    borderRadius: 5,
    width: 70,
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    textAlign: "center",
  },
});

export default Tutorial;
