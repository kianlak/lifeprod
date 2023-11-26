import { app, BrowserWindow, ipcMain } from 'electron';
import axios from 'axios';
import path from 'node:path'

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, '../dist')
process.env.VITE_PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public')

let win: BrowserWindow | null
let xsrfToken: string;

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']

app.setPath('userData', path.join(app.getPath('appData'), 'LifeProd'));

function createWindow() {
  win = new BrowserWindow({
    width: 900,
    height: 1000,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    },
  }
  )

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(process.env.DIST, 'index.html'))
    // win.loadFile(path.join(__dirname, 'dist', 'index.html'));
    // win.loadURL(`file://${path.join(__dirname, '../../../../', 'index.html')}`);
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  const axiosInstance = axios.create({
    headers: {
      'X-XSRF-TOKEN': xsrfToken,
      'Content-Type': 'application/json',
    }
  });
  // Shutdown Spring Server
  axiosInstance.post('http://localhost:8080/actuator/shutdown')
  .then(() => {
    if (process.platform !== 'darwin') {
      app.quit();
      win = null;
    }
  })
  .catch(error => {
    console.log(xsrfToken);
    console.error('Error during Axios request:', error);
    if (process.platform !== 'darwin') {
      app.quit();
      win = null;
    }
  });
});

ipcMain.on('send-data-to-electron', (_event, data) => {
  console.log(data);
  console.log('Data received from React:', data);
  xsrfToken = data;
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(createWindow)
