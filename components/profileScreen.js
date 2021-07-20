import { StatusBar } from "expo-status-bar";
import React, { useState,useEffect,useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  ActivityIndicator, KeyboardAvoidingView
} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";

import LoadingIcon from './LoadingIcon';


const axios = require('axios').default;



export default function profileScreen({route, navigation}) {
  const {name} = route.params;
  const [email, setEmail] = useState("");
  const [username, setUser] = useState("");
  const [nokEmail, setNokEmail] = useState("");
  const [password,setPassword] = useState("")

  const [forDisplayUsername,setForDisplayUsername] = useState("");
  const [forDisplayEmail,setForDisplayEmail] = useState("");

  useEffect(() => {
                async function getUserInfo() {
                     axios.post('https://glacial-springs-53214.herokuapp.com/getInfoPersonal',{
                     username: name,
                     })
                     .then(function (response) {
                        const email_Username = response.data.split(',');
                        
                        setForDisplayUsername(email_Username[1])
                        setForDisplayEmail(email_Username[0])
                        

                     })
                     .catch(function (error) {
                        console.log(error);
                     })}

                getUserInfo();
                    }
               ,[])


  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS == "ios" ? "padding" : "height"}>
    <Image style={styles.image} source={require("../assets/logo2.png")} />
    <Text style={styles.text}> Leave the fields which you dont want to update empty and hit enter when youre done updating!</Text>
      <StatusBar style="auto" />
      <KeyboardAvoidingView style={styles.inputView}
      >
              <TextInput
                style={styles.TextInput}
                placeholder = {forDisplayUsername}
                placeholderTextColor="#003f5c"
                onChangeText={(username) => setUser(username)}
              />
            </KeyboardAvoidingView>

      <KeyboardAvoidingView style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder={forDisplayEmail}
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        />
      </KeyboardAvoidingView>


      


      <KeyboardAvoidingView style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Enter your account password..."
          placeholderTextColor="#003f5c"
          onChangeText={(password) => setPassword(password)}
        />
      </KeyboardAvoidingView>

      <TouchableOpacity
      onPress = {
                async () =>{
                    if(password ==='') {
                      showMessage({message:"Please enter your password",type:'Warning'})
                  }
                  
                  else {
                  const response = await axios.post('https://glacial-springs-53214.herokuapp.com/login',{username:name,
                password:password})
                  if(username === ''){
                    showMessage({message:"Please enter a new username",description:"You have not entered a username."})
                  }
                    
                  else if(response.data === 'login') {
                    axios.post('https://glacial-springs-53214.herokuapp.com/updateInfoName',{
                    name: name,
                    username: username,
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
                            description: "Username has already been taken",
                            type: "warning",
                      })
                      }

                      })
                    .catch(function (error) {
                                    console.log(error);
                                    })
                                  }
                    else if(response.data === "incorrect password") {
                      showMessage({message: "Wrong password", description: "Please try again",type:'danger'})
                    }
                                  }
                  
                                }
                  }
                                  
      style={styles.loginBtn}
      >
        <Text>UPDATE USERNAME</Text>
      </TouchableOpacity>

      <TouchableOpacity
      onPress = {
                    async () =>{
                    if(password ==='') {
                      showMessage({message:"Please enter your password",type:'Warning'})
                    }
                  else {
                  const response = await axios.post('https://glacial-springs-53214.herokuapp.com/login',{username:name,
                password:password})

                    if(email === '') {
                      showMessage({message:'Please enter an email address',description:'You have not entered anything in the email field'})

                    }
                    
                   else if(response.data === 'login') {
                    axios.post('https://glacial-springs-53214.herokuapp.com/updateInfoEmail',{
                    name: name,
                    
                    email: email,
                    
                   
                    })
                    .then(function (response) {
                    if (response.data === "success"){
                      showMessage({
                          message: "success!",
                          description: "Your email has been updated successfully",
                          type: "success",
                                          })

                      navigation.navigate("Home", {name: name});
                      }

                      else if(response.data === "failure") {
                      showMessage({
                         message: "Whoops!",
                            description: "Email has already been taken",
                            type: "warning",
                      })
                      }

                      })
                    .catch(function (error) {
                                    console.log(error);
                          } )
                      }
                    else if(response.data === "incorrect password") {
                      showMessage({message: "Wrong password", description: "Please try again",type:'danger'})
                    }
                                  }
                  
                                }
                  }
                                  
      style={styles.loginBtn}
      >
        <Text>UPDATE EMAIL</Text>
      </TouchableOpacity>

      
    </KeyboardAvoidingView>
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

  text: {
      padding: 20,
      marginBottom: 20,
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
    marginTop: 10,
    marginBottom:20,
    backgroundColor: "#F05454",
  },

  image: {
  height: 130,
  width: 230,
  marginBottom: 30,
  }
});


//<TouchableOpacity
//            onPress = {
//                      async () =>{
//                          if(password ==='') {
//                            showMessage({message:"Please enter your password",type:'Warning'})
//                        }
//
//                        else {
//                        const response = await axios.post('https://glacial-springs-53214.herokuapp.com/login',{username:name,
//                      password:password})
//
//                        if(response.data === 'login') {
//                          axios.post('https://glacial-springs-53214.herokuapp.com/updateInfo',{
//                          name: name,
//                          username: username,
//                          email: email,
//                          })
//                          .then(function (response) {
//                          console.log(response.data);
//                          if (response.data === "success"){
//                            showMessage({
//                                message: "success!",
//                                description: "Your information has been updated successfully",
//                                type: "success",
//                                                })
//                            if (username === "") {
//                                username = name;
//                            }
//                                navigation.navigate("Home",{name:name} );
//
//                            }
//
//                            else if(response.data === "Emailfailure") {
//                            showMessage({
//                               message: "Whoops!",
//                                  description: "Email has already been taken",
//                                  type: "warning",
//                            })
//                            }
//
//                            else if(response.data === "Namefailure") {
//                            showMessage({
//                                message: "Whoops!",
//                                description: "Name has already been taken",
//                                type: "warning",
//                            })
//                            }
//
//
//                            })
//                          .catch(function (error) {
//                                          console.log(error);
//                                          })
//                                        }
//                          else if(response.data === "incorrect password") {
//                            showMessage({message: "Wrong password", description: "Please try again",type:'danger'})
//                          }
//                                        }
//
//                                      }
//                        }
//
//            style={styles.loginBtn}
//            >
//              <Text>UPDATE BOth</Text>
//            </TouchableOpacity>
//
//