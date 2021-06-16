import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import logInScreen from './components/logInScreen';
import signUpScreen from './components/signUpScreen';
import cameraScreen from './components/cameraScreen';
import tempHomeScreen from './components/tempHomeScreen';
import tempForgetScreen from './components/tempForgetScreen';

import FlashMessage from "react-native-flash-message";


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();


function loggedInTabs() {
    return (
    <Drawer.Navigator>
          <Drawer.Screen name= "Home" component={tempHomeScreen} />
          <Drawer.Screen name= "Stay Awake Stay Safe" component={cameraScreen} options={{unmountOnBlur: true}}/>
        </Drawer.Navigator>
        );
        }

export default function App() {
    return (
        <View style={{ flex: 1 }}>
          <NavigationContainer>
            <Stack.Navigator
            initialRouteName="login"
            screenOptions={{
               headerStyle: {
               backgroundColor: "#c0d4ff",
               },
               headerTintColor: '#fff',
               headerTitleStyle: {
               fontWeight: 'bold',
               },
               }}>
              <Stack.Screen name="login" component={logInScreen} />
              <Stack.Screen name="signup" component={signUpScreen} />
              <Stack.Screen name="Logged In screens" component={loggedInTabs}
               options = {{}}/>
              <Stack.Screen name="tempForget" component={tempForgetScreen} />
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
});