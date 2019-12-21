function unique (array) {
  return Array.from(new Set(array.map(item => JSON.stringify(item)))).map(JSON.parse)
}

module.exports = unique
