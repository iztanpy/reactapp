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
                Hello, welcome to our calibration tutorial!
                </Text>
                <Text style= {styles.contenttext}>
                In the next few pages, we will be going over how you can calibrate the app such that it works best for you </Text>

                <TouchableOpacity style = {styles.button1}
                          onPress = {() => {
                            navigation.navigate('Calibration Tutorial 2', {name:name})
                          }}>

                          <Text style = {styles.buttontext}>Tutorial next page!</Text>

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
        fontSize: 20,
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

