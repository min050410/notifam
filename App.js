import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


function NowScreen() {
  return (
    <View style={styles.normal}>
      <Text>now</Text>
    </View>
    
  );
}


function HomeScreen() {
  return (
    <View style={styles.normal}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={styles.normal}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="now" component={NowScreen}/>
        <Tab.Screen style={styles.completeCircle} name="Home" component={HomeScreen}/>
        <Tab.Screen name="Search" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  normal: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
  },
  completeCircle: {
    flex: 1,
  }
})