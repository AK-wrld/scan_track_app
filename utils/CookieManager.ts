import CookieManager from '@react-native-cookies/cookies';
import { Cookie } from '../models/CookieModel';
const baseUrl = process.env.SCAN_TRACK_BASE_URL ||  "http://scanTrack-api/vi"
export function setCookie(name: string, value: string, minutes?: string){
    const cookie:Cookie = {
        name,
        value,
    }
    CookieManager.set(baseUrl,cookie);
}

export const getCookie = (name:string)=> {
    CookieManager.get(baseUrl)
    .then((cookies) => {
      return cookies[name];
    });
}
