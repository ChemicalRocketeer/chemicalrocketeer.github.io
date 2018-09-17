const fs = require('fs')
const fsp = fs.promises
const path = require('path')
const config = require('./config')

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

const isDirectory = async (path) => {
  try {
    return (await fsp.lstat(path)).isDirectory()
  } catch (err) {
    return false
  }
}

const isFile = async (path) => {
  try {
    return !(await fsp.lstat(path)).isDirectory()
  } catch (err) {
    return false
  }
}

const send404 = (res) => {
  res.statusCode = 404
  res.end()
}

module.exports = async (req, res) => {
  const url = new URL(req.url, config.host)
  let filepath = path.join(__dirname, '../', url.pathname)

  if (await isDirectory(filepath)) {
    const ext = reverseContentTypes[req.headers.accept] || 'html'
    filepath = path.join(filepath, `index.${ext}`)
  }

  if (await isFile(filepath)) {
    const contentType = getContentType(filepath)
    if (contentType) {
      res.setHeader('content-type', contentType)
    }
    fs.createReadStream(filepath).pipe(res)
  } else {
    return send404(res)
  }
}
