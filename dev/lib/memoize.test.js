const assert = require('assert')
const memoize = require('./memoize')

let callcount = 0

const memoized = memoize(() => callcount++)

const firstResult = memoized('test')
const secondResult = memoized('again')
assert.notEqual(firstResult, secondResult)

const thirdResult = memoized('test')
assert.equal(firstResult, thirdResult)
