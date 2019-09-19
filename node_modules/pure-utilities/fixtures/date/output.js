const input = require('./input')
const generate = require('../generate')
const date = require('../../date')

const fixtures = generate(date, input)
module.exports = fixtures
