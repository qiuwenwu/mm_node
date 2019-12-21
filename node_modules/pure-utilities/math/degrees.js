function degrees (number, precision = 2) {
  return Number(((180 / Math.PI) * number).toFixed(precision))
}

module.exports = degrees
