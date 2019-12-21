function radians (number, precision = 2) {
  return Number(((number * Math.PI) / 180).toFixed(precision))
}

module.exports = radians
