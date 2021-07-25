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
import AppLoading from 'expo-app-loading';
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




export default function TutorialHomePage({ route, navigation }) {

const {name} = route.params;
//const {username} = route.params;
//console.log(JSON.stringify(username));
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
    //        <Image style = {styles.bigLogo} source={require("../assets/logo2.png")} />

        <View style={styles.container}>

     

        <TouchableOpacity style = {styles.button1}
          onPress = {() => {
            navigation.navigate('Calibration Tutorial 1',{name:name})
          }}>
          
          <Text style = {styles.Maintext}>Calibration tutorial</Text>
          <Text style = {styles.subtext}>Click here to learn how to calibrate </Text>
          <Text style = {styles.subtext}>the app to you personally!</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button2}
            onPress = { () => {
            navigation.navigate('Profile Tutorial', {name: name})}}>
            <Text style = {styles.Maintext}>Profile guide</Text>
            <Text style = {styles.subtext}>Click here to learn how to set</Text>
            <Text style = {styles.subtext}>up your profile including a next</Text>
            <Text style = {styles.subtext}>of kin!</Text>
                                
            </TouchableOpacity>

        
        </View>

        )
        
    }

}


const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: "#fffdd0",
      alignItems: "center",
      justifyContent: "center",
    },


  bigLogo: {
      height: 200,
      width: 350,
      marginBottom: 30,
      },

  content :{

  alignItems: "center",
  padding: 10,
  },

  button1: {
    width: 350,
    borderRadius: 25,
    height: 120,
    alignItems: "flex-start",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#7d5fff",
    },

  button2: {
      width: 350,
      borderRadius: 25,
      height: 120,
      alignItems: "flex-start",
      justifyContent: "center",
      marginTop: 20,
      backgroundColor: "#ebb734",
      },

      button3: {
        width: 350,
        borderRadius: 25,
        height: 120,
        alignItems: "flex-start",
        justifyContent: "center",
        marginTop: 20,
        backgroundColor: "#7efff5",
        },

  

  Headertext: {
    textAlign: "center",
    color : "white",
    fontSize: 15,
    fontFamily: 'Inter_600SemiBold',
    },


  Maintext: {
  textAlign: "center",
  color : "black",
  fontFamily: 'Inter_800ExtraBold',
  fontSize: 25,
  left: 25 ,
  bottom:10,


  },
  subtext: {
    textAlign: "center",
    color : "black",
    fontFamily: 'Inter_300Light',
    fontSize: 15,
    left: 25 ,


    }

  })