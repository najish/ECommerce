// server.js
const cluster = require('cluster')
const os = require('os')

const numCPUs = os.cpus().length

if (cluster.isPrimary) {
  console.log(`👑 Primary ${process.pid} is running`)

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`❌ Worker ${worker.process.pid} died. Starting a new one...`)
    cluster.fork()
  })
} else {
  console.log(`🚀 Worker ${process.pid} started`)
  require('./app') // Only the worker runs the server
}
