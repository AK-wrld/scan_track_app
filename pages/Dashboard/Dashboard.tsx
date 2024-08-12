import React from 'react';
import {ScrollView, Text, View, SafeAreaView} from 'react-native';
import {globalStyles} from '../../Globals/globalStyles';
import {styles} from './Style';
import Header from '../../components/Header/Header';
import SearchBar from '../../components/SearchBar/SearchBar';
import {Chip, Icon} from 'react-native-paper';
import {
  primaryBg,
  primaryText,
  secondaryBg,
  secondaryDarkBg,
  secondaryText,
} from '../../Globals/constants';

const Dashboard = () => {
  return (
    <>
      <SafeAreaView style={[globalStyles.main]}>
        <View style={styles.header}>
          <Header />
          <Text style={[globalStyles.italicText, styles.welcome]}>
            Welcome back, Apurba
          </Text>
          <SearchBar />
          <View style={styles.chipContainer}>
            <Chip
              // elevated={true}
              icon={() => <Icon size={16} source="calendar-check" color={secondaryDarkBg} />}
              style={{
                backgroundColor: secondaryBg,
                borderColor: secondaryDarkBg,
                borderWidth: 1,
              }}
              selected={true}
              rippleColor={secondaryDarkBg}
              selectedColor={secondaryDarkBg}>
              <Text style={{color: secondaryText}}>Registered Events</Text>
            </Chip>
            <Chip
             icon={() => <Icon size={16} source="calendar-clock" color={secondaryDarkBg} />}
              style={{
                backgroundColor: secondaryBg,
                borderColor: secondaryDarkBg,
                borderWidth: 1,
              }}
              selectedColor={secondaryDarkBg}
              rippleColor={secondaryDarkBg}
              
            >
              <Text style={{color: secondaryText}}>Upcoming Events</Text>
            </Chip>
          </View>
        </View>
        <View style={styles.body}>{/* <Text>hi</Text> */}</View>
      </SafeAreaView>
    </>
  );
};

export default Dashboard;
