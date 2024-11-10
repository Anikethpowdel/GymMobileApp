import React from "react";
import {View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, ImageBackground } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";



const AboutUs = () => {

    const navigation = useNavigation();

    return (
        <ScrollView contentContainerStyle = {styles.container}>
            {/* About us Section  */}

            <View style={styles.aboutSection}>
                <ImageBackground 
                    source={require('@/assets/images/gymBackground.jpg')}
                    style={styles.backgroundImage}
                    imageStyle={styles.transparentImage}
                >
                    <View style= {styles.header}>
                    {/* Hamburger Menu Icon to open Drawer */}
                    <TouchableOpacity
                        onPress={() => navigation.dispatch(DrawerActions.jumpTo('(tabs)', {screen:'index'}))}
                        style = {styles.iconContainer}>
                        <Entypo name="home" size={24} color="black" />
                    </TouchableOpacity>          
                    </View> 

                    <Text style={styles.aboutText}>About Us</Text>
                    <Text style={styles.aboutDescription}>
                        Welcome to CST GYM! Our mission is to empower individuals to achieve their fitness goals 
                        in a supportive and motivating environment. 
                        We are dedicated to helping you build a healthier, stronger you!
                    </Text>
                    <TouchableOpacity style={styles.seeMoreButton}>
                        <Text style={styles.seeMoreText}>See More</Text>
                    </TouchableOpacity>
                </ImageBackground>
            </View>

            {/* Team Section */}
            <View style={styles.teamSection}>
                <Text style={styles.teamTitle}>"Team Divides Task and Receives Success"</Text>
                <Text style={styles.developersTitle}>Developers</Text>
                <View style={styles.teamContainer}>
                    {["Aniket Powdel", "Miss Sonam Choden", "Sumith Adhikari", "Jimpa Jamtsho", "Thukten Singye"].map((name, index) => (
                        <View key={index} style={styles.member}>
                            <Image
                                source={{ uri: "https://via.placeholder.com/60" }} // replace with team member image URLs
                                style={styles.memberImage}
                            />
                            <Text style={styles.memberName}>{name}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "#f8f8f8",
    },
    aboutSection: {
        alignItems: "center",
        // marginTop: 40,
        width: "100%",
        // padding: 20,
    },
    backgroundImage: {
        width: "100%",
        height: 300,
        justifyContent: "center",
        alignItems: "center",
    },
    transparentImage: {
        opacity: 0.5, 
    },
    aboutText: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#284F76",
        position: "absolute",
        top: 50,
    },
    aboutDescription: {
        paddingTop: 30,
        textAlign: "center",
        marginVertical: 15,
        padding: 10,
        color: "#393939",
        fontSize: 17,
        fontFamily: "Cochin",
        fontWeight: "bold",
    },
    seeMoreButton: {
        backgroundColor: "#ffdd00",
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    seeMoreText: {
        color: "#333",
        fontWeight: "bold",
    },
    teamSection: {
        padding: 20,
    },
    teamTitle: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 18,
        fontStyle: "italic",
    },
    developersTitle: {
        textAlign: "center",
        fontSize: 20,
        marginVertical: 10,
        color: "#001B5F",
        fontWeight: 'bold'
    },
    teamContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
        marginTop: 10,
    },
    member: {
        alignItems: "center",
        margin: 20,
    },
    memberImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginBottom: 5,
    },
    memberName: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#000",
        textAlign: "center",
    },
    header: {
        position: "absolute",
        top: 40,
        left: 20,
        zIndex: 1,
    },
    iconContainer: {
        padding: 10,
        backgroundColor: "rgba(255, 255, 255, 0.5)", // Optional: add a transparent background to make the icon visible
        borderRadius: 25,
    },
});

export default AboutUs;