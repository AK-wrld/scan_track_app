import React, { useEffect } from 'react'
import { View } from 'react-native'

import { Avatar, Button, Chip, Icon, Text } from 'react-native-paper'
import { globalStyles } from '../../Globals/globalStyles'
import { EVENT_STATUS_MAP, bgError, primaryText, secondaryBg, secondaryText} from '../../Globals/constants'
import { styles } from './Style'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../models/StackNavigationModel'
import { useNavigation } from '@react-navigation/native'
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Dashboard'>;
type props = {
  event:any
}
const UpcomingEventBox = ({event}:props) => {
  const navigation = useNavigation<NavigationProp>();
  const isOpen = event.status
  
  return (
    <View style={styles.tableContent}>
        <View style={styles.headingContent}>
            <View style={styles.iconContainer}>
                <Avatar.Icon icon={"email"} size={30}/>
            </View>
            <View style={styles.detailsContainer}>
                <Text style={[globalStyles.boldText,{color:secondaryBg}]}>{event?.name}</Text>
                <View style={styles.detailsBottom}>
                <View style={styles.datesContainer}>
                    <Text style={[globalStyles.semiBoldText,styles.normalSize]}>Deadline: </Text> 
                    <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
                    <Text style={[globalStyles.regularText,styles.normalSize,{marginRight:10}]}>15 July 24, 07:22 PM 
                    </Text>
                    
                    <Chip
                    icon={() => <Icon size={16} source={isOpen===EVENT_STATUS_MAP.EVENT_ACTIVE?"check": isOpen===EVENT_STATUS_MAP.EVENT_LIVE?"access-point":"close"} color={secondaryText} />}
                    compact={true}
                    style={{backgroundColor:isOpen===EVENT_STATUS_MAP.EVENT_ACTIVE?secondaryBg:isOpen===EVENT_STATUS_MAP.EVENT_LIVE?primaryText:bgError}}
                    
                    textStyle={[globalStyles.regularText,styles.normalSize]}>{isOpen===EVENT_STATUS_MAP.EVENT_ACTIVE?"Open":isOpen===EVENT_STATUS_MAP.EVENT_LIVE?"Live":"Registerations Closed"}</Chip>
                   

                    </View>
              
                </View>
                
                </View>
                
            </View>
           
        </View>
        {/* <View style={styles.teamDetailsContainer}>
                    <Text style={[globalStyles.semiBoldText,styles.normalSize]}>By: <Text style={[globalStyles.regularText,styles.normalSize]}> Apurba Koley (apurbakoley43@gmail.com)</Text></Text>
        </View> */}
        <View style={styles.buttonsContainer}>
            <Button
              labelStyle={{fontFamily: 'Poppins-Regular',color:secondaryText}}
              rippleColor={secondaryBg}
              mode="contained"
              onPress={()=>navigation && navigation.navigate("EventDetails",{event})}
              style={styles.detailsBtn}
            >
              View Details
            </Button>
        </View>
        </View>
  )
}

export default UpcomingEventBox