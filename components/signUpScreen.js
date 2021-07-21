import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
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
import { showMessage, hideMessage } from "react-native-flash-message";

const axios = require('axios').default;



export default function signupScreen({navigation}) {
  const [username, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnfmPassword,setCnfmPassword] = useState("");

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Username..."
          placeholderTextColor="#003f5c"
          onChangeText={(username) => setUser(username)}
        />
      </View>

      <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholder="Email..."
                placeholderTextColor="#003f5c"
                onChangeText={(email) => setEmail(email)}
              />
            </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password..."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
        style={styles.TextInput}
        placeholder="Confirm Password..."
        placeholderTextColor="#003f5c"
        secureTextEntry={true}
        onChangeText={(cnfmPassword) => setCnfmPassword(cnfmPassword)}
      />
      </View>

      <TouchableOpacity
      onPress = {
              async () => {
              if (password === cnfmPassword) {
              axios.post('https://glacial-springs-53214.herokuapp.com/processing',{
              username: username,
              password: password,
              email: email,
              })
              .then(function (response) {
                  if (response.data === "success") {
                  // show success message, redirect to log in page
                    showMessage({
                      message: "success!",
                      description: "You have been signed up successfully",
                      type: "success",
                    })
                    navigation.navigate('login')
                    ;}

                  else {
                  // show failure message, allow user to retry sign up
                    showMessage({
                        message: "failure :(",
                        description: "the username has been taken or was invalid!",
                        type: "failure",

                  })}
                  }
                )
              .catch(function (error) {
              console.log(error);
              })}
              else {
                showMessage({
                  message: "Error ",
                  description: "The passwords you entered do not match. Please try again",
                  type: "failure",

            })

              }
            }
            
            }
              style={styles.signupBtn}
              >
        <Text>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffdd0",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    marginBottom: 40,
  },

  inputView: {
    backgroundColor: "#DDDDDD",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "flex-start",
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },


  signupBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#F05454",
  },

  image: {
  height: 130,
  width: 230,
  marginBottom: 30,
  }
});

