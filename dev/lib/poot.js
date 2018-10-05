const http = require('http')

const makePoot = (params) => {
  const {
    receivers,
    port,
    errorHandler,
    server,
  } = params

  const requestHandler = async (req, res) => {
    let ctx = {}
    try {
      for (handler of receivers) {
        const result = await handler(req, ctx)
        const resultType = typeof result
        if (resultType === 'function') return result(res);
        if (resultType === 'object') ctx = result
      }
    } catch (error) {
      errorHandler(error)
    }
  }

  const start = () => new Promise(resolve => {
    server.on('error', errorHandler)
    server.on('request', requestHandler)
    server.listen(port, () => {
      resolve()
    })
  })

  const onError = (errorHandler) => (
    makePoot({ ...params, errorHandler })
  )

  return {
    onError,
    start,
  }
}

const publicInterface = (
  receivers,
  {
    port=3000,
    server=http.createServer(),
  } = {}
) => {
  return makePoot({
    receivers,
    port,
    errorHandler: () => {},
    server,
  })
}

module.exports = publicInterface
