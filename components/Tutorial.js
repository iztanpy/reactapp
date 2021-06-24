import { StatusBar } from "expo-status-bar";
import React, { useState,useEffect,useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


export default function calibrationTutorial({route, navigation}) {

    return (
        <ScrollView style = {styles.container}>
            <Text style = {styles.text}>
                Hello, welcome to our calibration tutorial and thank you for using our app. Here, we will be going over how you can calibrate the app such that it works best for you. It is not absolutely necessary to calibrate but highly recommended since the default settings may not be optimal for you. If you have already read this before, feel free to go straight to calibration.

                1. Firstly get inside your vehicle and place your mobile device such that you are fully visible. An example is shown below.
            </Text>
            <Image style={styles.image} source = {require('../assets/placementdemo.png')}></Image>
            <Text style = {styles.text}>
                2. Next, hit the calibrate button on your device. However, you should ensure that your entire face is visible, including both your eyes and ears and the entirety of your head. A wrong example is shown below.
            </Text>
            <Image style={styles.image} source = {require('../assets/wrongexample.png')}></Image>
            <Text style = {styles.text}>
                3. Next simulate being drowsy for 15 seconds.There will be a notification when the calibration is done. Note that you should not just close your eyes for the entirety of the duration otherwise the app may not be very sensitive to you falling asleep on the road! A suggestion of how you should simulate being drowsy is shown below. Note that you may calibrate in a manner that is representative of how your eyes would be when you begin to fall asleep! 
            </Text>


        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container:{
    backgroundColor: "#1abc9c",
    alignItems: "center",
    justifyContent: "center"
    },
    text:{
        fontSize:20
    },
    image:{
        height:150,
        width:150
    }

})