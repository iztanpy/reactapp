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

export default function ProfileTutorial2({route, navigation}) {
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

            <Text style = {styles.contenttext}>

                            1. To change your own personal details such as username and email, click on the profile button on the home screen and go to personal information. There, you will see 3 boxes with the first one being for your username (your existing one will be shown) the second one being your email (your existing one will be shown) and lastly password. In order to change either your email or password simply enter your new one and click on the respective button to change it. If the username/email is not already taken, you will receive a success message else your change will fail and you will be notified. 
                        </Text>
                        
                        <Text style = {styles.contenttext}>
                            2. The next of kin email is to allow us to notify this person of your whereabouts in the event that you are drowsy on the road for too long. In order to set up, you have to enter the email address of this person and click on add. A verification code will be sent to this email address and you have to get it from this person and then enter it after hitting the verify next of kin button. If correct, this person will be added as your next of kin and will receive your location updates if necessary.
                        </Text>
                        
                        <TouchableOpacity style = {styles.button1}
                                                  onPress = {() => {
                                                    navigation.navigate('information', {name:name})
                                                  }}>

                                                  <Text style = {styles.buttontext}>Click here to set up NOK/Change profile</Text>
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


                image:{
                    height:200,
                    width:200
                },

    })

