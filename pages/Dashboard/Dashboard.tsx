import React, { useEffect } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import { handleTabChange } from '../../redux/reducers/dashboard';
import RegisteredEvents from '../../components/RegisteredEvents/RegisteredEvents';
import UpcomingEvents from '../../components/UpcomingEvents/UpcomingEvents';

const Dashboard = () => {
  const dispatch = useDispatch();
  const dashboardState = useSelector((state:RootState)=>state.dashboard)
  useEffect(()=> {
    // console.warn(dashboardState.currentTab)
  },[dashboardState.currentTab])
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
              onPress={()=>dispatch(handleTabChange("Registered_Events"))}
              icon={() => <Icon size={16} source="calendar-check" color={secondaryDarkBg} />}
              style={{
                backgroundColor: secondaryBg,
                borderColor: secondaryDarkBg,
                borderWidth: 1,
              }}
              selected={true}
              rippleColor={secondaryDarkBg}
              // selectedColor={secondaryDarkBg}
              >
              <Text style={{color: secondaryText}}>Registered Events</Text>
            </Chip>
            <Chip
            onPress={()=>dispatch(handleTabChange("Upcoming_Events"))}
             icon={() => <Icon size={16} source="calendar-clock" color={secondaryDarkBg} />}
              style={{
                backgroundColor: secondaryBg,
                borderColor: secondaryDarkBg,
                borderWidth: 1,
              }}
              // selectedColor={secondaryDarkBg}
              rippleColor={secondaryDarkBg}
              
            >
              <Text style={{color: secondaryText}}>Upcoming Events</Text>
            </Chip>
          </View>
        </View>
        <View style={styles.body}>
          {
            dashboardState.currentTab=="Registered_Events"?
            <RegisteredEvents/>
            :
            <UpcomingEvents/>
          }
         
             
        </View>
      </SafeAreaView>
    </>
  );
};

export default Dashboard;
