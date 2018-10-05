const fs = require('fs')

const contentTypes = {
  html: 'text/html',
  js: 'application/javascript',
  json: 'application/json',
  ico: 'image/x-icon',
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  mp4: 'video/mp4',
  ogg: 'audio/ogg',
  txt: 'text/plain',
  md: 'text/markdown'
}

const reverseContentTypes = Object.entries(contentTypes)
  .reduce((acc, [key, value]) => {
    acc[value] = key
    return acc
  }, {})

const extensionReg = /\.(\w+)$/i

const getContentType = (filename) => {
  const extension = filename.match(extensionReg)
  if (extension && extension.length && contentTypes[extension[1]]) {
    return contentTypes[extension[1]]
  }
  return undefined
}

const getExtension = (contentType) => {
  return reverseContentTypes[contentType]
}

const fileStreamer = (filepath, statusCode) => (res) => {
  if (statusCode) res.statusCode = statusCode
  const contentType = getContentType(filepath)
  if (contentType) {
    res.setHeader('content-type', contentType)
  }
  fs.createReadStream(filepath).pipe(res)
  return res
}

module.exports = {
  fileStreamer,
  getContentType,
  getExtension
}
