import axios from 'axios';

const username = 'devuser';
const password = 'devpassword';
const base64Credentials = btoa(username + ':' + password);

const axiosInstance = axios.create({
  withCredentials: true,
  headers: {
    'Authorization': 'Basic ' + base64Credentials,
  }
});

axiosInstance.interceptors.request.use(
  config => {
    config.headers['X-XSRF-TOKEN'] = sessionStorage.getItem("xsrf-token");
    return config;
  },
  error => {
    console.error('Request Error', error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  response => {
    const csrfToken = getCookie();

    if (csrfToken) {
      sessionStorage.setItem('xsrf-token', csrfToken);
      window.ipcRenderer.send('send-data-to-electron', csrfToken);
    }
    return response;
  }
);

const getCookie = (): string => {
  const cookies = document.cookie.split(';');
  let token: string = cookies[0].split('=')[1];
  return token;
}

export { axiosInstance };
