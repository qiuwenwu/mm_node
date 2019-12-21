function feet (number, precision = 2, decimal = true) {
  const result = Number(((number) * (1 / 12)).toFixed(precision))
  return decimal ? result : `${result}′`
}

module.exports = feet
