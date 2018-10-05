const config = require('./config')
const poot = require('./lib/poot')
const notFound = require('./receivers/not-found')
const fileServer = require('./receivers/file-server')

poot([
  fileServer,
  notFound
], { port: config.port })
.onError((err) => console.error('dev server error: ', err))
.start()
.then(() => console.log(`dev server listening on port ${config.port}`))
