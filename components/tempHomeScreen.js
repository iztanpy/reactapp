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




export default function tempHomeScreen({ route, navigation }) {

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

 React.useEffect(
                () =>
                  navigation.addListener('beforeRemove', (e) => {
                    e.preventDefault();

                    Alert.alert(
                      'Exit App?',
                      'Going back on this screen will cause you to be logged out!',
                      [
                        { text: "Don't leave", style: 'cancel', onPress: () => {} },
                        {
                          text: 'Log Out',
                          style: 'destructive',
                          onPress: () => navigation.dispatch(e.data.action),
                        },
                      ]
                    );
                  }),
                  );
                  if (!fontsLoaded) {
                      return <AppLoading />;
                    } else {

    return (
    //        <Image style = {styles.bigLogo} source={require("../assets/logo2.png")} />

        <View style={styles.container}>


        <Text style = {styles.Headertext}> you are logged in as {name} </Text>

        <TouchableOpacity style = {styles.button1}
          onPress = {() => {
            navigation.navigate('Tutorial home page',{name:name})
          }}>
          
          <Text style = {styles.Maintext}>Tutorial</Text>
          <Text style = {styles.subtext}>Click here if its the first time using the app!</Text>
        </TouchableOpacity>

        <TouchableOpacity
                      style={styles.button2}
                      onPress = { () => {
                      navigation.navigate('calibration', {name: name})
                                                        }}>
                      <Text style = {styles.Maintext}>Calibration</Text>
                                <Text style = {styles.subtext}>Make the application more accurate</Text>
                                <Text style = {styles.subtext}>by spending 30s to calibrate before using!</Text>
                      </TouchableOpacity>

        <TouchableOpacity
                      style={styles.button3}
                      onPress = { () => {
                      navigation.navigate('camera',{name: name})
                                          }}>
                      <Text style = {styles.Maintext}>Start the application!</Text>
                                                      <Text style = {styles.subtext}>Remember to drive safe!</Text>
                      </TouchableOpacity>






        <TouchableOpacity
                              style={styles.button4}
                              onPress = { () => {
                              navigation.navigate('information', {name: name})
                                                                }}>
                              <Text style = {styles.Maintext}>Profile</Text>
                                        <Text style = {styles.subtext}>View and edit your profile here as well as  </Text>
                                        <Text style = {styles.subtext}>adding NOK information</Text>
                              </TouchableOpacity>
        </View>
        );}

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
    backgroundColor: "#0c8a06",
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

  button3 : {
      width: 350,
      borderRadius: 25,
      height: 120,
      alignItems: "flex-start",
      justifyContent: "center",
      marginTop: 20,
      backgroundColor: "#F05454",
      },


      button4 : {
            width: 350,
            borderRadius: 25,
            height: 120,
            alignItems: "flex-start",
            justifyContent: "center",
            marginTop: 20,
            backgroundColor: "#385a7c",
            },



  Headertext: {
    textAlign: "center",
    color : "black",
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