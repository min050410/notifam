import * as React from 'react';
import { Image, ScrollView, ActivityIndicator, Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

//components
import NowScreen from './components/NowScreen';
import HomeScreen from './components/HomeScreen';
import SearchScreen from './components/SearchScreen';

const Tab = createBottomTabNavigator();

function TabBarIcon({ name, focused }) {
  return (
    <Ionicons
      name={name}
      size={25}
      color={focused ? "#50A6FF" : "black"}
      style={{ marginBottom: -10 }}
    />
  )
}

//master 
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen 
          name="실시간 가격" 
          component={NowScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                focused={focused}
                name={Platform.OS === "ios" ? `ios-help` : "ios-time-outline"}
              />
            ),
          }} />
        <Tab.Screen 
          name="가격 예측" 
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                focused={focused}
                name={Platform.OS === "ios" ? `ios-home` : "trending-up"}
              />
            ),
          }} />
        <Tab.Screen 
          name="찾기" 
          component={SearchScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                focused={focused}
                name={Platform.OS === "ios" ? `ios-home` : "compass-outline"}
              />
            ),
          }} />
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
