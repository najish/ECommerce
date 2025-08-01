// server.js
const cluster = require('cluster');
const os = require('os');

const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`👑 Primary ${process.pid} is running`);
  
  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Log when workers die and restart them
  cluster.on('exit', (worker, code, signal) => {
    console.log(`❌ Worker ${worker.process.pid} died. Starting a new one...`);
    cluster.fork();
  });
} else {
  console.log(`🚀 Worker ${process.pid} started`);
  require('./app'); // your Express app
}
