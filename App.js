import * as React from 'react';
import { Image, ScrollView, ActivityIndicator, Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { parseString } from 'xml2js';
import { useEffect, useState } from 'react';
import SplashScreen from 'react-native-splash-screen'


//components
import NowScreen from './components/NowScreen';
import HomeScreen from './components/HomeScreen';
import SearchScreen from './components/SearchScreen';

// react native logo
// const logo = {
//   uri: 'https://reactnative.dev/img/tiny_logo.png',
//   width: 64,
//   height: 64
// };

const Tab = createBottomTabNavigator();

//master 
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="실시간 가격" component={NowScreen} />
        <Tab.Screen style={styles.completeCircle} name="Home" component={HomeScreen} />
        <Tab.Screen name="찾기" component={SearchScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// style
const styles = StyleSheet.create({
  completeCircle: {
    flex: 1,
  },
})
