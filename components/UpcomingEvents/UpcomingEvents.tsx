import React from 'react';
import {ScrollView} from 'react-native';
import {styles} from './Style';
import UpcomingEventBox from './UpcomingEventBox';

const UpcomingEvents = () => {
  return (
    <ScrollView style={styles.tableContainer}>
      <UpcomingEventBox />
      <UpcomingEventBox />
      <UpcomingEventBox />
    </ScrollView>
  );
};

export default UpcomingEvents;
