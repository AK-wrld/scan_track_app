import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../Login/Style';
import { globalStyles } from '../../Globals/globalStyles';
import { primaryBg, primaryText, quote, secondaryBg, secondaryDarkBg, secondaryText } from '../../Globals/constants';
import { Avatar, Button, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

import { NavigationProp } from '@react-navigation/native';

type Props = {
  navigation: NavigationProp<any>;
};

const Signup = ({ navigation }:Props) => {
  const [email, setEmail] = useState({
    value: "",
    isError: false,
    error: ""
  });
  const [pass, setPass] = useState({
    value: "",
    isError: false,
    error: ""
  });
  return (
    <View style={globalStyles.main}>
     <View style={styles.headingBox}>
          <Text style={[globalStyles.boldText, styles.title]}>Scan Track</Text>
          <Text style={[globalStyles.italicText, styles.quote]}>{quote}</Text>
        </View>
    
    <View style={[{justifyContent:"flex-end"}]}>
      <View style={styles.loginContainer}>
       <Text style={[globalStyles.boldText,styles.title]}>Signup</Text>
        <View style={styles.formBox}>
          <TextInput
            label="Email"
            value={email.value}
            mode="outlined"
            error={email.isError}
            selectionColor={secondaryBg}
            textColor={primaryText}
            dense={true}
            contentStyle={{}}
            outlineStyle={{ borderRadius: 10, borderColor: secondaryBg, shadowColor: "black", shadowRadius: 10, elevation: 1 }}
            onChangeText={(email: string) => setEmail((prev: any) => ({ ...prev, value: email }))}
            style={styles.inputBox}
          />
          <TextInput
            label="Password"
            mode="outlined"
            value={pass.value}
            error={pass.isError}
            selectionColor={secondaryBg}
            textColor={primaryText}
            dense={true}
            outlineStyle={{ borderRadius: 10, borderColor: secondaryBg, shadowColor: "black", shadowRadius: 10, elevation: 1 }}
            onChangeText={(pass: string) => setPass((prev: any) => ({ ...prev, value: pass }))}
            style={styles.inputBox}
          />
          <Button labelStyle={{fontFamily:"Poppins-Regular"}} rippleColor={secondaryBg} mode="contained" style={styles.loginBtn} onPress={() => console.log('Pressed')}>Signup</Button>
        </View>
        <View style={styles.footerBox}>
        <Avatar.Icon icon="google" size={40} color={secondaryText} style={{backgroundColor:secondaryDarkBg,alignSelf:"center",marginTop:20}} />
        <Button textColor={secondaryText} style={styles.footerText} labelStyle={{fontFamily:"Poppins-Regular"}} onPress={()=>navigation.navigate('Login')}>Existing User? Login</Button>
        </View>
      </View>
    </View>
    </View>
  )
}

export default Signup