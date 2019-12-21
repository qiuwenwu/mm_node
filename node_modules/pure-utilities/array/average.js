function average (array) {
  return array.reduce((previousValue, currentValue) => previousValue + currentValue) / array.length
}

module.exports = average
