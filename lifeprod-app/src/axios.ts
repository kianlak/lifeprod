import axios from 'axios';

const username = 'devuser';
const password = 'devpassword';
const base64Credentials = btoa(username + ':' + password);

const axiosInstance = axios.create({
  withCredentials: true,
  headers: {
    'Authorization': 'Basic ' + base64Credentials
  }
});

axiosInstance.interceptors.request.use(
  config => {
    config.headers['X-XSRF-TOKEN'] = sessionStorage.getItem("xsrf-token");
    return config;
  },
  error => {
    // Handle request error
    console.error('Request Error', error);
    return Promise.reject(error);
  }
);

export { axiosInstance };
