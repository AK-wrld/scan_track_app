import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { styles } from './Style'
import { Avatar, Button, Chip, Icon, Text } from 'react-native-paper'
import { globalStyles } from '../../Globals/globalStyles'
import { primaryText, secondaryBg, secondaryText, EVENT_STATUS, bgError, EVENT_STATUS_MAP } from '../../Globals/constants';
import {useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../../models/StackNavigationModel'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Dashboard'>;
type Props = {
  event: any
}
const RegisteredEventBox = ({event}:Props) => {
  const navigation = useNavigation<NavigationProp>();
  const [eventStatus,setEventStatus] = useState(EVENT_STATUS.REGISTERED)
  useEffect(()=> {
    if(event?.eventId?.status === EVENT_STATUS_MAP.EVENT_ACTIVE && event?.registered){
      setEventStatus(EVENT_STATUS.REGISTERED)
    }
    else if(event?.eventId?.status === EVENT_STATUS_MAP.EVENT_LIVE){
      setEventStatus(EVENT_STATUS.LIVE)
    }
    else if(event?.eventId?.status === EVENT_STATUS_MAP.EVENT_INACTIVE){
      setEventStatus(EVENT_STATUS.ENDED)
    }
  })
  return (
    <View style={styles.tableContent}>
        <View style={styles.headingContent}>
            <View style={styles.iconContainer}>
                <Avatar.Icon icon={"email"} size={30}/>
            </View>
            <View style={styles.detailsContainer}>
                <Text style={[globalStyles.boldText,{color:primaryText}]}>{event?.eventId?.name}</Text>
                <View style={styles.detailsBottom}>
                <View style={styles.datesContainer}>
                    <Text style={[globalStyles.semiBoldText,styles.normalSize]}>Registered On: <Text style={[globalStyles.regularText,styles.normalSize]}>Coming Soon  </Text> </Text>
                    <Text style={[globalStyles.semiBoldText,styles.normalSize]}>Deadline: </Text> 
                    <View style={{flexDirection:"row",alignItems:"center"}}>
                    <Text style={[globalStyles.regularText,styles.normalSize,{marginRight:10}]}>Coming Soon
                    </Text>
                    
                    <Chip
                    icon={() => <Icon size={16} source={eventStatus===EVENT_STATUS.REGISTERED?"check": eventStatus===EVENT_STATUS.LIVE?"access-point":"close"} color={secondaryText} />}
                    compact={true}
                    style={{backgroundColor:eventStatus===EVENT_STATUS.REGISTERED?secondaryBg:eventStatus===EVENT_STATUS.LIVE?primaryText:bgError}}
                    textStyle={[globalStyles.regularText,styles.normalSize]}>{
                      eventStatus===EVENT_STATUS.REGISTERED? "Registered"
                      : 
                      eventStatus===EVENT_STATUS.LIVE ? "Live"
                      :
                      "Ended"
                    }</Chip>
                   

                    </View>
                </View>
                
                </View>
                
            </View>
           
        </View>
        <View style={styles.teamDetailsContainer}>
                    <Text style={[globalStyles.semiBoldText,styles.normalSize]}>By: <Text style={[globalStyles.regularText,styles.normalSize]}> {event?.userId?.name} ({event?.userId?.contact[0]?.value})</Text></Text>
        </View>
        <View style={styles.buttonsContainer}>
            <Button
              labelStyle={{fontFamily: 'Poppins-Regular',color:secondaryText}}
              rippleColor={secondaryBg}
              mode="contained"
              onPress={()=>navigation && navigation.navigate("EventDetails",{event:event})}
              style={styles.detailsBtn}
            >
              View Details
            </Button>
        </View>
        </View>
  )
}

export default RegisteredEventBox