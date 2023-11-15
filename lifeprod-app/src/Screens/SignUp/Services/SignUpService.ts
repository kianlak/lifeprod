import { axiosInstance } from "../../../Axios";
import EventEmitter from "../../../Components/Utilities/EventEmitter";

const BASE_URL = 'http://localhost:8080/api/user';

export const signUpRequest = async (user: SignUpInfo): Promise<boolean> => {
  return axiosInstance.post(`${BASE_URL}/signup`, user)
  .then(response => {
    EventEmitter.dispatch({
      eventType: 'set-alert', 
      eventPayload: {
        alertType: 'success',
        alertMessage: "User registered"
      }
    });

    sessionStorage.setItem('user-id', response.data);

    return true;
  })
  .catch(error => {
    EventEmitter.dispatch({
      eventType: 'set-alert', 
      eventPayload: {
        alertType: 'error',
        alertMessage: error.response.data
      }
    });

    return false;
  })
}