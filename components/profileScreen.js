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



export default function loginScreen({route, navigation}) {
  const {name} = route.params;
  const [email, setEmail] = useState("");
  const [username, setUser] = useState("");
  const [nokEmail, setNokEmail] = useState("");

  useEffect(() => {
                async function getUserInfo() {
                     axios.post('https://glacial-springs-53214.herokuapp.com/getInfo',{
                     username: {name},
                     })
                     .then(function (response) {
                        const email_nokEmail = response.split(',');
                        setEmail(email_nokEmail[0])
                        setNokEmail(email_nokEmail[1])

                     })
                     .catch(function (error) {
                        console.log(error);
                     })}

                getUserInfo();
               );


  return (
    <View style={styles.container}>
    <Image style={styles.image} source={require("../assets/logo2.png")} />
      <StatusBar style="auto" />

      <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholder = {name}
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
                placeholder="Next of Kin email..."
                placeholderTextColor="#003f5c"
                onChangeText={(nokEmail) => setNokEmail(nokEmail)}
              />
            </View>


      <TouchableOpacity
      onPress = {
                    async () =>
                    axios.post('https://glacial-springs-53214.herokuapp.com/updateInfo',{
                    name: {name},
                    username: username,
                    email: email,
                    nokEmail: nokEmail,
                    })
                    .then(function (response) {
                    if (response.data === "success"){
                      showMessage({
                          message: "success!",
                          description: "Your information has been updated successfully",
                          type: "success",
                                          })

                      navigation.navigate("Home", {name: username});
                      }

                      else if(response.data === "failure") {
                      showMessage({
                         message: "Whoops!",
                            description: "username or email has already been taken",
                            type: "warning",
                      })
                      }

                      })
                    .catch(function (error) {
                                    console.log(error);
                                    })}
      style={styles.loginBtn}
      >
        <Text>UPDATE PROFILE</Text>
      </TouchableOpacity>
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