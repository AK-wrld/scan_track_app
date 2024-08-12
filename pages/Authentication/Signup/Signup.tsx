import React, {useContext, useEffect, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from '../Style';
import {globalStyles} from '../../../Globals/globalStyles';
import {
  primaryBg,
  primaryText,
  quote,
  secondaryBg,
  secondaryDarkBg,
  secondaryText,
} from '../../../Globals/constants';
import {Avatar, Button, HelperText, TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

import {NavigationProp} from '@react-navigation/native';
import {OrientationContext} from '../../../context/OrientationContext';
import {TSignup} from '../../../models/SignupModel';
import {
  validatePassword,
  validateUsername,
} from '../../../controllers/validation';

type Props = {
  navigation: NavigationProp<any>;
};

const Signup = ({navigation}: Props) => {
  const context = useContext(OrientationContext);

  if (!context) {
    throw new Error('OrientationProvider not found in component tree');
  }

  const {orientation} = context;
  const Container = orientation === 'portrait' ? View : ScrollView;
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

  const handleSignup = () => {
    navigation.navigate('UserData', {
      username: userName.value,
      password: pass.value,
    });
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

      //send username and pass to userData
      navigation.navigate('UserData', {
        username: userName.value,
        password: pass.value,
      });
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
          <Text style={[globalStyles.boldText, styles.title]}>Signup</Text>
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
              labelStyle={{fontFamily: 'Poppins-Regular'}}
              rippleColor={secondaryBg}
              mode="contained"
              style={styles.loginBtn}
              onPress={handleSignup}>
              Next
            </Button>
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
              onPress={() => navigation.navigate('Login')}>
              Existing User? Login
            </Button>
          </View>
        </View>
      </View>
    </Container>
  );
};

export default Signup;
