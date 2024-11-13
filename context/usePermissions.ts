import {useCallback} from 'react';
import { Platform } from 'react-native';
import {PERMISSIONS, RESULTS, check, request} from 'react-native-permissions';
import { isAndroid, isIos } from '../helper';

export type TUsePermissionsReturnType = {
  isError?: boolean;
  type: (typeof RESULTS)[keyof typeof RESULTS];
  errorMessage?: string;
};

export enum EPermissionTypes {
  CAMERA = 'camera',
  LOCATION = 'location',
}

export const usePermissions = (typeOfPermission: EPermissionTypes) => {
  const getPermission = useCallback(() => {
    //check if typeOfPermission exist in EPermissionTypes
    console.log(typeOfPermission)
    if (
      !typeOfPermission ||
      !Object.values(EPermissionTypes).includes(typeOfPermission)
    ) {
      throw new Error('Unsupported Type of permission.');
    }
    if (isIos) {
      switch (typeOfPermission) {
        case EPermissionTypes.CAMERA:
          return PERMISSIONS.IOS.CAMERA;
        case EPermissionTypes.LOCATION:
          return PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
        default:
          return PERMISSIONS.IOS.CAMERA;
      }
    }

    if (isAndroid) {
      switch (typeOfPermission) {
        case EPermissionTypes.CAMERA:
          return PERMISSIONS.ANDROID.CAMERA;

        case EPermissionTypes.LOCATION:
          return PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
        default:
          return PERMISSIONS.ANDROID.CAMERA;
      }
    }

    throw new Error('Unsupported Operating System.');
  }, [typeOfPermission]);

  const askPermissions =
    useCallback(async (permission:any): Promise<TUsePermissionsReturnType> => {
      return new Promise<TUsePermissionsReturnType>(async (resolve, reject) => {
        //ask permissions from user
        //if error present, return error
        
        try {
        //   await request(getPermission()).then(result => {
          request(permission).then(result => {
            switch (result) {
              case RESULTS.UNAVAILABLE:
                   
                return reject({
                  type: RESULTS.UNAVAILABLE,
                });
              case RESULTS.DENIED:
                
                return reject({
                  type: RESULTS.DENIED,
                });
              case RESULTS.GRANTED:
                return resolve({
                  type: RESULTS.GRANTED,
                });
              case RESULTS.BLOCKED:
                return reject({
                  type: RESULTS.BLOCKED,
                });
              case RESULTS.LIMITED:
                return resolve({
                  type: RESULTS.LIMITED,
                });
            }
          });
        } catch (e: {data: {message: string | undefined}} | any) {
            
          return reject({
            isError: true,
            errorMessage:
              e?.data?.message ||
              e.message ||
              'Something went wrong while asking for permissions.',
          });
        }
      });
    }, [getPermission]);
    const checkPermission = async (permission:any): Promise<boolean> => {
      return await check(permission).then((status) => {
        switch (status) {
          case RESULTS.UNAVAILABLE:
            return false;
          case RESULTS.DENIED:
            return false;
          case RESULTS.BLOCKED:
            return false;
          case RESULTS.GRANTED:
            return true;
          case RESULTS.LIMITED:
            return true;
        }
      });
    }
  return {
    askPermissions,
    checkPermission
  };
};