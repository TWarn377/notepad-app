import 'react-native-gesture-handler';
import React from 'react';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './app/pages/login';
import Overview from './app/pages/overview';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false }}>
        <Stack.Screen
          name="Login"
          component={Login}/>
        <Stack.Screen
          name="Overview"
          component={Overview}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};


