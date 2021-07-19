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
  ActivityIndicator, KeyboardAvoidingView,Alert
} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";
import DialogInput from "react-native-dialog-input";

import LoadingIcon from './LoadingIcon';


const axios = require('axios').default;



export default function nok({route, navigation}) {
  const {name} = route.params;
  const [email, setEmail] = useState("");
  const [username, setUser] = useState("");
  const [nokEmail, setNokEmail] = useState("");
  const [password,setPassword] = useState("")
  const [dialogVisibility,setDialogVisibility] = useState(false)

  const [forDisplayNokEmail,setForDisplayNokEmail] = useState("");
  const [verificationStatus,setVerificationStatus] = useState("");
  

  useEffect(() => {
                async function getUserInfo() {
                     axios.post('https://glacial-springs-53214.herokuapp.com/getInfoNok',{
                     username: name,
                     })
                     .then(function (response) {
                         if (response.data === 'nothing') {
                             setForDisplayNokEmail('Enter nok email here!')
                         }
                        else {
                        const nok_status = response.data.split(',');
                        
                        setForDisplayNokEmail(nok_status[0])
                        setVerificationStatus(nok_status[1])
                        }
                        

                     })
                     .catch(function (error) {
                        console.log(error);
                     })}

                getUserInfo();
                    }
               )


  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS == "ios" ? "padding" : "height"}>
    <Image style={styles.image} source={require("../assets/logo2.png")} />
      <StatusBar style="auto" />

    <Text>{verificationStatus} </Text>



      <KeyboardAvoidingView style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholder= {forDisplayNokEmail}
                placeholderTextColor="#003f5c"
                onChangeText={(nokEmail) => setNokEmail(nokEmail)}
              />
            </KeyboardAvoidingView>

            <DialogInput isDialogVisible={dialogVisibility}
                title={"Verify email address"}
                message={"Please enter the 6 digit code sent to " + forDisplayNokEmail.split(" ")[forDisplayNokEmail.split(" ").length - 1]}
                hintInput ={"Enter code..."}
                submitInput={ (inputText) => {
                    axios.post('https://glacial-springs-53214.herokuapp.com/verify_nok',{input:inputText,
                name:name}).then((response) => {
                    console.log(response.data);
                    if(response.data === 'Success') {
                        navigation.navigate('information',{name:name})
                        setDialogVisibility(false);
                    } else {
                        showMessage({message:'Wrong Code',description:'You have entered an incorrect code please try again'})
                    }
                })
                } }
                closeDialog={ () => {setDialogVisibility(false)}}>
            </DialogInput>

     


      <TouchableOpacity
      onPress = {
                    async () =>
                    {
                    console.log(nokEmail);
                    axios.post('https://glacial-springs-53214.herokuapp.com/add_nok',{
                    name: name,
                    
                    email: nokEmail,
                    })
                    .then(function (response) {
                      console.log(response.data)
                    if (response.data === "success"){
                      showMessage({
                          message: "Success!",
                          description: "Your information has been updated successfully, now click on verify and key in the code in your NOK email!",
                          type: "success",
                                          })
                          setDialogVisibility(true)
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
                                    console.log(nokEmail);
                                   
                                    })}
                                  }
      style={styles.loginBtn}
      >
        <Text>UPDATE NEXT OF KIN</Text>

      </TouchableOpacity>


            <TouchableOpacity style = {styles.loginBtn} onPress = {() => {
                if(verificationStatus ==='You have already verified the next of kin email') {
                    showMessage({message:'Alert',description:'You have already verified this email!',type:'Warning'})
                } else if (forDisplayNokEmail === 'You have not yet set up a next of kin. Please enter a valid email address below in order to set up.' ) {
                    showMessage({message:'Alert',description:'You have not set up an email address as your Next of Kin. Please do so first.'})

                } else {
                    setDialogVisibility(true)

                }
            }}>
                <Text>VERIFY NOK EMAIL ADDRESS </Text>
            </TouchableOpacity>
    


<TouchableOpacity style = {styles.loginBtn} onPress = {() => {
   if (forDisplayNokEmail === 'You have not yet set up a next of kin. Please enter a valid email address below in order to set up.' ) {
      showMessage({message:'Alert',description:'There is no next of kin to delete!'})

  } else {
      return Alert.alert("Are you sure you want to delete your next of kin contact?","Deleting your next of kin email would mean that this person would no longer be updated of your location when you fall asleep on the road.",[{text:'Yes',onPress: () => {
        axios.post('https://glacial-springs-53214.herokuapp.com/delete_nok',{name:name})
        .then(response => {
          if(response.data === 'deleted') {
            showMessage({message:'Next of kin email successfully deleted'});
            navigation.navigate('information',{name:name})
          }
        }).catch(err => {})
      }},{text:'No',onPress:() => {}}])

  }
}}>
  <Text>DELETE NOK</Text>
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