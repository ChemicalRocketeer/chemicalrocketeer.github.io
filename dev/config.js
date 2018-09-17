module.exports = Object.assign(
  {
    port: 3000,
  }, (() => {
    try {
      return require('./config.local')
    } catch (err) {
      return {}
    }
  })()
)
