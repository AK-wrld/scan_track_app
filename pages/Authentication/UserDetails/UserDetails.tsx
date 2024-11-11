import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import {globalStyles} from '../../../Globals/globalStyles';
import {styles} from '../Style';
import {NavigationProp} from '@react-navigation/native';
import {OrientationContext} from '../../../context/OrientationContext';
import {
  Avatar,
  Button,
  HelperText,
  RadioButton,
  TextInput,
} from 'react-native-paper';
import {
  ACCOUNT_STATUS,
  API_ENDPOINTS,
  primaryText,
  quote,
  secondaryBg,
  secondaryDarkBg,
  secondaryText,
} from '../../../Globals/constants';
import {TSignup} from '../../../models/Authentication';
import {
  validateEmail,
  validateFirstName,
  validatePhone,
} from '../../../controllers/validation';
import DeviceInfo, {getUniqueId} from 'react-native-device-info';
import store, { RootState } from '../../../redux/store/store';
import {signupApi} from '../../../redux/api/Authentication';
import axios from 'axios';
import { useSelector } from 'react-redux';
type Props = {
  navigation: NavigationProp<any>;
  route: any;
};

const UserDetails = ({navigation, route}: Props) => {
  const context = useContext(OrientationContext);
  const {username, password} = route.params;
  const signupState = useSelector((state: RootState) => state.signup);
  const loginState = useSelector((state: RootState) => state.login);
  // useEffect(()=> {
  //   console.log(username && username)
  // },[username])
  if (!context) {
    throw new Error('OrientationProvider not found in component tree');
  }

  const {orientation} = context;
  const Container = orientation === 'portrait' ? ScrollView : ScrollView;
  const [firstName, setFirstName] = useState({
    value: '',
    isError: false,
    error: '',
  });
  const [lastName, setLastName] = useState({
    value: '',
    isError: false,
    error: '',
  });
  const [role, setRole] = React.useState<"ORGANISER"|"PARTICIPANT">('PARTICIPANT');
  const [email, setEmail] = useState({
    value: '',
    isError: false,
    error: '',
  });
  const [phone, setPhone] = useState({
    value: '',
    isError: false,
    error: '',
  });

  const handleSignup = async () => {
    // navigation.navigate('Dashboard');
    if (!validateFirstName(firstName.value, 2)) {
      setFirstName((prev: any) => ({
        ...prev,
        isError: true,
        error: 'Invalid First name',
      }));
    } else if (!validateEmail(email.value)) {
      setEmail((prev: any) => ({
        ...prev,
        isError: true,
        error: 'Invalid email',
      }));
    } else if (!validatePhone(phone.value)) {
      setPhone((prev: any) => ({
        ...prev,
        isError: true,
        error: 'Invalid phone',
      }));
    } else {
      setFirstName((prev: any) => ({...prev, isError: false, error: ''}));
      setEmail((prev: any) => ({...prev, isError: false, error: ''}));
      setPhone((prev: any) => ({...prev, isError: false, error: ''}));
      const uniqueId = await DeviceInfo.getUniqueId();
      // console.log(uniqueId)
      const reqBody: TSignup = {
        username: username,
        password: password,
        email: email.value,
        phone: phone.value,
        role: role,
        name: `${firstName.value} ${lastName.value}`,
        uniqueId: uniqueId,
        // status:ACCOUNT_STATUS.ACTIVE
      };

      console.log(reqBody,"1");
      //api call
      store
        .dispatch(signupApi(reqBody))
        .unwrap()
        .then(res => {
          console.log(res);
          loginState.authToken = res?.data?.token;
          loginState.userId = res?.data?.userId;
          navigation.navigate('Dashboard');
        })
        .catch(error => console.log(error));
     
      
    }
  };
  return (
    <>
      <Container style={globalStyles.main}>
        <View style={styles.headingBox}>
          <Text style={[globalStyles.boldText, styles.title]}>Scan Track</Text>
          <Text style={[globalStyles.italicText, styles.quote]}>{quote}</Text>
        </View>

        <View style={[{justifyContent: 'flex-end'}]}>
          <View style={[styles.loginContainer, {height: '85%'}]}>
            <Text style={[globalStyles.boldText, styles.title]}>
              User Details
            </Text>
            <View style={[styles.formBox, {height: 280, gap: 10}]}>
              <View style={styles.nameContainer}>
                <View style={styles.nameInput}>
                  <TextInput
                    label="First Name"
                    value={firstName.value}
                    mode="outlined"
                    error={firstName.isError}
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
                    onChangeText={(firstName: string) =>
                      setFirstName((prev: any) => ({...prev, value: firstName}))
                    }
                    style={[styles.inputBox]}
                  />
                  <HelperText type="error" visible={firstName.isError}>
                    {firstName.error}
                  </HelperText>
                </View>

                <View style={styles.nameInput}>
                  <TextInput
                    label="Last Name"
                    value={lastName.value}
                    mode="outlined"
                    error={lastName.isError}
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
                    onChangeText={(lastName: string) =>
                      setLastName((prev: any) => ({...prev, value: lastName}))
                    }
                    style={[styles.inputBox]}
                  />
                  <HelperText type="error" visible={firstName.isError}>
                    {lastName.error}
                  </HelperText>
                </View>
              </View>
              <Text
                style={[
                  globalStyles.semiBoldText,
                  styles.label,
                  {
                    fontSize: 16,
                    alignSelf: 'flex-start',
                    width: '95%',
                    marginLeft: 'auto',
                  },
                ]}>
                Role
              </Text>
              <View style={styles.radioContainer}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '45%',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={[globalStyles.semiBoldText, styles.label]}>
                    Participant
                  </Text>
                  <RadioButton
                    value="PARTICIPANT"
                    status={role === 'PARTICIPANT' ? 'checked' : 'unchecked'}
                    onPress={() => setRole('PARTICIPANT')}
                    color={primaryText}
                    uncheckedColor={secondaryText}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '45%',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={[globalStyles.semiBoldText, styles.label]}>
                    Organizer
                  </Text>
                  <RadioButton
                    value="ORGANISER"
                    status={role === 'ORGANISER' ? 'checked' : 'unchecked'}
                    onPress={() => setRole('ORGANISER')}
                    color={primaryText}
                    uncheckedColor={secondaryText}
                  />
                </View>
              </View>
              <View style={styles.nameContainer}>
                <View style={styles.nameInput}>
                  <TextInput
                    label="Email"
                    value={email.value}
                    mode="outlined"
                    error={email.isError}
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
                    onChangeText={(email: string) =>
                      setEmail((prev: any) => ({...prev, value: email}))
                    }
                    style={[styles.inputBox]}
                  />
                  <HelperText type="error" visible={email.isError}>
                    {email.error}
                  </HelperText>
                </View>

                <View style={styles.nameInput}>
                  <TextInput
                    label="Phone Number"
                    value={phone.value}
                    mode="outlined"
                    error={phone.isError}
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
                    onChangeText={(phone: string) =>
                      setPhone((prev: any) => ({...prev, value: phone}))
                    }
                    style={[styles.inputBox]}
                  />
                  <HelperText type="error" visible={phone.isError}>
                    {phone.error}
                  </HelperText>
                </View>
              </View>
              <Button
                labelStyle={{fontFamily: 'Poppins-Regular',color:secondaryText}}
                rippleColor={secondaryBg}
                mode="contained"
                style={styles.loginBtn}
                disabled={signupState.loading}
                onPress={handleSignup}>
                Signup
              </Button>
            </View>
            <View style={styles.footerBox}>
              <Button
                textColor={secondaryText}
                labelStyle={{fontFamily: 'Poppins-Regular',color:secondaryText}}
                style={styles.footerText}
                onPress={() => navigation.navigate('Login')}>
                Existing User? Login
              </Button>
            </View>
          </View>
        </View>
      </Container>
    </>
  );
};

export default UserDetails;
