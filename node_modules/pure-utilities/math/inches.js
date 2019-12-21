function inches (number, precision = 2, decimal = true) {
  const result = Number((number * 12).toFixed(precision))
  return decimal ? result : `${result}″`
}

module.exports = inches
