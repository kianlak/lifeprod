import { axiosInstance } from "../../../Axios";
import EventEmitter from "../../../Components/Utilities/EventEmitter";

const BASE_URL = 'http://localhost:8080/api/entry';

export const entryRequest = async (request: EntryRequest): Promise<boolean> => {
  return axiosInstance.post(`${BASE_URL}/submit`, request)
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