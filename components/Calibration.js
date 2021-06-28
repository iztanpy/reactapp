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
  Dimensions,
} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Camera } from 'expo-camera';
import { showMessage } from "react-native-flash-message";



const axios = require('axios').default;

export default function Calibration({route, navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const cameraRef = useRef(null)

  const {name} = route.params;
  

  
  

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const onPictureSaved = photo => {
          
          axios.post("https://glacial-springs-53214.herokuapp.com/calibration", {picture: photo,
        name: name,
    final:'false'})
          .then (function (response) {
          console.log('in progress')
          console.log(name)
          console.log(response.data);}
          )
          .catch(function (error) {
          })
          }

    const finalPicture = photo => {
      setTimeout(() => {},800);
        axios.post("https://glacial-springs-53214.herokuapp.com/calibration",{picture:photo, name:name, final:'true'}).then(function(response) {
            console.log(response.data);
            showMessage({message:"Success! Calibration complete",description:"The app is now tailored specifically for you!" });
        }).catch(function (error) {
            console.log(error)
        })
    }

  return (
    <View style={styles.container}>
      <Camera style = {styles.camera} type={type} ratio = {"16:9"}
      ref={cameraRef}
      >
      <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={async () => {
                  showMessage({message:"Calibration starting",description:"Please hold still for about 30 seconds :)", type: "warning"})
                 
                  if (cameraRef) {

                    await axios.post("https://glacial-springs-53214.herokuapp.com/clear",{}).then(function (response){
                      console.log('cleared')
                      console.log(response.data)
                    }).catch(function(err) {
                      console.log(err)
                    })
                    setTimeout(() => {}, 2300);
                    let i = 0;
                    function sendData() {
    
                
                      if(cameraRef && i < 14) {
                        i++;
                        cameraRef.current.takePictureAsync({ onPictureSaved: onPictureSaved, base64: true}).
                          catch(function(err) {
                          console.log(err);
                          });
                          setTimeout(() =>{
                            sendData();
                          },2000)
                  
                      }
                      else if (cameraRef && i >= 14) {
                         cameraRef.current.takePictureAsync({onPictureSaved: finalPicture,base64: true})
                        .then(async function (response){
                          console.log('done');
                          
                        })
                        .catch(function(err) {
                          console.log('in final loop');
                            console.log(err);
                        });                       

                      }
                    }
                    sendData();

                     //while(Date.now() - curr < 15000){
                    // await cameraRef.current.takePictureAsync({base64: true})
                //     .then(function(response) {
               //        onPictureSaved(response)
              //       })
             //        .catch(function(err) {
            //           console.log(err);
             //        });

                     
                     
                    
                   
                  }
                  }
                }>
                  <Text style={styles.text}> Calibrate </Text>
                </TouchableOpacity>

                
              </View>
      </Camera>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222831",
  },

  camera: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width*16/9
  },

   buttonContainer: {
      flex: 1,
      backgroundColor: 'transparent',
      flexDirection: 'row',
      margin: 20,
      justifyContent: 'space-between'
   },

   button: {
         borderRadius: 25,
         width: 150,
         height: 50,
         marginTop: 40,
         alignSelf: 'flex-end',
         alignItems: 'center',
         justifyContent: 'center',
         backgroundColor: "#F05454"
      },

   text: {
      fontSize: 18,
      color: 'white',
   },

})


