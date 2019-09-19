const input = require('./input')
const generate = require('../generate')
const string = require('../../string')

const fixtures = generate(string, input)
module.exports = fixtures
