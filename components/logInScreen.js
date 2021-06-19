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

import LoadingIcon from './LoadingIcon';


const axios = require('axios').default;



export default function loginScreen({ navigation }) {
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[iconAnimating, setIcon] = useState(false);


  return (
    <View style={styles.container}>
    <Image style={styles.image} source={require("../assets/logo2.png")} />
      <StatusBar style="auto" />
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

      <TouchableOpacity
      onPress = { () =>
                          navigation.navigate('tempForget')
                          }>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress = { () =>
                    navigation.navigate("signup")
                 }>
        <Text style={styles.signUp_button}>Sign up</Text>
      </TouchableOpacity>


      <TouchableOpacity
      onPress = {
                    async () =>
                    axios.post('https://glacial-springs-53214.herokuapp.com/login ',{
                    username: username,
                    password: password
                    })
                    .then(function (response) {
                    if (response.data === "login"){
                      showMessage({
                          message: "success!",
                          description: "You have been logged in successfully",
                          type: "success",
                                          })
                      navigation.navigate("Logged In");
                      }

                      else if(response.data === "incorrect password") {
                      showMessage({
                         message: "Incorrect password!",
                            description: "Click on this message to proceed to reset password",
                            type: "warning",
                            onPress : () => {navigation.navigate("tempForget")}
                      })
                      }

                      else {
                       showMessage({
                          message: "No user found!",
                          description: "Click on this message to proceed to create an account",
                          type: "warning",
                          onPress : () => {navigation.navigate("signup")}
                      })
                      }

                      })
                    .catch(function (error) {
                                    console.log(error);
                                    })}
      style={styles.loginBtn}
      >
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#30475E",
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

  forgot_button: {
    height: 20,
    marginBottom: 30,
  },

  signUp_button: {
      height: 20,
      marginBottom: 30,
    },

  loginBtn: {
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

