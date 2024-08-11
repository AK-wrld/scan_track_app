import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StatusBar} from 'react-native';
import Login from './pages/Authentication/Login/Login';
import Signup from './pages/Authentication/Signup/Signup';
import {primaryBg} from './Globals/constants';
import {Button, Icon, PaperProvider} from 'react-native-paper';
import {OrientationProvider} from './Provider/OrientationProvider';
import UserDetails from './pages/Authentication/UserDetails/UserDetails';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; // import FontAwesome
import { Provider } from 'react-redux';
import store from './redux/store/store';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <>
    <Provider store={store}>
      <PaperProvider>
        <OrientationProvider>
          <StatusBar backgroundColor={primaryBg} />
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="Login"
                component={Login}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Signup"
                component={Signup}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="UserData"
                component={UserDetails}
                options={{
                  headerStyle: {backgroundColor: primaryBg},
                  headerTintColor: 'white',
                  headerTitle: '',
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </OrientationProvider>
      </PaperProvider>
      </Provider>
    </>
  );
};

export default App
