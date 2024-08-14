import React, { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { globalStyles } from '../../Globals/globalStyles'
import Header from '../../components/Header/Header'
import { styles } from './Style'
import { Avatar, Button, Icon } from 'react-native-paper'
import { secondaryDarkBg, secondaryText } from '../../Globals/constants'
import QRModal from '../../components/EventDetails/QRModal/QRModal'


const EventDetails = () => {
    const [visible,setVisible]= useState<boolean>(false);
    const handleModalState = (visible:boolean)=>{
        setVisible(visible)
    }
  return (
    <>
    <ScrollView style={[globalStyles.main]}>
        <Header isBackEnabled={true}/>
        {
            visible?<QRModal visible={visible} handleModalState={handleModalState}/>
            :
            <>
            <View style={styles.title}>
            <View style={styles.content}>
                <View style={styles.logoTitleBox}>
                <Avatar.Icon icon={"email"} size={30}/>
                <Text style={[globalStyles.regularText,styles.titleFont]}>Flipkart Grid 6.0</Text>

                </View>
                <View style={{flexDirection:"row"}}>
                <View style={styles.infoBox}>
                    <View style={styles.labelBox}>
                        <Icon source="trophy-award" size={16} color={secondaryText}></Icon>
                        <View style={{flexDirection:"row"}}>
                        <Text style={[globalStyles.semiBoldText,styles.labels]}>Flipkart Grid 6.0</Text>
                        <Text style={[globalStyles.regularText,styles.labels]}> - Flipkart</Text>
                        </View>
                        
                    </View>
                    <View style={styles.labelBox}>
                        <Icon source="pin" size={16} color={secondaryText}></Icon>
                        <View style={{flexDirection:"row"}}>
                            <Text style={[globalStyles.semiBoldText,styles.labels]}>Mode: </Text>
                        <Text style={[globalStyles.regularText,styles.labels]}>Online</Text>
                        </View>
                    </View>
                    <View style={styles.labelBox}>
                        <Icon source="calendar-check" size={16} color={secondaryText}></Icon>
                        <View style={{flexDirection:"row"}}>
                            <Text style={[globalStyles.semiBoldText,styles.labels]}>Created On: </Text>
                        <Text style={[globalStyles.regularText,styles.labels]}>Aug 14, 2024</Text>
                        </View>
                    </View>
                    <View style={styles.labelBox}>
                        <Icon source="calendar-clock" size={16} color={secondaryText}></Icon>
                        <View style={{flexDirection:"row"}}>
                            <Text style={[globalStyles.semiBoldText,styles.labels]}>Deadline: </Text>
                            <Text style={[globalStyles.regularText,styles.labels]}>Aug 20, 2024</Text>
                        </View>
                       
                    </View>

                </View>
                <View style={styles.registerBox}>
                <Button
              textColor={secondaryText}
              style={styles.registerBtn}
              labelStyle={{fontFamily: 'Poppins-Regular'}}
              rippleColor={secondaryDarkBg}
              onPress={() => handleModalState(true)}
            >
              Scan QR
            </Button>
                </View> 
                </View>
            </View>
        </View>
        <View style={styles.title}>
            <View style={styles.content}>
                <View style={styles.logoTitleBox}>
                    <Avatar.Icon icon={"account-group"} size={30}/>
                    <Text style={[globalStyles.regularText,styles.titleFont]}>Team Details</Text>
                </View>
                <Text style={[styles.labels,{marginTop:7},globalStyles.regularText]}>Your team id: <Text style={globalStyles.semiBoldText}>12345</Text></Text>
                <View style={{flexDirection:"row"}}>
                <View style={styles.registerInfoBox}>
                    <View style={styles.teamInfoBox}>
                    <Icon source="account-group" size={20} color={secondaryText}></Icon>
                        <View>
                            <Text style={[globalStyles.semiBoldText,styles.labels]}>Team Leader</Text>
                            <Text style={[globalStyles.regularText,styles.labels]}>Apurba Koley</Text>
                        </View>
                    </View>
                    <View style={styles.teamInfoBox}>
                    <Icon source="account-multiple-check" size={20} color={secondaryText}></Icon>
                        <View >
                            <Text style={[globalStyles.semiBoldText,styles.labels]}>Team Size</Text>
                            <Text style={[globalStyles.regularText,styles.labels]}>4</Text>
                        </View>
                    </View>
                   
                </View>
                <View style={styles.registerInfoBox}>
                    <View style={styles.teamInfoBox}>
                    <Icon source="account-multiple-check" size={20} color={secondaryText}></Icon>
                        <View>
                            <Text style={[globalStyles.semiBoldText,styles.labels]}>Registered On</Text>
                            <Text style={[globalStyles.regularText,styles.labels]}>Aug 14,2024</Text>
                        </View>
                    </View>
                    <View style={styles.teamInfoBox}>
                    <Icon source="account-alert" size={20} color={secondaryText}></Icon>
                        <View >
                            <Text style={[globalStyles.semiBoldText,styles.labels]}>Team Status</Text>
                            <Text style={[globalStyles.regularText,styles.labels]}>Attendance Pending</Text>
                        </View>
                    </View>
                </View>

                </View>
            </View>
        </View>
        <View style={styles.title}>
            <View style={styles.content}>
                <View style={styles.logoTitleBox}>
                    <Avatar.Icon icon={"timeline-clock"} size={30}/>
                    <Text style={[globalStyles.regularText,styles.titleFont]}>Stages and Timeline</Text>
                </View>
                <Text style={[globalStyles.regularText,styles.labels,{marginTop:14}]}>To be released</Text>
            </View>
        </View>
            </>
        }
        
        
    </ScrollView>
    </>
  )
}

export default EventDetails