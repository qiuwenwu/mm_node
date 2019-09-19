const input = require('./input')
const generate = require('../generate')
const object = require('../../object')
const fixtures = generate(object, input)
module.exports = fixtures
