import React, {useContext, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
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
  primaryText,
  quote,
  secondaryBg,
  secondaryDarkBg,
  secondaryText,
} from '../../../Globals/constants';
type Props = {
  navigation: NavigationProp<any>;
};

const UserDetails = ({navigation}: Props) => {
  const context = useContext(OrientationContext);
  const [role, setRole] = React.useState('PARTICIPANT');
  if (!context) {
    throw new Error('OrientationProvider not found in component tree');
  }

  const {orientation} = context;
  const Container = orientation === 'portrait' ? View : ScrollView;
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

  const handleSignup = () => {};
  return (
    <>
      <Container style={globalStyles.main}>
        <View style={styles.headingBox}>
          <Text style={[globalStyles.boldText, styles.title]}>Scan Track</Text>
          <Text style={[globalStyles.italicText, styles.quote]}>{quote}</Text>
        </View>

        <View style={[{justifyContent: 'flex-end'}]}>
          <View style={styles.loginContainer}>
            <Text style={[globalStyles.boldText, styles.title]}>
              User Details
            </Text>
            <View style={[styles.formBox,{height:280,gap:10}]}>
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
                <Text style={[globalStyles.semiBoldText,styles.label,{fontSize:16,alignSelf:"flex-start",width:"95%",marginLeft:"auto"}]}>Role</Text>
              <View style={styles.radioContainer}>
                <View style={{flexDirection:"row",alignItems:"center",width:"45%",justifyContent:"space-between"}}>
                <Text style={[globalStyles.semiBoldText,styles.label]}>Participant</Text>
                <RadioButton
                  value="PARTICIPANT"
                  status={role === 'PARTICIPANT' ? 'checked' : 'unchecked'}
                  onPress={() => setRole('PARTICIPANT')}
                  color={primaryText}
                  uncheckedColor={secondaryText}
                />
                </View>
                <View style={{flexDirection:"row",alignItems:"center",width:"45%",justifyContent:"space-between"}}>
                <Text style={[globalStyles.semiBoldText,styles.label]}>Organizer</Text>
                <RadioButton
                  value="ORGANIZER"
                  status={role === 'ORGANIZER' ? 'checked' : 'unchecked'}
                  onPress={() => setRole('ORGANIZER')}
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
                labelStyle={{fontFamily: 'Poppins-Regular'}}
                rippleColor={secondaryBg}
                mode="contained"
                style={styles.loginBtn}
                onPress={handleSignup}>
                Signup
              </Button>
            </View>
            <View style={styles.footerBox}>
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
    </>
  );
};

export default UserDetails;
