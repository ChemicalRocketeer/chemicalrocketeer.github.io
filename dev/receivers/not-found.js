const path = require('path')
const { fileStreamer } = require('../responses/file-streamer')

module.exports = async (req) => {
  return fileStreamer(path.join(__dirname, '../../404.html'), 404)
}
