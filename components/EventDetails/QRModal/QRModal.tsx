import React, { useCallback, useEffect, useState } from 'react'
import { Button, Icon, Modal, Text } from 'react-native-paper'
import { SCAN_STATUS_MAP, primaryBg, secondaryBg } from '../../../Globals/constants'
import { styles } from './Style'
import { globalStyles } from '../../../Globals/globalStyles'
import { Alert, BackHandler, TouchableOpacity, View } from 'react-native'
import { RESULTS } from 'react-native-permissions'
import { goToSettings } from '../../../helper'
import { EPermissionTypes, usePermissions } from '../../../context/usePermissions'
import { CameraScanner } from '../../CameraScanner/CameraScanner'
import { useSelector } from 'react-redux'
import store, { RootState } from '../../../redux/store/store'
import { sendQrRegister } from '../../../redux/api/Qr'
type Props = {
    visible:boolean,
    handleModalState: (visible:boolean)=>void
    setScanStatus: React.Dispatch<React.SetStateAction<string>>
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
}
const QRModal = ({visible,handleModalState,setScanStatus,setVisible}:Props) => {
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
    askPermissions()
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
      console.log('Error:', error);
      setCameraShown(false);
      setVisible(false);
    });


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