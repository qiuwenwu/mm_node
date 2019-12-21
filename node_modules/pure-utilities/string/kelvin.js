function kelvin (string) {
  if (string.endsWith('°F')) {
    string = Number(string.substring(0, string.indexOf('°F')))
    return Math.round((string + 459.67) * 5 / 9) + 'K'
  }
  if (string.endsWith('°C')) {
    string = Number(string.substring(0, string.indexOf('°C')))
    return Math.round(string + 273.15) + 'K'
  }
  if (string.endsWith('K')) {
    return string
  }
  return string + 'K'
}

module.exports = kelvin
