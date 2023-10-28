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



function setupXsrfInterceptor(xsrfToken: string) {
  axiosInstance.interceptors.request.use(config => {
    if (xsrfToken) {
      config.headers['X-XSRF-TOKEN'] = xsrfToken;
    }
    return config;
  });
}

export { axiosInstance, setupXsrfInterceptor };