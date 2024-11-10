import React from "react";
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const CustomDrawerContent = (props) => {
    const {navigation} = props;

    return ( 
        <DrawerContentScrollView {...props} contentContainerStyle = {styles.container}>
            {/* Close Button */}
            <TouchableOpacity onPress={()=> navigation.dispatch(DrawerActions.closeDrawer())} style={styles.closeButton}>
                <MaterialCommunityIcons name="close-thick" size={28} color="black" />            
            </TouchableOpacity>

            {/* Profile Section  */}
            <View style={styles.profileContainer}>
                <Ionicons name="person-circle" size={80} color="#FFD700" />
                    <Text style={styles.username}>Jimpa</Text>
                    <Text style={styles.email}>02210227.cst@rub.edu.bt</Text>
                <TouchableOpacity 
                    style={styles.manageProfileButton}
                    onPress={()=>navigation.dispatch(DrawerActions.jumpTo("screens/manageProfile"))}
                    >
                    <Text style={styles.manageProfileText}>Manage Profile</Text>
                </TouchableOpacity>
            </View>

            {/* Drawer Options */}
            <View style={styles.menuContainer}>
                <DrawerItem
                    label="About Us"
                    onPress={() => navigation.navigate('(tabs)', {screen:'aboutUs'})}
                    icon={() => 
                        // <Ionicons name="information-circle-outline" size={24} color="black" />
                        <Entypo name="info-with-circle" size={24} color="black" />
                    }
                    labelStyle={styles.menuItemLabel}
                />
                <View style={styles.logoutContainer}>
                    <DrawerItem
                        label="Log Out"
                        onPress={() => alert("Logged Out")}
                        icon={() => 
                            // <Ionicons name="log-out-outline" size={24} color="black" />
                            <MaterialCommunityIcons name="logout" size={24} color="black" />
                        }
                        labelStyle={styles.menuItemLabel}
                    />
                </View>
            </View>

        </DrawerContentScrollView>
    );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    closeButton: {
        alignSelf: "flex-start",
        margin: 20,
    },
    profileContainer: {
        alignItems: "center",
        margin: 10,
        padding: 20,
        // backgroundColor: "#F8F8F8",
        // borderBottomWidth: 1,
        // borderBottomColor: "#E0E0E0",
    },
    username: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 10,
    },
    email: {
        fontSize: 14,
        color: "gray",
        marginBottom: 10,
    },
    manageProfileButton: {
        backgroundColor: "#FFD700",
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 5,
        marginTop: 10
    },
    manageProfileText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 17
    },
    menuContainer: {
        paddingTop: 20,
        paddingLeft: 10
    },
    menuItemLabel: {
        fontSize: 17,
        fontWeight: "500",
        color: "#333333",
    },
    logoutContainer: {
        justifyContent: 'flex-end',
        borderTopColor: "#E0E0E0",
        marginTop: 10
    }
});