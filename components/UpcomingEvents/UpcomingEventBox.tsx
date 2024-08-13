import React from 'react'
import { View } from 'react-native'

import { Avatar, Button, Chip, Icon, Text } from 'react-native-paper'
import { globalStyles } from '../../Globals/globalStyles'
import { primaryText, secondaryBg, secondaryDarkBg, secondaryText } from '../../Globals/constants'
import { styles } from './Style'

const UpcomingEventBox = () => {
  return (
    <View style={styles.tableContent}>
        <View style={styles.headingContent}>
            <View style={styles.iconContainer}>
                <Avatar.Icon icon={"email"} size={30}/>
            </View>
            <View style={styles.detailsContainer}>
                <Text style={[globalStyles.boldText,{color:secondaryBg}]}>Event Name</Text>
                <View style={styles.detailsBottom}>
                <View style={styles.datesContainer}>
                    <Text style={[globalStyles.semiBoldText,styles.normalSize]}>Deadline: </Text> 
                    <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
                    <Text style={[globalStyles.regularText,styles.normalSize,{marginRight:10}]}>15 July 24, 07:22 PM 
                    </Text>
                    
                    <Chip
                    
                    compact={true}
                    style={{backgroundColor:primaryText}}
                    
                    textStyle={[globalStyles.regularText,styles.normalSize,{color:secondaryDarkBg}]}>Scan QR</Chip>
                   

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
              labelStyle={{fontFamily: 'Poppins-Regular'}}
              rippleColor={secondaryBg}
              mode="contained"
            
              style={styles.detailsBtn}
            >
              View Details
            </Button>
        </View>
        </View>
  )
}

export default UpcomingEventBox