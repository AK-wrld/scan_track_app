import React, { useCallback, useEffect, useState } from 'react'
import { Button, Icon, Modal, Text } from 'react-native-paper'
import { SCAN_STATUS_MAP, primaryBg, secondaryBg } from '../../../Globals/constants'
import { styles } from './Style'
import { globalStyles } from '../../../Globals/globalStyles'
import { Alert, BackHandler, TouchableOpacity, View } from 'react-native'
import { PERMISSIONS, RESULTS } from 'react-native-permissions'
import { goToSettings } from '../../../helper'
import { EPermissionTypes, usePermissions } from '../../../context/usePermissions'
import { CameraScanner } from '../../CameraScanner/CameraScanner'
import { useSelector } from 'react-redux'
import store, { RootState } from '../../../redux/store/store'
import { sendQrRegister } from '../../../redux/api/Qr'
import Geolocation from 'react-native-geolocation-service';
import { TLocationVerification } from '../../../models/Location'
import { locationVerificationApi } from '../../../redux/api/Location'
type Props = {
    visible:boolean,
    isLocationNeeded:boolean,
    eventId:string
    handleModalState: (visible:boolean)=>void
    setScanStatus: React.Dispatch<React.SetStateAction<string>>
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
}
const QRModal = ({visible,isLocationNeeded,eventId,handleModalState,setScanStatus,setVisible}:Props) => {
  const {askPermissions} = usePermissions(EPermissionTypes.CAMERA);
  const [cameraShown, setCameraShown] = useState(false);
  const userState = useSelector((state: RootState) => state.login);
  const [qrText, setQrText] = useState('');

  let items = [
    {
      id: 1,
      title: 'QR code Scanner',
    },
  ];

  const handleBackButtonClick = useCallback(() => {
    if (cameraShown) {
      console.log("Back button pressed in QRModal");
      setCameraShown(false);
      BackHandler.exitApp();
      return true;
    }
    return false;
  }, [cameraShown]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => backHandler.remove(); // Clean up the back handler
  }, [handleBackButtonClick]);


  const takePermissions = async () => {
    askPermissions(PERMISSIONS.ANDROID.CAMERA)
      .then(response => {
        //permission given for camera
        if (
          response.type === RESULTS.LIMITED ||
          response.type === RESULTS.GRANTED
        ) {
          setCameraShown(true);
        }
      })
      .catch(error => {
        if ('isError' in error && error.isError) {
          Alert.alert(
            error.errorMessage ||
              'Something went wrong while taking camera permission',
          );
        }
        if ('type' in error) {
          if (error.type === RESULTS.UNAVAILABLE) {
            Alert.alert('This feature is not supported on this device');
          } else if (
            error.type === RESULTS.BLOCKED ||
            error.type === RESULTS.DENIED
          ) {
            Alert.alert(
              'Permission Denied',
              'Please give permission from settings to continue using camera.',
              [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {text: 'Go To Settings', onPress: () => goToSettings()},
              ],
            );
          }
        }
      });
  };
  useEffect(() => {
    if (visible) {
      takePermissions();
    }
  }
  , [visible]);
  const handleReadCode = (value: string) => {
    console.log(value);
    // setQrText(value);
    if(isLocationNeeded) {
      Geolocation.getCurrentPosition(
        (position) => {
          console.log(position.coords.latitude, position.coords.longitude);
          //LOCATION VERIFICATION API ENDPOINT AFTER WHICH IF RESPONSE IF SUCCESFUL THEN CALL SCAN QR API
          const reqBody:TLocationVerification = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            eventId
          }
          store
          .dispatch(locationVerificationApi(reqBody))
          .unwrap()
          .then((res: any) => {
            console.log(res?.error)
            if(res.status===200 || res.status===201) {
              console.log("Location Verified",res);
              store
              .dispatch(sendQrRegister({link: value, timestamp: Date.now(), userId: userState.userId}))
              .unwrap()
              .then((res: any) => {
                console.log("resss",res.data.participation.scanStatus);
                if(res?.data?.participation?.scanStatus===SCAN_STATUS_MAP.SCAN_REJECTED) {
                  setQrText('Scan Rejected')
                  console.warn('Scan Rejected')
                  setScanStatus(SCAN_STATUS_MAP.SCAN_REJECTED)
                }
                else {
                  setQrText('Scan Accepted')
                  console.warn('Scan Accepted')
                  setScanStatus(SCAN_STATUS_MAP.SCAN_ACCEPTED)
                }
                setCameraShown(false);
                setVisible(false);
              })
              .catch((error) => {
                console.log('Error:', error?.message);
                setCameraShown(false);
                setVisible(false);
              });
            }
            else {
              console.warn("Location not verified");
              setCameraShown(false);
                setVisible(false);
            }
          })
          .catch((error:any) => {
            // console.warn('Error:', error.message);
            Alert.alert('Location not verified',
                          error.message);
            setCameraShown(false);
                setVisible(false);
          }
          );
        },
        (error) => {
          console.log(error?.code, error?.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
    }
    


  };
  // useEffect(()=>{
  //   console.log(cameraShown)
  // },[cameraShown])
  return (
    <>
      <View style={styles.modal}>
        <Button
          style={styles.closeIcon}
          icon="close"
          mode="contained"
          onPress={() => handleModalState(false)}
          children={undefined}
        />
        <Text style={[globalStyles.semiBoldText, styles.title]}>QR Code</Text>
        <Text style={[globalStyles.italicText, styles.qrText]}>
          {qrText}
        </Text>
        {/* {items.map(eachItem => {
          return (
            <TouchableOpacity
              onPress={takePermissions}
              activeOpacity={0.5}
              key={eachItem.id}
              style={styles.itemContainer}
            >
              <Text style={styles.itemText}>{eachItem.title}</Text>
            </TouchableOpacity>
          );
        })} */}
        {cameraShown && (
          <CameraScanner
            setIsCameraShown={setCameraShown}
            onReadCode={handleReadCode}
          />
        )}
      </View>
    </>
  );
}


export default QRModal