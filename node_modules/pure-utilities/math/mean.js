function mean (array) {
  return array.reduce((acc, value) => acc + value, 0) / array.length
}

module.exports = mean
