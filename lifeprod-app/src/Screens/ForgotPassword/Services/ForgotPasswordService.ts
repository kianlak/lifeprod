import { axiosInstance } from "../../../Axios";
import EventEmitter from "../../../Components/Utilities/EventEmitter";

const BASE_URL = 'http://localhost:8080/api/fp';

export const sendEmailWithTokenRequest = async (email: string): Promise<boolean> => {
  const requestData = { email: email };
  console.log(requestData);

  return axiosInstance.post(`${BASE_URL}/generate`, requestData)
  .then(response => {
    EventEmitter.dispatch({
      eventType: 'set-alert', 
      eventPayload: {
        alertType: 'success',
        alertMessage: response.data
      }
    });

    sessionStorage.setItem("temp-user-email", email);

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

export const sendNewPasswordWithTokenRequest = async (details: ForgotPasswordDetails): Promise<boolean> => {
  return axiosInstance.post(`${BASE_URL}/passwordreset`, details)
  .then(response => {
    EventEmitter.dispatch({
      eventType: 'set-alert', 
      eventPayload: {
        alertType: 'success',
        alertMessage: response.data
      }
    });
    
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