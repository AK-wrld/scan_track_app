import React, {useContext, useState} from 'react';
import {Alert, ScrollView, Text, View} from 'react-native';
import {styles} from '../Style';
import {globalStyles} from '../../../Globals/globalStyles';
import {
  primaryText,
  quote,
  secondaryBg,
  secondaryDarkBg,
  secondaryText,
} from '../../../Globals/constants';
import {Avatar, Button, HelperText, TextInput} from 'react-native-paper';
import {NavigationProp} from '@react-navigation/native';
import {OrientationContext} from '../../../context/OrientationContext';
import {
  validatePassword,
  validateUsername,
} from '../../../controllers/validation';
import { TLogin } from '../../../models/Authentication';
import store from '../../../redux/store/store';
import { loginApi } from '../../../redux/api/Authentication';
import { useSelector } from 'react-redux';
import {RootState} from '../../../redux/store/store';
import { EPermissionTypes, usePermissions } from '../../../context/usePermissions';
import { PERMISSIONS } from 'react-native-permissions';
import { goToSettings } from '../../../helper';
type Props = {
  navigation: NavigationProp<any>;
};

const Login = ({navigation}: Props) => {
  const context = useContext(OrientationContext);
  const {checkPermission} = usePermissions(EPermissionTypes.LOCATION)
  const loginState = useSelector((state: RootState) => state.login);
  if (!context) {
    throw new Error('OrientationProvider not found in component tree');
  }

  const {orientation} = context;
  const Container = orientation === 'portrait' ? View : ScrollView;
  // console.log(orientation)
  const [userName, setUserName] = useState({
    value: '',
    isError: false,
    error: '',
  });
  const [pass, setPass] = useState({
    value: '',
    isError: false,
    error: '',
  });
  const [unauthorized,setUnauthorized] = useState('')
  const handleSignin = () => {
    if (!validateUsername(userName.value, 2)) {
      setUserName((prev: any) => ({
        ...prev,
        isError: true,
        error: 'Invalid Username',
      }));
    }
    if (!validatePassword(pass.value, 2)) {
      setPass((prev: any) => ({
        ...prev,
        isError: true,
        error: 'Invalid Password',
      }));
    } else {
      setUserName((prev: any) => ({...prev, isError: false, error: ''}));
      setPass((prev: any) => ({...prev, isError: false, error: ''}));

      //api call
      const reqBody:TLogin = {
        username: userName.value,
        password: pass.value,
      }
      store
      .dispatch(loginApi(reqBody))
      .unwrap()
      .then(async (res) => {
        if(res?.status===200 || res?.status===201) {
          console.log('Data:', res);
          setUnauthorized('')
          if(await checkPermission(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)===false) {
            console.log("Permission not granted")
            Alert.alert(
              'Permission Denied',
              'Please give permission from settings to continue using location.',
              [
                {
                  text: 'Cancel',
                  onPress: () =>  navigation.navigate('Dashboard',{username:userName.value}),
                  style: 'cancel',
                },
                {text: 'Go To Settings', onPress: () => goToSettings()},
              ],
            );
          }
          navigation.navigate('Dashboard',{username:userName.value});

        }
        else {
          setUnauthorized("Incorrect credentials")
        }
      })
      .catch((error) => {
        console.log('Error:', error?.message);
      }
      );
    }
  };
  return (
    <Container style={[globalStyles.main]}>
      <View style={styles.headingBox}>
        <Text style={[globalStyles.boldText, styles.title]}>Scan Track</Text>
        <Text style={[globalStyles.italicText, styles.quote]}>{quote}</Text>
      </View>

      <View style={[{justifyContent: 'flex-end'}]}>
        <View style={styles.loginContainer}>
          <Text style={[globalStyles.boldText, styles.title]}>Login</Text>
          <View style={styles.formBox}>
            <TextInput
              label="Username"
              value={userName.value}
              mode="outlined"
              error={userName.isError}
              selectionColor={secondaryBg}
              textColor={primaryText}
              dense={true}
              contentStyle={{}}
              outlineStyle={{
                borderRadius: 10,
                borderColor: secondaryBg,
                shadowColor: 'black',
                shadowRadius: 10,
                elevation: 1,
              }}
              onChangeText={(userName: string) =>
                setUserName((prev: any) => ({...prev, value: userName}))
              }
              style={styles.inputBox}
            />
            <HelperText type="error" visible={userName.isError}>
              {userName.error}
            </HelperText>
            <TextInput
              label="Password"
              mode="outlined"
              value={pass.value}
              error={pass.isError}
              selectionColor={secondaryBg}
              textColor={primaryText}
              dense={true}
              outlineStyle={{
                borderRadius: 10,
                borderColor: secondaryBg,
                shadowColor: 'black',
                shadowRadius: 10,
                elevation: 1,
              }}
              onChangeText={(pass: string) =>
                setPass((prev: any) => ({...prev, value: pass}))
              }
              style={styles.inputBox}
            />
            <HelperText type="error" visible={pass.isError}>
              {pass.error}
            </HelperText>
            <Button
              labelStyle={{fontFamily: 'Poppins-Regular',color:secondaryText}}
              rippleColor={secondaryBg}
              mode="contained"
              style={styles.loginBtn}
              disabled={loginState.loading}
              onPress={handleSignin}>
              Login
            </Button>
            <HelperText type="error" visible={pass.isError}>
              {unauthorized}
            </HelperText>
          </View>
          <View style={styles.footerBox}>
            <Avatar.Icon
              icon="google"
              size={40}
              color={secondaryText}
              style={{
                backgroundColor: secondaryDarkBg,
                alignSelf: 'center',
                marginTop: 20,
              }}
            />
            <Button
              textColor={secondaryText}
              style={styles.footerText}
              labelStyle={{fontFamily: 'Poppins-Regular'}}
              onPress={() => navigation.navigate('Signup')}>
              New user? Signup
            </Button>
          </View>
        </View>
      </View>
    </Container>
  );
};

export default Login;
