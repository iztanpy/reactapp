import { StatusBar } from "expo-status-bar";
import React, { useState,useEffect,useRef } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FlashMessage from "react-native-flash-message";
import {
  useFonts,
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from '@expo-google-fonts/inter';
import AppLoading from 'expo-app-loading';
import {Video} from 'expo-av';

export default function Tutorial1({route, navigation}) {
const videoRef = useRef(null);
    const [status,setStatus] = useState({});
    const {name} = route.params;
let [fontsLoaded] = useFonts({
                          Inter_100Thin,
                          Inter_200ExtraLight,
                          Inter_300Light,
                          Inter_400Regular,
                          Inter_500Medium,
                          Inter_600SemiBold,
                          Inter_700Bold,
                          Inter_800ExtraBold,
                          Inter_900Black,
                        });
if (!fontsLoaded) {
                      return <AppLoading />;
                    } else {

    return (
        <View style={styles.container}>

            <Text style = {styles.contenttext}>
                           During calibration itself, during the first 15 seconds, keep your eyes open as much as possible (try not to blink).
                           During the second half of the calibration (the next 15 seconds), close your eyes fully.
                           Do not worry about keeping track of time, there will be notifications via sound (once the process is complete) and messaging (to instruct you to close your eyes) to notify you when the calibration is done.
                        </Text>

                        <Video source = {require('../assets/calibrationDemo.mp4')}
                        ref = {videoRef}
                        useNativeControls
                        resizeMode='contain'
                        isLooping
                        onPlaybackStatusUpdate = {status => setStatus(() => status)}
                        style = {styles.video}
                        ></Video>

                        <Text style = {styles.boldcontenttext}>
                        Now click on the button below to calibrate!
                                                </Text>
                                                <TouchableOpacity style = {styles.button1}
                                                 onPress = {() => {
                                                        navigation.navigate('calibration', {name:name})
                                                 }}>

                                                <Text style = {styles.buttontext}>calibrate here!</Text>
                                                                        </TouchableOpacity>

            </View>
    )}
    }



const styles = StyleSheet.create({
    container:{
    flex: 1,
    backgroundColor: "#1abc9c",
    alignItems: "center",
    justifyContent: "center"
    },

    video:{
            height:300,
            width:300
        },
        button1: {
                width: 250,
                borderRadius: 25,
                height: 70,
                alignItems: "center",
                justifyContent: "center",
                marginTop: 20,
                backgroundColor: "#0c8a06",
                },



    contenttext: {
        textAlign: "center",
        color : "black",
        fontSize: 15,
        padding: 15,
        fontFamily: 'Inter_500Medium',
        },

        buttontext: {
                textAlign: "center",
                color : "white",
                fontSize: 20,
                padding: 15,
                fontFamily: 'Inter_500Medium',
                },



    boldcontenttext: {
            textAlign: "center",
            color : "black",
            fontSize: 20,
            fontFamily: 'Inter_800ExtraBold',
            },


                image:{
                    height:200,
                    width:200
                },

    })

