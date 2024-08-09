import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import { StatusBar } from 'react-native'
import Login from './pages/Authentication/Login/Login';
import Signup from './pages/Authentication/Signup/Signup';
import { primaryBg } from './Globals/constants';
import { PaperProvider } from 'react-native-paper';
import { OrientationProvider } from './Provider/OrientationProvider';
import UserDetails from './pages/Authentication/UserDetails/UserDetails';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <>
    <PaperProvider>
      <OrientationProvider>
      <StatusBar backgroundColor={primaryBg}/>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown:false
        }}>
          <Stack.Screen name='Login' component={Login}/>
          <Stack.Screen name='Signup' component={Signup}/>
          <Stack.Screen name='UserData' component={UserDetails}/>
        </Stack.Navigator>
      </NavigationContainer>
      </OrientationProvider>
      </PaperProvider>
    </>
  )
}

export default App