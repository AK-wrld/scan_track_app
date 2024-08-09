export const validateUsername = (username:string,minLength:number)=> {
    if(username.length<minLength) return false;
    return true;
}
export const validatePassword = (password:string,minLength:number)=> {
    if(password.length<minLength) return false;
    return true;
}