module.exports = (arr, fn) => {
  const truthy = []
  const falsy = []
  for (let i = 0; i < arr.length; i++) {
    const value = arr[i]
    if (fn(value)) {
      truthy.push(value)
    } else {
      falsy.push(value)
    }
  }
  return [ truthy, falsy ]
}
