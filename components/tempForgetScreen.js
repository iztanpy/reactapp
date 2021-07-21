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
  ActivityIndicator,
} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";

const axios = require('axios').default;


export default function ForgetScreen({ navigation }) {
    const [email, setEmail] = useState("");

    return (
        <View style={styles.container}>
        <View style={styles.inputView}>
                <TextInput
                  style={styles.TextInput}
                  placeholder="Enter your email here!"
                  placeholderTextColor="#003f5c"
                  onChangeText={(email) => setEmail(email)}
                />
              </View>

              <TouchableOpacity
                            onPress = {
                            //post to axios, check database if the details exist, if yes, continue to next page, if no, produce message warning that no such email was found
                            async () =>{
                               console.log(email);
                               axios.post('https://glacial-springs-53214.herokuapp.com/checkEmail',
                               {email: email})

                               .then(function (response) {
                                  console.log(response.data)
                                  if (response.data === "valid"){
                                  showMessage({
                                   message: "Email has been sent",
                                   description: "An email with your details has been sent to the email address",
                                   type: "success"
                                             })}

                                  else {

                                  showMessage({
                                                           message: "Email does not exist",
                                                              description: "Create an account with us first!",
                                                              type: "warning"
                                  })}
                                  })
                                  .catch(function (error) {
                                  console.log(error);
                                  })}}

                            style={styles.Btn}>
                                          <Text>Whats My Password?</Text>
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

      Btn: {
          width: "80%",
          borderRadius: 25,
          height: 50,
          alignItems: "center",
          justifyContent: "center",
          marginTop: 40,
          backgroundColor: "#F05454",
        },


  })