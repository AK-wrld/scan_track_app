import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';
import {
  Appbar,
  Avatar,
  Chip,
  Icon,
  Menu,
  Text,
  TouchableRipple,
} from 'react-native-paper';
import {styles} from './Style';
import {globalStyles} from '../../Globals/globalStyles';
import {primaryBg, primaryText, secondaryDarkBg, secondaryText} from '../../Globals/constants';
import MaleIcon from '../../public/male-icon.png';
import {SvgUri} from 'react-native-svg';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../models/StackNavigationModel';

const Header = () => {
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, 'Dashboard'>>();
  return (
    <SafeAreaView>
      <Appbar.Header style={styles.header}>
        <Appbar.Content
          title={
            <Text style={[globalStyles.boldText, styles.title]}>
              Scan Track
            </Text>
          }
          color={secondaryText}
        />
        {/* <Appbar.Action icon="magnify"  /> */}
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <TouchableRipple onPress={openMenu}>
              <Avatar.Image size={40} source={MaleIcon} />
            </TouchableRipple>
          }>
          <Menu.Item
            onPress={() => {}}
            rippleColor={primaryText}
            title={
              <Chip
              icon={() => <Icon size={16} source="account" color={secondaryDarkBg} />}
                style={{backgroundColor: 'transparent'}}>
                <Text style={[globalStyles.regularText,{color: secondaryDarkBg}]}>Your Profile</Text>
              </Chip>
            }
          />
          <Menu.Item
            onPress={() => {}}
            rippleColor={primaryText}
            title={
              <Chip
              icon={() => <Icon size={16} source="calendar-check" color={secondaryDarkBg} />}
                style={{backgroundColor: 'transparent'}}>
                <Text style={[globalStyles.regularText,{color: secondaryDarkBg}]}>Registered Events</Text>
              </Chip>
            }
          />
          <Menu.Item
            onPress={() => {}}
            rippleColor={primaryText}
            title={
              <Chip
              icon={() => <Icon size={16} source="calendar-clock" color={secondaryDarkBg} />}
                style={{backgroundColor: 'transparent'}}>
                <Text style={[globalStyles.regularText,{color: secondaryDarkBg}]}>Upcoming Events</Text>
              </Chip>
            }
          />
          <Menu.Item
            onPress={() => {}}
            rippleColor={primaryText}
            title={
              <Chip
              icon={() => <Icon size={16} source="calendar-account" color={secondaryDarkBg} />}
              
                style={{backgroundColor: 'transparent'}}>
                <Text style={[globalStyles.regularText,{color: secondaryDarkBg}]}>Your Events</Text>
              </Chip>
            }
          />
          <Menu.Item
            onPress={() => {
              navigation.navigate('Login');
            }}
            rippleColor={primaryText}
            title={
              <Chip
              icon={() => <Icon size={16} source="logout" color={secondaryDarkBg} />}
                style={{backgroundColor: 'transparent'}}>
                <Text style={[globalStyles.regularText,{color: secondaryDarkBg}]}>Logout</Text>
              </Chip>
            }
          />
        </Menu>
      </Appbar.Header>
    </SafeAreaView>
  );
};

export default Header;
