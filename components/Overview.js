import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
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



export default function Tutorial1({route, navigation}) {
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
const {name} = route.params;
if (!fontsLoaded) {
                      return <AppLoading />;
                    } else {

    return (
        <View style={styles.container}>

            <Text style= {styles.headertext}>
                Hello, welcome to our app overview! We shall look step by step what happens as you use our app
                </Text>
                <Text style= {styles.contenttext}>
               1.First, when you start our app, your image is captured every 2 seconds. Your image is then converted to a base64 string (basically translating a photo to something a computer can understand) and sent to a backend server. {"\n"}
               2.Next this base64 string is coverted back to a photo in the server. This photo is analysed and a number known as EAR (eye aspect ratio which is higher when eyes are open and lower when eyes are closed). This ear is then stored. {"\n"}
               3. The backend keeps track of the most recent frames and computes the average EAR of these frames. If the value is below the calibrated threshold or the default if the user has not calibrated, it would be determined that the user is sleepy and the alarm would sound off. {"\n"}
               4. If the user is awakened by the alarm and opens his/her eyes, the average EAR would go back above the threshold and the alarm would stop sounding.</Text>

                <TouchableOpacity style = {styles.button1}
                          onPress = {() => {
                            navigation.navigate('Tutorial home page', {name:name})
                          }}>

                          <Text style = {styles.buttontext}>Go back</Text>

                        </TouchableOpacity>
            </View>
    )}
    }



const styles = StyleSheet.create({
    container:{
    flex: 1,
    backgroundColor: "#fffdd0",
    alignItems: "center",
    justifyContent: "center"
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

   headertext: {
    textAlign: "center",
    color : "#7d0a15",
    bottom: 50,
    fontSize: 30,
    fontFamily: 'Inter_900Black',
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
            fontSize: 30,
            fontFamily: 'Inter_800ExtraBold',
            },
    })