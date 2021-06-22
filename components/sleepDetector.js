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
import { Audio } from 'expo-av';
import { showMessage, hideMessage } from "react-native-flash-message";


const axios = require('axios').default;

export default function SleepDetector({route, navigation}) {

  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [disableCalibration, setDisable] = useState(false);
  const cameraRef = useRef(null)
  const [sound, setSound] = React.useState();
  const [record, setRecord] = useState(false);

  const {name} = route.params;



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
              async function sendData() {
                while(record){
                   if(cameraRef) {
                      await cameraRef.current.takePictureAsync({ onPictureSaved: onPictureSaved, base64: true}).
                       catch(function(err) {
                       console.log(err);
                       });
                        }
                   }
                }
                sendData();
                }, [record])

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const onPictureSaved = photo => {
          axios.post("https://glacial-springs-53214.herokuapp.com/video_player", {picture: photo})
          .then (function (response) {
            if (parseFloat(response.data) < item) {
              console.log('yes');
          }
          else{
            playSound();
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
    backgroundColor: "#222831",
  },

  guardContainer: {
    flex:1,
    backgroundColor: "#30475E",
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