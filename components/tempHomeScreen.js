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
console.log(name)

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

                    <Text style = {styles.text}> Hi {JSON.stringify(name)} !
                    You can click the menu button on the top left to access all the features of the application,
                    or click the button below to launch the app!
                    </Text>


        <TouchableOpacity
              style={styles.button}
              onPress = { () => {
              console.log(name)
              navigation.navigate('camera',{name: name})
                                  }}>
                <Text>Start app!</Text>
              </TouchableOpacity>

        <TouchableOpacity
                      style={styles.button}
                      onPress = { () => navigation.navigate('calibration', {name: name})
                                                        }>
                        <Text>Calibrate</Text>
                      </TouchableOpacity>


        </View>


        </View>

        );

}


const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: "#30475E",
      alignItems: "flex-start",
      justifyContent: "center",
    },

  Menu: {
    flex: 1,
    backgroundColor: "#30475E",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "row",
    width: 250,
    height: 250,
  },

  content :{
  flex: 3,
  alignItems: "center",
  padding: 30,
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
    marginTop: 40,
    backgroundColor: "#F05454",
    },

  text: {
  color : "white",
  fontSize: 20,

  }

  })