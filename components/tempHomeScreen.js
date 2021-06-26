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


export default function tempHomeScreen({ route, navigation }) {

const {name} = route.params;
//const {username} = route.params;
//console.log(JSON.stringify(username));

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
    return (

        <View style={styles.container}>
        <View style={styles.Menu}>
                    <TouchableOpacity activeOpacity = { .5 } onPress={ () => navigation.openDrawer()}>
                    <Image
                    style={styles.image}
                    source={require("../assets/tempmenu2.png")}
                    />
                    </TouchableOpacity>
        </View>

        <View style = {styles.content}>

                    <Image style = {styles.bigLogo} source={require("../assets/logo.png")}> 
                    </Image>

        <TouchableOpacity style = {styles.button}
          onPress = {() => {
            navigation.navigate('tutorial',{name:name})
          }}>
          
          <Text>Tutorial</Text>
        </TouchableOpacity>
        <TouchableOpacity
              style={styles.button}
              onPress = { () => {
              navigation.navigate('camera',{name: name})
                                  }}>
                <Text>Start app!</Text>
              </TouchableOpacity>

        <TouchableOpacity
                      style={styles.button}
                      onPress = { () => {
                      navigation.navigate('calibration', {name: name})
                                                        }}>
                        <Text>Calibrate</Text>
                      </TouchableOpacity>


        </View>


        </View>

        );

}


const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: "#1abc9c",
      alignItems: "center",
      justifyContent: "center",
    },

  Menu: {
    flex: 1,
    backgroundColor: "#1abc9c",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "row",
    width: 250,
    height: 250,
  },
  bigLogo: {
    width:300,
    height:420

  },

  content :{
  flex: 3,
  alignItems: "center",
  padding: 10,
  },

  image: {
    width: 100,
    height: 100
   },

  button: {
    width: 150,
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#F05454",
    },

  text: {
  color : "white",
  fontSize: 20,

  }

  })