import * as React from 'react';
import {useState}  from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function StackScreen() {
  return(
    <Stack.Navigator>
      <Stack.Screen
        name = "Home"
        component = {HomeScreen} 
        options = {({navigation, route}) => ({ 
          headerTitle: props => <LogoTitle {...props}/>
        })}
      />
    </Stack.Navigator>
  )
}



function HomeScreen({ navigation }) { //home screen 함수
  const [count, setCount] = React.useState(0);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight : () => (
        <Button onPress={()=>setCount(c=>c+1)} title="Update count"/>
      ),
    })
  }, [navigation]);
  return (
    <View style={{ 
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Text>{count}</Text>
      <Button
        title="Go to Details"
        onPress={()=>navigation.navigate('Details')}
      />
    </View>
  );
} 

function DetailsScreen({ navigation }){
  return(
    <View style={{
      flex:1,
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Text>Details Screen</Text>
      <Button
        title = "Go to Details... again"
        onPress={()=>navigation.push('Details')}

      />
      <Button title="Go back" onPress={()=>navigation.goBack()}/>
      <Button title="Go back to first screen in stack" 
      onPress={()=>navigation.popToTop()}
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
