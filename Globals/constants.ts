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
export const BASE_URL = process.env.SCAN_TRACK_BASE_URL || "https://scan-track-manager.vercel.app/scanTrack-api/v1"
// export const BASE_URL = "http://localhost:8000/scanTrack-api/v1"

export const API_ENDPOINTS = {
    login: `${BASE_URL}/profile/login`,
    signup: `${BASE_URL}/profile/create`,
    getEvents: `${BASE_URL}/event/all/get`,
    checkRegisterationStatus: `${BASE_URL}/participant/register/status`,
    registerEvent: `${BASE_URL}/participant/register`,
    getRegisteredEvents: `${BASE_URL}/participant/register/user`,
    verifyLocation: `${BASE_URL}/participant/location`,
    
}

export const EVENT_STATUS = {
    REGISTERED:"Registered",
    LIVE:"Live",
    ENDED:"Ended"
}

export const ACCOUNT_STATUS = {
    ACTIVE:"Active",
    INACTIVE:"Inactive"
}

export const EVENT_STATUS_MAP = {
    EVENT_ACTIVE: "EVENT_ACTIVE",
    EVENT_INACTIVE: "EVENT_INACTIVE",
    EVENT_LIVE: "EVENT_LIVE",
}

export const SCAN_STATUS_MAP = {
    SCAN_PENDING: "SCAN_PENDING",
    SCAN_REJECTED: "SCAN_REJECTED",
    SCAN_ACCEPTED: "SCAN_ACCEPTED",
    SCAN_PROCESSING: "SCAN_PROCESSING",
}