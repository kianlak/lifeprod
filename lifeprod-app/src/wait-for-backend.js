const { exec } = require('child_process');

const backendProcess = exec('npm run dev-backend');

backendProcess.stdout.on('data', (data) => {
  if (data.includes('[ SUCCESS: Backend server started ]')) {
    process.exit(0);
  }
});

backendProcess.stderr.on('data', (data) => {
  console.error(`Error: ${data}`);
  process.exit(1);
});
