export type TRegisterEvent = {
    eventId: string
    userId:string
    timeOfRegister:Date
}
export type TRegStatus = {
    eventId: string
    userId:string
}
export type TGetRegisteredEvents = {
    userId:string
}
