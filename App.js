import * as React from 'react';
import { Image, ScrollView, ActivityIndicator, Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


//components
import NowScreen from './components/NowScreen';
import HomeScreen from './components/HomeScreen';
import SearchScreen from './components/SearchScreen';

const Tab = createBottomTabNavigator();

//master 
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="실시간 가격" component={NowScreen} />
        <Tab.Screen style={styles.completeCircle} name="가격 예측" component={HomeScreen} />
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
