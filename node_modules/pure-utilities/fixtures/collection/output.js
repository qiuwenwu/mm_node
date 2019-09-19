const input = require('./input')
const generate = require('../generate')
const collection = require('../../collection')

const fixtures = generate(collection, input)
module.exports = fixtures
