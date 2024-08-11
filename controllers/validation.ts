export const validateUsername = (username: string, minLength: number) => {
  if (username.length < minLength) {
    return false;
  }
  return true;
};
export const validatePassword = (password: string, minLength: number) => {
  if (password.length < minLength) {
    return false;
  }
  return true;
};
export const validateFirstName = (firstName: string, minLength: number) => {
  if (firstName.length < minLength) {
    return false;
  }
  return true;
};
export const validateEmail = (email: string) => {
  const regex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
  return regex.test(email);
};
export const validatePhone = (phone: string) => {
  const regex = /^\d+$/;
  return phone.length === 10 && regex.test(phone);
};
