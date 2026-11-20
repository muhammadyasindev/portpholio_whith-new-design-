const { spawn } = require('child_process');
const path = require('path');

console.log('================================================================');
console.log('  STARTING FULL-STACK DEVELOPER PORTFOLIO & ADMIN SYSTEM');
console.log('  - Backend API:    http://localhost:5050');
console.log('  - Frontend Dev:   http://localhost:5173');
console.log('  - Admin Login:    http://localhost:5173/admin/login');
console.log('================================================================\n');

const backend = spawn('node', ['server.js'], {
  cwd: path.join(__dirname, 'server'),
  env: process.env,
  stdio: 'pipe'
});

backend.stdout.on('data', (data) => {
  const lines = data.toString().trim().split('\n');
  lines.forEach(line => {
    if (line.trim()) console.log(`\x1b[36m[Backend]\x1b[0m ${line}`);
  });
});

backend.stderr.on('data', (data) => {
  const lines = data.toString().trim().split('\n');
  lines.forEach(line => {
    if (line.trim()) console.error(`\x1b[31m[Backend Error]\x1b[0m ${line}`);
  });
});

const vitePath = path.join(__dirname, 'client', 'node_modules', 'vite', 'bin', 'vite.js');
const frontend = spawn('node', [vitePath], {
  cwd: path.join(__dirname, 'client'),
  env: process.env,
  stdio: 'pipe'
});

frontend.stdout.on('data', (data) => {
  const lines = data.toString().trim().split('\n');
  lines.forEach(line => {
    if (line.trim()) console.log(`\x1b[32m[Frontend]\x1b[0m ${line}`);
  });
});

frontend.stderr.on('data', (data) => {
  const lines = data.toString().trim().split('\n');
  lines.forEach(line => {
    if (line.trim()) console.error(`\x1b[33m[Frontend Notice]\x1b[0m ${line}`);
  });
});

const cleanup = () => {
  console.log('\nShutting down servers cleanly...');
  try { backend.kill(); } catch (e) {}
  try { frontend.kill(); } catch (e) {}
  process.exit(0);
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
process.on('exit', cleanup);
