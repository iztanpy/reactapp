
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
  Platform,LogBox
} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Camera } from 'expo-camera';
import { Audio } from 'expo-av';
import { showMessage, hideMessage } from "react-native-flash-message";
import * as Location from 'expo-location'

LogBox.ignoreAllLogs()
const axios = require('axios').default;

export default function SleepDetector({route, navigation}) {

  const platform = Platform.OS;
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [disableCalibration, setDisable] = useState(false);
  const cameraRef = useRef(null)
  const [sound, setSound] = React.useState();
  const [record, setRecord] = useState(false);
  const {name} = route.params;

  let count = 0;
  


  let item;
  axios.post('https://glacial-springs-53214.herokuapp.com/get_value',{name:name})
  .then(function(response){item = parseFloat(response.data);
  console.log(item);})
  .catch(function(error) {})

  async function playSound() {
        const { sound } = await Audio.Sound.createAsync(
           require('../assets/sounds/alarm2.mp3')
        );
        setSound(sound);
        await sound.playAsync();
        };

  React.useEffect(() => {
        return sound
          ? () => {
              sound.unloadAsync();}
          : undefined;
      }, [sound]);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }


    })();
  }, []);



  useEffect(() => {
              async function sendData() {
                
                if(cameraRef && record) {
                  await cameraRef.current.takePictureAsync({ onPictureSaved: onPictureSaved, base64: true}).
                    catch(function(err) {
                    console.log(err);
                    });
                    setTimeout(() =>{
                      sendData();
                    },3500)

                }
                
              }
              sendData();
             }, [record]);

 
               
                 

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const onPictureSaved =async (photo) => {
          console.log(platform);
          await axios.post("https://glacial-springs-53214.herokuapp.com/video_player/" + name, {picture: photo,platform:platform})
          .then (async function (response) {
            if (parseFloat(response.data) < item) {
              console.log(response.data)
              console.log('yes');
              count++;
              console.log(count);
              if(count > 0 && count % 10 == 0){
                const location = await Location.getCurrentPositionAsync({}).then((location) => {
                  axios.post("https://glacial-springs-53214.herokuapp.com/send_location",{username:name,
                  latitude: JSON.stringify(location.coords.latitude)
                  ,longitude: JSON.stringify(location.coords.longitude)})
                  .then(function (response) {
                  console.log(response.data)
                  if(response.data === 'sent email') {
                  showMessage({message:'Sent an email to your next of kin',description:'Your next of kin has been notified of your current location'})
                  }
                  
                }).catch(function (error) {
                  console.log(error);
                });
                
                })

              }
              playSound();
              
              
          }
          else{
            console.log(response.data);            
            console.log(record);
          };}
          )
          .catch(function (error) {
          })
          }

  if (!record) {
   return <View style={styles.guardContainer}>
                                                                   <TouchableOpacity
                                                                     style={styles.guardButton}
                                                                     onPress={() => {
                                                                       setRecord(true);
                                                                       }
                                                                     }>
                                                                     <Text style={styles.text}> Start Camera</Text>
                                                                   </TouchableOpacity>
                                                                 </View>
  }

  return (
             <View style={styles.container}>
               <Camera style = {styles.camera} type={type} ratio = {"16:9"}
               ref={cameraRef}
               >
               <View style={styles.buttonContainer}>
                         <TouchableOpacity style={styles.button}
                            onPress={() => {
                            setRecord(false);
                            console.log(record);
                         }}>
                           <Text style= {styles.text}>STOP</Text>
                         </TouchableOpacity>
                       </View>
               </Camera>
             </View>
           );
         }
 //   <TouchableOpacity style={styles.button} onPress={() => {
//                               playSound();
//                               }}>
//                               <Text>playSound</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity style={styles.button} onPress={() => {
//                                                           playSound();
//                                                         }}>
//                                                           <Text>playSound</Text>
//                                                         </TouchableOpacity>

//                         <TouchableOpacity
//                           style={styles.button}
//                           onPress={() => {
//                           showMessage({
//                              message: "Recording in progress",
//                              description: "Please do not click the start button again",
//                              type: "warning",
//                              })
//                             setRecord(true);
//                             }
//                           }>
//                           <Text style={styles.text}> Calibrate </Text>
//                         </TouchableOpacity>

//                  setDisable(!disableCalibration);
//                  record = true
//                  if (cameraRef) {
//                     while(record){
//
//                     await cameraRef.current.takePictureAsync({onPictureSaved: onPictureSaved,base64: true}).
//                     catch(function(err) {
//                       console.log(err);
//                     });
//
//                     setTimeout(() => {},500);
//
//                    }
//                  }
//                  }}>
//                  <Text style={styles.text}> Start </Text>
//                </TouchableOpacity>
//
//                <TouchableOpacity
//                style={styles.button}
//                disabled = {!disableCalibration}
//                onPress={() => {
//                  sound.unloadAsync();
//                  setDisable(!disableCalibration)
//                  record = false;
//                }}>
//                  <Text style={styles.text}>Stop</Text>
//                </TouchableOpacity>
//
//                <TouchableOpacity style={styles.button} onPress={() => {
//                                                                  playSound();
//                                                                }}>
//                                                                  <Text>playSound</Text>
//                                                                </TouchableOpacity>
//
//              </View>
//      </Camera>
//    </View>
//  );
//}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffdd0",
  },

  guardContainer: {
    flex:1,
    backgroundColor: "#fffdd0",
    alignItems: "center",
    justifyContent: "center",

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
      justifyContent: 'space-between',
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
   guardButton: {
         borderRadius: 25,
         width: 150,
         height: 50,
         marginTop: 40,
         alignSelf: 'center',
         alignItems: 'center',
         justifyContent: 'center',
         backgroundColor: "#F05454"
      },
   text: {
      fontSize: 18,
      color: 'white',
   },


})