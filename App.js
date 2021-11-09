import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function HomeScreen({ navigation }) { //home screen 함수
  return (
    <View style={{ 
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={()=>navigation.navigate('Details')}
      />
    </View>
  );
} 

function DetailsScreen(){
  return(
    <View style={{
      flex:1,
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Text>Details Screen</Text>
      <Button
        title = "Go to Details... agin"
        onPress={()=>navigation.navigate('Details')}
      />
    </View>
  )
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Overview' }}/>
        <Stack.Screen name="Details" component={DetailsScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
