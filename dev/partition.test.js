const assert = require('assert')
const partition = require('./partition')

const data = [1, 2, 5, 6, 3]

const [left, right] = partition(data, (x) => x < 4)

assert.deepStrictEqual(left, [1, 2, 3])
assert.deepStrictEqual(right, [5, 6])
