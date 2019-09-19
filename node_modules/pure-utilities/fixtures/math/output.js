const input = require('./input')
const generate = require('../generate')
const math = require('../../math')

const fixtures = generate(math, input)
module.exports = fixtures
