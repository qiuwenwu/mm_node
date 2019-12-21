function compact (array, strict = true) {
  return strict ? array.filter(Boolean) : array.filter(item => item !== null && item !== undefined)
}

module.exports = compact
