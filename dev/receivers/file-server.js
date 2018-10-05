const fs = require('fs')
const fsp = fs.promises
const path = require('path')
const config = require('../config')
const { getExtension, fileStreamer } = require('../responses/file-streamer')

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

module.exports = async (req, ctx) => {
  const url = new URL(req.url, config.host)
  let filepath = path.join(__dirname, '../..', url.pathname)

  if (await isDirectory(filepath)) {
    const ext = getExtension(req.headers.accept) || 'html'
    filepath = path.join(filepath, `index.${ext}`)
  }

  return (await isFile(filepath)) && fileStreamer(filepath)
}
