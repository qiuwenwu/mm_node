function isostring (value) {
  return new Date(parseInt(value, 10)).toISOString()
}

module.exports = isostring
