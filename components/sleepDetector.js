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
import {Audio} from 'expo-av';


const axios = require('axios').default;

export default function SleepDetector(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [disableCalibration, setDisable] = useState(false);
  const cameraRef = useRef(null)
  const sound = new Audio.Sound();
  let record = false;

  async function playSound() {
    await sound.playAsync();
    console.log('play song');
    }

  let item;
  axios.post('https://glacial-springs-53214.herokuapp.com/get_value',{name:props.name})
  .then(function(response){item = parseFloat(response.data);
  console.log(item);})
  .catch(function(error) {})
  
  

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
            if (parseFloat(response.data) < item) {
              //playSound()
              console.log('yes');
          }
          else{
            console.log('no');
          };}
          )
          .catch(function (error) {
          })
          }
          
//        let {base64} = photo;
//        let thing = base64
//        try{
//        console.log(1)
//        console.log(thing)
//        let response = await axios.post("https://0.0.0.0:5000/video_player",{picture:thing},headers)
//
//        console.log(response);
//        }catch (error) {
//          console.log(error);
//        }
//

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
                  await sound.loadAsync(require('../assets/sounds/alarm.mp3'))
                  setDisable(!disableCalibration);
                  record = true
                  if (cameraRef) {
                     while(record){
                       
                     await cameraRef.current.takePictureAsync({onPictureSaved: onPictureSaved,base64: true}).
                     catch(function(err) {
                       console.log(err);
                     });

                     setTimeout(() => {},500);
                     
                    }
                  }
                  }}>
                  <Text style={styles.text}> Start </Text>
                </TouchableOpacity>

                <TouchableOpacity
                style={styles.button}
                disabled = {!disableCalibration}
                onPress={() => {
                  setDisable(!disableCalibration)
                  record = false;
                  sound.unloadAsync();
                }}>
                  <Text style={styles.text}>Stop</Text>
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



   text: {
      fontSize: 18,
      color: 'white',
   },

})