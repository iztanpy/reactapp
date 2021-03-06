import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator,LogBox } from 'react-native';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import logInScreen from './components/logInScreen';
import signUpScreen from './components/signUpScreen';

import tempHomeScreen from './components/tempHomeScreen';
import tempForgetScreen from './components/tempForgetScreen';
import sleepDetector from './components/sleepDetector';
import Calibration from './components/Calibration';
import Tutorial from './components/Tutorial'
import TutorialHomePage from './components/TutorialHomePage'
import Tutorial1 from './components/tutorial1'
import Tutorial2 from './components/tutorial2'
import Tutorial3 from './components/tutorial3'
import profileScreen from './components/profileScreen'
import information from './components/information';
import nok from './components/nok';
import ProfileTutorial from './components/ProfileTutorial'
import ProfileTutorial2 from './components/ProfileTutorial2'
import FlashMessage from "react-native-flash-message";


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

LogBox.ignoreAllLogs()

export default function App() {
    return (
        <View style={{ flex: 1 }}>
          <NavigationContainer>
            <Stack.Navigator
            initialRouteName="login"
            screenOptions={{
               headerStyle: {
               backgroundColor: "#222831",
               },
               headerTintColor: '#F05454',
               headerTitleStyle: {
               fontWeight: 'bold',
               },
               }}>
              <Stack.Screen name="login" component={logInScreen} />
              <Stack.Screen name="signup" component={signUpScreen} />
              <Stack.Screen name="tempForget" component={tempForgetScreen} />
              <Stack.Screen name= "Home" component={tempHomeScreen} />
              <Stack.Screen name = "information" component={information}/>
              <Stack.Screen name= "camera" component={sleepDetector} options={{unmountOnBlur: true}}/>
              <Stack.Screen name= "calibration" component={Calibration} options={{unmountOnBlur: true}}/>
              <Stack.Screen name = "Calibration Tutorial 1" component={Tutorial1} options={{unmountOnBlur: true}}/>
              <Stack.Screen name = "Calibration Tutorial 2" component={Tutorial2} options={{unmountOnBlur: true}}/>
              <Stack.Screen name = "Calibration Tutorial 3" component={Tutorial3} options={{unmountOnBlur: true}}/>
              <Stack.Screen name = "profile" component={profileScreen} options={{unmountOnBlur: true}}/>
              <Stack.Screen name = "nok" component={nok} options={{unmountOnBlur: true}}/>
              <Stack.Screen name = "Tutorial home page" component={TutorialHomePage} options={{unmountOnBlur: true}}/>
              <Stack.Screen name = "Profile Tutorial" component={ProfileTutorial} options={{unmountOnBlur: true}}/>
              <Stack.Screen name = "Profile Tutorial 2" component={ProfileTutorial2} options={{unmountOnBlur: true}}/>
              
              
            </Stack.Navigator>
          </NavigationContainer>
          <FlashMessage position="top" />
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  drawer: {
  backgroundColor: '#c6cbef'
  }

});