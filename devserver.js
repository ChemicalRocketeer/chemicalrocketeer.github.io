const http = require('http')
const config = require('./dev/config')
const fileServer = require('./dev/file-server')

const server = http.createServer()

server.on('error', (err) => {
  console.error('dev server error: ', err)
})

// server.on('request', (req, res) => {
//   res.statusCode = 200
//   res.setHeader('Content-Type', 'text/plain');
//   console.log('connected!', req.read, Buffer.from)
//   res.write('hey')
//   res.end()
// })

server.on('request', fileServer)

server.listen(config.port, () => {
  console.log(`dev server listening on port ${config.port}`)
})
