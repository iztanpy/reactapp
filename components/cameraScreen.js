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

const axios = require('axios').default;



export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [disableCalibration, setDisable] = useState(false);
  let record = false;
  const sound = new Audio.Sound();
  const cameraRef = useRef(null)


    async function playSound() {
      await sound.playAsync();
      console.log('play song');
      }

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
            axios.post("https://glacial-springs-53214.herokuapp.com/video_player", {picture: photo})
            .then (function (response) {
            if (response.data === "yes") {
                playSound()
            };
            })
            .catch(function (error) {
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
                  disabled = {disableCalibration}
                  onPress={async () => {
                  await sound.loadAsync(require('../assets/sounds/alarm.mp3'));
                  setDisable(!disableCalibration);
                  console.log(disableCalibration)
                  record = !record

                    record = true;
                    while(record){
                     if(cameraRef) {
                     await cameraRef.current.takePictureAsync({ onPictureSaved: onPictureSaved, base64: true}).
                     catch(function(err) {
                       console.log(err);
                     });

                     setTimeout(() => {},500);

                    }
                  }

                  }}>

                  <Text style={styles.text}> Calibrate </Text>
                </TouchableOpacity>

                <TouchableOpacity
                style={styles.button}
                disabled = {!disableCalibration}
                onPress={() => {
                  setDisable(!disableCalibration)
                  record = false;
                  sound.unloadAsync()
                }}>
                  <Text>STOP</Text>
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
      flex: 0.1,
      alignSelf: 'flex-end',
      alignItems: 'center',
   },
   text: {
      fontSize: 18,
      color: 'white',
   },

})