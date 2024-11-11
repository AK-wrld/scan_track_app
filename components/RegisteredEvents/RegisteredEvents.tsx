import React, { useEffect } from 'react'
import { ScrollView, View,Text } from 'react-native'
import { styles } from './Style';
import { Avatar, Button, Chip, Divider, Icon  } from 'react-native-paper';
import { globalStyles } from '../../Globals/globalStyles';
import { EVENT_STATUS, primaryText, secondaryBg, secondaryText } from '../../Globals/constants';
import RegisteredEventBox from './RegisteredEventBox';
import store, { RootState } from '../../redux/store/store';
import { getRegisteredEventsApi } from '../../redux/api/Events';
import { useSelector } from 'react-redux';
import { TGetRegisteredEvents } from '../../models/Event';
type EventStatus = keyof typeof EVENT_STATUS;
const RegisteredEvents = () => {
  const userState = useSelector((state:RootState)=>state.login)
  const [registeredEvents,setRegisteredEvents] = React.useState([]);
  useEffect(()=> {
    const reqBody: TGetRegisteredEvents = {
      userId:userState.userId
    }
    store
    .dispatch(getRegisteredEventsApi(reqBody))
    .unwrap()
    .then((res:any) => {
      console.log(res?.data?.registeredEvents)
      setRegisteredEvents(res?.data?.registeredEvents);
    })
    .catch((error) => { 
      console.log('Error:', error);
    }
    );
  },[])
  return (
    <>
    <ScrollView style={styles.tableContainer}>
      {
        registeredEvents?.length>0 ? registeredEvents.map((event:any)=>{
        
          return <RegisteredEventBox key={event._id} event={event}/>
        }
          
        
        ):
        <Text style={[globalStyles.semiBoldText]}>No Registered Events</Text>
      }
       
    </ScrollView>
    </>
  )
}

export default RegisteredEvents