import React, {useEffect} from 'react';
import {Text, View, SafeAreaView} from 'react-native';
import {globalStyles} from '../../Globals/globalStyles';
import {styles} from './Style';
import Header from '../../components/Header/Header';
import SearchBar from '../../components/SearchBar/SearchBar';
import {Chip, Icon} from 'react-native-paper';
import {
  secondaryBg,
  secondaryDarkBg,
  secondaryText,
} from '../../Globals/constants';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store/store';
import {handleTabChange} from '../../redux/reducers/dashboard';
import RegisteredEvents from '../../components/RegisteredEvents/RegisteredEvents';
import UpcomingEvents from '../../components/UpcomingEvents/UpcomingEvents';
type Props = {
  route:any
}
const Dashboard = ({route}:Props) => {
  const dispatch = useDispatch();
  const dashboardState = useSelector((state: RootState) => state.dashboard);
  const {username} = route.params
  useEffect(() => {
    // console.warn(dashboardState.currentTab)
  }, [dashboardState.currentTab]);
  return (
    <>
      <SafeAreaView style={[globalStyles.main]}>
        <View style={styles.header}>
          <Header isBackEnabled={false} />
          <Text style={[globalStyles.italicText, styles.welcome]}>
            Welcome back, {username || 'User'}
          </Text>
          <SearchBar />
          <View style={styles.chipContainer}>
            <Chip
              // elevated={true}
              onPress={() => dispatch(handleTabChange('Registered_Events'))}
              icon={() => (
                <Icon
                  size={16}
                  source="calendar-check"
                  color={secondaryDarkBg}
                />
              )}
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
              onPress={() => dispatch(handleTabChange('Upcoming_Events'))}
              icon={() => (
                <Icon
                  size={16}
                  source="calendar-clock"
                  color={secondaryDarkBg}
                />
              )}
              style={{
                backgroundColor: secondaryBg,
                borderColor: secondaryDarkBg,
                borderWidth: 1,
              }}
              // selectedColor={secondaryDarkBg}
              rippleColor={secondaryDarkBg}>
              <Text style={{color: secondaryText}}>Upcoming Events</Text>
            </Chip>
          </View>
        </View>
        <View style={styles.body}>
          {dashboardState.currentTab === 'Registered_Events' ? (
            <RegisteredEvents />
          ) : (
            <UpcomingEvents />
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

export default Dashboard;
