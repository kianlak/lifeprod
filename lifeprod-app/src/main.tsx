import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { axiosInstance } from './Axios.ts'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// Remove Preload scripts loading
postMessage({ payload: 'removeLoading' }, '*')

// Use contextBridge
window.ipcRenderer.on('main-process-message', (_event, message) => {
  console.log(message)
});

axiosInstance.get("http://localhost:8080/api/csrf/get")
.then(() => {
  window.ipcRenderer.send('send-data-to-electron', document.cookie.split('=')[1]);
  sessionStorage.setItem("xsrf-token", document.cookie.split('=')[1]);
})
.catch(error => {

  console.log(error);
});