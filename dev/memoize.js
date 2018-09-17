const cache = new Map()

module.exports = (fn) => (param) => {
  if (cache.has(param)) return cache.get(param)
  const result = fn(param)
  cache.set(param, result)
  return result
}
