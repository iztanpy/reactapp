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
  ScrollView
} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Video} from 'expo-av';


export default function calibrationTutorial({route, navigation}) {
    const videoRef = useRef(null);
    const [status,setStatus] = useState({})

    return (
        <View style={styles.container}>
        <ScrollView>
            <Text style = {styles.text}>
                Hello, welcome to our calibration tutorial and thank you for using our app. Here, we will be going over how you can calibrate the app such that it works best for you. It is not absolutely necessary to calibrate but highly recommended since the default settings may not be optimal for you. If you have already read this before, feel free to go straight to calibration. {"\n"} {"\n"}
            </Text>
            
            <Text style = {styles.text}>

                1. Firstly get inside your vehicle and place your mobile device such that you are fully visible. An example is shown below.
            </Text>
            <Image style={styles.image} source = {require('../assets/placementdemo.png')}></Image>
            <Text style = {styles.text}>
                {"\n"}
                2. Next, hit the calibrate button on your device. However, you should ensure that your entire face is visible, including both your eyes and ears and the entirety of your head. A wrong example is shown below.
            </Text>
            <Image style={styles.image} source = {require('../assets/wrongexample.png')}></Image>
            <Text style = {styles.text}>
                {"\n"}
                3. During calibration itself, for the first 15 seconds, keep your eyes open as much as possible (try not to blink perhaps avoiding a windy area might help). During the second half of the calibration (the next 15 seconds), close your eyes
                fully. Do not worry about keeping track of time, there will be notifications via sound (once the process is complete) and messaging (to instruct you to close your eyes) to notify you when the calibration is done.
            </Text>

            <Video source = {require('../assets/calibrationDemo.mp4')}
            ref = {videoRef}
            useNativeControls
            resizeMode='contain'
            isLooping
            onPlaybackStatusUpdate = {status => setStatus(() => status)}
            style = {styles.video}
            ></Video>


        </ScrollView>
        </View>
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
    },
    video:{
        height:200,
        width:200
    }

})