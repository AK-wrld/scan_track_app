import React from 'react'
import { View } from 'react-native'
import { styles } from './Style'
import { Avatar, Button, Chip, Icon, Text } from 'react-native-paper'
import { globalStyles } from '../../Globals/globalStyles'
import { primaryText, secondaryBg, secondaryText, EVENT_STATUS, bgError } from '../../Globals/constants';
import {useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../../models/StackNavigationModel'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
type EventStatusType = typeof EVENT_STATUS[keyof typeof EVENT_STATUS];
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Dashboard'>;
type Props = {
  eventStatus:EventStatusType,

}
const RegisteredEventBox = ({eventStatus}:Props) => {
  const navigation = useNavigation<NavigationProp>();
  return (
    <View style={styles.tableContent}>
        <View style={styles.headingContent}>
            <View style={styles.iconContainer}>
                <Avatar.Icon icon={"email"} size={30}/>
            </View>
            <View style={styles.detailsContainer}>
                <Text style={[globalStyles.boldText,{color:primaryText}]}>Event Name</Text>
                <View style={styles.detailsBottom}>
                <View style={styles.datesContainer}>
                    <Text style={[globalStyles.semiBoldText,styles.normalSize]}>Registered On: <Text style={[globalStyles.regularText,styles.normalSize]}>15 July 24, 07:22 PM </Text> </Text>
                    <Text style={[globalStyles.semiBoldText,styles.normalSize]}>Deadline: </Text> 
                    <View style={{flexDirection:"row",alignItems:"center"}}>
                    <Text style={[globalStyles.regularText,styles.normalSize,{marginRight:10}]}>15 July 24, 07:22 PM 
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
                    <Text style={[globalStyles.semiBoldText,styles.normalSize]}>By: <Text style={[globalStyles.regularText,styles.normalSize]}> Apurba Koley (apurbakoley43@gmail.com)</Text></Text>
        </View>
        <View style={styles.buttonsContainer}>
            <Button
              labelStyle={{fontFamily: 'Poppins-Regular'}}
              rippleColor={secondaryBg}
              mode="contained"
              onPress={()=>navigation && navigation.navigate("EventDetails")}
              style={styles.detailsBtn}
            >
              View Details
            </Button>
        </View>
        </View>
  )
}

export default RegisteredEventBox