import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StatusBar} from 'react-native';
import Login from './pages/Authentication/Login/Login';
import Signup from './pages/Authentication/Signup/Signup';
import {primaryBg} from './Globals/constants';
import {PaperProvider} from 'react-native-paper';
import {OrientationProvider} from './Provider/OrientationProvider';
import UserDetails from './pages/Authentication/UserDetails/UserDetails';
import {Provider} from 'react-redux';
import store from './redux/store/store';
import Dashboard from './pages/Dashboard/Dashboard';
import {RootStackParamList} from './models/StackNavigationModel';
const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <>
      <Provider store={store}>
        <PaperProvider>
          <OrientationProvider>
            <StatusBar backgroundColor={primaryBg} />
            <NavigationContainer>
              <Stack.Navigator initialRouteName="Login">
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
                <Stack.Screen
                  name="Dashboard"
                  component={Dashboard}
                  options={{
                    headerShown: false,
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

export default App;
