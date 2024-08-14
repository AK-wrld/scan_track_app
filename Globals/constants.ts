export const primaryBg = '#0e1321';
export const secondaryBg = '#61c296';
export const primaryText = '#ffc233';
export const secondaryText = '#fcf2ed';
export const secondaryDarkBg = '#1c4533';
export const bgError = '#fd5c63';
export const quote = 'Your Partner in Efficient Attendance Management.';
export const cookieNames = {
    jwtToken:"jwtToken"
}
export const BASE_URL = process.env.SCAN_TRACK_BASE_URL || "http://scanTrack-api/vi"

export const API_ENDPOINTS = {
    signin: `${BASE_URL}/profile/login`,
    signup: `${BASE_URL}/profile/login/create`
}

export const EVENT_STATUS = {
    REGISTERED:"Registered",
    LIVE:"Live",
    ENDED:"Ended"
}