import React, { useEffect } from 'react';
import {ScrollView} from 'react-native';
import {styles} from './Style';
import UpcomingEventBox from './UpcomingEventBox';
import store from '../../redux/store/store';
import { getAllEvents } from '../../redux/api/Events';
import { EVENT_STATUS_MAP } from '../../Globals/constants';
import { Text } from 'react-native-paper';
import { globalStyles } from '../../Globals/globalStyles';

const UpcomingEvents = () => {
  const [events, setEvents] = React.useState([]);
  useEffect(()=>{
    //fetching all events
    // console.warn('fetching all events')
    store
    .dispatch(getAllEvents())
    .unwrap()
    .then((res:any) => {
      console.log(res.data.events)
      setEvents(res.data.events);
    })
    .catch((error) => { 
      console.log('Error:', error);
    }
    );
  },[])
  return (
    <ScrollView style={styles.tableContainer}>
      {
        events.length>0 ? events.map((event:any)=>(
          event.status !== EVENT_STATUS_MAP.EVENT_INACTIVE && <UpcomingEventBox key={event._id} event={event} />
          
        )
        ):
        <Text style={[globalStyles.semiBoldText,styles.noEventText]}>No Upcoming Events</Text> 
      }
    </ScrollView>
  );
};

export default UpcomingEvents;
