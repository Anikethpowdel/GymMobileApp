import { useEffect } from 'react';
import {Dimensions, Platform, StyleSheet} from 'react-native';


// Get the screen dimesion 
const {width: screenwidth, height: screenHeight} = Dimensions.get('screen');

// Calculate relative dimesion
const horizontalPadding = screenwidth * 0.05;
const marginHorizontal = screenwidth * 0.08;
const marginTop = screenHeight * 0.12;

const styles = StyleSheet.create({

    headerContent: {
        padding: horizontalPadding,
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
        backgroundColor: '#FFF',
        borderRadius: 8,
        marginTop: marginTop,
        marginHorizontal: marginHorizontal,

        ...Platform.select({
            ios: {
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
            },
            android: {
              elevation: 2,
            }
        }),
        // Minimum and maximum constraints
        minHeight: screenHeight * 0.15, // Minimum height of 15% of screen height
        maxWidth: 600, // Maximum width for larger devices
        width: screenwidth - (marginHorizontal * 2), // Responsive width
      },
});

// Handler Orientation 
useEffect(()=>{
    const onChange = ()=>{
        const {width, height} = Dimensions.get('screen');
    };

    const subscription = Dimensions.addEventListener('change', onChange);
    return ()=> subscription?.remove();

}, []);
