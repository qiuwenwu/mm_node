function float (value) {
  value = value.toString()
  value = value.replace(/\s/g, '')
    .replace(/,/g, value.includes('.') ? '' : '.')
  return parseFloat(value)
}

module.exports = float
