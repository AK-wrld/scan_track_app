import React, { useEffect, useState } from 'react'
import { Alert, AppState, ScrollView, Text, View } from 'react-native'
import { globalStyles } from '../../Globals/globalStyles'
import Header from '../../components/Header/Header'
import { styles } from './Style'
import { Avatar, Button, Icon } from 'react-native-paper'
import { EVENT_STATUS_MAP, SCAN_STATUS_MAP, primaryBg, primaryText, secondaryDarkBg, secondaryText } from '../../Globals/constants'
import QRModal from '../../components/EventDetails/QRModal/QRModal'
import { useSelector } from 'react-redux'
import store, { RootState } from '../../redux/store/store'
import { checkRegStatus, registerEvent } from '../../redux/api/Events'
import { TRegStatus, TRegisterEvent } from '../../models/Event'
import { EPermissionTypes, usePermissions } from '../../context/usePermissions'
import { PERMISSIONS, check } from 'react-native-permissions'
import { goToSettings } from '../../helper'

type Props = {
    route: any;
  };
const EventDetails = ({route}:Props) => {
    const {event} = route.params
    const [visible,setVisible]= useState<boolean>(false);
    const userState = useSelector((state:RootState)=>state.login)
    const [isRegistered,setIsRegistered] = useState<boolean>(false)
    const [scanStatus,setScanStatus] = useState<string>("SCAN_PENDING")
    const {checkPermission} = usePermissions(EPermissionTypes.LOCATION)
    const [isLocationPermission,setIsLocationPermission] = useState<boolean>(true)
    const [isLocationNeeded,setIsLocationNedded] = useState<boolean>(false)
    const {userId} = userState
    const eventStatus = event?.eventId?.status || event?.status

    const handleModalState = (visible:boolean)=>{
        if(isLocationNeeded && !isLocationPermission) {
            Alert.alert(
                'Permission Denied',
                'Please give permission from settings to continue using location.',
                [
                  {
                    text: 'Cancel',
                    onPress: () =>  console.log("location permission denied"),
                    style: 'cancel',
                  },
                  {text: 'Go To Settings', onPress: () => goToSettings()},
                ],
              );
            
        }
        else {
            console.log("either location is needed and permission is given or location is not needed at all")
            setVisible(visible)
        }
    }
    useEffect(() => {
        const checkLocationPermission = async () => {
            // Check if this event requires location permission to scan QR or not
            console.log("Checking if location is needed for this event");
            // setIsLocationNedded(true) checking if location is being obtained
            // setIsLocationPermission(true)
            console.log(event?.eventId.scan?.location)
            if (event?.eventId?.scan?.location) {
                setIsLocationNedded(true);
                try {
                    const res = await checkPermission(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
                    setIsLocationPermission(res);
                } catch (error) {
                    console.log(error);
                }
            }
        };
    
        checkLocationPermission();
        const handleAppStateChange = async (nextAppState:any) => {
            if (nextAppState === 'active' && isLocationNeeded) {
              // Re-check location permission when app comes to the foreground
              try {
                const res = await checkPermission(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
                setIsLocationPermission(res);
              } catch (error) {
                console.log(error);
              }
            }
          };
      
          const subscription = AppState.addEventListener('change', handleAppStateChange);
      
          return () => {
            subscription.remove();
          };
    }, [event,isLocationNeeded]);
    useEffect(()=> {
        console.log({isLocationPermission,isLocationNeeded})
    })
    useEffect(()=> {
        if(event && event?.scanStatus) setScanStatus(event.scanStatus)
        if(userId && event && !event.registered) {
            console.log("workedddd")
            const reqBody:TRegStatus = {
                eventId:event._id,
                userId
            }
            console.log(reqBody)
            store
            .dispatch(checkRegStatus(reqBody))
            .unwrap()
            .then((res)=>{
                if(res?.status===200) {
                    setIsRegistered(res.data.status)
                    
                }
                else {
                    console.log("Error:",res)
                }
            })
            .catch((error)=>console.log(error?.message))
        }
        else  {
            setIsRegistered(true)
        }
    },[userId,event])
    useEffect(()=> {
        console.log({scanStatus,isRegistered})
    },[isRegistered,scanStatus])
    const handleRegister = ()=> {
        const reqBody: TRegisterEvent = {
            eventId:event._id,
            userId,
            timeOfRegister: new Date()
        }
        console.log({reqBody})
        store
        .dispatch(registerEvent(reqBody))
        .unwrap()
        .then((res)=> {
            console.log(res)
            if(res?.status===200) {
                setIsRegistered(true)
            }
            else {
                console.log("error occured")
            }
        })
        .catch((error)=>console.log(error?.message))
    }
  return (
    <>
    <ScrollView style={[globalStyles.main]}>
        <Header isBackEnabled={true}/>
        {
            visible?<QRModal visible={visible} eventId={event.eventId?._id} isLocationNeeded={isLocationNeeded} handleModalState={handleModalState} setScanStatus={setScanStatus} setVisible={setVisible}/>
            :
            <>
            <View style={styles.title}>
            <View style={styles.content}>
                <View style={styles.logoTitleBox}>
                <Avatar.Icon icon={"email"} size={30}/>
                <Text style={[globalStyles.regularText,styles.titleFont]}>{event?.eventId?.name || event.name}</Text>

                </View>
                <View style={{flexDirection:"row"}}>
                <View style={styles.infoBox}>
                    <View style={styles.labelBox}>
                        <Icon source="trophy-award" size={16} color={secondaryText}></Icon>
                        <View style={{flexDirection:"row"}}>
                        <Text style={[globalStyles.semiBoldText,styles.labels]}>Description: </Text>
                        <Text style={[globalStyles.regularText,styles.labels]}>{event?.eventId?.description || event.description}</Text>
                        </View>
                        
                    </View>
                    <View style={styles.labelBox}>
                        <Icon source="pin" size={16} color={secondaryText}></Icon>
                        <View style={{flexDirection:"row"}}>
                            <Text style={[globalStyles.semiBoldText,styles.labels]}>Venue: </Text>
                        <Text style={[globalStyles.regularText,styles.labels]}>{event?.eventId?.details?.place || event.details.place}</Text>
                        </View>
                    </View>
                    <View style={styles.labelBox}>
                        <Icon source="calendar-check" size={16} color={secondaryText}></Icon>
                        <View style={{flexDirection:"row"}}>
                            <Text style={[globalStyles.semiBoldText,styles.labels]}>Event Date: </Text>
                        <Text style={[globalStyles.regularText,styles.labels]}>{event?.eventId?.details?.eventOn || event.details.eventOn}</Text>
                        </View>
                    </View>
                    <View style={styles.labelBox}>
                        <Icon source="calendar-clock" size={16} color={secondaryText}></Icon>
                        <View style={{flexDirection:"row"}}>
                            <Text style={[globalStyles.semiBoldText,styles.labels]}>Duration: </Text>
                            <Text style={[globalStyles.regularText,styles.labels]}>{event?.eventId?.details?.duration || event.details.duration}</Text>
                        </View>
                       
                    </View>

                </View>
                <View style={styles.registerBox}>
                {
                eventStatus === EVENT_STATUS_MAP.EVENT_ACTIVE && !isRegistered?<Button
                textColor={secondaryText}
                style={styles.registerBtn}
                labelStyle={{fontFamily: 'Poppins-Regular'}}
                rippleColor={secondaryDarkBg}
                onPress={() => handleRegister()}
                >
                    Register
                </Button>
                :
                eventStatus === EVENT_STATUS_MAP.EVENT_ACTIVE && isRegistered && (scanStatus === SCAN_STATUS_MAP.SCAN_PENDING || scanStatus===SCAN_STATUS_MAP.SCAN_REJECTED)?<Button
                textColor={primaryBg}
                style={styles.scanQrBtn}
                labelStyle={{fontFamily: 'Poppins-Regular'}}
                rippleColor={secondaryDarkBg}
                onPress={() => handleModalState(true)}
                >
                Scan QR
                </Button>
                :
                isRegistered && scanStatus?<Button
                textColor={primaryBg}
                style={styles.attendedBtn}
                labelStyle={{fontFamily: 'Poppins-Regular'}}
                rippleColor={secondaryDarkBg}
                // disabled
                >
                    Attended
                </Button>
                :
                null
            }
                </View> 
                </View>
            </View>
        </View>
        {isRegistered?<View style={styles.title}>
            <View style={styles.content}>
                <View style={styles.logoTitleBox}>
                    <Avatar.Icon icon={"account-group"} size={30}/>
                    <Text style={[globalStyles.regularText,styles.titleFont]}>Team Details</Text>
                </View>
                <Text style={[styles.labels,{marginTop:7},globalStyles.regularText]}>Your team id: <Text style={globalStyles.semiBoldText}>{event?.userId?._id}</Text></Text>
                <View style={{flexDirection:"row"}}>
                <View style={styles.registerInfoBox}>
                    <View style={styles.teamInfoBox}>
                    <Icon source="account-group" size={20} color={secondaryText}></Icon>
                        <View>
                            <Text style={[globalStyles.semiBoldText,styles.labels]}>Team Leader</Text>
                            <Text style={[globalStyles.regularText,styles.labels]}>{event?.userId?.name}</Text>
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
                            <Text style={[globalStyles.regularText,styles.labels]}>Coming Soon</Text>
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
        :
        <View style={styles.title}>
        <View style={styles.content}>
            <View style={styles.logoTitleBox}>
                <Avatar.Icon icon={"account-group"} size={30}/>
                <Text style={[globalStyles.regularText,styles.titleFont]}>Team Details</Text>
            </View>
            
            <View style={{flexDirection:"row"}}>
            <View style={styles.registerInfoBox}>
                <View style={styles.teamInfoBox}>
                <Icon source="account-group" size={20} color={secondaryText}></Icon>
                    <View>
                        <Text style={[globalStyles.semiBoldText,styles.labels]}>Total Participants</Text>
                        <Text style={[globalStyles.regularText,styles.labels]}>{event?.eventId?.details?.participants || event.details.participants}</Text>
                    </View>
                </View>
                <View style={styles.teamInfoBox}>
                <Icon source="calendar-clock" size={20} color={secondaryText}></Icon>
                    <View>
                        <Text style={[globalStyles.semiBoldText,styles.labels]}>Deadline</Text>
                        <Text style={[globalStyles.regularText,styles.labels]}>Coming Soon</Text>
                        {/* to be made dynamic */}
                    </View>
                </View>
              
               
            </View>
            <View style={styles.registerInfoBox}>
            <View style={styles.teamInfoBox}>
                <Icon source="account-multiple-check" size={20} color={secondaryText}></Icon>
                    <View >
                        <Text style={[globalStyles.semiBoldText,styles.labels]}>Team Size</Text>
                        <Text style={[globalStyles.regularText,styles.labels]}>4</Text>
                    </View>
                </View>
                <View style={styles.teamInfoBox}>
                <Icon source="account-alert" size={20} color={secondaryText}></Icon>
                    <View >
                        <Text style={[globalStyles.semiBoldText,styles.labels]}>Team Status</Text>
                        <Text style={[globalStyles.regularText,styles.labels]}>Pending</Text>
                    </View>
                </View>
            </View>

            </View>
        </View>
    </View>}
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