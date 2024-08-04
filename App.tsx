import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import { StatusBar } from 'react-native'
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import { primaryBg } from './Globals/constants';
import { PaperProvider } from 'react-native-paper';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <>
    <PaperProvider>
      <StatusBar backgroundColor={primaryBg}/>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown:false
        }}>
          <Stack.Screen name='Login' component={Login}/>
          <Stack.Screen name='Signup' component={Signup}/>
        </Stack.Navigator>
      </NavigationContainer>
      </PaperProvider>
    </>
  )
}

export default App