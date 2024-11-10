import React from "react";
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const CustomHeader = () => {
    const navigation = useNavigation();

    return (
        <View style= {styles.header}>
            {/* Hamburger Menu Icon to open Drawer */}
            <TouchableOpacity
                onPress={()=> navigation.dispatch(DrawerActions.openDrawer())}
                style = {styles.iconContainer}>
                <Ionicons name="menu" size={35} color="black"></Ionicons>
            </TouchableOpacity>          

            {/* Notification Icon */}
            <TouchableOpacity 
                onPress={()=> navigation.dispatch(DrawerActions.jumpTo('(tabs)', {screen:'notification'}))} 
                style = {styles.iconContainer}>
                <Ionicons name="notifications" size={30} color="black" />
            </TouchableOpacity>
        </View> 
    )
}

export default CustomHeader;

const styles = StyleSheet.create({

    header:{
        flexDirection: 'row',
        alignItems: 'center',
        padding : 10,
        marginTop: 50,
        justifyContent: 'space-between'
    },

    iconContainer: {
        marginHorizontal: 18 
    }
})
